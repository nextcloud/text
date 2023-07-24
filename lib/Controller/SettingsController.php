<?php
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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
		'workspace_enabled'
	];

	public function __construct(string $appName, IRequest $request, private IConfig $config, private ?string $userId) {
		parent::__construct($appName, $request);
	}

	/**
	 * @throws \OCP\PreConditionNotMetException
	 *
	 * @psalm-return DataResponse<200|400, array{workspace_enabled?: mixed, message?: 'Invalid config key'}, array<never, never>>
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
