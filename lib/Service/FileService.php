<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCA\Files_Sharing\SharedStorage;
use OCA\Text\Db\Session;
use OCA\Text\Exception\InvalidSessionException;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\ISession;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as ShareManager;
use OCP\Share\IShare;

class FileService {

	public function __construct(
		private readonly ISession $session,
		private readonly IRootFolder $rootFolder,
		private readonly LockService $lockService,
		private readonly ShareManager $shareManager,
	) {
	}

	/**
	 * @throws NotPermittedException
	 * @throws NotFoundException
	 */
	public function getFileForSession(Session $session, ?string $shareToken = null): File {
		if (!$session->isGuest()) {
			try {
				return $this->getFileById($session->getDocumentId(), $session->getUserId());
			} catch (NotFoundException) {
				// We may still have a user session but on a public share link so move on
			}
		}

		if ($shareToken === null) {
			throw new \InvalidArgumentException('No proper share data');
		}
		return $this->getFileByIdFromShare($session->getDocumentId(), $shareToken);
	}

	/**
	 * @throws NotFoundException
	 */
	public function getFileByIdFromShare(int $fileId, string $shareToken): File {
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
		} catch (ShareNotFound) {
			throw new NotFoundException();
		}

		$node = $share->getNode();
		if ($node instanceof Folder) {
			$node = $node->getFirstNodeById($fileId);
		}
		if ($node instanceof File) {
			return $node;
		}
		throw new NotFoundException();
	}

	/**
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	public function getFileById(int $fileId, string $userId): File {

		try {
			$userFolder = $this->rootFolder->getUserFolder($userId);
		} catch (\OC\User\NoUserException) {
			// It is a bit hacky to depend on internal exceptions here. But it is the best we can do for now
			throw new NotFoundException();
		}

		// We currently don't know the path nor care about which file mount it is when getting by id
		// therefore we can take a shortcut on the cached node if we have edit permissions on that
		$file = $userFolder->getFirstNodeById($fileId);
		if ($file instanceof File && $file->getPermissions() & Constants::PERMISSION_UPDATE) {
			return $file;
		}

		// Ideally we'd optimize this part in the future by storing the path and getting the acutal target directly
		$files = $userFolder->getById($fileId);
		if (count($files) === 0) {
			throw new NotFoundException();
		}

		// Workaround to always open files with edit permissions if multiple occurrences of
		// the same file id are in the user home, ideally we should also track the path of the file when opening
		usort($files, static fn (Node $a, Node $b) => ($b->getPermissions() & Constants::PERMISSION_UPDATE) <=> ($a->getPermissions() & Constants::PERMISSION_UPDATE));

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
		} catch (ShareNotFound) {
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

	public function isReadOnly(File $file, ?string $token): bool {
		$readOnly = !$file->isUpdateable();
		if ($token !== null) {
			try {
				$this->checkSharePermissions($token, Constants::PERMISSION_UPDATE);
			} catch (NotFoundException) {
				$readOnly = true;
			}
		}

		$lockInfo = $this->lockService->getLockByOthers($file);

		return $readOnly || $lockInfo !== null;
	}

	public function isDownloadDisabled(File $file): bool {
		$storage = $file->getStorage();
		if (!$storage->instanceOfStorage(SharedStorage::class)) {
			return false;
		}
		/** @var IShare $share */
		$share = $storage->getShare();
		$shareAttribtues = $share->getAttributes();
		return $shareAttribtues !== null
			&& $shareAttribtues->getAttribute('permissions', 'download') === false;
	}

	/**
	 * @param $shareToken
	 *
	 * @return void
	 *
	 * @throws NotFoundException|NotPermittedException
	 *
	 * @psalm-param 1|2 $permission
	 */
	public function checkSharePermissions(string $shareToken, int $permission = Constants::PERMISSION_READ): void {
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
		} catch (ShareNotFound) {
			throw new NotFoundException();
		}

		if (($share->getPermissions() & $permission) === 0 || ($share->getNode()->getPermissions() & $permission) === 0) {
			throw new NotFoundException();
		}
	}

	public function getDocumentIdFromShare(int $fileId, string $shareToken): int {
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
		} catch (ShareNotFound) {
			throw new InvalidSessionException();
		}

		$node = $this->rootFolder->getUserFolder($share->getShareOwner())->getFirstNodeById($fileId);
		if ($node === null) {
			throw new InvalidSessionException();
		}

		if ($share->getNodeType() === 'folder') {
			$folder = $share->getNode();
			if (!$folder instanceof Folder) {
				throw new InvalidSessionException();
			}
			$file = $folder->getFirstNodeById($fileId);
			if (!$file instanceof File) {
				throw new InvalidSessionException();
			}
		}

		if ($share->getPassword() !== null) {
			$shareIds = $this->session->get('public_link_authenticated');
			$shareIds = is_array($shareIds) ? $shareIds : [$shareIds];

			if (!in_array($share->getId(), $shareIds, true)) {
				throw new InvalidSessionException();
			}
		}

		if (($share->getPermissions() & Constants::PERMISSION_READ) !== Constants::PERMISSION_READ) {
			throw new InvalidSessionException();
		}

		$attributes = $share->getAttributes();
		if ($attributes !== null && $attributes->getAttribute('permissions', 'download') === false) {
			throw new InvalidSessionException();
		}

		return $fileId;
	}

	public function getDocumentIdForUser(int $fileId, string $userId): int {
		if ($this->rootFolder->getUserFolder($userId)->getFirstNodeById($fileId) !== null) {
			return $fileId;
		}
		throw new InvalidSessionException();
	}

}
