<?php

namespace OCA\Text\Tests;

use OCA\Text\AppInfo\Application;

class TextTest extends \PHPUnit\Framework\TestCase {
	public function testDummy() {
		$app = new Application();
		$this->assertEquals('text', $app::APP_NAME);
	}
}
