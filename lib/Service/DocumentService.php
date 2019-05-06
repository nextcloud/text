<?php
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

use OC\Files\Node\File;
use OCA\Text\Db\Document;
use OCA\Text\Db\DocumentMapper;
use OCA\Text\Db\SessionMapper;
use OCA\Text\Db\Step;
use OCA\Text\Db\StepMapper;
use OCA\Text\DocumentSaveConflictException;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\Files\IAppData;
use OCP\Files\InvalidPathException;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\ICacheFactory;

class DocumentService {

	/**
	 * Delay to wait for between autosave versions
	 */
	const AUTOSAVE_MINIMUM_DELAY = 10;

	private $sessionMapper;
	private $userId;
	private $documentMapper;

	public function __construct(SessionMapper $sessionMapper, DocumentMapper $documentMapper, StepMapper $stepMapper, IAppData $appData, $userId, IRootFolder $rootFolder, ICacheFactory $cacheFactory) {
		$this->sessionMapper = $sessionMapper;
		$this->documentMapper = $documentMapper;
		$this->stepMapper = $stepMapper;
		$this->userId = $userId;
		$this->appData = $appData;
		$this->rootFolder = $rootFolder;
		$this->cache = $cacheFactory->createDistributed('text');

		try {
			$this->appData->getFolder('documents');
		} catch (NotFoundException $e) {
			$this->appData->newFolder('documents');
		}
	}

	/**
	 * @param $path
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function createDocumentByPath($path) {
		/** @var File $file */
		$file = $this->rootFolder->getUserFolder($this->userId)->get($path);
		return $this->createDocument($file);
	}

	/**
	 * @param $fileId
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getDocumentById($fileId) {
		return $this->createDocument($this->getFile($fileId));
	}

	public function getFile($fileId) {
		/** @var File $file */
		return $this->rootFolder->getUserFolder($this->userId)->getById($fileId)[0];
	}

	/**
	 * @param File $file
	 * @return \OCP\AppFramework\Db\Entity
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 */
	protected function createDocument(File $file) {
		try {
			$document = $this->documentMapper->find($file->getFileInfo()->getId());

			// TODO: do not hard reset if changed from outside since this will throw away possible steps
			// TODO: Only do this when no sessions active, otherise we need to resolve the conflict differently
			$lastMTime = $document->getLastSavedVersionTime();
			if ($file->getMTime() > $lastMTime && $lastMTime > 0) {
				$this->resetDocument($document->getId());
				throw  new NotFoundException();
			}

			return $document;
		} catch (DoesNotExistException $e) {
		} catch (InvalidPathException $e) {
		} catch (NotFoundException $e) {
		}

		try {
			$documentBaseFile = $this->appData->getFolder('documents')->getFile($file->getFileInfo()->getId());
		} catch (NotFoundException $e) {
			$documentBaseFile = $this->appData->getFolder('documents')->newFile($file->getFileInfo()->getId());
		}
		$documentBaseFile->putContent($file->fopen('r'));

		$document = new Document();
		$document->setId($file->getFileInfo()->getId());
		$document->setCurrentVersion(0);
		$document->setLastSavedVersion(0);
		$document->setLastSavedVersionTime($file->getFileInfo()->getMtime());
		$document = $this->documentMapper->insert($document);
		$this->cache->set('document-version-'.$document->getId(), 0);
		return $document;
	}

	public function getBaseFile($document) {
		return $this->appData->getFolder('documents')->getFile($document);
	}

	/**
	 * @param Document $document
	 * @param $steps
	 * @param $version
	 * @return array
	 * @throws \Exception
	 */
	public function addStep($documentId, $sessionId, $steps, $version) {
		// TODO lock for other step adding
		// TODO check cache
		$document = $this->documentMapper->find($documentId);
		if ($version !== $document->getCurrentVersion()) {
			throw new \Exception('Version does not match');
		}
		$step = new Step();
		$step->setData(\json_encode($steps));
		$step->setSessionId($sessionId);
		$step->setDocumentId($documentId);
		$step->setVersion($version+1);
		$this->stepMapper->insert($step);
		$newVersion = $document->getCurrentVersion() + count($steps);
		$document->setCurrentVersion($newVersion);
		$this->documentMapper->update($document);
		$this->cache->set('document-version-'.$document->getId(), $newVersion);
		// TODO write steps to cache for quicker reading
		return $steps;
	}

	public function getSteps($documentId, $lastVersion) {
		return $this->stepMapper->find($documentId, $lastVersion);
	}

	public function autosave($documentId, $version, $autoaveDocument, $force = false, $manualSave = false) {
		/** @var Document $document */
		$document = $this->documentMapper->find($documentId);
		if ($autoaveDocument === null) {
			return $document;
		}
		$lastMTime = $document->getLastSavedVersionTime();
		/** @var File $file */
		$file = $this->rootFolder->getUserFolder($this->userId)->getById($documentId)[0];
		if ($file->getMTime() > $lastMTime && $lastMTime > 0 && $force === false) {
			throw new DocumentSaveConflictException('File changed in the meantime from outside');
		}
		// TODO: check for etag rather than mtime
		// Do not save if version already saved
		if (!$force && $version <= (string)$document->getLastSavedVersion()) {
			return $document;
		}
		// Only save once every AUTOSAVE_MINIMUM_DELAY seconds
		if ($file->getMTime() === $lastMTime && $lastMTime > time()- self::AUTOSAVE_MINIMUM_DELAY && $manualSave === false) {
			return $document;
		}
		$file->putContent($autoaveDocument);
		$document->setLastSavedVersion($version);
		$document->setLastSavedVersionTime(time());
		$this->documentMapper->update($document);
		return $document;
	}

	public function resetDocument($documentId) {
		$this->stepMapper->deleteAll($documentId);
		try {
			$document = $this->documentMapper->find($documentId);
			$this->documentMapper->delete($document);
		} catch (DoesNotExistException $e) {
		}

		try {
			$this->appData->getFolder('documents')->getFile($documentId)->delete();
		} catch (NotFoundException $e) {
		} catch (NotPermittedException $e) {
		}
	}

}
