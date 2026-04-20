<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use Exception;
use OCA\Text\Exception\InvalidSessionException;
use OCA\Text\Exception\UploadException;
use OCA\Text\Middleware\Attribute\RequireDocumentSession;
use OCA\Text\Middleware\Attribute\RequireDocumentSessionOrUserOrShareToken;
use OCA\Text\Service\AttachmentService;
use OCP\AppFramework\ApiController;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\DataDownloadResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\RedirectResponse;
use OCP\Files\IMimeTypeDetector;
use OCP\Files\InvalidPathException;
use OCP\IL10N;
use OCP\IRequest;
use OCP\Util;
use Psr\Log\LoggerInterface;

class AttachmentController extends ApiController implements ISessionAwareController {
	use TSessionAwareController;
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

	public function __construct(
		string $appName,
		IRequest $request,
		private IL10N $l10n,
		private LoggerInterface $logger,
		private IMimeTypeDetector $mimeTypeDetector,
		private AttachmentService $attachmentService,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentSessionOrUserOrShareToken]
	public function getAttachmentList(string $shareToken = ''): DataResponse {
		$documentId = $this->getDocumentId();
		try {
			$session = $this->getSession();
		} catch (InvalidSessionException) {
			$session = null;
		}

		if ($shareToken) {
			$attachments = $this->attachmentService->getAttachmentList($documentId, null, $session, $shareToken);
		} else {
			$userId = $this->getUserId();
			$attachments = $this->attachmentService->getAttachmentList($documentId, $userId, $session);
		}

		return new DataResponse($attachments);
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentSession]
	public function insertAttachmentFile(string $filePath): DataResponse {
		$userId = $this->getSession()->getUserId();

		try {
			$insertResult = $this->attachmentService->insertAttachmentFile($this->getSession()->getDocumentId(), $filePath, $userId);
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

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentSession]
	public function uploadAttachment(string $token = ''): DataResponse {
		$documentId = $this->getSession()->getDocumentId();

		try {
			$file = $this->getUploadedFile('file');
			if (isset($file['tmp_name'], $file['name'], $file['type'])) {
				$newFileResource = fopen($file['tmp_name'], 'rb');
				if ($newFileResource === false) {
					throw new Exception('Could not read file');
				}
				$newFileName = $file['name'];
				if ($token) {
					$uploadResult = $this->attachmentService->uploadAttachmentPublic($documentId, $newFileName, $newFileResource, $token);
				} else {
					$userId = $this->getSession()->getUserId();
					$uploadResult = $this->attachmentService->uploadAttachment($documentId, $newFileName, $newFileResource, $userId);
				}
				if (isset($uploadResult['error'])) {
					return new DataResponse($uploadResult, Http::STATUS_BAD_REQUEST);
				} else {
					return new DataResponse($uploadResult);
				}
			}
			return new DataResponse(['error' => 'No uploaded file'], Http::STATUS_BAD_REQUEST);
		} catch (InvalidPathException $e) {
			$this->logger->error('Upload error', ['exception' => $e]);
			$error = $e->getMessage() ?: 'Upload error';
			return new DataResponse(['error' => $error], Http::STATUS_BAD_REQUEST);
		} catch (Exception $e) {
			$this->logger->error('Upload error', ['exception' => $e]);
			return new DataResponse(['error' => 'Upload error'], Http::STATUS_BAD_REQUEST);
		}
	}

	#[NoAdminRequired]
	#[PublicPage]
	#[RequireDocumentSession]
	public function createAttachment(string $token = ''): DataResponse {
		$documentId = $this->getSession()->getDocumentId();
		try {
			$userId = $this->getSession()->getUserId();
			$newFileName = $this->request->getParam('fileName', 'text.md');
			$createResult = $this->attachmentService->createAttachmentFile($documentId, $newFileName, $userId);
			if (isset($createResult['error'])) {
				return new DataResponse($createResult, Http::STATUS_BAD_REQUEST);
			} else {
				return new DataResponse($createResult);
			}
		} catch (InvalidPathException $e) {
			$this->logger->error('File creation error', ['exception' => $e]);
			$error = $e->getMessage() ?: 'Upload error';
			return new DataResponse(['error' => $error], Http::STATUS_BAD_REQUEST);
		} catch (Exception $e) {
			$this->logger->error('File creation error', ['exception' => $e]);
			return new DataResponse(['error' => 'File creation error'], Http::STATUS_BAD_REQUEST);
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
	 * Serve the image files in the editor
	 *
	 * @return DataDownloadResponse|DataResponse
	 *
	 * @psalm-return DataDownloadResponse<200, string, array<never, never>>|DataResponse<404, '', array<never, never>>
	 */
	#[NoAdminRequired]
	#[PublicPage]
	#[NoCSRFRequired]
	#[RequireDocumentSessionOrUserOrShareToken]
	public function getImageFile(string $imageFileName, string $shareToken = '',
		int $preferRawImage = 0): DataResponse|DataDownloadResponse {
		$documentId = $this->getDocumentId();

		try {
			if ($shareToken) {
				$imageFile = $this->attachmentService->getImageFilePublic($documentId, $imageFileName, $shareToken, $preferRawImage === 1);
			} else {
				$userId = $this->getUserId();
				$imageFile = $this->attachmentService->getImageFile($documentId, $imageFileName, $userId, $preferRawImage === 1);
			}

			if ($imageFile !== null) {
				$response = new DataDownloadResponse(
					$imageFile->getContent(),
					$imageFile->getName(),
					$this->getSecureMimeType($imageFile->getMimeType())
				);
				$response->cacheFor(3600 * 24, false, true);
				return $response;
			}

			return  new DataResponse('', Http::STATUS_NOT_FOUND);
		} catch (Exception $e) {
			$this->logger->error('getImageFile error', ['exception' => $e]);
			return new DataResponse('', Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * Serve the media files in the editor
	 *
	 * @return DataDownloadResponse|DataResponse
	 *
	 * @psalm-return DataDownloadResponse<200, string, array<never, never>>|DataResponse<404, '', array<never, never>>
	 */
	#[NoAdminRequired]
	#[PublicPage]
	#[NoCSRFRequired]
	#[RequireDocumentSessionOrUserOrShareToken]
	public function getMediaFile(string $mediaFileName, string $shareToken = ''): DataResponse|DataDownloadResponse {
		$documentId = $this->getDocumentId();

		try {
			if ($shareToken) {
				$mediaFile = $this->attachmentService->getMediaFilePublic($documentId, $mediaFileName, $shareToken);
			} else {
				$userId = $this->getUserId();
				$mediaFile = $this->attachmentService->getMediaFile($documentId, $mediaFileName, $userId);
			}
			return $mediaFile !== null
				? new DataDownloadResponse(
					$mediaFile->getContent(),
					$mediaFile->getName(),
					$this->getSecureMimeType($mediaFile->getMimeType())
				)
				: new DataResponse('', Http::STATUS_NOT_FOUND);
		} catch (Exception $e) {
			$this->logger->error('getMediaFile error', ['exception' => $e]);
			return new DataResponse('', Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * Serve the media files preview in the editor
	 * @return DataDownloadResponse|DataResponse|RedirectResponse
	 */
	#[NoAdminRequired]
	#[PublicPage]
	#[NoCSRFRequired]
	#[RequireDocumentSessionOrUserOrShareToken]
	public function getMediaFilePreview(string $mediaFileName, string $shareToken = '') {
		$documentId = $this->getDocumentId();

		try {
			if ($shareToken) {
				$preview = $this->attachmentService->getMediaFilePreviewPublic($documentId, $mediaFileName, $shareToken);
			} else {
				$userId = $this->getUserId();
				$preview = $this->attachmentService->getMediaFilePreview($documentId, $mediaFileName, $userId);
			}
			if ($preview === null) {
				return new DataResponse('', Http::STATUS_NOT_FOUND);
			}
			if ($preview['type'] === 'file') {
				return new DataDownloadResponse(
					$preview['file']->getContent(),
					$mediaFileName,
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
