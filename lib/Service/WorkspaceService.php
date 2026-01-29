<?php


/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCP\Files\File;
use OCP\Files\Folder;
use OCP\IL10N;

class WorkspaceService {
	private const SUPPORTED_STATIC_FILENAMES = [
		'Readme.md',
		'README.md',
		'readme.md'
	];

	public function __construct(
		private readonly IL10N $l10n,
	) {
	}

	public function getFile(Folder $folder): ?File {
		$content = $folder->getStorage()->getCache()->getFolderContents($folder->getInternalPath() . '/', 'text/markdown');
		foreach ($content as $file) {
			if (in_array($file->getName(), $this->getSupportedFilenames(), true)) {
				$file = $folder->get($file->getPath());
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
