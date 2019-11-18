<?php


namespace OCA\Text\Service;


use OCP\Files\Folder;
use OCP\Files\NotFoundException;
use OCP\IL10N;

class WorkspaceService {

	private const SUPPORTED_STATIC_FILENAMES = [
		'README.md',
		'Readme.md',
		'readme.md'
	];

	/** @var IL10N */
	private $l10n;

	public function __construct(IL10N $l10n) {
		$this->l10n = $l10n;
	}

	public function getFile(Folder $folder) {
		$file = null;
		foreach ($this->getSupportedFilenames() as $filename) {
			if ($folder->nodeExists($filename)) {
				try {
					$file = $folder->get($filename);
				} catch (NotFoundException $e) {
				}
				continue;
			}
		}
		return $file;
	}

	private function getSupportedFilenames() {
		return array_merge([
			$this->l10n->t('Readme') . '.md'
		], self::SUPPORTED_STATIC_FILENAMES);
	}
}
