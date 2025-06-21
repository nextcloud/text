<?php

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\AppInfo\Application;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataResponse;
use OCP\IConfig;
use OCP\IRequest;

class SettingsController extends Controller {
	public const ACCEPTED_KEYS = [
		'workspace_enabled',
		'is_full_width_editor'
	];

	public function __construct(
		string $appName,
		IRequest $request,
		private IConfig $config,
		private ?string $userId,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * @throws \OCP\PreConditionNotMetException
	 *
	 * @psalm-return DataResponse<200|400, array{workspace_enabled?: mixed, is_full_width_editor?: mixed, message?: 'Invalid config key'}, array<never, never>>
	 */
	#[NoAdminRequired]
	public function updateConfig(string $key, int|string $value): DataResponse {
		if (!in_array($key, self::ACCEPTED_KEYS, true)) {
			return new DataResponse(['message' => 'Invalid config key'], Http::STATUS_BAD_REQUEST);
		}
		/** @psalm-suppress PossiblyNullArgument */
		$this->config->setUserValue($this->userId, Application::APP_NAME, $key, (string)$value);
		return new DataResponse([
			$key => $value
		]);
	}
}
