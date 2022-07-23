<?php

namespace OCA\Text\Controller;

use \OCP\AppFramework\ApiController;
use \OCP\IRequest;
use \OCP\IUserManager;

class UserApiController extends ApiController {

    protected IUserManager $userManager;

    public function __construct($appName, IRequest $request, IUserManager $userManager) {
        parent::__construct($appName, $request);

        $this->userManager = $userManager;
    }

    /**
     * @param string $filter
     */
    public function index(string $filter) {
		$result = [];

        $users = $this->userManager->search($filter, 5);
        foreach ($users as $user) {
            $result[$user->getUID()] = $user->getDisplayName();
        }

		return $result;
	}

}