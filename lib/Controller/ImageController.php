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
use OCA\Text\UploadException;
use OCP\AppFramework\Http;
use OCA\Text\Service\ImageService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataDisplayResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\Files\IMimeTypeDetector;
use OCP\IL10N;
use OCP\IRequest;
use OCP\Util;
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
	/**
	 * @var IL10N
	 */
	private $l10n;
	/**
	 * @var IMimeTypeDetector
	 */
	private $mimeTypeDetector;

	public function __construct(string $appName,
								IRequest $request,
								IL10N $l10n,
								LoggerInterface $logger,
								IMimeTypeDetector $mimeTypeDetector,
								ImageService $imageService,
								SessionService $sessionService) {
		parent::__construct($appName, $request);
		$this->imageService = $imageService;
		$this->request = $request;
		$this->logger = $logger;
		$this->sessionService = $sessionService;
		$this->l10n = $l10n;
		$this->mimeTypeDetector = $mimeTypeDetector;
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
			return new DataResponse([], Http::STATUS_FORBIDDEN);
		}
		$userId = $this->getUserIdFromSession($documentId, $sessionId, $sessionToken);

		try {
			$insertResult = $this->imageService->insertImageFile($documentId, $imagePath, $userId);
			return new DataResponse($insertResult);
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
			return new DataResponse([], Http::STATUS_FORBIDDEN);
		}

		try {
			if ($shareToken) {
				$downloadResult = $this->imageService->insertImageLinkPublic($documentId, $link, $shareToken);
			} else {
				$userId = $this->getUserIdFromSession($documentId, $sessionId, $sessionToken);
				$downloadResult = $this->imageService->insertImageLink($documentId, $link, $userId);
			}
			return new DataResponse($downloadResult);
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
			return new DataResponse([], Http::STATUS_FORBIDDEN);
		}

		try {
			$file = $this->getUploadedFile('image');
			if (isset($file['tmp_name'], $file['name'], $file['type'])) {
				if (!in_array($file['type'], self::IMAGE_MIME_TYPES, true)) {
					return new DataResponse(['error' => 'Image type not supported'], Http::STATUS_BAD_REQUEST);
				}
				$newFileResource = fopen($file['tmp_name'], 'rb');
				if ($newFileResource === false) {
					throw new Exception('Could not read file');
				}
				$newFileName = $file['name'];
				if ($shareToken) {
					$uploadResult = $this->imageService->uploadImagePublic($documentId, $newFileName, $newFileResource, $shareToken);
				} else {
					$userId = $this->getUserIdFromSession($documentId, $sessionId, $sessionToken);
					$uploadResult = $this->imageService->uploadImage($documentId, $newFileName, $newFileResource, $userId);
				}
				return new DataResponse($uploadResult);
			}
			return new DataResponse(['error' => 'No uploaded file'], Http::STATUS_BAD_REQUEST);
		} catch (Exception $e) {
			$this->logger->error('Upload error', ['exception' => $e]);
			return new DataResponse(['error' => 'Upload error'], Http::STATUS_BAD_REQUEST);
		}
	}

	/**
	 * @return array
	 */
	private function getUploadedFile(string $key): array {
		$file = $this->request->getUploadedFile($key);
		$error = null;
		$phpFileUploadErrors = [
			UPLOAD_ERR_OK => $this->l10n->t('The file was uploaded'),
			UPLOAD_ERR_INI_SIZE => $this->l10n->t('The uploaded file exceeds the upload_max_filesize directive in php.ini'),
			UPLOAD_ERR_FORM_SIZE => $this->l10n->t('The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form'),
			UPLOAD_ERR_PARTIAL => $this->l10n->t('The file was only partially uploaded'),
			UPLOAD_ERR_NO_FILE => $this->l10n->t('No file was uploaded'),
			UPLOAD_ERR_NO_TMP_DIR => $this->l10n->t('Missing a temporary folder'),
			UPLOAD_ERR_CANT_WRITE => $this->l10n->t('Could not write file to disk'),
			UPLOAD_ERR_EXTENSION => $this->l10n->t('A PHP extension stopped the file upload'),
		];

		if (empty($file)) {
			$error = $this->l10n->t('No file uploaded or file size exceeds maximum of %s', [Util::humanFileSize(Util::uploadLimit())]);
		}
		if (!empty($file) && array_key_exists('error', $file) && $file['error'] !== UPLOAD_ERR_OK) {
			$error = $phpFileUploadErrors[$file['error']];
		}
		if ($error !== null) {
			throw new UploadException($error);
		}
		return $file;
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
	 * @param string $imageFileName
	 * @param string|null $shareToken
	 * @return DataDisplayResponse
	 */
	public function getImage(int $documentId, int $sessionId, string $sessionToken, string $imageFileName, ?string $shareToken = null): DataDisplayResponse {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataDisplayResponse('', Http::STATUS_FORBIDDEN);
		}

		try {
			if ($shareToken) {
				$imageFile = $this->imageService->getImagePublic($documentId, $imageFileName, $shareToken);
			} else {
				$userId = $this->getUserIdFromSession($documentId, $sessionId, $sessionToken);
				$imageFile = $this->imageService->getImage($documentId, $imageFileName, $userId);
			}
			return $imageFile !== null
				? new DataDisplayResponse(
					$imageFile->getContent(),
					Http::STATUS_OK,
					['Content-Type' => $this->getSecureMimeType($imageFile->getMimeType())]
				)
				: new DataDisplayResponse('', Http::STATUS_NOT_FOUND);
		} catch (Exception $e) {
			$this->logger->error('getImage error', ['exception' => $e]);
			return new DataDisplayResponse('', Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * Extract the user ID from the edition session
	 *
	 * @param int $documentId
	 * @param int $sessionId
	 * @param string $sessionToken
	 * @return string
	 */
	private function getUserIdFromSession(int $documentId, int $sessionId, string $sessionToken): string {
		$session = $this->sessionService->getSession($documentId, $sessionId, $sessionToken);
		return $session->getUserId();
	}

	/**
	 * Allow all supported mimetypes
	 * Use mimetype detector for the other ones
	 *
	 * @param string $mimetype
	 * @return string
	 */
	private function getSecureMimeType(string $mimetype): string {
		if (in_array($mimetype, self::IMAGE_MIME_TYPES)) {
			return $mimetype;
		}
		return $this->mimeTypeDetector->getSecureMimeType($mimetype);
	}
}
