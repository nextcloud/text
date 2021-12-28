<?php

namespace OCA\Text\Tests;

use OCA\Text\AppInfo\Application;
use OCA\Text\Service\ImageService;

class TextTest extends \PHPUnit\Framework\TestCase {
	public function testDummy() {
		$app = new Application();
		$this->assertEquals('text', $app::APP_NAME);
	}

	public function testGetAttachmentNamesFromContent() {
		$contentNames = [
			'aaa.png',
			'a[a]a.png',
			'a(a)a.png',
			'a](a.png',
			',;:!?.§-_a_',
			'a`a`.png',
		];
		$content = "some content\n";
		foreach ($contentNames as $name) {
			// this is how it's generated in MenuBar.vue
			$linkText = preg_replace('/[[\]]/', '', $name);
			$encodedName = urlencode($name);
			$content .= '![' . $linkText . '](text://image?imageFileName=' . $encodedName . ")\n";
		}
		$content .= 'some content';

		$computedNames = ImageService::getAttachmentNamesFromContent($content);
		foreach ($contentNames as $contentName) {
			$this->assertContains($contentName, $computedNames);
		}
	}
}
