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
use OCA\Text\Db\Document;
use OCA\Text\Db\DocumentMapper;
use OCA\Text\Db\Session;
use OCA\Text\Db\SessionMapper;
use OCA\Text\Db\Step;
use OCA\Text\Db\StepMapper;
use OCA\Text\Exception\DocumentHasUnsavedChangesException;
use OCA\Text\Exception\DocumentSaveConflictException;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\Constants;
use OCP\DB\Exception;
use OCP\DirectEditing\IManager;
use OCP\Files\AlreadyExistsException;
use OCP\Files\Config\IUserMountCache;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IAppData;
use OCP\Files\InvalidPathException;
use OCP\Files\IRootFolder;
use OCP\Files\Lock\ILock;
use OCP\Files\Lock\ILockManager;
use OCP\Files\Lock\LockContext;
use OCP\Files\Lock\NoLockProviderException;
use OCP\Files\Lock\OwnerLockedException;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\ICache;
use OCP\ICacheFactory;
use OCP\IConfig;
use OCP\IRequest;
use OCP\Lock\ILockingProvider;
use OCP\Lock\LockedException;
use OCP\PreConditionNotMetException;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as ShareManager;
use Psr\Log\LoggerInterface;
use function json_encode;

class DocumentService {

	/**
	 * Delay to wait for between autosave versions
	 */
	public const AUTOSAVE_MINIMUM_DELAY = 10;

	private bool $saveFromText = false;

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
	private IConfig $config;

	public function __construct(DocumentMapper $documentMapper, StepMapper $stepMapper, SessionMapper $sessionMapper, IAppData $appData, $userId, IRootFolder $rootFolder, ICacheFactory $cacheFactory, LoggerInterface $logger, ShareManager $shareManager, IRequest $request, IManager $directManager, ILockingProvider $lockingProvider, ILockManager $lockManager, IUserMountCache $userMountCache, IConfig $config) {
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
		$this->config = $config;
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

	public function getDocument(int $id): ?Document {
		try {
			return $this->documentMapper->find($id);
		} catch (DoesNotExistException|NotFoundException $e) {
			return null;
		}
	}

	public function isSaveFromText(): bool {
		return $this->saveFromText;
	}

	/**
	 * @throws NotFoundException
	 * @throws InvalidPathException
	 * @throws NotPermittedException
	 * @throws Exception
	 */
	public function createDocument(File $file): Document {
		try {
			$document = $this->documentMapper->find($file->getId());

			// Do not hard reset if changed from outside since this will throw away possible steps
			// This way the user can still resolve conflicts in the editor view
			$stepsVersion = $this->stepMapper->getLatestVersion($document->getId());
			if ($stepsVersion && ($document->getLastSavedVersion() !== $stepsVersion)) {
				$this->logger->debug('Unsaved steps, continue collaborative editing');
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

		$document = new Document();
		$document->setId($file->getId());
		$document->setLastSavedVersion(0);
		$document->setLastSavedVersionTime($file->getMTime());
		$document->setLastSavedVersionEtag($file->getEtag());
		$document->setBaseVersionEtag(uniqid());
		try {
			$document = $this->documentMapper->insert($document);
			$this->cache->set('document-version-'.$document->getId(), 0);
		} catch (Exception $e) {
			if ($e->getReason() === Exception::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
				// Document might have been created in the meantime
				throw new AlreadyExistsException();
			}

			throw $e;
		}
		return $document;
	}

	/**
	 * @param int $documentId
	 * @return ISimpleFile
	 * @throws NotFoundException
	 */
	public function getStateFile(int $documentId): ISimpleFile {
		$filename = (string)$documentId . '.yjs';
		if (!$this->ensureDocumentsFolder()) {
			throw new NotFoundException('No app data folder present for text documents');
		}
		return $this->appData->getFolder('documents')->getFile($filename);
	}

	/**
	 * @param int $documentId
	 * @return ISimpleFile
	 * @throws NotPermittedException
	 */
	public function createStateFile(int $documentId): ISimpleFile {
		$filename = (string)$documentId . '.yjs';
		return $this->appData->getFolder('documents')->newFile($filename);
	}

	/**
	 * @param int $documentId
	 * @param string $content
	 */
	public function writeDocumentState(int $documentId, string $content): void {
		try {
			$documentStateFile = $this->getStateFile($documentId);
		} catch (NotFoundException $e) {
			$documentStateFile = $this->createStateFile($documentId);
		} catch (NotPermittedException $e) {
			$this->logger->error('Failed to create document state file', ['exception' => $e]);
			return;
		}
		$documentStateFile->putContent($content);
	}

	/**
	 * @param $documentId
	 * @param $sessionId
	 * @param $steps
	 * @param $version
	 * @param $shareToken
	 * @return array
	 * @throws InvalidArgumentException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws DoesNotExistException
	 */
	public function addStep(Document $document, Session $session, $steps, $version, $shareToken): array {
		$sessionId = $session->getId();
		$documentId = $session->getDocumentId();
		$stepsToInsert = [];
		$querySteps = [];
		$getStepsSinceVersion = null;
		$newVersion = $version;
		foreach ($steps as $step) {
			// Steps are base64 encoded messages of the yjs protocols
			// https://github.com/yjs/y-protocols
			// Base64 encoded values smaller than "AAE" belong to sync step 1 messages.
			// These messages query other participants for their current state.
			if ($step < "AAE") {
				array_push($querySteps, $step);
			} else {
				array_push($stepsToInsert, $step);
			}
		}
		if (sizeof($stepsToInsert) > 0) {
			if ($this->isReadOnly($this->getFileForSession($session, $shareToken), $shareToken)) {
				throw new NotPermittedException('Read-only client tries to push steps with changes');
			}
			$newVersion = $this->insertSteps($document, $session, $stepsToInsert, $version);
		}
		// If there were any queries in the steps send the entire history
		$getStepsSinceVersion = count($querySteps) > 0 ? 0 : $version;
		$allSteps = $this->getSteps($documentId, $getStepsSinceVersion);
		$stepsToReturn = [];
		foreach ($allSteps as $step) {
			if ($step < "AAQ") {
				array_push($stepsToReturn, $step);
			}
		}
		return [
			'steps' => $stepsToReturn,
			'version' => $newVersion
		];
	}

	/**
	 * @param $documentId
	 * @param $sessionId
	 * @param $steps
	 * @param $version
	 * @return int
	 * @throws DoesNotExistException
	 * @throws InvalidArgumentException
	 */
	private function insertSteps(Document $document, Session $session, $steps, $version): int {
		$stepsVersion = null;
		try {
			$stepsJson = json_encode($steps);
			if (!is_array($steps) || $stepsJson === null) {
				throw new InvalidArgumentException('Failed to encode steps');
			}
			$stepsVersion = $this->stepMapper->getLatestVersion($document->getId());
			$step = new Step();
			$step->setData($stepsJson);
			$step->setSessionId($session->getId());
			$step->setDocumentId($document->getId());
			$step->setVersion(Step::VERSION_STORED_IN_ID);
			$step = $this->stepMapper->insert($step);
			$newVersion = $step->getId();
			$this->logger->debug("Adding steps to " . $document->getId() . ": bumping version from $stepsVersion to $newVersion");
			$this->cache->set('document-version-' . $document->getId(), $newVersion);
			// TODO write steps to cache for quicker reading
			return $newVersion;
		} catch (\Throwable $e) {
			if ($document !== null && $stepsVersion !== null) {
				$this->logger->error('This should never happen. An error occurred when storing the version, trying to recover the last stable one', ['exception' => $e]);
				$this->cache->set('document-version-' . $document->getId(), $stepsVersion);
				$this->stepMapper->deleteAfterVersion($document->getId(), $stepsVersion);
			}
			throw $e;
		}
	}

	public function getSteps($documentId, $lastVersion): array {
		if ($lastVersion === $this->cache->get('document-version-' . $documentId)) {
			return [];
		}
		return $this->stepMapper->find($documentId, $lastVersion);
	}

	/**
	 * @throws DocumentSaveConflictException
	 * @throws DoesNotExistException
	 * @throws InvalidPathException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws Exception
	 */
	public function autosave(Document $document, ?File $file, int $version, ?string $autoSaveDocument, ?string $documentState, bool $force = false, bool $manualSave = false, ?string $shareToken = null, ?string $filePath = null): Document {
		$documentId = $document->getId();
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

		if ($autoSaveDocument === null) {
			return $document;
		}
		// Do not save if version already saved
		$stepsVersion = $this->stepMapper->getLatestVersion($documentId)?: 0;
		if (!$force && ($version <= (string)$document->getLastSavedVersion() || $version > (string)$stepsVersion)) {
			return $document;
		}

		// Only save once every AUTOSAVE_MINIMUM_DELAY seconds
		if ($file->getMTime() === $lastMTime && $lastMTime > time() - self::AUTOSAVE_MINIMUM_DELAY && $manualSave === false) {
			return $document;
		}

		if (empty($autoSaveDocument)) {
			$this->logger->warning('Saving empty document', [
				'requestVersion' => $version,
				'requestAutosaveDocument' => $autoSaveDocument,
				'requestDocumentState' => $documentState,
				'document' => $document->jsonSerialize(),
				'fileSizeBeforeSave' => $file->getSize(),
				'steps' => array_map(function (Step $step) {
					return $step->jsonSerialize();
				}, $this->stepMapper->find($documentId, 0)),
				'sessions' => array_map(function (Session $session) {
					return $session->jsonSerialize();
				}, $this->sessionMapper->findAll($documentId))
			]);
		}

		// Version changed but the content remains the same
		if ($autoSaveDocument === $file->getContent()) {
			if ($documentState) {
				$this->writeDocumentState($file->getId(), $documentState);
			}
			$document->setLastSavedVersion($stepsVersion);
			$document->setLastSavedVersionTime($file->getMTime());
			$document->setLastSavedVersionEtag($file->getEtag());
			$this->documentMapper->update($document);
			return $document;
		}

		$this->cache->set('document-save-lock-' . $documentId, true, 10);
		try {
			$this->lockManager->runInScope(new LockContext(
				$file,
				ILock::TYPE_APP,
				Application::APP_NAME
			), function () use ($file, $autoSaveDocument, $documentState) {
				$this->saveFromText = true;
				$file->putContent($autoSaveDocument);
				if ($documentState) {
					$this->writeDocumentState($file->getId(), $documentState);
				}
			});
			$document->setLastSavedVersion($stepsVersion);
			$document->setLastSavedVersionTime($file->getMTime());
			$document->setLastSavedVersionEtag($file->getEtag());
			$this->documentMapper->update($document);
		} catch (LockedException $e) {
			// Ignore lock since it might occur when multiple people save at the same time
			return $document;
		} finally {
			$this->cache->remove('document-save-lock-' . $documentId);
		}
		return $document;
	}

	/**
	 * @throws DocumentHasUnsavedChangesException
	 * @throws Exception
	 * @throws NotPermittedException
	 */
	public function resetDocument(int $documentId, bool $force = false): void {
		try {
			$document = $this->documentMapper->find($documentId);
			if (!$force && $this->hasUnsavedChanges($document)) {
				$this->logger->debug('did not reset document for ' . $documentId);
				throw new DocumentHasUnsavedChangesException('Did not reset document, as it has unsaved changes');
			}

			$this->unlock($documentId);

			$this->stepMapper->deleteAll($documentId);
			$this->sessionMapper->deleteByDocumentId($documentId);
			$this->documentMapper->delete($document);
			$this->getStateFile($documentId)->delete();

			$this->logger->debug('document reset for ' . $documentId);
		} catch (DoesNotExistException|NotFoundException $e) {
			// Ignore if document not found or state file not found
		}
	}

	public function getAll() {
		return $this->documentMapper->findAll();
	}

	/**
	 * @throws NotFoundException
	 */
	public function getFileForSession(Session $session, ?string $shareToken = null): File {
		if ($session->getUserId() !== null) {
			return $this->getFileById($session->getDocumentId(), $session->getUserId());
		}

		if ($shareToken === null) {
			throw new \InvalidArgumentException('No proper share data');
		}

		try {
			$share = $this->shareManager->getShareByToken($shareToken);
		} catch (ShareNotFound $e) {
			throw new NotFoundException();
		}

		$node = $share->getNode();
		if ($node instanceof Folder) {
			$node = $node->getById($session->getDocumentId())[0];
		}
		if ($node instanceof File) {
			return $node;
		}
		throw new \InvalidArgumentException('No proper share data');
	}

	/**
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	public function getFileById($fileId, $userId = null): File {
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

		$file = array_shift($files);

		if (!$file instanceof File) {
			throw new NotFoundException();
		}

		if (($file->getPermissions() & Constants::PERMISSION_READ) !== Constants::PERMISSION_READ) {
			throw new NotPermittedException();
		}

		return $file;
	}

	/**
	 * @throws NotFoundException
	 */
	public function getFileByShareToken(string $shareToken, ?string $path = null): File {
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
		} catch (ShareNotFound $e) {
			throw new NotFoundException();
		}

		$node = $share->getNode();
		if ($path !== null && $node instanceof Folder) {
			$node = $node->get($path);
		}
		if ($node instanceof File) {
			return $node;
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
	public function checkSharePermissions(string $shareToken, $permission = Constants::PERMISSION_READ): void {
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
		$stepsVersion = $this->stepMapper->getLatestVersion($document->getId()) ?: 0;
		$docVersion = $document->getLastSavedVersion();
		return $stepsVersion !== $docVersion;
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

	public function countAll(): int {
		return $this->documentMapper->countAll();
	}

	private function getFullAppFolder(): Folder {
		$appFolder = $this->rootFolder->get('appdata_' . $this->config->getSystemValueString('instanceid', '') . '/text');
		if (!$appFolder instanceof Folder) {
			throw new NotFoundException('Folder not found');
		}
		return $appFolder;
	}

	public function clearAll(): void {
		$this->stepMapper->clearAll();
		$this->sessionMapper->clearAll();
		$this->documentMapper->clearAll();
		try {
			$appFolder = $this->getFullAppFolder();
			$appFolder->get('documents')->move($appFolder->getPath() . '/documents_old_' . time());
		} catch (NotFoundException) {
		}
		$this->ensureDocumentsFolder();
	}

	public function cleanupOldDocumentsFolders(): void {
		try {
			$appFolder = $this->getFullAppFolder();
			foreach ($appFolder->getDirectoryListing() as $node) {
				if (str_starts_with($node->getName(), 'documents_old_')) {
					$node->delete();
				}
			}
		} catch (NotFoundException) {
		}
	}
}
