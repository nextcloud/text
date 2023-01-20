<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2021 Julien Veyssier <eneiluj@posteo.net>
 *
 * @author Julien Veyssier <eneiluj@posteo.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Text\Service;

use OC\User\NoUserException;
use OCA\Text\Controller\AttachmentController;
use OCP\Constants;
use OCP\Files\Folder;
use OCP\Files\File;
use OCP\Files\IMimeTypeDetector;
use OCP\Files\InvalidPathException;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\IPreview;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IShare;
use OCP\Util;
use OCP\Files\IRootFolder;
use OCP\Share\IManager as ShareManager;

class AttachmentService {

	/**
	 * @var ShareManager
	 */
	private $shareManager;
	/**
	 * @var IRootFolder
	 */
	private $rootFolder;
	/**
	 * @var IPreview
	 */
	private $previewManager;
	/**
	 * @var IMimeTypeDetector
	 */
	private $mimeTypeDetector;

	public function __construct(IRootFolder $rootFolder,
								ShareManager $shareManager,
								IPreview $previewManager,
								IMimeTypeDetector $mimeTypeDetector) {
		$this->rootFolder = $rootFolder;
		$this->shareManager = $shareManager;
		$this->previewManager = $previewManager;
		$this->mimeTypeDetector = $mimeTypeDetector;
	}

	/**
	 * Get image content or preview from file name
	 * @param int $documentId
	 * @param string $imageFileName
	 * @param string $userId
	 * @param bool $preferRawImage
	 * @return File|Node|ISimpleFile|null
	 * @throws InvalidPathException
	 * @throws NoUserException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	public function getImageFile(int $documentId, string $imageFileName, string $userId, bool $preferRawImage) {
		$textFile = $this->getTextFile($documentId, $userId);
		return $this->getImageFileContent($imageFileName, $textFile, $preferRawImage);
	}

	/**
	 * Get image content or preview from file id in public context
	 * @param int $documentId
	 * @param string $imageFileName
	 * @param string $shareToken
	 * @param bool $preferRawImage
	 * @return File|Node|ISimpleFile|null
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws NoUserException
	 */
	public function getImageFilePublic(int $documentId, string $imageFileName, string $shareToken, bool $preferRawImage) {
		$textFile = $this->getTextFilePublic($documentId, $shareToken);
		return $this->getImageFileContent($imageFileName, $textFile, $preferRawImage);
	}

	/**
	 * @param string $imageFileName
	 * @param File $textFile
	 * @param bool $preferRawImage
	 * @return File|Node|ISimpleFile|null
	 * @throws InvalidPathException
	 * @throws NoUserException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	private function getImageFileContent(string $imageFileName, File $textFile, bool $preferRawImage) {
		$attachmentFolder = $this->getAttachmentDirectoryForFile($textFile, true);
		$imageFile = $attachmentFolder->get($imageFileName);
		if ($imageFile instanceof File && in_array($imageFile->getMimetype(), AttachmentController::IMAGE_MIME_TYPES)) {
			// previews of gifs are static images, always provide the real gif
			if ($imageFile->getMimetype() === 'image/gif') {
				return $imageFile;
			}
			// we might prefer the raw image
			if ($preferRawImage && in_array($imageFile->getMimetype(), AttachmentController::BROWSER_SUPPORTED_IMAGE_MIME_TYPES)) {
				return $imageFile;
			}
			if ($this->previewManager->isMimeSupported($imageFile->getMimeType())) {
				return $this->previewManager->getPreview($imageFile, 1024, 1024);
			}
			// fallback: raw image
			return $imageFile;
		}
		return null;
	}

	/**
	 * Get media file from file name
	 * @param int $documentId
	 * @param string $mediaFileName
	 * @param string $userId
	 * @return File|\OCP\Files\Node|ISimpleFile|null
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getMediaFile(int $documentId, string $mediaFileName, string $userId) {
		$textFile = $this->getTextFile($documentId, $userId);
		return $this->getMediaFullFile($mediaFileName, $textFile);
	}

	/**
	 * Get image content or preview from file id in public context
	 * @param int $documentId
	 * @param string $mediaFileName
	 * @param string $shareToken
	 * @return File|\OCP\Files\Node|ISimpleFile|null
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OC\User\NoUserException
	 */
	public function getMediaFilePublic(int $documentId, string $mediaFileName, string $shareToken) {
		$textFile = $this->getTextFilePublic($documentId, $shareToken);
		return $this->getMediaFullFile($mediaFileName, $textFile);
	}

	/**
	 * @param string $mediaFileName
	 * @param File $textFile
	 * @return File|null
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OC\User\NoUserException
	 */
	private function getMediaFullFile(string $mediaFileName, File $textFile): ?File {
		$attachmentFolder = $this->getAttachmentDirectoryForFile($textFile, true);
		$mediaFile = $attachmentFolder->get($mediaFileName);
		if ($mediaFile instanceof File) {
			return $mediaFile;
		}
		return null;
	}

	/**
	 * @param int $documentId
	 * @param string $mediaFileName
	 * @param string $userId
	 * @return array|null
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OC\User\NoUserException
	 */
	public function getMediaFilePreview(int $documentId, string $mediaFileName, string $userId): ?array {
		$textFile = $this->getTextFile($documentId, $userId);
		return $this->getMediaFilePreviewFile($mediaFileName, $textFile);
	}
	/**
	 * @param int $documentId
	 * @param string $mediaFileName
	 * @param string $shareToken
	 * @return array|null
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OC\User\NoUserException
	 */
	public function getMediaFilePreviewPublic(int $documentId, string $mediaFileName, string $shareToken): ?array {
		$textFile = $this->getTextFilePublic($documentId, $shareToken);
		return $this->getMediaFilePreviewFile($mediaFileName, $textFile);
	}

	/**
	 * Get media preview or mimetype icon address
	 * @param string $mediaFileName
	 * @param File $textFile
	 * @return array|null
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OC\User\NoUserException
	 */
	private function getMediaFilePreviewFile(string $mediaFileName, File $textFile): ?array {
		$attachmentFolder = $this->getAttachmentDirectoryForFile($textFile, true);
		$mediaFile = $attachmentFolder->get($mediaFileName);
		if ($mediaFile instanceof File) {
			if ($this->previewManager->isMimeSupported($mediaFile->getMimeType())) {
				try {
					return [
						'type' => 'file',
						'file' => $this->previewManager->getPreview($mediaFile, 1024, 1024),
					];
				} catch (NotFoundException $e) {
					// the preview might not be found even if the mimetype is supported
				}
			}
			// fallback: mimetype icon URL
			return [
				'type' => 'icon',
				'iconUrl' => $this->mimeTypeDetector->mimeTypeIcon($mediaFile->getMimeType()),
			];
		}
		return null;
	}

	/**
	 * @param int $documentId
	 * @param string $mediaFileName
	 * @param string $userId
	 * @return array|null
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OC\User\NoUserException
	 */
	public function getMediaFileMetadataPrivate(int $documentId, string $mediaFileName, string $userId): ?array {
		$textFile = $this->getTextFile($documentId, $userId);
		return $this->getMediaFileMetadata($mediaFileName, $textFile);
	}

	/**
	 * @param int $documentId
	 * @param string $mediaFileName
	 * @param string $shareToken
	 * @return array|null
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OC\User\NoUserException
	 */
	public function getMediaFileMetadataPublic(int $documentId, string $mediaFileName, string $shareToken): ?array {
		$textFile = $this->getTextFilePublic($documentId, $shareToken);
		return $this->getMediaFileMetadata($mediaFileName, $textFile);
	}

	/**
	 * @param string $mediaFileName
	 * @param File $textFile
	 * @return array|null
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OC\User\NoUserException
	 */
	private function getMediaFileMetadata(string $mediaFileName, File $textFile): ?array {
		$attachmentFolder = $this->getAttachmentDirectoryForFile($textFile, true);
		$mediaFile = $attachmentFolder->get($mediaFileName);
		if ($mediaFile instanceof File) {
			return [
				'size' => Util::humanFileSize($mediaFile->getSize()),
				'mtime' => $mediaFile->getMTime(),
			];
		}
		return null;
	}

	/**
	 * Save an uploaded file in the attachment folder
	 *
	 * @param int $documentId
	 * @param string $newFileName
	 * @param string $newFileContent
	 * @param string $userId
	 * @return array
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OC\User\NoUserException
	 */
	public function uploadAttachment(int $documentId, string $newFileName, $newFileResource, string $userId): array {
		$textFile = $this->getTextFile($documentId, $userId);
		if (!$textFile->isUpdateable()) {
			throw new NotPermittedException('No write permissions');
		}
		$saveDir = $this->getAttachmentDirectoryForFile($textFile, true);
		$fileName = $this->getUniqueFileName($saveDir, $newFileName);
		$savedFile = $saveDir->newFile($fileName, $newFileResource);
		return [
			'name' => $fileName,
			'dirname' => $saveDir->getName(),
			'id' => $savedFile->getId(),
			'documentId' => $textFile->getId(),
		];
	}

	/**
	 * Save an uploaded file in the attachment folder in a public context
	 *
	 * @param int|null $documentId
	 * @param string $newFileName
	 * @param string $newFileContent
	 * @param string $shareToken
	 * @return array
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OC\User\NoUserException
	 */
	public function uploadAttachmentPublic(?int $documentId, string $newFileName, $newFileResource, string $shareToken): array {
		if (!$this->hasUpdatePermissions($shareToken)) {
			throw new NotPermittedException('No write permissions');
		}
		$textFile = $this->getTextFilePublic($documentId, $shareToken);
		$saveDir = $this->getAttachmentDirectoryForFile($textFile, true);
		$fileName = $this->getUniqueFileName($saveDir, $newFileName);
		$savedFile = $saveDir->newFile($fileName, $newFileResource);
		return [
			'name' => $fileName,
			'dirname' => $saveDir->getName(),
			'id' => $savedFile->getId(),
			'documentId' => $textFile->getId(),
		];
	}

	/**
	 * Copy a file from a user's storage in the attachment folder
	 *
	 * @param int $documentId
	 * @param string $path
	 * @param string $userId
	 * @return array
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OC\User\NoUserException
	 */
	public function insertAttachmentFile(int $documentId, string $path, string $userId): array {
		$textFile = $this->getTextFile($documentId, $userId);
		if (!$textFile->isUpdateable()) {
			throw new NotPermittedException('No write permissions');
		}
		$originalFile = $this->getFileFromPath($path, $userId);
		$saveDir = $this->getAttachmentDirectoryForFile($textFile, true);
		return $this->copyFile($originalFile, $saveDir, $textFile);
	}

	/**
	 * @param File $originalFile
	 * @param Folder $saveDir
	 * @param File $textFile
	 * @return array
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 */
	private function copyFile(File $originalFile, Folder $saveDir, File $textFile): array {
		$fileName = $this->getUniqueFileName($saveDir, $originalFile->getName());
		$targetPath = $saveDir->getPath() . '/' . $fileName;
		$targetFile = $originalFile->copy($targetPath);
		return [
			'name' => $fileName,
			'dirname' => $saveDir->getName(),
			'id' => $targetFile->getId(),
			'documentId' => $textFile->getId(),
			'mimetype' => $targetFile->getMimetype(),
		];
	}

	/**
	 * Get unique file name in a directory. Add '(n)' suffix.
	 * @param Folder $dir
	 * @param string $fileName
	 * @return string
	 */
	public static function getUniqueFileName(Folder $dir, string $fileName): string {
		$extension = pathinfo($fileName, PATHINFO_EXTENSION);
		$counter = 1;
		$uniqueFileName = $fileName;
		if ($extension !== '') {
			while ($dir->nodeExists($uniqueFileName)) {
				$counter++;
				$uniqueFileName = preg_replace('/\.' . $extension . '$/', ' (' . $counter . ').' . $extension, $fileName);
			}
		} else {
			while ($dir->nodeExists($uniqueFileName)) {
				$counter++;
				$uniqueFileName = preg_replace('/$/', ' (' . $counter . ')', $fileName);
			}
		}
		return $uniqueFileName;
	}

	/**
	 * Check if the shared access has write permissions
	 *
	 * @param string $shareToken
	 * @return bool
	 */
	private function hasUpdatePermissions(string $shareToken): bool {
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
			return (
				in_array(
					$share->getShareType(),
					[IShare::TYPE_LINK, IShare::TYPE_EMAIL, IShare::TYPE_ROOM],
					true
				)
				&& $share->getPermissions() & Constants::PERMISSION_UPDATE);
		} catch (ShareNotFound $e) {
			return false;
		}
	}

	/**
	 * Get or create file-specific attachment folder
	 *
	 * @param File $textFile
	 * @param bool $create
	 * @return Folder
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OC\User\NoUserException
	 */
	private function getAttachmentDirectoryForFile(File $textFile, bool $create = false): Folder {
		$owner = $textFile->getOwner();
		$ownerId = $owner->getUID();
		$ownerUserFolder = $this->rootFolder->getUserFolder($ownerId);
		$ownerTextFile = $ownerUserFolder->getById($textFile->getId());
		if (count($ownerTextFile) > 0) {
			$ownerTextFile = $ownerTextFile[0];
			$ownerParentFolder = $ownerTextFile->getParent();
			$attachmentFolderName = '.attachments.' . $textFile->getId();
			if ($ownerParentFolder->nodeExists($attachmentFolderName)) {
				$attachmentFolder = $ownerParentFolder->get($attachmentFolderName);
				if ($attachmentFolder instanceof Folder) {
					return $attachmentFolder;
				}
			} elseif ($create) {
				return $ownerParentFolder->newFolder($attachmentFolderName);
			}
		}
		throw new NotFoundException('Attachment dir for document ' . $textFile->getId() . ' was not found or could not be created.');
	}

	/**
	 * Get a user file from file ID
	 * @param string $filePath
	 * @param string $userId
	 * @return File|null
	 * @throws NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 */
	private function getFileFromPath(string $filePath, string $userId): ?File {
		$userFolder = $this->rootFolder->getUserFolder($userId);
		if ($userFolder->nodeExists($filePath)) {
			$file = $userFolder->get($filePath);
			if ($file instanceof File) {
				return $file;
			}
		}
		return null;
	}

	/**
	 * Get a user file from file ID
	 *
	 * @param int $documentId
	 * @param string $userIdd
	 * @return File
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OC\User\NoUserException
	 */
	private function getTextFile(int $documentId, string $userId): File {
		$userFolder = $this->rootFolder->getUserFolder($userId);
		$textFile = $userFolder->getById($documentId);
		if (count($textFile) > 0 && $textFile[0] instanceof File) {
			return $textFile[0];
		}
		throw new NotFoundException('Text file with id=' . $documentId . ' was not found in storage of ' . $userId);
	}

	/**
	 * Get file from share token
	 *
	 * @param int|null $documentId
	 * @param string $shareToken
	 * @return File
	 * @throws NotFoundException
	 */
	private function getTextFilePublic(?int $documentId, string $shareToken): File {
		// is the file shared with this token?
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
			if ($share->getShareType() === IShare::TYPE_LINK) {
				// shared file or folder?
				if ($share->getNodeType() === 'file') {
					$textFile = $share->getNode();
					if ($textFile instanceof File) {
						return $textFile;
					}
				} elseif ($documentId !== null && $share->getNodeType() === 'folder') {
					$folder = $share->getNode();
					if ($folder instanceof Folder) {
						$textFile = $folder->getById($documentId);
						if (count($textFile) > 0 && $textFile[0] instanceof File) {
							return $textFile[0];
						}
					}
				}
			}
		} catch (ShareNotFound $e) {
			// same as below
		}
		throw new NotFoundException('Text file with id=' . $documentId . ' and shareToken ' . $shareToken . ' was not found.');
	}

	/**
	 * Actually delete attachment files which are not pointed in the markdown content
	 *
	 * @param int $fileId
	 * @return int The number of deleted files
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Lock\LockedException
	 * @throws \OC\User\NoUserException
	 */
	public function cleanupAttachments(int $fileId): int {
		$textFile = $this->rootFolder->getById($fileId);
		if (count($textFile) > 0 && $textFile[0] instanceof File) {
			$textFile = $textFile[0];
			if ($textFile->getMimeType() === 'text/markdown') {
				// get IDs of the files inside the attachment dir
				try {
					$attachmentDir = $this->getAttachmentDirectoryForFile($textFile);
				} catch (NotFoundException $e) {
					// this only happens if the attachment dir was deleted by the user while editing the document
					return 0;
				}
				$attachmentsByName = [];
				foreach ($attachmentDir->getDirectoryListing() as $attNode) {
					$attachmentsByName[$attNode->getName()] = $attNode;
				}

				$contentAttachmentNames = $this->getAttachmentNamesFromContent($textFile->getContent(), $fileId);

				$toDelete = array_diff(array_keys($attachmentsByName), $contentAttachmentNames);
				foreach ($toDelete as $name) {
					$attachmentsByName[$name]->delete();
				}
				return count($toDelete);
			}
		}
		return 0;
	}


	/**
	 * Get attachment file names listed in the markdown file content
	 *
	 * @param string $content
	 * @return array
	 */
	public static function getAttachmentNamesFromContent(string $content, int $fileId): array {
		$oldMatches = [];
		preg_match_all(
			// simple version with .+ between the brackets
			// '/\!\[.+\]\(text:\/\/image\?[^)]*imageFileName=([^)&]+)\)/',
			// complex version of php-markdown
			// matches ![ANY_CONSIDERED_CORRECT_BY_PHP-MARKDOWN](text://image?ANYTHING&imageFileName=FILE_NAME) and captures FILE_NAME
			'/\!\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[\])*\])*\])*\])*\])*\])*\]\(text:\/\/image\?[^)]*imageFileName=([^)&]+)\)/',
			$content,
			$oldMatches,
			PREG_SET_ORDER
		);
		$oldNames = array_map(static function (array $match) {
			return urldecode($match[1]);
		}, $oldMatches);

		$matches = [];
		// matches ![ANY_CONSIDERED_CORRECT_BY_PHP-MARKDOWN](.attachments.DOCUMENT_ID/ANY_FILE_NAME) and captures FILE_NAME
		preg_match_all(
			'/\!\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[\])*\])*\])*\])*\])*\])*\]\(\.attachments\.' . $fileId . '\/([^)&]+)\)/',
			$content,
			$matches,
			PREG_SET_ORDER
		);
		$names = array_map(static function (array $match) {
			return urldecode($match[1]);
		}, $matches);

		return array_merge($names, $oldNames);
	}

	/**
	 * @param File $source
	 * @param File $target
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Lock\LockedException
	 */
	public function moveAttachments(File $source, File $target): void {
		// if the parent directory has changed
		if ($source->getParent()->getPath() !== $target->getParent()->getPath()) {
			try {
				$sourceAttachmentDir = $this->getAttachmentDirectoryForFile($source);
			} catch (NotFoundException $e) {
				// silently return if no attachment dir was found for source file
				return;
			}
			// it is in the same directory as the source file in its owner's storage
			// in other words, we move the attachment dir only if the .md file is moved by its owner
			if ($source->getParent()->getId() === $sourceAttachmentDir->getParent()->getId()
			) {
				$sourceAttachmentDir->move($target->getParent()->getPath() . '/' . $sourceAttachmentDir->getName());
			}
		}
	}

	/**
	 * @param File $source
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 */
	public function deleteAttachments(File $source): void {
		// if there is an attachment dir for this file
		try {
			$sourceAttachmentDir = $this->getAttachmentDirectoryForFile($source);
		} catch (NotFoundException $e) {
			// silently return if no attachment dir was found
			return;
		}
		$sourceAttachmentDir->delete();
	}

	/**
	 * @param File $source
	 * @param File $target
	 * @return void
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Lock\LockedException
	 */
	public function copyAttachments(File $source, File $target): void {
		try {
			$sourceAttachmentDir = $this->getAttachmentDirectoryForFile($source);
		} catch (NotFoundException $e) {
			// silently return if no attachment dir was found for source file
			return;
		}
		// create a new attachment dir next to the new file
		$targetAttachmentDir = $this->getAttachmentDirectoryForFile($target, true);
		// copy the attachment files
		foreach ($sourceAttachmentDir->getDirectoryListing() as $sourceAttachment) {
			if ($sourceAttachment instanceof File) {
				$targetAttachmentDir->newFile($sourceAttachment->getName(), $sourceAttachment->getContent());
			}
		}
	}
}
