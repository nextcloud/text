<?php
declare(strict_types=1);

namespace OCA\Text\AppInfo;

use OCP\AppFramework\App;


class Application extends App {


	const APP_NAME = 'text';


	/**
	 * Application constructor.
	 *
	 * @param array $params
	 */
	public function __construct(array $params = []) {
		parent::__construct(self::APP_NAME, $params);

		// register hook for files
		\OC::$server->getRootFolder()->listen('\OC\Files', 'preWrite', function() {});
		\OC::$server->getRootFolder()->listen('\OC\Files', 'postWrite', function() {});
		\OC::$server->getRootFolder()->listen('\OC\Files', 'preDelete', function() {});
		\OC::$server->getRootFolder()->listen('\OC\Files', 'postDelete', function() {});
	}

}

