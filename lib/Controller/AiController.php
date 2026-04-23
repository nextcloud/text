<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Service\AiTagService;
use OCP\AppFramework\ApiController;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;

class AiController extends ApiController {
	public function __construct(
		string $appName,
		IRequest $request,
		private AiTagService $aiTagService,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	public function tagFile(int $fileId): DataResponse {
		$this->aiTagService->tagFileAsAiGenerated($fileId);
		return new DataResponse([]);
	}
}
