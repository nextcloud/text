<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Middleware\Attribute\RequireDocumentSession;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\ApiController;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\PublicPage;
use OCP\AppFramework\Http\DataResponse;
use OCP\Collaboration\AutoComplete\AutoCompleteFilterEvent;
use OCP\Collaboration\Collaborators\ISearch;
use OCP\EventDispatcher\IEventDispatcher;
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
		private IUserManager $userManager,
		private IEventDispatcher $dispatcher,
	) {
		parent::__construct($appName, $request);
	}

	#[PublicPage]
	#[NoAdminRequired]
	#[RequireDocumentSession]
	public function index(string $filter = '', int $limit = 5): DataResponse {
		$limit = min($limit, 50);
		$sessions = $this->sessionService->getAllSessions($this->getSession()->getDocumentId());

		$users = [];

		// Add joined users to the autocomplete list
		foreach ($sessions as $session) {
			$sessionUserId = $session['userId'];
			if ($sessionUserId === null || isset($users[$sessionUserId])) {
				continue;
			}
			$displayName = $this->userManager->getDisplayName($sessionUserId) ?? '';
			if (stripos($displayName, $filter) !== false || stripos($sessionUserId, $filter) !== false) {
				$users[$sessionUserId] = $displayName;
			}
		}

		if (!$this->getSession()->isGuest()) {
			// Add other users to the autocomplete list
			[$result] = $this->collaboratorSearch->search($filter, [IShare::TYPE_USER], false, $limit, 0);

			$event = new AutoCompleteFilterEvent(
				$result,
				$filter,
				'user',
				null,
				null,
				[IShare::TYPE_USER],
				$limit,
			);
			$this->dispatcher->dispatchTyped($event);
			/** @var mixed $result */
			$result = $event->getResults();

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
