<?php
declare(strict_types=1);
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Text\Controller;

use OCA\Text\Service\ApiService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\Response;
use OCP\IRequest;

class SessionController extends Controller {

	/**
	 * @var ApiService
	 */
	private $apiService;

	public function __construct(string $appName, IRequest $request, ApiService $apiService) {
		parent::__construct($appName, $request);
		$this->apiService = $apiService;
	}

	/**
	 * @NoAdminRequired
	 */
	public function create(int $fileId = null, string $file = null, bool $forceRecreate = false): DataResponse {
		return $this->apiService->create($fileId, $file, null, null, $forceRecreate);
	}

	/**
	 * @NoAdminRequired
	 */
	public function fetch(int $documentId, int $sessionId, string $sessionToken): Response {
		return $this->apiService->fetch($documentId, $sessionId, $sessionToken);
	}

	/**
	 * @NoAdminRequired
	 */
	public function close(int $documentId, int $sessionId, string $sessionToken): DataResponse {
		return $this->apiService->close($documentId, $sessionId, $sessionToken);
	}

	/**
	 * @NoAdminRequired
	 */
	public function push(int $documentId, int $sessionId, string $sessionToken, int $version, array $steps): DataResponse {
		return $this->apiService->push($documentId, $sessionId, $sessionToken, $version, $steps);
	}

	/**
	 * @NoAdminRequired
	 */
	public function sync(int $documentId, int $sessionId, string $sessionToken, int $version = 0, string $autosaveContent = null, bool $force = false, bool $manualSave = false): DataResponse {
		return $this->apiService->sync($documentId, $sessionId, $sessionToken, $version, $autosaveContent, $force, $manualSave);
	}

}
