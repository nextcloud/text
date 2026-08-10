<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCA\Text\Exception\InvalidSessionException;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\ISession;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as ShareManager;

class FileService {

	public function __construct(
		private readonly ISession $session,
		private readonly IRootFolder $rootFolder,
		private readonly ShareManager $shareManager,
	) {
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