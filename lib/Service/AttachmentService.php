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
use OCA\Files_Sharing\SharedStorage;
use OCA\Text\Controller\AttachmentController;
use OCA\Text\Db\Session;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IMimeTypeDetector;
use OCP\Files\InvalidPathException;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\IPreview;
use OCP\IURLGenerator;
use OCP\Lock\LockedException;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as ShareManager;
use OCP\Share\IShare;
use OCP\Util;

class AttachmentService {
	public function __construct(private IRootFolder $rootFolder,
		private ShareManager $shareManager,
		private IPreview $previewManager,
		private IMimeTypeDetector $mimeTypeDetector,
		private IURLGenerator $urlGenerator) {
	}

	/**
	 * Get image content or preview from file name
	 *
	 * @throws InvalidPathException
	 * @throws NoUserException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	public function getImageFile(int $documentId, string $imageFileName, string $userId, bool $preferRawImage): File|ISimpleFile|null {
		$textFile = $this->getTextFile($documentId, $userId);
		return $this->getImageFileContent($imageFileName, $textFile, $preferRawImage);
	}

	/**
	 * Get image content or preview from file id in public context
	 *
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws NoUserException
	 */
	public function getImageFilePublic(int $documentId, string $imageFileName, string $shareToken, bool $preferRawImage): File|ISimpleFile|null {
		$textFile = $this->getTextFilePublic($documentId, $shareToken);
		return $this->getImageFileContent($imageFileName, $textFile, $preferRawImage);
	}

	/**
	 * @throws InvalidPathException
	 * @throws NoUserException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	private function getImageFileContent(string $imageFileName, File $textFile, bool $preferRawImage): File|ISimpleFile|null {
		$attachmentFolder = $this->getAttachmentDirectoryForFile($textFile, true);
		$imageFile = $attachmentFolder->get($imageFileName);
		if ($imageFile instanceof File && in_array($imageFile->getMimetype(), AttachmentController::IMAGE_MIME_TYPES, true)) {
			// previews of gifs are static images, always provide the real gif
			if ($imageFile->getMimetype() === 'image/gif') {
				return $imageFile;
			}
			// we might prefer the raw image
			if ($preferRawImage && in_array($imageFile->getMimetype(), AttachmentController::BROWSER_SUPPORTED_IMAGE_MIME_TYPES, true)) {
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
	 *
	 * @throws NotFoundException
	 * @throws InvalidPathException
	 * @throws NotPermittedException
	 * @throws NoUserException
	 */
	public function getMediaFile(int $documentId, string $mediaFileName, string $userId): File|null {
		$textFile = $this->getTextFile($documentId, $userId);
		return $this->getMediaFullFile($mediaFileName, $textFile);
	}

	/**
	 * Get image content or preview from file id in public context
	 *
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws NoUserException
	 */
	public function getMediaFilePublic(int $documentId, string $mediaFileName, string $shareToken): File|null {
		$textFile = $this->getTextFilePublic($documentId, $shareToken);
		return $this->getMediaFullFile($mediaFileName, $textFile);
	}

	/**
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws NoUserException
	 */
	private function getMediaFullFile(string $mediaFileName, File $textFile): ?File {
		$attachmentFolder = $this->getAttachmentDirectoryForFile($textFile, true);
		$mediaFile = $attachmentFolder->get($mediaFileName);
		if ($mediaFile instanceof File && !$this->isDownloadDisabled($mediaFile)) {
			return $mediaFile;
		}
		return null;
	}

	/**
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws NoUserException
	 */
	public function getMediaFilePreview(int $documentId, string $mediaFileName, string $userId): ?array {
		$textFile = $this->getTextFile($documentId, $userId);
		return $this->getMediaFilePreviewFile($mediaFileName, $textFile);
	}

	/**
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws NoUserException
	 */
	public function getMediaFilePreviewPublic(int $documentId, string $mediaFileName, string $shareToken): ?array {
		$textFile = $this->getTextFilePublic($documentId, $shareToken);
		return $this->getMediaFilePreviewFile($mediaFileName, $textFile);
	}

	/**
	 * Get media preview or mimetype icon address
	 *
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws NoUserException
	 */
	private function getMediaFilePreviewFile(string $mediaFileName, File $textFile): ?array {
		$attachmentFolder = $this->getAttachmentDirectoryForFile($textFile, true);
		$mediaFile = $attachmentFolder->get($mediaFileName);
		if ($mediaFile instanceof File && !$this->isDownloadDisabled($mediaFile)) {
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
	 * @param int          $documentId
	 * @param string|null  $userId
	 * @param Session|null $session
	 * @param string|null  $shareToken
	 *
	 * @return array
	 * @throws InvalidPathException
	 * @throws NoUserException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	public function getAttachmentList(int $documentId, ?string $userId = null, ?Session $session = null, ?string $shareToken = null): array {
		if ($shareToken) {
			$textFile = $this->getTextFilePublic($documentId, $shareToken);
		} elseif ($userId) {
			$textFile = $this->getTextFile($documentId, $userId);
		} else {
			throw new NotPermittedException('Unable to read document');
		}

		try {
			$attachmentDir = $this->getAttachmentDirectoryForFile($textFile);
		} catch (NotFoundException) {
			return [];
		}

		$shareTokenUrlString = $shareToken
			? '&shareToken=' . rawurlencode($shareToken)
			: '';
		$urlParamsBase = $session
			? '?documentId=' . $documentId . '&sessionId=' . $session->getId() . '&sessionToken=' . rawurlencode($session->getToken()) . $shareTokenUrlString
			: '?documentId=' . $documentId . $shareTokenUrlString;

		$attachments = [];
		$userFolder = $userId ? $this->rootFolder->getUserFolder($userId) : null;
		foreach ($attachmentDir->getDirectoryListing() as $node) {
			if (!($node instanceof File)) {
				// Ignore anything but files
				continue;
			}
			$isImage = in_array($node->getMimetype(), AttachmentController::IMAGE_MIME_TYPES, true);
			$name = $node->getName();
			$attachments[] = [
				'fileId' => $node->getId(),
				'name' => $name,
				'size' => Util::humanFileSize($node->getSize()),
				'mimetype' => $node->getMimeType(),
				'mtime' => $node->getMTime(),
				'isImage' => $isImage,
				'davPath' => $userFolder?->getRelativePath($node->getPath()),
				'fullUrl' => $isImage
					? $this->urlGenerator->linkToRouteAbsolute('text.Attachment.getImageFile') . $urlParamsBase . '&imageFileName=' . rawurlencode($name) . '&preferRawImage=1'
					: $this->urlGenerator->linkToRouteAbsolute('text.Attachment.getMediaFile') . $urlParamsBase . '&mediaFileName=' . rawurlencode($name),
				'previewUrl' => $isImage
					? $this->urlGenerator->linkToRouteAbsolute('text.Attachment.getImageFile') . $urlParamsBase . '&imageFileName=' . rawurlencode($name)
					: $this->urlGenerator->linkToRouteAbsolute('text.Attachment.getMediaFilePreview') . $urlParamsBase . '&mediaFileName=' . rawurlencode($name),
			];
		}

		return $attachments;
	}

	/**
	 * Save an uploaded file in the attachment folder
	 *
	 * @param int      $documentId
	 * @param string   $newFileName
	 * @param resource $newFileResource
	 * @param string   $userId
	 *
	 * @return array
	 * @throws InvalidPathException
	 * @throws NoUserException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	public function uploadAttachment(int $documentId, string $newFileName, $newFileResource, string $userId): array {
		$textFile = $this->getTextFile($documentId, $userId);
		if (!$textFile->isUpdateable()) {
			throw new NotPermittedException('No write permissions');
		}
		$saveDir = $this->getAttachmentDirectoryForFile($textFile, true);
		$fileName = self::getUniqueFileName($saveDir, $newFileName);
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
	 * @param resource $newFileResource
	 * @param string $shareToken
	 *
	 * @return array
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws NoUserException
	 */
	public function uploadAttachmentPublic(?int $documentId, string $newFileName, $newFileResource, string $shareToken): array {
		if (!$this->hasUpdatePermissions($shareToken)) {
			throw new NotPermittedException('No write permissions');
		}
		$textFile = $this->getTextFilePublic($documentId, $shareToken);
		$saveDir = $this->getAttachmentDirectoryForFile($textFile, true);
		$fileName = self::getUniqueFileName($saveDir, $newFileName);
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
	 *
	 * @return array
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws NoUserException
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
	 *
	 * @return array
	 * @throws NotFoundException
	 * @throws InvalidPathException
	 */
	private function copyFile(File $originalFile, Folder $saveDir, File $textFile): array {
		$fileName = self::getUniqueFileName($saveDir, $originalFile->getName());
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
	 *
	 * @param Folder $dir
	 * @param string $fileName
	 *
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
	 *
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
	 *
	 * @return Folder
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws NoUserException
	 */
	private function getAttachmentDirectoryForFile(File $textFile, bool $create = false): Folder {
		$owner = $textFile->getOwner();
		if ($owner === null) {
			throw new NotFoundException('File has no owner');
		}
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
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws NoUserException
	 */
	private function getFileFromPath(string $filePath, string $userId): File {
		$userFolder = $this->rootFolder->getUserFolder($userId);
		if ($userFolder->nodeExists($filePath)) {
			$file = $userFolder->get($filePath);
			if ($file instanceof File && !$this->isDownloadDisabled($file)) {
				return $file;
			}
		}
		throw new NotFoundException();
	}

	/**
	 * @param File $file
	 *
	 * @return bool
	 * @throws NotFoundException
	 */
	private function isDownloadDisabled(File $file): bool {
		$storage = $file->getStorage();
		if ($storage->instanceOfStorage(SharedStorage::class)) {
			/** @var SharedStorage $storage */
			$share = $storage->getShare();
			$attributes = $share->getAttributes();
			if ($attributes !== null && $attributes->getAttribute('permissions', 'download') === false) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Get a user file from file ID
	 *
	 * @param int    $documentId
	 * @param string $userId
	 *
	 * @return File
	 * @throws NoUserException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	private function getTextFile(int $documentId, string $userId): File {
		$userFolder = $this->rootFolder->getUserFolder($userId);
		$files = $userFolder->getById($documentId);
		$file = array_shift($files);
		if ($file instanceof File && !$this->isDownloadDisabled($file)) {
			return $file;
		}
		throw new NotFoundException('Text file with id=' . $documentId . ' was not found in storage of ' . $userId);
	}

	/**
	 * Get file from share token
	 *
	 * @param int|null $documentId
	 * @param string $shareToken
	 *
	 * @return File
	 * @throws NotFoundException
	 */
	private function getTextFilePublic(?int $documentId, string $shareToken): File {
		// is the file shared with this token?
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
			if (in_array($share->getShareType(), [IShare::TYPE_LINK, IShare::TYPE_EMAIL])) {
				// shared file or folder?
				if ($share->getNodeType() === 'file') {
					$textFile = $share->getNode();
					if ($textFile instanceof File && !$this->isDownloadDisabled($textFile)) {
						return $textFile;
					}
				} elseif ($documentId !== null && $share->getNodeType() === 'folder') {
					$folder = $share->getNode();
					if ($folder instanceof Folder) {
						$textFile = $folder->getById($documentId);
						$textFile = array_shift($textFile);
						if ($textFile instanceof File && !$this->isDownloadDisabled($textFile)) {
							return $textFile;
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
	 *
	 * @return int The number of deleted files
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws LockedException
	 * @throws NoUserException
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

				$contentAttachmentNames = self::getAttachmentNamesFromContent($textFile->getContent(), $fileId);

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
	 * @param int    $fileId
	 *
	 * @return array
	 */
	public static function getAttachmentNamesFromContent(string $content, int $fileId): array {
		$matches = [];
		// matches ![ANY_CONSIDERED_CORRECT_BY_PHP-MARKDOWN](.attachments.DOCUMENT_ID/ANY_FILE_NAME) and captures FILE_NAME
		preg_match_all(
			'/\!\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[\])*\])*\])*\])*\])*\])*\]\(\.attachments\.' . $fileId . '\/([^)&]+)\)/',
			$content,
			$matches,
			PREG_SET_ORDER
		);
		return array_map(static function (array $match) {
			return urldecode($match[1]);
		}, $matches);
	}

	/**
	 * @param File $source
	 * @param File $target
	 *
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws LockedException
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
	 *
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws NoUserException
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
	 *
	 * @throws InvalidPathException
	 * @throws NoUserException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws LockedException
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
