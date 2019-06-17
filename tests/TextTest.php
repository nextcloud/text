<?php
namespace OCA\Text\Tests;

use OCA\Social\Controller\NavigationController;
use OCA\Social\Controller\SocialPubController;
use OCA\Social\Service\CacheActorService;
use OCA\Text\AppInfo\Application;
use OCP\IL10N;
use OCP\IRequest;

class TextTest extends \PHPUnit\Framework\TestCase {

	public function testDummy() {
		$app = new Application();
		$this->assertEquals('text', $app::APP_NAME);
	}

}
