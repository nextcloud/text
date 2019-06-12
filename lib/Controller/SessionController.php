<?php
declare(strict_types=1);


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
	public function create(int $fileId = null, string $file = null, $forceRecreate = false): DataResponse {
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
