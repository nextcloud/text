<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Service\RuntimeManifest;
use OCP\AppFramework\ApiController;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

class EmbeddingController extends ApiController {
	public function __construct(
		string $appName,
		IRequest $request,
		private RuntimeManifest $manifest,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	public function get(): DataResponse {
		$manifest = $this->manifest->get();
		$response = new DataResponse($manifest ?? [], $manifest === null ? 503 : 200);
		$response->addHeader('Cache-Control', 'no-store');
		return $response;
	}
}
