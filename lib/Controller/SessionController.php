<?php
declare(strict_types=1);


namespace OCA\Text\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\FileDisplayResponse;
use OCP\Files\IRootFolder;
use OCP\ICacheFactory;
use OCP\IRequest;
use OCP\ITempManager;
use OCP\Security\ISecureRandom;

class SessionController extends Controller {


	private $userId;
	private $secureRandom;

	public function __construct(string $appName, IRequest $request, ICacheFactory $cacheFactory, ITempManager $tempManager, $userId, IRootFolder $rootFolder, ISecureRandom $secureRandom) {
		parent::__construct($appName, $request);

		$this->userId = $userId;
		$this->file = $rootFolder->get('example.md');
		$this->secureRandom = $secureRandom;
	}

	/**
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 */
	public function init() {
		$sessionId = $this->secureRandom->generate(32, ISecureRandom::CHAR_DIGITS);
		$token = $this->secureRandom->generate(32);
		// save session to database
		// return session details
	}

	/**
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 */
	public function push($transaction): DataResponse {
		return new DataResponse([]);
	}

	/**
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 */
	public function get() {
		return new FileDisplayResponse($this->file);
	}

	/**
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 */
	public function sync($transaction): DataResponse {
		return new DataResponse([]);
	}

}
