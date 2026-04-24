<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCP\Files\Cache\ICacheEntry;
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
		try {
			$cache = $folder->getStorage()->getCache();
			$internalPath = $folder->getInternalPath();
		} catch (StorageInvalidException) {
			return null;
		}
	
		foreach ($this->getSupportedFilenames() as $filename) {
			try {
				$cacheEntry = $cache->get($internalPath . '/' . $filename);
				if ($cacheEntry !== false && $cacheEntry->getMimeType() !== ICacheEntry::DIRECTORY_MIMETYPE) {
					$file = $folder->get($filename);
					if ($file instanceof File) {
						return $file;
					}
				}
			} catch (NotFoundException) {
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
