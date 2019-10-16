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

use OC\Authentication\Exceptions\InvalidTokenException;
use OCA\Text\Service\ApiService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\PublicShareController;
use OCP\DirectEditing\IManager;
use OCP\ISession;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager as ShareManager;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use OCP\Share\IShare;

class DirectSessionController extends Controller {

	/** @var ShareManager */
	private $shareManager;

	/** @var IShare */
	private $share;

	/** @var ApiService */
	private $apiService;
	/**  @var IManager */
	private $directManager;

	public function __construct(string $appName, IRequest $request, ShareManager $shareManager, ApiService $apiService, IManager $directManager) {
		parent::__construct($appName, $request);
		$this->shareManager = $shareManager;
		$this->apiService = $apiService;
		$this->directManager = $directManager;
	}

	/**
	 * @PublicPage
	 */
	public function create(string $token, string $file = null, $guestName = null, bool $forceRecreate = false): DataResponse {
		try {
			$tokenObject = $this->directManager->getToken($token);
			$tokenObject->extend();
			$tokenObject->useTokenScope();
			$node = $tokenObject->getFile();
			$node->touch();
			return new DataResponse([
				'mtime' => $node->getMTime()
			]);
		} catch (InvalidTokenException $e) {
			return new DataResponse('error');
		}
		//return $this->apiService->create(null, $file, $token, $guestName, $forceRecreate);
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function fetch(int $documentId, string $sessionId, string $sessionToken): Response {
		return $this->apiService->fetch($documentId, $sessionId, $sessionToken);
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function close(int $documentId, int $sessionId, string $sessionToken): DataResponse {
		return $this->apiService->close($documentId, $sessionId, $sessionToken);
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function push(int $documentId, int $sessionId, string $sessionToken, int $version, array $steps, string $token): DataResponse {
		return $this->apiService->push($documentId, $sessionId, $sessionToken, $version, $steps, $token);
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function sync(string $token, int $documentId, int $sessionId, string $sessionToken, int $version = 0, string $autosaveContent = null, bool $force = false, bool $manualSave = false): DataResponse {
		return $this->apiService->sync($documentId, $sessionId, $sessionToken, $version, $autosaveContent, $force, $manualSave, $token);
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function updateSession(int $documentId, int $sessionId, string $sessionToken, string $guestName) {
		return $this->apiService->updateSession($documentId, $sessionId, $sessionToken, $guestName);
	}

}
