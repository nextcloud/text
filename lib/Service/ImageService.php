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

use Exception;
use OCA\Text\Controller\ImageController;
use OCP\Constants;
use OCP\Files\Folder;
use OCP\Files\File;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\IPreview;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IShare;
use Throwable;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\ServerException;
use OCP\Http\Client\IClientService;
use OCP\Files\IRootFolder;
use Psr\Log\LoggerInterface;
use OCP\Share\IManager as ShareManager;
use function preg_replace;

class ImageService {

	/**
	 * @var ShareManager
	 */
	private $shareManager;
	/**
	 * @var IRootFolder
	 */
	private $rootFolder;
	/**
	 * @var IClientService
	 */
	private $clientService;
	/**
	 * @var LoggerInterface
	 */
	private $logger;
	/**
	 * @var IPreview
	 */
	private $previewManager;

	public function __construct(IRootFolder $rootFolder,
								LoggerInterface $logger,
								ShareManager $shareManager,
								IPreview $previewManager,
								IClientService $clientService) {
		$this->rootFolder = $rootFolder;
		$this->shareManager = $shareManager;
		$this->clientService = $clientService;
		$this->logger = $logger;
		$this->previewManager = $previewManager;
	}

	/**
	 * Get image content or preview from file id
	 * @param int $textFileId
	 * @param int $imageFileId
	 * @param string $userId
	 * @return File|\OCP\Files\Node|ISimpleFile|null
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getImage(int $textFileId, int $imageFileId, string $userId) {
		$textFile = $this->getTextFile($textFileId, $userId);
		return $textFile === null ? null : $this->getImagePreview($imageFileId, $textFile);
	}

	/**
	 * Get image content or preview from file id in public context
	 * @param int $textFileId
	 * @param int $imageFileId
	 * @param string $shareToken
	 * @return File|\OCP\Files\Node|ISimpleFile|null
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function getImagePublic(int $textFileId, int $imageFileId, string $shareToken) {
		$textFile = $this->getTextFilePublic($textFileId, $shareToken);
		return $textFile === null ? null : $this->getImagePreview($imageFileId, $textFile);
	}

	/**
	 * @param int $imageFileId
	 * @param File $textFile
	 * @return File|\OCP\Files\Node|ISimpleFile|null
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 */
	private function getImagePreview(int $imageFileId, File $textFile) {
		$attachmentFolder = $this->getOrCreateAttachmentDirectoryForFile($textFile);
		if ($attachmentFolder !== null) {
			$imageFiles = $attachmentFolder->getById($imageFileId);
			if (count($imageFiles) === 0) {
				return null;
			}
			$imageFile = $imageFiles[0];
			if ($imageFile instanceof File) {
				if ($this->previewManager->isMimeSupported($imageFile->getMimeType())) {
					return $this->previewManager->getPreview($imageFile, 1024, 1024);
				} else {
					return $imageFile;
				}
			}
		}
		return null;
	}

	/**
	 * Save an uploaded image in the attachment folder
	 *
	 * @param int $textFileId
	 * @param string $newFileName
	 * @param string $newFileContent
	 * @param string $userId
	 * @return array
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function uploadImage(int $textFileId, string $newFileName, string $newFileContent, string $userId): array {
		$textFile = $this->getTextFile($textFileId, $userId);
		if (!$textFile->isUpdateable()) {
			throw new Exception('No write permissions');
		}
		$saveDir = $this->getOrCreateAttachmentDirectoryForFile($textFile);
		if ($saveDir !== null) {
			$fileName = (string) time() . '-' . $newFileName;
			$savedFile = $saveDir->newFile($fileName, $newFileContent);
			return [
				'name' => $fileName,
				'id' => $savedFile->getId(),
				'textFileId' => $textFile->getId(),
			];
		} else {
			return [
				'error' => 'Impossible to get attachment directory',
			];
		}
	}

	/**
	 * Save an uploaded image in the attachment folder in a public context
	 * @param int|null $textFileId
	 * @param string $newFileName
	 * @param string $newFileContent
	 * @param string $shareToken
	 * @return array
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function uploadImagePublic(?int $textFileId, string $newFileName, string $newFileContent, string $shareToken): array {
		if (!$this->hasUpdatePermissions($shareToken)) {
			throw new Exception('No write permissions');
		}
		$textFile = $this->getTextFilePublic($textFileId, $shareToken);
		$saveDir = $this->getOrCreateAttachmentDirectoryForFile($textFile);
		if ($saveDir !== null) {
			$fileName = (string) time() . '-' . $newFileName;
			$savedFile = $saveDir->newFile($fileName, $newFileContent);
			return [
				'name' => $fileName,
				'id' => $savedFile->getId(),
				'textFileId' => $textFile->getId(),
			];
		} else {
			return [
				'error' => 'Impossible to get attachment directory',
			];
		}
	}

	/**
	 * Copy a file from a user's storage in the attachment folder
	 *
	 * @param int $textFileId
	 * @param string $path
	 * @param string $userId
	 * @return array
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 * @throws \OCP\Lock\LockedException
	 */
	public function insertImageFile(int $textFileId, string $path, string $userId): array {
		$textFile = $this->getTextFile($textFileId, $userId);
		if (!$textFile->isUpdateable()) {
			throw new Exception('No write permissions');
		}
		$imageFile = $this->getFileFromPath($path, $userId);
		$saveDir = $this->getOrCreateAttachmentDirectoryForFile($textFile);
		if ($saveDir !== null) {
			return $this->copyImageFile($imageFile, $saveDir, $textFile);
		} else {
			return [
				'error' => 'Impossible to get attachment directory',
			];
		}
	}

	/**
	 * @param File $imageFile
	 * @param Folder $saveDir
	 * @param File $textFile
	 * @return array
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 */
	private function copyImageFile(File $imageFile, Folder $saveDir, File $textFile): array {
		$mimeType = $imageFile->getMimeType();
		if (in_array($mimeType, ImageController::IMAGE_MIME_TYPES)) {
			$fileName = (string) time() . '-' . $imageFile->getName();
			$targetPath = $saveDir->getPath() . '/' . $fileName;
			$targetFile = $imageFile->copy($targetPath);
			// get file type and name
			return [
				'name' => $fileName,
				'id' => $targetFile->getId(),
				'textFileId' => $textFile->getId(),
			];
		}
		return [
			'error' => 'Unsupported file type',
		];
	}

	/**
	 * Download and save an image from a link in the attachment folder
	 *
	 * @param int $textFileId
	 * @param string $link
	 * @param string $userId
	 * @return array
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 */
	public function insertImageLink(int $textFileId, string $link, string $userId): array {
		$textFile = $this->getTextFile($textFileId, $userId);
		if (!$textFile->isUpdateable()) {
			throw new Exception('No write permissions');
		}
		$saveDir = $this->getOrCreateAttachmentDirectoryForFile($textFile);
		if ($saveDir !== null) {
			return $this->downloadLink($saveDir, $link, $textFile);
		} else {
			return [
				'error' => 'Impossible to get attachment directory',
			];
		}
	}

	/**
	 * Download and save an image from a link in the attachment folder in a public context
	 *
	 * @param int|null $textFileId
	 * @param string $link
	 * @param string $shareToken
	 * @return array|string[]
	 * @throws Exception
	 */
	public function insertImageLinkPublic(?int $textFileId, string $link, string $shareToken): array {
		if (!$this->hasUpdatePermissions($shareToken)) {
			throw new Exception('No write permissions');
		}
		$textFile = $this->getTextFilePublic($textFileId, $shareToken);
		$saveDir = $this->getOrCreateAttachmentDirectoryForFile($textFile);
		if ($saveDir !== null) {
			return $this->downloadLink($saveDir, $link, $textFile);
		} else {
			return [
				'error' => 'Impossible to get attachment directory',
			];
		}
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
			return ($share->getShareType() === IShare::TYPE_LINK && $share->getPermissions() & Constants::PERMISSION_UPDATE);
		} catch (ShareNotFound $e) {
			return false;
		}
	}

	/**
	 * Download an image from a link and place it in a given folder
	 * @param Folder $saveDir
	 * @param string $link
	 * @param File $textFile
	 * @return array
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 * @throws \OCP\Lock\LockedException
	 */
	private function downloadLink(Folder $saveDir, string $link, File $textFile): array {
		$fileName = (string) time();
		$savedFile = $saveDir->newFile($fileName);
		$resource = $savedFile->fopen('wb');
		$res = $this->simpleDownload($link, $resource);
		if (is_resource($resource)) {
			fclose($resource);
		}
		$savedFile->touch();
		if (isset($res['Content-Type'])) {
			if (in_array($res['Content-Type'], ImageController::IMAGE_MIME_TYPES)) {
				if ($res['Content-Type'] === 'image/jpeg') {
					$fileName = $fileName . '.jpg';
				} elseif ($res['Content-Type'] === 'image/x-xbitmap' || $res['Content-Type'] === 'image/x-ms-bmp') {
					$fileName = $fileName . '.bmp';
				} elseif ($res['Content-Type'] === 'image/svg+xml') {
					$fileName = $fileName . '.svg';
				} else {
					$ext = preg_replace('/^image\//i', '', $res['Content-Type']);
					$fileName = $fileName . '.' . $ext;
				}
				$targetPath = $saveDir->getPath() . '/' . $fileName;
				$savedFile->move($targetPath);
				// get file type and name
				return [
					'name' => $fileName,
					'id' => $savedFile->getId(),
					'textFileId' => $textFile->getId(),
				];
			} else {
				$savedFile->delete();
				return [
					'error' => 'Unsupported file type',
				];
			}
		} elseif (isset($res['error'])) {
			$savedFile->delete();
			return $res;
		} else {
			$savedFile->delete();
			return [
				'error' => 'Link download error',
			];
		}
	}

	/**
	 * Get or create the user-specific attachment folder
	 *
	 * @param string $userId
	 * @return Folder|null
	 * @throws NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 */
	private function getOrCreateTextDirectory(string $userId): ?Folder {
		$userFolder = $this->rootFolder->getUserFolder($userId);
		if ($userFolder->nodeExists('/Text')) {
			$node = $userFolder->get('Text');
			if ($node instanceof Folder) {
				return $node;
			} else {
				return null;
			}
		} else {
			return $userFolder->newFolder('/Text');
		}
	}

	/**
	 * Get or create file-specific attachment folder
	 *
	 * @param File $textFile
	 * @return Folder|null
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 */
	private function getOrCreateAttachmentDirectoryForFile(File $textFile): ?Folder {
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
			} else {
				return $ownerParentFolder->newFolder($attachmentFolderName);
			}
		}
		return null;
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
	 * @param int $textFileId
	 * @param string $userId
	 * @return File|null
	 * @throws \OCP\Files\NotPermittedException
	 */
	private function getTextFile(int $textFileId, string $userId): ?File {
		$userFolder = $this->rootFolder->getUserFolder($userId);
		$textFile = $userFolder->getById($textFileId);
		if (count($textFile) > 0 && $textFile[0] instanceof File) {
			return $textFile[0];
		}
		return null;
	}

	/**
	 * Get file from share token
	 *
	 * @param int|null $textFileId
	 * @param string $shareToken
	 * @return File|null
	 * @throws NotFoundException
	 */
	private function getTextFilePublic(?int $textFileId, string $shareToken): ?File {
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
				} elseif ($share->getNodeType() === 'folder' && $textFileId !== null) {
					$folder = $share->getNode();
					if ($folder instanceof Folder) {
						$textFile = $folder->getById($textFileId);
						if (count($textFile) > 0 && $textFile[0] instanceof File) {
							return $textFile[0];
						}
					}
				}
			}
		} catch (ShareNotFound $e) {
			return null;
		}
		return null;
	}

	/**
	 * Download a file and write it to a resource
	 * @param string $url
	 * @param $resource
	 * @param array $params
	 * @return array
	 */
	private function simpleDownload(string $url, $resource, array $params = []): array {
		$client = $this->clientService->newClient();
		try {
			$options = [
				// does not work with sink if SSE is enabled
				// 'sink' => $resource,
				// rather use stream and write to the file ourselves
				'stream' => true,
				'timeout' => 0,
				'headers' => [
					'User-Agent' => 'Nextcloud Text',
				],
			];

			if (count($params) > 0) {
				$paramsContent = http_build_query($params);
				$url .= '?' . $paramsContent;
			}

			$response = $client->get($url, $options);
			$body = $response->getBody();
			while (!feof($body)) {
				// write ~5 MB chunks
				$chunk = fread($body, 5000000);
				fwrite($resource, $chunk);
			}

			return ['Content-Type' => $response->getHeader('Content-Type')];
		} catch (ServerException | ClientException $e) {
			//$response = $e->getResponse();
			//if ($response->getStatusCode() === 401) {
			$this->logger->warning('Impossible to download image', ['exception' => $e]);
			return ['error' => 'Impossible to download image'];
		} catch (ConnectException $e) {
			$this->logger->error('Connection error', ['exception' => $e]);
			return ['error' => 'Connection error'];
		} catch (Throwable | Exception $e) {
			$this->logger->error('Unknown download error', ['exception' => $e]);
			return ['error' => 'Unknown download error'];
		}
	}

	/**
	 * Actually delete attachment files which are not pointed in the markdown content
	 *
	 * @param int $fileId
	 * @return int The number of deleted files
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 * @throws \OCP\Lock\LockedException
	 */
	public function cleanupAttachments(int $fileId): int {
		$textFile = $this->rootFolder->getById($fileId);
		if (count($textFile) > 0 && $textFile[0] instanceof File) {
			$textFile = $textFile[0];
			if ($textFile->getMimeType() === 'text/markdown') {
				// get IDs of the files inside the attachment dir
				$attachmentDir = $this->getOrCreateAttachmentDirectoryForFile($textFile);
				$attachmentsById = [];
				foreach ($attachmentDir->getDirectoryListing() as $attNode) {
					$attachmentsById[$attNode->getId()] = $attNode;
				}

				// get IDs of attachment listed in the markdown file content
				$matches = [];
				preg_match_all(
					'/\!\[[^\[\]]+\]\(text:\/\/image\?[^)]*imageFileId=([\d]+)[^)]*\)/',
					$textFile->getContent(),
					$matches,
					PREG_SET_ORDER
				);
				$contentAttachmentIds = array_map(function (array $match) {
					return $match[1] ?? null;
				}, $matches);

				$toDelete = array_diff(array_keys($attachmentsById), $contentAttachmentIds);
				foreach ($toDelete as $id) {
					$attachmentsById[$id]->delete();
				}
				return count($toDelete);
			}
		}
		return 0;
	}
}
