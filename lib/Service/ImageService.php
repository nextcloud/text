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
use OCP\Constants;
use OCP\Files\Folder;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IShare;
use Throwable;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\ServerException;
use OCA\Text\AppInfo\Application;
use OCP\Http\Client\IClientService;
use OCP\Files\IRootFolder;
use Psr\Log\LoggerInterface;
use OCP\Share\IManager as ShareManager;
use function json_encode;
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

	public function __construct(IRootFolder $rootFolder,
								LoggerInterface $logger,
								ShareManager $shareManager,
								IClientService $clientService) {
		$this->rootFolder = $rootFolder;
		$this->shareManager = $shareManager;
		$this->clientService = $clientService;
		$this->logger = $logger;
	}

	/**
	 * @param int $textFileId
	 * @param string $imageFileName
	 * @param string $userId
	 * @return string|null
	 * @throws NotFoundException
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotPermittedException
	 * @throws \OCP\Lock\LockedException
	 * @throws \OC\User\NoUserException
	 */
	public function getImage(int $textFileId, string $imageFileName, string $userId): ?string {
		$attachmentFolder = $this->getOrCreateAttachmentDirectory($textFileId, $userId);
		if ($attachmentFolder !== null) {
			try {
				$imageFile = $attachmentFolder->get($imageFileName);
			} catch (NotFoundException $e) {
				return null;
			}
			if ($imageFile instanceof File) {
				return $imageFile->getContent();
			}
		}
		return null;
	}

	public function getImagePublic(int $textFileId, string $imageFileName, string $token): ?string {
		$attachmentFolder = $this->getOrCreateAttachmentDirectoryPublic($textFileId, $token);
		if ($attachmentFolder !== null) {
			try {
				$imageFile = $attachmentFolder->get($imageFileName);
			} catch (NotFoundException $e) {
				return null;
			}
			if ($imageFile instanceof File) {
				return $imageFile->getContent();
			}
		}
		return null;
	}

	/**
	 * @param int $textFileId
	 * @param string $newFileName
	 * @param string $newFileContent
	 * @param string $userId
	 * @return array
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 * @throws \OC\User\NoUserException
	 */
	public function uploadImage(int $textFileId, string $newFileName, string $newFileContent, string $userId): array {
		$fileName = (string) time() . '-' . $newFileName;
		// $saveDir = $this->getOrCreateTextDirectory($userId);
		$saveDir = $this->getOrCreateAttachmentDirectory($textFileId, $userId);
		if ($saveDir !== null) {
			$savedFile = $saveDir->newFile($fileName, $newFileContent);
			$path = preg_replace('/^files/', '', $savedFile->getInternalPath());
			return [
				'name' => $fileName,
				'path' => $path,
				'id' => $savedFile->getId(),
				'textFileId' => $textFileId,
			];
		} else {
			return [
				'error' => 'Impossible to get attachment directory',
			];
		}
	}

	public function uploadImagePublic(?int $textFileId, string $newFileName, string $newFileContent, string $token): array {
		if (!$this->hasUpdatePermissions($token)) {
			return [
				'error' => 'No update permissions',
			];
		}
		$fileName = (string) time() . '-' . $newFileName;
		$saveDir = $this->getOrCreateAttachmentDirectoryPublic($textFileId, $token);
		if ($saveDir !== null) {
			$savedFile = $saveDir->newFile($fileName, $newFileContent);
			$path = preg_replace('/^files/', '', $savedFile->getInternalPath());
			return [
				'name' => $fileName,
				'path' => $path,
				'id' => $savedFile->getId(),
				'textFileId' => $textFileId ?: $this->getFileIdFromShareToken(),
			];
		} else {
			return [
				'error' => 'Impossible to get attachment directory',
			];
		}
	}

	/**
	 * @param string $textFilePath
	 * @param string $link
	 * @param string $userId
	 * @return array
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 * @throws \OCP\Lock\LockedException
	 * @throws \OC\User\NoUserException
	 */
	public function insertImageLink(int $textFileId, string $link, string $userId): array {
		// $saveDir = $this->getOrCreateTextDirectory($userId);
		$saveDir = $this->getOrCreateAttachmentDirectory($textFileId, $userId);
		if ($saveDir !== null) {
			return $this->downloadLink($saveDir, $link);
		} else {
			return [
				'error' => 'Impossible to get attachment directory',
			];
		}
	}

	public function insertImageLinkPublic(?int $textFileId, string $link, string $token): array {
		if (!$this->hasUpdatePermissions($token)) {
			return [
				'error' => 'No update permissions',
			];
		}
		$saveDir = $this->getOrCreateAttachmentDirectoryPublic($textFileId, $token);
		if ($saveDir !== null) {
			return $this->downloadLink($saveDir, $link);
		} else {
			return [
				'error' => 'Impossible to get attachment directory',
			];
		}
	}

	private function hasUpdatePermissions(string $token): bool {
		try {
			$share = $this->shareManager->getShareByToken($token);
			return ($share->getShareType() === IShare::TYPE_LINK && $share->getPermissions() | Constants::PERMISSION_UPDATE);
		} catch (ShareNotFound $e) {
			return false;
		}
	}

	private function downloadLink(Folder $saveDir, string $link): array {
		$fileName = (string) time();
		$savedFile = $saveDir->newFile($fileName);
		$resource = $savedFile->fopen('w');
		$res = $this->simpleDownload($link, $resource);
		if (is_resource($resource)) {
			fclose($resource);
		}
		$savedFile->touch();
		if (isset($res['Content-Type'])) {
			if (in_array($res['Content-Type'], ['image/jpg', 'image/jpeg'])) {
				$fileName = $fileName . '.jpg';
			} elseif ($res['Content-Type'] === 'image/png') {
				$fileName = $fileName . '.png';
			} else {
				return [
					'error' => 'Unsupported file type',
				];
			}
			$targetPath = $saveDir->getPath() . '/' . $fileName;
			$savedFile->move($targetPath);
			$path = preg_replace('/^files/', '', $savedFile->getInternalPath());
			// get file type and name
			return [
				'name' => $fileName,
				'path' => $path,
				'id' => $savedFile->getId(),
			];
		} else {
			return $res;
		}
	}

	private function getOrCreateTextDirectory(string $userId): ?Folder {
		$userFolder = $this->rootFolder->getUserFolder($userId);
		if ($userFolder->nodeExists('/Text')) {
			$node = $userFolder->get('Text');
			//if ($node->getType() === FileInfo::TYPE_FOLDER) {
			if ($node instanceof Folder) {
				return $node;
			} else {
				return null;
			}
		} else {
			return $userFolder->newFolder('/Text');
		}
	}

	private function getOrCreateAttachmentDirectoryForFile(File $textFile): ?Folder {
		$owner = $textFile->getOwner();
		$ownerId = $owner->getUID();
		$ownerUserFolder = $this->rootFolder->getUserFolder($ownerId);
		$ownerTextFile = $ownerUserFolder->getById($textFile->getId());
		if (count($ownerTextFile) > 0) {
			$ownerTextFile = $ownerTextFile[0];
			$ownerParentFolder = $ownerTextFile->getParent();
			$attachmentFolderName = '.' . $textFile->getId();
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
	 * @param int $textFileId
	 * @param string $userId
	 * @return Folder|null
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 * @throws \OC\User\NoUserException
	 */
	private function getOrCreateAttachmentDirectory(int $textFileId, string $userId): ?Folder {
		$userFolder = $this->rootFolder->getUserFolder($userId);
		$textFile = $userFolder->getById($textFileId);
		if (count($textFile) > 0 && $textFile[0] instanceof File) {
			$textFile = $textFile[0];
			return $this->getOrCreateAttachmentDirectoryForFile($textFile);
		}
		return null;
	}

	private function getOrCreateAttachmentDirectoryPublic(?int $textFileId, string $token): ?Folder {
		// $textFile = $this->rootFolder->getById($textFileId);
		// is the file shared with this token?
		try {
			$share = $this->shareManager->getShareByToken($token);
			if ($share->getShareType() === IShare::TYPE_LINK) {
				// shared file or folder?
				if ($share->getNodeType() === 'file') {
					$textFile = $share->getNode();
					if ($textFile instanceof File) {
						return $this->getOrCreateAttachmentDirectoryForFile($textFile);
					}
				} elseif ($share->getNodeType() === 'folder' && $textFileId !== null) {
					$folder = $share->getNode();
					if ($folder instanceof Folder) {
						$textFile = $folder->getById($textFileId);
						if (count($textFile) > 0 && $textFile[0] instanceof File) {
							$textFile = $textFile[0];
							return $this->getOrCreateAttachmentDirectoryForFile($textFile);
						}
					}
				}
			}
		} catch (ShareNotFound $e) {
			return null;
		}
		return null;
	}

	private function simpleDownload(string $url, $resource, array $params = [], string $method = 'GET'): array {
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
				if ($method === 'GET') {
					$paramsContent = http_build_query($params);
					$url .= '?' . $paramsContent;
				} else {
					$options['body'] = json_encode($params);
				}
			}

			if ($method === 'GET') {
				$response = $client->get($url, $options);
			} elseif ($method === 'POST') {
				$response = $client->post($url, $options);
			} elseif ($method === 'PUT') {
				$response = $client->put($url, $options);
			} elseif ($method === 'DELETE') {
				$response = $client->delete($url, $options);
			} else {
				return ['error' => 'Bad HTTP method'];
			}
			$respCode = $response->getStatusCode();

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
			$this->logger->warning('Impossible to download image: '.$e->getMessage(), ['app' => Application::APP_NAME]);
			return ['error' => 'Impossible to download image'];
		} catch (ConnectException $e) {
			$this->logger->error('Connection error: ' . $e->getMessage(), ['app' => Application::APP_NAME]);
			return ['error' => 'Connection error'];
		} catch (Throwable | Exception $e) {
			$this->logger->error('Unknown error: ' . $e->getMessage(), ['app' => Application::APP_NAME]);
			return ['error' => 'Unknown error'];
		}
	}
}
