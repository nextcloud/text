<?php


namespace OCA\Text\Service;

use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\NotFoundException;
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
			if ($folder->nodeExists($filename)) {
				try {
					$file = $folder->get($filename);
					if ($file instanceof File) {
						return $file;
					}
				} catch (NotFoundException $e) {
				}
			}
		}
		return null;
	}

	public function getSupportedFilenames() {
		return array_merge([
			$this->l10n->t('Readme') . '.md'
		], self::SUPPORTED_STATIC_FILENAMES);
	}
}
