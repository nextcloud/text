<?php

declare(strict_types=1);

namespace OCA\Text\Controller;

use OCA\Text\Middleware\Attribute\RequireDocumentSession;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\ApiController;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\DataResponse;
use OCP\Collaboration\Collaborators\ISearch;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\Share\IShare;

class UserApiController extends ApiController implements ISessionAwareController {
	use TSessionAwareController;

	public function __construct(
		string $appName,
		IRequest $request,
		private SessionService $sessionService,
		private ISearch $collaboratorSearch,
		private IUserManager $userManager
	) {
		parent::__construct($appName, $request);
	}

	#[PublicPage]
	#[NoAdminRequired]
	#[RequireDocumentSession]
	public function index(string $filter = '', int $limit = 5): DataResponse {
		$sessions = $this->sessionService->getAllSessions($this->getSession()->getDocumentId());

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

		if (!$this->getSession()->isGuest()) {
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
