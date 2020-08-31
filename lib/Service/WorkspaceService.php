<?php


namespace OCA\Text\Service;


use OCP\Files\Folder;
use OCP\Files\NotFoundException;
use OCP\Files\StorageNotAvailableException;
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

	/**
	 * @param Folder $folder
	 * @throws StorageNotAvailableException
	 * @return \OCP\Files\File
	 */
	public function getFile(Folder $folder) {
		foreach ($this->getSupportedFilenames() as $filename) {
			if ($folder->nodeExists($filename)) {
				try {
					return $folder->get($filename);
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
