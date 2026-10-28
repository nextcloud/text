<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Context\FileContextFactory;
use OCA\Text\Service\ApiService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\DirectEditing\IManager;
use OCP\Files\InvalidPathException;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\IUserSession;
use Psr\Log\LoggerInterface;

class DirectEditingController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private readonly IManager $directEditingManager,
		private readonly IUserSession $userSession,
		private readonly ApiService $apiService,
		private readonly IUserManager $userManager,
		private readonly FileContextFactory $fileContextFactory,
		private readonly LoggerInterface $logger,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * Open a direct editing token and create an editing session.
	 *
	 * This allows navigating from one direct editing file to the next without reloading the page.
	 *
	 * Returns 200 with file metadata and session data if the token is found.
	 *
	 * @param string $url Direct editing url as provided by the server
	 */
	#[NoAdminRequired]
	#[PublicPage]
	public function edit(string $token): DataResponse {
		$token = $this->directEditingManager->getToken($token);
		try {
			$token->useTokenScope();
			$user = $this->userManager->get($token->getUser());
			if ($user === null) {
				throw new NotFoundException();
			}
			$file = $token->getFile();
			$context = $this->fileContextFactory->build($user, 'file', $file->getId(), $file);
			$session = $this->apiService->create($context, null);
			$this->logger->debug('Started direct editing session.', ['token' => $token->getToken()]);
			return new DataResponse([
				'fileId' => $token->getFile()->getId(),
				'mimetype' => $token->getFile()->getMimeType(),
				'session' => $session->getData(),
			]);
		} catch (InvalidPathException|NotFoundException|NotPermittedException) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		} finally {
			$this->revertTokenScope();
		}
	}

	private function revertTokenScope(): void {
		$this->userSession->setUser(null);
	}

}
