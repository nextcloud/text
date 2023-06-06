<?php

namespace OCA\Text\Controller;

use OCA\Text\Service\SessionService;
use OCP\AppFramework\ApiController;
use OCP\AppFramework\Http\DataResponse;
use OCP\Collaboration\Collaborators\ISearch;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\Share\IShare;

class UserApiController extends ApiController {
	private ISearch $collaboratorSearch;
	private IUserManager $userManager;
	private SessionService $sessionService;

	public function __construct($appName, IRequest $request, SessionService $sessionService, ISearch $ISearch, IUserManager $userManager) {
		parent::__construct($appName, $request);

		$this->sessionService = $sessionService;
		$this->collaboratorSearch = $ISearch;
		$this->userManager = $userManager;
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 */
	public function index(int $documentId, int $sessionId, string $sessionToken, string $filter, int $limit = 5): DataResponse {
		if (!$this->sessionService->isValidSession($documentId, $sessionId, $sessionToken)) {
			return new DataResponse([], 403);
		}

		$sessions = $this->sessionService->getAllSessions($documentId);

		$users = [];

		// Add joined users to the autocomplete list
		foreach ($sessions as $session) {
			$sessionUserId = $session['userId'];
			if ($sessionUserId !== null && !isset($users[$sessionUserId])) {
				$displayName = $this->userManager->getDisplayName($sessionUserId);
				if ($displayName && stripos($displayName, $filter) !== false || stripos($sessionUserId, $filter) !== false) {
					$users[$sessionUserId] = $displayName;
				}
			}
		}

		$currentSession = $this->sessionService->getSession($documentId, $sessionId, $sessionToken);
		if ($currentSession->getUserId() !== null) {
			// Add other users to the autocomplete list
			[$result] = $this->collaboratorSearch->search($filter, [IShare::TYPE_USER], false, $limit, 0);
			$userSearch = array_merge($result['users'], $result['exact']['users']);

			foreach ($userSearch as ['label' => $label, 'value' => $value]) {
				if (isset($value['shareWith'])) {
					$id = $value['shareWith'];
					$users[$id] = $label;
				}
			}
		}

		return new DataResponse($users);
	}
}
