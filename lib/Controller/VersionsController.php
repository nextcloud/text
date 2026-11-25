<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Service\VersionAccessService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\IRequest;
use OCP\IUserSession;

class VersionsController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private readonly VersionAccessService $versionAccessService,
		private readonly IRootFolder $rootFolder,
		private readonly IUserSession $userSession,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * The current file and its retained versions, for choosing what to compare
	 *
	 * Every refusal is the same 404, so the answer does not tell a missing
	 * file from one the user may not compare.
	 */
	#[NoAdminRequired]
	public function index(int $fileId): DataResponse {
		$user = $this->userSession->getUser();
		if ($user === null) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}
		try {
			$file = $this->versionAccessService->resolveFile($user, $fileId);
			$versions = $this->versionAccessService->listVersions($user, $file);
		} catch (NotFoundException) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}
		$path = $this->rootFolder->getUserFolder($user->getUID())->getRelativePath($file->getPath());
		return new DataResponse([
			'fileId' => $fileId,
			'path' => $path,
			'versions' => $versions,
			// Without Files Versions there is only ever the current file
			'versionsAvailable' => $this->versionAccessService->hasVersions(),
		]);
	}
}
