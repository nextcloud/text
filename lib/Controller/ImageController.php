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

namespace OCA\Text\Controller;

use Exception;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Http;
use OCA\Text\Service\ImageService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataDisplayResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

class ImageController extends Controller {
	public const IMAGE_MIME_TYPES = [
		'image/png',
		'image/jpeg',
		'image/jpg',
		'image/gif',
		'image/x-xbitmap',
		'image/x-ms-bmp',
		'image/bmp',
		'image/svg+xml',
		'image/webp',
	];

	/**
	 * @var string|null
	 */
	private $userId;
	/**
	 * @var ImageService
	 */
	private $imageService;
	/**
	 * @var LoggerInterface
	 */
	private $logger;
	/**
	 * @var SessionService
	 */
	private $sessionService;

	public function __construct(string $appName,
								IRequest $request,
								LoggerInterface $logger,
								ImageService $imageService,
								SessionService $sessionService,
								?string $userId) {
		parent::__construct($appName, $request);
		$this->userId = $userId;
		$this->imageService = $imageService;
		$this->request = $request;
		$this->logger = $logger;
		$this->sessionService = $sessionService;
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 *
	 * @param int $documentId
	 * @param int $sessionId
	 * @param string $sessionToken
	 * @param string $imagePath
	 * @return DataResponse
	 */
	public function insertImageFile(int $documentId, int $sessionId, string $sessionToken, string $imagePath): DataResponse {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}
		$session = $this->sessionService->getSession($documentId, $sessionId, $sessionToken);
		$userId = $session->getUserId();

		try {
			$insertResult = $this->imageService->insertImageFile($documentId, $imagePath, $userId);
			if (isset($insertResult['error'])) {
				return new DataResponse($insertResult, Http::STATUS_BAD_REQUEST);
			} else {
				return new DataResponse($insertResult);
			}
		} catch (Exception $e) {
			$this->logger->error('File insertion error', ['exception' => $e]);
			return new DataResponse(['error' => 'File insertion error'], Http::STATUS_BAD_REQUEST);
		}
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 *
	 * @param string $link
	 * @param int $documentId
	 * @param int $sessionId
	 * @param string $sessionToken
	 * @param string|null $shareToken
	 * @return DataResponse
	 */
	public function insertImageLink(string $link, int $documentId, int $sessionId, string $sessionToken, ?string $shareToken = null): DataResponse {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}

		try {
			if ($shareToken) {
				$downloadResult = $this->imageService->insertImageLinkPublic($documentId, $link, $shareToken);
			} else {
				$session = $this->sessionService->getSession($documentId, $sessionId, $sessionToken);
				$userId = $session->getUserId();
				$downloadResult = $this->imageService->insertImageLink($documentId, $link, $userId);
			}
			if (isset($downloadResult['error'])) {
				return new DataResponse($downloadResult, Http::STATUS_BAD_REQUEST);
			} else {
				return new DataResponse($downloadResult);
			}
		} catch (Exception $e) {
			$this->logger->error('Link insertion error', ['exception' => $e]);
			return new DataResponse(['error' => 'Link insertion error'], Http::STATUS_BAD_REQUEST);
		}
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 *
	 * @param int $documentId
	 * @param int $sessionId
	 * @param string $sessionToken
	 * @param string|null $shareToken
	 * @return DataResponse
	 */
	public function uploadImage(int $documentId, int $sessionId, string $sessionToken, ?string $shareToken = null): DataResponse {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}

		try {
			$file = $this->request->getUploadedFile('image');
			if ($file !== null && isset($file['tmp_name'], $file['name'], $file['type'])) {
				if (!in_array($file['type'], self::IMAGE_MIME_TYPES)) {
					return new DataResponse(['error' => 'Image type not supported'], Http::STATUS_BAD_REQUEST);
				}
				$newFileContent = file_get_contents($file['tmp_name']);
				$newFileName = $file['name'];
				if ($shareToken) {
					$uploadResult = $this->imageService->uploadImagePublic($documentId, $newFileName, $newFileContent, $shareToken);
				} else {
					$session = $this->sessionService->getSession($documentId, $sessionId, $sessionToken);
					$userId = $session->getUserId();
					$uploadResult = $this->imageService->uploadImage($documentId, $newFileName, $newFileContent, $userId);
				}
				if (isset($uploadResult['error'])) {
					return new DataResponse($uploadResult, Http::STATUS_BAD_REQUEST);
				} else {
					return new DataResponse($uploadResult);
				}
			} else {
				return new DataResponse(['error' => 'No uploaded file'], Http::STATUS_BAD_REQUEST);
			}
		} catch (Exception $e) {
			$this->logger->error('Upload error', ['exception' => $e]);
			return new DataResponse(['error' => 'Upload error'], Http::STATUS_BAD_REQUEST);
		}
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 *
	 * Serve the images in the editor
	 * @param int $documentId
	 * @param int $sessionId
	 * @param string $sessionToken
	 * @param string|null $shareToken
	 * @param string $imageFileName
	 * @return DataDisplayResponse
	 * @throws \OCP\Files\InvalidPathException
	 * @throws \OCP\Files\NotFoundException
	 * @throws \OCP\Files\NotPermittedException
	 * @throws \OCP\Lock\LockedException
	 */
	public function getImage(int $documentId, int $sessionId, string $sessionToken, ?string $shareToken = null, string $imageFileName): DataDisplayResponse {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataDisplayResponse('', Http::STATUS_NOT_FOUND);
		}

		if ($shareToken) {
			$imageFile = $this->imageService->getImagePublic($documentId, $imageFileName, $shareToken);
		} else {
			$imageFile = $this->imageService->getImage($documentId, $imageFileName, $this->userId);
		}
		if ($imageFile !== null) {
			return new DataDisplayResponse($imageFile->getContent(), Http::STATUS_OK, ['Content-Type' => $imageFile->getMimeType()]);
		} else {
			return new DataDisplayResponse('', Http::STATUS_NOT_FOUND);
		}
	}
}
