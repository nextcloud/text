<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OC\User\NoUserException;
use OCA\DAV\Connector\Sabre\PublicAuth;
use OCA\Files_Sharing\SharedStorage;
use OCA\Text\Controller\AttachmentController;
use OCA\Text\Db\Session;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IFilenameValidator;
use OCP\Files\IMimeTypeDetector;
use OCP\Files\InvalidPathException;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\FilesMetadata\IFilesMetadataManager;
use OCP\IPreview;
use OCP\ISession;
use OCP\IURLGenerator;
use OCP\Lock\LockedException;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as ShareManager;
use OCP\Share\IShare;
use OCP\Util;

class AttachmentService {
	public function __construct(
		private IRootFolder $rootFolder,
		private ShareManager $shareManager,
		private IPreview $previewManager,
		private IMimeTypeDetector $mimeTypeDetector,
		private IURLGenerator $urlGenerator,
		private IFilenameValidator $filenameValidator,
		private IFilesMetadataManager $filesMetadataManager,
		private ISession $session,
	) {
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
	public function getMediaFile(int $documentId, string $mediaFileName, string $userId): ?File {
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
	public function getMediaFilePublic(int $documentId, string $mediaFileName, string $shareToken): ?File {
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
	 * @throws InvalidPathException
	 * @throws NoUserException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	public function getAttachmentList(int $documentId, ?string $userId = null, ?Session $session = null, ?string $shareToken = null): array {
		if ($shareToken !== null) {
			$textFile = $this->getTextFilePublic($documentId, $shareToken);
		} elseif ($userId !== null) {
			$textFile = $this->getTextFile($documentId, $userId);
		} else {
			throw new NotPermittedException('Unable to read document');
		}

		try {
			$attachmentDir = $this->getAttachmentDirectoryForFile($textFile);
		} catch (NotFoundException) {
			return [];
		}

		$shareTokenUrlString = $shareToken !== null
			? '&shareToken=' . rawurlencode($shareToken)
			: '';
		$urlParamsBase = $session
			? '?documentId=' . $documentId . '&sessionId=' . $session->getId() . '&sessionToken=' . rawurlencode($session->getToken()) . $shareTokenUrlString
			: '?documentId=' . $documentId . $shareTokenUrlString;

		$attachments = [];

		// Folder davPath need to be relative to.
		$davFolder = $userId !== null
			? $this->rootFolder->getUserFolder($userId)
			: $this->getShareFolder($shareToken);

		$fileNodes = [];
		$fileIds = [];
		foreach ($attachmentDir->getDirectoryListing() as $node) {
			if ($node instanceof File) {
				// we only want Files
				$fileNodes[] = $node;
				$fileIds[] = $node->getId();
			}
		}

		// this is done outside the loop for efficiency
		$metadataMap = $this->filesMetadataManager->getMetadataForFiles($fileIds);

		foreach ($fileNodes as $node) {
			$isImage = in_array($node->getMimetype(), AttachmentController::IMAGE_MIME_TYPES, true);
			$name = $node->getName();
			$fileId = $node->getId();
			$metadata = $metadataMap[$fileId] ?? null;
			$attachments[] = [
				'fileId' => $fileId,
				'name' => $name,
				'size' => Util::humanFileSize($node->getSize()),
				'mimetype' => $node->getMimeType(),
				'mtime' => $node->getMTime(),
				'isImage' => $isImage,
				'davPath' => $davFolder?->getRelativePath($node->getPath()),
				'metadata' => $metadata,
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
	 * @param int $documentId
	 * @param string $newFileName
	 * @param resource $newFileResource
	 * @param string $userId
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
		$this->filenameValidator->validateFilename($fileName);
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
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
		} catch (ShareNotFound) {
			throw new NotFoundException('Share not found');
		}

		if (!$this->hasUpdatePermissions($share)) {
			throw new NotPermittedException('No write permissions');
		}

		if ($share->getPassword() !== null) {
			$key = PublicAuth::DAV_AUTHENTICATED;

			if (!$this->session->exists($key)) {
				throw new NotPermittedException('Share not authenticated');
			}

			$allowedShareIds = $this->session->get($key);
			if (!is_array($allowedShareIds)) {
				throw new NotPermittedException('Share not authenticated');
			}

			if (!in_array($share->getId(), $allowedShareIds, true)) {
				throw new NotPermittedException('Share not authenticated');
			}
		}

		$textFile = $this->getTextFilePublic($documentId, $shareToken);
		$saveDir = $this->getAttachmentDirectoryForFile($textFile, true);
		$fileName = self::getUniqueFileName($saveDir, $newFileName);
		$this->filenameValidator->validateFilename($fileName);
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
	 * create a new file in the attachment folder
	 *
	 * @param int $documentId
	 * @param string $userId
	 *
	 * @return array
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws InvalidPathException
	 * @throws NoUserException
	 */
	public function createAttachmentFile(int $documentId, string $newFileName, string $userId): array {
		$textFile = $this->getTextFile($documentId, $userId);
		if (!$textFile->isUpdateable()) {
			throw new NotPermittedException('No write permissions');
		}
		$saveDir = $this->getAttachmentDirectoryForFile($textFile, true);
		$fileName = self::getUniqueFileName($saveDir, $newFileName);
		$newFile = $saveDir->newFile($fileName);
		return [
			'name' => $newFile->getName(),
			'dirname' => $saveDir->getName(),
			'id' => $newFile->getId(),
			'documentId' => $textFile->getId(),
			'mimetype' => $newFile->getMimetype(),
		];
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
				$uniqueFileName = (string)preg_replace('/\.' . $extension . '$/', ' (' . $counter . ').' . $extension, $fileName);
			}
		} else {
			while ($dir->nodeExists($uniqueFileName)) {
				$counter++;
				$uniqueFileName = (string)preg_replace('/$/', ' (' . $counter . ')', $fileName);
			}
		}
		return $uniqueFileName;
	}

	/**
	 * Check if the shared access has write permissions
	 */
	private function hasUpdatePermissions(IShare $share): bool {
		return (
			in_array(
				$share->getShareType(),
				[IShare::TYPE_LINK, IShare::TYPE_EMAIL, IShare::TYPE_ROOM],
				true
			)
			&& $share->getPermissions() & Constants::PERMISSION_UPDATE
			&& $share->getNode()->getPermissions() & Constants::PERMISSION_UPDATE);
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
		$ownerTextFile = $ownerUserFolder->getFirstNodeById($textFile->getId());
		if ($ownerTextFile !== null) {
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
	 * @param int $documentId
	 * @param string $userId
	 *
	 * @return File
	 * @throws NoUserException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	private function getTextFile(int $documentId, string $userId): File {
		$userFolder = $this->rootFolder->getUserFolder($userId);
		$file = $userFolder->getFirstNodeById($documentId);
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
						$textFile = $folder->getFirstNodeById($documentId);
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
	 * Get share folder
	 *
	 * @param string $shareToken
	 *
	 * @throws NotFoundException
	 */
	private function getShareFolder(string $shareToken): ?Folder {
		// is the file shared with this token?
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
			if (in_array($share->getShareType(), [IShare::TYPE_LINK, IShare::TYPE_EMAIL])) {
				// shared file or folder?
				if ($share->getNodeType() === 'file') {
					return null;
				} elseif ($share->getNodeType() === 'folder') {
					$folder = $share->getNode();
					if ($folder instanceof Folder) {
						return $folder;
					}
					throw new NotFoundException('Share folder for ' . $shareToken . ' was not a folder.');
				}
			}
		} catch (ShareNotFound $e) {
			// same as below
		}
		throw new NotFoundException('Share folder for ' . $shareToken . ' was not found.');
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
		$textFile = $this->rootFolder->getFirstNodeById($fileId);
		if ($textFile instanceof File) {
			if ($textFile->getMimeType() === 'text/markdown') {
				// get IDs of the files inside the attachment dir
				try {
					$attachmentDir = $this->getAttachmentDirectoryForFile($textFile);
				} catch (NotFoundException $e) {
					// this only happens if the attachment dir was deleted by the user while editing the document
					return 0;
				}
				$contentAttachmentFileIds = self::getAttachmentIdsFromContent($textFile->getContent());
				$contentAttachmentNames = self::getAttachmentNamesFromContent($textFile->getContent(), $fileId);

				$toDelete = array_filter($attachmentDir->getDirectoryListing(),
					function ($node) use ($contentAttachmentFileIds, $contentAttachmentNames) {
						return !in_array($node->getName(), $contentAttachmentNames)
							&& !in_array($node->getId(), $contentAttachmentFileIds);
					}
				);
				foreach ($toDelete as $node) {
					$node->delete();
				}
				return count($toDelete);
			}
		}
		return 0;
	}

	/**
	 * Get attachment file ids listed in the markdown file content
	 *
	 * @param string $content
	 *
	 * @return array
	 */
	public static function getAttachmentIdsFromContent(string $content): array {
		$matches = [];
		// matches [ANY_CONSIDERED_CORRECT_BY_PHP-MARKDOWN](ANY_URL/f/FILE_ID and captures FILE_ID
		preg_match_all(
			'/\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[(?>[^\[\]]+|\[\])*\])*\])*\])*\])*\])*\]\(\S+\/f\/(\d+)/',
			$content,
			$matches,
			PREG_SET_ORDER
		);
		return array_map(static function (array $match) {
			return intval($match[1]);
		}, $matches);
	}

	/**
	 * Get attachment file names listed in the markdown file content
	 *
	 * @param string $content
	 * @param int $fileId
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
	 * @return array file id translation map
	 * @throws InvalidPathException
	 * @throws NoUserException
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @throws LockedException
	 */
	public function copyAttachments(File $source, File $target): array {
		try {
			$sourceAttachmentDir = $this->getAttachmentDirectoryForFile($source);
		} catch (NotFoundException $e) {
			// silently return if no attachment dir was found for source file
			return [];
		}
		// create a new attachment dir next to the new file
		$targetAttachmentDir = $this->getAttachmentDirectoryForFile($target, true);
		// copy the attachment files
		$fileIdMapping = [];
		foreach ($sourceAttachmentDir->getDirectoryListing() as $sourceAttachment) {
			if ($sourceAttachment instanceof File) {
				$newFile = $targetAttachmentDir->newFile($sourceAttachment->getName(), $sourceAttachment->getContent());
				$fileIdMapping[] = [
					$sourceAttachment->getId(),
					$newFile->getId()
				];
			}
		}
		return $fileIdMapping;
	}

	public static function replaceAttachmentFolderId(File $source, File $target): void {
		$sourceId = $source->getId();
		$targetId = $target->getId();
		$patterns = [
			// Replace `[title](.attachments.1/file.png)` with `[title](attachments.2/file.png)`
			// '/(\[[^]]+\]\(\s*\<?\.attachments\.)' . $sourceId . '(\/[^)]+\>?\s*\))/',
			'/(\[(?:\\\]|[^]])+\]\(\s*\<?\.attachments\.)' . $sourceId . '(\/[^)]+\>?\s*\))/',
			// Replace `[ref]: .attachments.1/file.png` with `[ref]: .attachments.2/file.png`
			'/(\[(?:\\\]|[^]])+\]:\s+.attachments\.)' . $sourceId . '(\/[^\s]+)/',
		];
		$replacements = [
			'${1}' . $targetId . '${2}',
			'${1}' . $targetId . '${2}',
		];
		$content = preg_replace($patterns, $replacements, $target->getContent());
		if ($content !== null) {
			$target->putContent($content);
		}
	}

	public static function replaceAttachmentFileIds(File $target, array $fileIdMapping): void {
		$patterns = [];
		$replacements = [];
		foreach ($fileIdMapping as $mapping) {
			$patterns[] = '/(\[(?:\\\]|[^]])+\]\(\s*\S+\/f\/)' . $mapping[0] . '(\s*)(\(preview\)\s*)?\)/';
			// Replace `[title](URL/f/sourceId (preview))` with `[title](URL/f/targetId (preview))`
			$replacements[] = '${1}' . $mapping[1] . '${2}${3})';
		}
		$content = preg_replace($patterns, $replacements, $target->getContent());
		if ($content !== null) {
			$target->putContent($content);
		}
	}
}
