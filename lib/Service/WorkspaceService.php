<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\StorageInvalidException;
use OCP\IL10N;

class WorkspaceService {
	public const string DEFAULT_FILENAME = 'Readme.md';

	private const array SUPPORTED_STATIC_FILENAMES = [
		self::DEFAULT_FILENAME,
		'README.md',
		'readme.md',
		'.Readme.md',
	];

	public function __construct(
		private readonly IL10N $l10n,
	) {
	}

	public function getFile(Folder $folder): ?File {
		try {
			$cache = $folder->getStorage()->getCache();
			$internalPath = $folder->getInternalPath();
		} catch (StorageInvalidException) {
			return null;
		}

		$content = $cache->getFolderContents($internalPath . '/', 'text/markdown');
		$namesFound = array_flip(array_map(static fn ($entry) => $entry->getName(), $content));

		foreach ($this->getSupportedFilenames() as $filename) {
			if (isset($namesFound[$filename])) {
				$file = $folder->get($filename);
				if ($file instanceof File) {
					return $file;
				}
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
