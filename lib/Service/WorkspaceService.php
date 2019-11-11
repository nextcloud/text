<?php


namespace OCA\Text\Service;


use OCP\Files\Folder;
use OCP\Files\NotFoundException;

class WorkspaceService {

	private const SUPPORTED_FILENAMES = [
		'README.md',
		'Readme.md',
		'readme.md'
	];

	public function getFile(Folder $folder) {
		$file = null;
		foreach (self::SUPPORTED_FILENAMES as $filename) {
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
}
