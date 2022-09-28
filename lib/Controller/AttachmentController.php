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
use OCA\Text\Exception\UploadException;
use OCP\AppFramework\Http;
use OCA\Text\Service\AttachmentService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataDownloadResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\RedirectResponse;
use OCP\Files\IMimeTypeDetector;
use OCP\IL10N;
use OCP\IRequest;
use OCP\Util;
use Psr\Log\LoggerInterface;

class AttachmentController extends Controller {
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
		'image/heic',
		'image/heif',
	];
	public const BROWSER_SUPPORTED_IMAGE_MIME_TYPES = [
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

	private AttachmentService $attachmentService;
	private LoggerInterface $logger;
	private SessionService $sessionService;
	private IL10N $l10n;
	private IMimeTypeDetector $mimeTypeDetector;

	public function __construct(string $appName,
								IRequest $request,
								IL10N $l10n,
								LoggerInterface $logger,
								IMimeTypeDetector $mimeTypeDetector,
								AttachmentService $attachmentService,
								SessionService $sessionService) {
		parent::__construct($appName, $request);
		$this->attachmentService = $attachmentService;
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
	 * @param string $filePath
	 * @return DataResponse
	 */
	public function insertAttachmentFile(int $documentId, int $sessionId, string $sessionToken, string $filePath): DataResponse {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataResponse([], Http::STATUS_FORBIDDEN);
		}
		$userId = $this->getUserIdFromSession($documentId, $sessionId, $sessionToken);

		try {
			$insertResult = $this->attachmentService->insertAttachmentFile($documentId, $filePath, $userId);
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
	 * @param int $documentId
	 * @param int $sessionId
	 * @param string $sessionToken
	 * @param string|null $shareToken
	 * @return DataResponse
	 */
	public function uploadAttachment(int $documentId, int $sessionId, string $sessionToken, ?string $shareToken = null): DataResponse {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			$this->logger->debug('Invalid session found when uploading', [
				'documentId' => $documentId,
				'sessionId' => $sessionId,
				'sessionToken' => $sessionToken
			]);
			return new DataResponse(['error' => 'Upload error, unauthorized action'], Http::STATUS_FORBIDDEN);
		}

		try {
			$file = $this->getUploadedFile('file');
			if (isset($file['tmp_name'], $file['name'], $file['type'])) {
				$newFileResource = fopen($file['tmp_name'], 'rb');
				if ($newFileResource === false) {
					throw new Exception('Could not read file');
				}
				$newFileName = $file['name'];
				if ($shareToken) {
					$uploadResult = $this->attachmentService->uploadAttachmentPublic($documentId, $newFileName, $newFileResource, $shareToken);
				} else {
					$userId = $this->getUserIdFromSession($documentId, $sessionId, $sessionToken);
					$uploadResult = $this->attachmentService->uploadAttachment($documentId, $newFileName, $newFileResource, $userId);
				}
				if (isset($uploadResult['error'])) {
					return new DataResponse($uploadResult, Http::STATUS_BAD_REQUEST);
				} else {
					return new DataResponse($uploadResult);
				}
			}
			return new DataResponse(['error' => 'No uploaded file'], Http::STATUS_BAD_REQUEST);
		} catch (Exception $e) {
			$this->logger->error('Upload error', ['exception' => $e]);
			return new DataResponse(['error' => 'Upload error'], Http::STATUS_BAD_REQUEST);
		}
	}

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
	 * Serve the image files in the editor
	 * @param int $documentId
	 * @param int $sessionId
	 * @param string $sessionToken
	 * @param string $imageFileName
	 * @param string|null $shareToken
	 * @param int $preferRawImage
	 * @return DataDownloadResponse|DataResponse
	 */
	public function getImageFile(int $documentId, int $sessionId, string $sessionToken, string $imageFileName, ?string $shareToken = null,
								int $preferRawImage = 0) {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataResponse('', Http::STATUS_FORBIDDEN);
		}

		try {
			if ($shareToken) {
				$imageFile = $this->attachmentService->getImageFilePublic($documentId, $imageFileName, $shareToken, $preferRawImage === 1);
			} else {
				$userId = $this->getUserIdFromSession($documentId, $sessionId, $sessionToken);
				$imageFile = $this->attachmentService->getImageFile($documentId, $imageFileName, $userId, $preferRawImage === 1);
			}
			return $imageFile !== null
				? new DataDownloadResponse(
					$imageFile->getContent(),
					(string) Http::STATUS_OK,
					$this->getSecureMimeType($imageFile->getMimeType())
				)
				: new DataResponse('', Http::STATUS_NOT_FOUND);
		} catch (Exception $e) {
			$this->logger->error('getImageFile error', ['exception' => $e]);
			return new DataResponse('', Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 *
	 * Serve the media files in the editor
	 * @param int $documentId
	 * @param int $sessionId
	 * @param string $sessionToken
	 * @param string $mediaFileName
	 * @param string|null $shareToken
	 * @return DataDownloadResponse|DataResponse
	 */
	public function getMediaFile(int $documentId, int $sessionId, string $sessionToken, string $mediaFileName, ?string $shareToken = null) {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataResponse('', Http::STATUS_FORBIDDEN);
		}

		try {
			if ($shareToken) {
				$mediaFile = $this->attachmentService->getMediaFilePublic($documentId, $mediaFileName, $shareToken);
			} else {
				$userId = $this->getUserIdFromSession($documentId, $sessionId, $sessionToken);
				$mediaFile = $this->attachmentService->getMediaFile($documentId, $mediaFileName, $userId);
			}
			return $mediaFile !== null
				? new DataDownloadResponse(
					$mediaFile->getContent(),
					(string) Http::STATUS_OK,
					$this->getSecureMimeType($mediaFile->getMimeType())
				)
				: new DataResponse('', Http::STATUS_NOT_FOUND);
		} catch (Exception $e) {
			$this->logger->error('getMediaFile error', ['exception' => $e]);
			return new DataResponse('', Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 *
	 * Serve the media files preview in the editor
	 * @param int $documentId
	 * @param int $sessionId
	 * @param string $sessionToken
	 * @param string $mediaFileName
	 * @param string|null $shareToken
	 * @return DataDownloadResponse|DataResponse|RedirectResponse
	 */
	public function getMediaFilePreview(int $documentId, int $sessionId, string $sessionToken, string $mediaFileName, ?string $shareToken = null) {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataResponse('', Http::STATUS_FORBIDDEN);
		}

		try {
			if ($shareToken) {
				$preview = $this->attachmentService->getMediaFilePreviewPublic($documentId, $mediaFileName, $shareToken);
			} else {
				$userId = $this->getUserIdFromSession($documentId, $sessionId, $sessionToken);
				$preview = $this->attachmentService->getMediaFilePreview($documentId, $mediaFileName, $userId);
			}
			if ($preview === null) {
				return new DataResponse('', Http::STATUS_NOT_FOUND);
			}
			if ($preview['type'] === 'file') {
				return new DataDownloadResponse(
					$preview['file']->getContent(),
					(string) Http::STATUS_OK,
					$this->getSecureMimeType($preview['file']->getMimeType())
				);
			} elseif ($preview['type'] === 'icon') {
				return new RedirectResponse($preview['iconUrl']);
			}
		} catch (Exception $e) {
			$this->logger->error('getMediaFilePreview error', ['exception' => $e]);
		}
		return new DataResponse('', Http::STATUS_NOT_FOUND);
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 *
	 * Serve the media files metadata in the editor
	 * @param int $documentId
	 * @param int $sessionId
	 * @param string $sessionToken
	 * @param string $mediaFileName
	 * @param string|null $shareToken
	 * @return DataResponse
	 */
	public function getMediaFileMetadata(int $documentId, int $sessionId, string $sessionToken,
										 string $mediaFileName, ?string $shareToken = null): DataResponse {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataResponse('', Http::STATUS_FORBIDDEN);
		}

		try {
			if ($shareToken) {
				$metadata = $this->attachmentService->getMediaFileMetadataPublic($documentId, $mediaFileName, $shareToken);
			} else {
				$userId = $this->getUserIdFromSession($documentId, $sessionId, $sessionToken);
				$metadata = $this->attachmentService->getMediaFileMetadataPrivate($documentId, $mediaFileName, $userId);
			}
			if ($metadata === null) {
				return new DataResponse('', Http::STATUS_NOT_FOUND);
			}
			return new DataResponse($metadata);
		} catch (Exception $e) {
			$this->logger->error('getMediaFileMetadata error', ['exception' => $e]);
			return new DataResponse('', Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * Extract the user ID from the edition session
	 *
	 * @param int $documentId
	 * @param int $sessionId
	 * @param string $sessionToken
	 * @return ?string
	 */
	private function getUserIdFromSession(int $documentId, int $sessionId, string $sessionToken): ?string {
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
