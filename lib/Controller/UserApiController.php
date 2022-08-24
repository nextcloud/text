<?php

namespace OCA\Text\Controller;

use \OCP\AppFramework\ApiController;
use OCP\Collaboration\Collaborators\ISearch;
use \OCP\IRequest;
use OCP\Share\IShare;

class UserApiController extends ApiController {

	protected ISearch $collaboratorSearch;

    public function __construct($appName, IRequest $request, ISearch $ISearch) {
        parent::__construct($appName, $request);

        $this->collaboratorSearch = $ISearch;
    }

    /**
     * @NoAdminRequired
     * @param string $filter
     */
    public function index(string $filter, int $limit = 5) {
		$users = [];
		[$result] = $this->collaboratorSearch->search($filter, [IShare::TYPE_USER], false, $limit, 0);

        foreach ($result['users'] as ['label' => $label, 'value' => $value]) {
			if (isset($value['shareWith'])) {
				$id = $value['shareWith'];
            	$users[$id] = $label;
			}
        }

		return $users;
	}

}