<?php

declare(strict_types=1);

namespace OCA\Text\Controller;

use OCA\Text\Db\Session;
use OCA\Text\Exception\InvalidSessionException;
use OCP\AppFramework\ApiController;

class ASessionAwareController extends ApiController {
	private ?Session $session = null;

	public function setSession(?Session $session): void {
		$this->session = $session;
	}

	public function getSession(): Session {
		if ($this->session === null) {
			throw new InvalidSessionException();
		}

		return $this->session;
	}
}
