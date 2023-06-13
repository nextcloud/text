<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Text\Service;

use \InvalidArgumentException;
use OCA\Text\AppInfo\Application;
use OCA\Text\Db\Session;
use OCA\Text\Db\SessionMapper;
use OCP\DirectEditing\IManager;
use OCP\Files\Config\IUserMountCache;
use OCP\Files\Lock\ILock;
use OCP\Files\Lock\ILockManager;
use OCP\Files\Lock\LockContext;
use OCP\Files\Lock\NoLockProviderException;
use OCP\Files\Lock\OwnerLockedException;
use OCP\IRequest;
use OCP\Lock\ILockingProvider;
use OCP\PreConditionNotMetException;
use Psr\Log\LoggerInterface;
use function json_encode;
use OCA\Text\Db\Document;
use OCA\Text\Db\DocumentMapper;
use OCA\Text\Db\Step;
use OCA\Text\Db\StepMapper;
use OCA\Text\Exception\DocumentHasUnsavedChangesException;
use OCA\Text\Exception\DocumentSaveConflictException;
use OCA\Text\Exception\VersionMismatchException;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\Entity;
use OCP\Constants;
use OCP\Files\Folder;
use OCP\Files\IAppData;
use OCP\Files\InvalidPathException;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\Lock\LockedException;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as ShareManager;

class DocumentService {

	/**
	 * Delay to wait for between autosave versions
	 */
	public const AUTOSAVE_MINIMUM_DELAY = 10;

	private ?string $userId;
	private DocumentMapper $documentMapper;
	private SessionMapper $sessionMapper;
	private LoggerInterface $logger;
	private ShareManager $shareManager;
	private StepMapper $stepMapper;
	private IRootFolder $rootFolder;
	private ICache $cache;
	private IAppData $appData;
	private ILockingProvider $lockingProvider;
	private ILockManager $lockManager;
	private IUserMountCache $userMountCache;

	public function __construct(DocumentMapper $documentMapper, StepMapper $stepMapper, SessionMapper $sessionMapper, IAppData $appData, $userId, IRootFolder $rootFolder, ICacheFactory $cacheFactory, LoggerInterface $logger, ShareManager $shareManager, IRequest $request, IManager $directManager, ILockingProvider $lockingProvider, ILockManager $lockManager, IUserMountCache $userMountCache) {
		$this->documentMapper = $documentMapper;
		$this->stepMapper = $stepMapper;
		$this->sessionMapper = $sessionMapper;
		$this->userId = $userId;
		$this->appData = $appData;
		$this->rootFolder = $rootFolder;
		$this->cache = $cacheFactory->createDistributed('text');
		$this->logger = $logger;
		$this->shareManager = $shareManager;
		$this->lockingProvider = $lockingProvider;
		$this->lockManager = $lockManager;
		$this->userMountCache = $userMountCache;
		$token = $request->getParam('token');
		if ($this->userId === null && $token !== null) {
			try {
				$tokenObject = $directManager->getToken($token);
				$tokenObject->extend();
				$tokenObject->useTokenScope();
				$this->userId = $tokenObject->getUser();
			} catch (\Exception $e) {
			}
		}
	}

	/**
	 * @param File $file
	 * @return Entity
	 * @throws NotFoundException
	 * @throws InvalidPathException
	 * @throws NotPermittedException
	 */
	public function createDocument(File $file): Document {
		try {
			$document = $this->documentMapper->find($file->getFileInfo()->getId());

			// Do not hard reset if changed from outside since this will throw away possible steps
			// This way the user can still resolve conflicts in the editor view
			if ($document->getLastSavedVersion() !== $document->getCurrentVersion()) {
				$this->logger->debug('Unsaved steps but collission with file, continue collaborative editing');
				return $document;
			}

			return $document;
		} catch (DoesNotExistException $e) {
		} catch (InvalidPathException $e) {
		} catch (NotFoundException $e) {
		}

		if (!$this->ensureDocumentsFolder()) {
			throw new NotFoundException('No app data folder present for text documents');
		}

		try {
			$documentBaseFile = $this->getBaseFile((string)$file->getFileInfo()->getId());
		} catch (NotFoundException $e) {
			$documentBaseFile = $this->appData->getFolder('documents')->newFile((string)$file->getFileInfo()->getId());
		}
		$documentBaseFile->putContent($file->fopen('r'));

		$document = new Document();
		$document->setId($file->getFileInfo()->getId());
		$document->setCurrentVersion(0);
		$document->setLastSavedVersion(0);
		$document->setLastSavedVersionTime($file->getFileInfo()->getMtime());
		$document->setLastSavedVersionEtag($file->getEtag());
		$document->setBaseVersionEtag($file->getEtag());
		try {
			$document = $this->documentMapper->insert($document);
			$this->cache->set('document-version-'.$document->getId(), 0);
		} catch (Exception $e) {
			if ($e->getReason() === Exception::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
				// Document might have been created in the meantime
				return $this->documentMapper->find($file->getFileInfo()->getId());
			}

			throw $e;
		}
		return $document;
	}

	/**
	 * @param $document
	 * @return ISimpleFile
	 * @throws NotFoundException
	 */
	public function getBaseFile($document): ISimpleFile {
		if (!$this->ensureDocumentsFolder()) {
			throw new NotFoundException('No app data folder present for text documents');
		}
		return $this->appData->getFolder('documents')->getFile((string) $document);
	}

	public function get($documentId) {
		return $this->documentMapper->find($documentId);
	}

	/**
	 * @param $documentId
	 * @param $sessionId
	 * @param $steps
	 * @param $version
	 * @return array
	 * @throws DoesNotExistException
	 * @throws VersionMismatchException
	 */
	public function addStep($documentId, $sessionId, $steps, $version): array {
		$document = null;
		$oldVersion = null;

		try {
			$this->lockingProvider->acquireLock('document-push-lock-' . $documentId, ILockingProvider::LOCK_EXCLUSIVE);
		} catch (LockedException $e) {
			throw new VersionMismatchException('Version does not match');
		}

		try {
			$document = $this->documentMapper->find($documentId);
			if ($version !== $document->getCurrentVersion()) {
				throw new VersionMismatchException('Version does not match');
			}
			$stepsJson = json_encode($steps);
			if (!is_array($steps) || $stepsJson === null) {
				throw new InvalidArgumentException('Failed to encode steps');
			}
			$validStepTypes = ['addMark', 'removeMark', 'replace', 'replaceAround'];
			foreach ($steps as $step) {
				if (array_key_exists('stepType', $step) && !in_array($step['stepType'], $validStepTypes, true)) {
					throw new InvalidArgumentException('Invalid step data');
				}
			}
			$oldVersion = $document->getCurrentVersion();
			$newVersion = $oldVersion + count($steps);
			$this->cache->set('document-version-' . $document->getId(), $newVersion);
			$document->setCurrentVersion($newVersion);
			$this->documentMapper->update($document);
			$step = new Step();
			$step->setData($stepsJson);
			$step->setSessionId($sessionId);
			$step->setDocumentId($documentId);
			$step->setVersion($version + 1);
			$this->stepMapper->insert($step);
			// TODO write steps to cache for quicker reading
			$this->lockingProvider->releaseLock('document-push-lock-' . $documentId, ILockingProvider::LOCK_EXCLUSIVE);
			return $steps;
		} catch (DoesNotExistException $e) {
			$this->lockingProvider->releaseLock('document-push-lock-' . $documentId, ILockingProvider::LOCK_EXCLUSIVE);
			throw $e;
		} catch (\Throwable $e) {
			if ($document !== null && $oldVersion !== null) {
				$this->logger->error('This should never happen. An error occurred when storing the version, trying to recover the last stable one', ['exception' => $e]);
				$document->setCurrentVersion($oldVersion);
				$this->documentMapper->update($document);
				$this->cache->set('document-version-' . $document->getId(), $oldVersion);
				$this->stepMapper->deleteAfterVersion($documentId, $oldVersion);
			}
			$this->lockingProvider->releaseLock('document-push-lock-' . $documentId, ILockingProvider::LOCK_EXCLUSIVE);
			throw $e;
		}
	}

	public function getSteps($documentId, $lastVersion): array {
		if ($lastVersion === $this->cache->get('document-version-' . $documentId)) {
			return [];
		}
		$steps = $this->stepMapper->find($documentId, $lastVersion);
		$unique_array = [];
		foreach ($steps as $step) {
			$version = $step->getVersion();
			if (!array_key_exists($version, $unique_array)) {
				$unique_array[(string)$version] = $step;
			} else {
				// found duplicate step
				// FIXME: verify that this version is the correct one
				//$this->stepMapper->delete($step);
			}
		}
		return array_values($unique_array);
	}

	/**
	 * @param File $file
	 * @param $documentId
	 * @param $version
	 * @param $autoaveDocument
	 * @param bool $force
	 * @param bool $manualSave
	 * @param null $shareToken
	 * @param null $filePath
	 * @return Document
	 * @throws DocumentSaveConflictException
	 * @throws DoesNotExistException
	 * @throws NotFoundException
	 * @throws \OCP\DB\Exception
	 */
	public function autosave($file, $documentId, $version, $autoaveDocument, $force = false, $manualSave = false, $shareToken = null, $filePath = null): Document {
		/** @var Document $document */
		$document = $this->documentMapper->find($documentId);

		if ($file === null) {
			throw new NotFoundException();
		}

		if ($this->isReadOnly($file, $shareToken)) {
			return $document;
		}

		$savedEtag = $file->getEtag();
		$lastMTime = $document->getLastSavedVersionTime();

		if ($lastMTime > 0 && $savedEtag !== $document->getLastSavedVersionEtag() && $lastMTime !== $file->getMtime() && $force === false) {
			if (!$this->cache->get('document-save-lock-' . $documentId)) {
				throw new DocumentSaveConflictException('File changed in the meantime from outside');
			} else {
				// Only return here if the document is locked, otherwise we can continue to save
				return $document;
			}
		}

		if ($autoaveDocument === null) {
			return $document;
		}
		// Do not save if version already saved
		if (!$force && ($version <= (string)$document->getLastSavedVersion() || $version > (string)$document->getCurrentVersion())) {
			return $document;
		}

		// Only save once every AUTOSAVE_MINIMUM_DELAY seconds
		if ($file->getMTime() === $lastMTime && $lastMTime > time() - self::AUTOSAVE_MINIMUM_DELAY && $manualSave === false) {
			return $document;
		}
		$this->cache->set('document-save-lock-' . $documentId, true, 10);
		try {
			$this->lockManager->runInScope(new LockContext(
				$file,
				ILock::TYPE_APP,
				Application::APP_NAME
			), function () use ($file, $autoaveDocument) {
				$file->putContent($autoaveDocument);
			});
		} catch (LockedException $e) {
			// Ignore lock since it might occur when multiple people save at the same time
			return $document;
		}
		$document->setLastSavedVersion($document->getCurrentVersion());
		$document->setLastSavedVersionTime(time());
		$document->setLastSavedVersionEtag($file->getEtag());
		$this->documentMapper->update($document);
		$this->cache->remove('document-save-lock-' . $documentId);
		return $document;
	}

	/**
	 * @param $documentId
	 * @param bool $force
	 * @throws DocumentHasUnsavedChangesException
	 */
	public function resetDocument(int $documentId, $force = false): void {
		try {
			$this->unlock($documentId);

			$document = $this->documentMapper->find($documentId);

			if ($force || !$this->hasUnsavedChanges($document)) {
				$this->stepMapper->deleteAll($documentId);
				$this->sessionMapper->deleteByDocumentId($documentId);
				$this->documentMapper->delete($document);

				try {
					$this->getBaseFile($documentId)->delete();
				} catch (NotFoundException $e) {
				} catch (NotPermittedException $e) {
				}
			} elseif ($this->hasUnsavedChanges($document)) {
				throw new DocumentHasUnsavedChangesException('Did not reset document, as it has unsaved changes');
			}
		} catch (DoesNotExistException $e) {
		}
	}

	/**
	 * @param Session $session
	 * @param $shareToken
	 * @return \OCP\Files\File|Folder|Node
	 * @throws NotFoundException
	 */
	public function getFileForSession(Session $session, $shareToken) {
		if ($session->getUserId() !== null && $shareToken === null) {
			return $this->getFileById($session->getDocumentId(), $session->getUserId());
		}
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
		} catch (ShareNotFound $e) {
			throw new NotFoundException();
		}

		$node = $share->getNode();
		if ($node instanceof \OCP\Files\File) {
			return $node;
		}
		if ($node instanceof Folder) {
			return $node->getById($session->getDocumentId())[0];
		}
		throw new \InvalidArgumentException('No proper share data');
	}

	/**
	 * @throws NotFoundException
	 */
	public function getFileById($fileId, $userId = null): Node {
		$userId = $userId ?? $this->userId;

		// If no user is provided we need to get any file from existing mounts for cleanup jobs
		if ($userId === null) {
			$mounts = $this->userMountCache->getMountsForFileId($fileId);
			$anyMount = array_shift($mounts);
			if ($anyMount === null) {
				throw new NotFoundException('Could not fallback to file from mounts');
			}

			$userId = $anyMount->getUser()->getUID();
		}

		try {
			$userFolder = $this->rootFolder->getUserFolder($userId);
		} catch (\OC\User\NoUserException $e) {
			// It is a bit hacky to depend on internal exceptions here. But it is the best we can do for now
			throw new NotFoundException();
		}

		$files = $userFolder->getById($fileId);
		if (count($files) === 0) {
			throw new NotFoundException();
		}

		// Workaround to always open files with edit permissions if multiple occurences of
		// the same file id are in the user home, ideally we should also track the path of the file when opening
		usort($files, function (Node $a, Node $b) {
			return ($b->getPermissions() & Constants::PERMISSION_UPDATE) <=> ($a->getPermissions() & Constants::PERMISSION_UPDATE);
		});

		return array_shift($files);
	}

	/**
	 * @param $shareToken
	 * @param null|string $path
	 * @return \OCP\Files\File|Folder|Node
	 * @throws NotFoundException
	 */
	public function getFileByShareToken($shareToken, $path = null) {
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
		} catch (ShareNotFound $e) {
			throw new NotFoundException();
		}

		$node = $share->getNode();
		if ($node instanceof \OCP\Files\File) {
			return $node;
		}
		if ($node instanceof Folder) {
			return $node->get($path);
		}
		throw new \InvalidArgumentException('No proper share data');
	}


	public function isReadOnly($file, $token) {
		$readOnly = true;
		if ($token) {
			try {
				$this->checkSharePermissions($token, Constants::PERMISSION_UPDATE);
				$readOnly = false;
			} catch (NotFoundException $e) {
			}
		} else {
			$readOnly = !$file->isUpdateable();
		}

		$lockInfo = $this->getLockInfo($file);
		$isTextLock = (
			$lockInfo && $lockInfo->getType() === ILock::TYPE_APP && $lockInfo->getOwner() === Application::APP_NAME
		);

		if ($isTextLock) {
			return $readOnly;
		}

		return $readOnly || $lockInfo !== null;
	}

	public function getLockInfo($file): ?ILock {
		try {
			$locks = $this->lockManager->getLocks($file->getId());
		} catch (NoLockProviderException|PreConditionNotMetException $e) {
			return null;
		}
		return array_shift($locks);
	}

	/**
	 * @param $shareToken
	 * @return void
	 * @throws NotFoundException|NotPermittedException
	 */
	public function checkSharePermissions($shareToken, $permission = Constants::PERMISSION_READ): void {
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
		} catch (ShareNotFound $e) {
			throw new NotFoundException();
		}

		if (($share->getPermissions() & $permission) === 0) {
			throw new NotFoundException();
		}
	}

	public function hasUnsavedChanges(Document $document) {
		return $document->getCurrentVersion() !== $document->getLastSavedVersion();
	}

	private function ensureDocumentsFolder(): bool {
		try {
			$this->appData->getFolder('documents');
		} catch (NotFoundException $e) {
			$this->appData->newFolder('documents');
		} catch (\RuntimeException $e) {
			// Do not fail hard
			$this->logger->error($e->getMessage(), ['exception' => $e]);
			return false;
		}

		return true;
	}

	public function lock(int $fileId): bool {
		if (!$this->lockManager->isLockProviderAvailable()) {
			return true;
		}

		try {
			$file = $this->getFileById($fileId);
			$this->lockManager->lock(new LockContext(
				$file,
				ILock::TYPE_APP,
				Application::APP_NAME
			));
		} catch (NoLockProviderException | PreConditionNotMetException | NotFoundException $e) {
		} catch (OwnerLockedException $e) {
			return false;
		}
		return true;
	}

	public function unlock(int $fileId): void {
		if (!$this->lockManager->isLockProviderAvailable()) {
			return;
		}

		try {
			$file = $this->getFileById($fileId);
			$this->lockManager->unlock(new LockContext(
				$file,
				ILock::TYPE_APP,
				Application::APP_NAME
			));
		} catch (NoLockProviderException | PreConditionNotMetException | NotFoundException $e) {
		}
	}
}
