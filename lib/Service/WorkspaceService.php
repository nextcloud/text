<?php


/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\NotFoundException;
use OCP\Files\StorageInvalidException;
use OCP\IL10N;

class WorkspaceService {
	private IL10N $l10n;

	private const SUPPORTED_STATIC_FILENAMES = [
		'Readme.md',
		'README.md',
		'readme.md'
	];

	public function __construct(IL10N $l10n) {
		$this->l10n = $l10n;
	}

	public function getFile(Folder $folder): ?File {
		foreach ($this->getSupportedFilenames() as $filename) {
			try {
				$exists = $folder->getStorage()->getCache()->get($folder->getInternalPath() . '/' . $filename);
				if ($exists) {
					$file = $folder->get($filename);
					if ($file instanceof File) {
						return $file;
					}
				}
			} catch (NotFoundException|StorageInvalidException) {
				continue;
			}
		}
		return null;
	}

	/** @return string[] */
	public function getSupportedFilenames(): array {
		return array_merge([
			$this->l10n->t('Readme') . '.md'
		], self::SUPPORTED_STATIC_FILENAMES);
	}
}
