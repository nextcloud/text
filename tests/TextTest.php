<?php

namespace OCA\Text\Tests;

use OCA\Text\AppInfo\Application;
use OCA\Text\Service\ImageService;
use OCP\Files\Folder;

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
			'aaa (2).png',
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

	public function testGetUniqueFileName() {
		$fileNameList = [
			'foo.png',
			'bar',
			'plop.png',
			'plop (2).png',
			'lala.png',
			'lala (2).png',
			'lala (3).png',
			'yay.png',
			'yay (2).png',
			'yay (3).png',
			'yay (5).png',
			'file.ext.ext',
		];

		$folder = $this->createMock(Folder::class);
		$folder->expects(self::any())
			->method('nodeExists')
			->willReturnCallback(function ($name) use ($fileNameList) {
				return in_array($name, $fileNameList);
			});

		// files that do not exist yet
		$this->assertEquals('doesNotExistYet', ImageService::getUniqueFileName($folder, 'doesNotExistYet'));
		$this->assertEquals('doesNotExistYet.png', ImageService::getUniqueFileName($folder, 'doesNotExistYet.png'));

		// files that already exist
		$this->assertEquals('foo (2).png', ImageService::getUniqueFileName($folder, 'foo.png'));
		$this->assertEquals('bar (2)', ImageService::getUniqueFileName($folder, 'bar'));
		$this->assertEquals('plop (3).png', ImageService::getUniqueFileName($folder, 'plop.png'));
		$this->assertEquals('lala (4).png', ImageService::getUniqueFileName($folder, 'lala.png'));
		$this->assertEquals('yay (4).png', ImageService::getUniqueFileName($folder, 'yay.png'));
		$this->assertEquals('file.ext (2).ext', ImageService::getUniqueFileName($folder, 'file.ext.ext'));
	}
}
