<?php

namespace OCA\Text\Tests;

use OCA\Text\AppInfo\Application;
use OCA\Text\Service\AttachmentService;
use OCP\Files\File;
use OCP\Files\Folder;
use PHPUnit\Framework\TestCase;

class AttachmentServiceTest extends TestCase {
	private static array $attachmentNames = [
		'aaa.png',
		'aaa (2).png',
		'aaa 2).png',
		'aaa (2.png',
		'aaa ((2.png',
		'aaa 2)).png',
		'a[a]a.png',
		'a(a)a.png',
		'a](a.png',
		',;:!?.§-_a_',
		'a`a`.png',
	];

	public function testDummy(): void {
		$app = new Application();
		$this->assertEquals('text', $app::APP_NAME);
	}

	public function testGetAttachmentNamesFromContent(): void {
		$content = "some content\n";
		foreach (self::$attachmentNames as $name) {
			// this is how it's generated in MenuBar.vue
			$linkText = preg_replace('/[[\]]/', '', $name);
			$encodedName = urlencode($name);
			$content .= '![' . $linkText . '](.attachments.33/' . $encodedName . ")\n";
		}
		$content .= 'some content';

		$computedNames = AttachmentService::getAttachmentNamesFromContent($content, 33);
		foreach (self::$attachmentNames as $contentName) {
			$this->assertContains($contentName, $computedNames);
		}
	}

	public function testGetAttachmentIdsFromContent(): void {
		$urls = [
			'www.example.com',
			'http://example.com',
			'https://www.example.com/path/to/page',
			'http://sub.domain.co.uk/index.php',
			'https://1.2.3.4:8080/path',
			'http://localhost:3000/',
			'https://[2001:db8::1]/ipv6-check',
		];

		$id = 1;
		$content = "some content\n";
		foreach (self::$attachmentNames as $name) {
			$linkText = preg_replace('/[[\]]/', '', $name);
			foreach ($urls as $url) {
				$addon = $id % 2 ? ' (preview)' : '';
				$content .= "[{$linkText}]({$url}/f/{$id}{$addon})\n";
				$id++;
			}
		}
		$content .= 'some content';

		$computedIds = AttachmentService::getAttachmentIdsFromContent($content);
		$this->assertEquals(range(1, $id - 1), $computedIds);
	}

	public function testGetUniqueFileName(): void {
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
		$this->assertEquals('doesNotExistYet', AttachmentService::getUniqueFileName($folder, 'doesNotExistYet'));
		$this->assertEquals('doesNotExistYet.png', AttachmentService::getUniqueFileName($folder, 'doesNotExistYet.png'));

		// files that already exist
		$this->assertEquals('foo (2).png', AttachmentService::getUniqueFileName($folder, 'foo.png'));
		$this->assertEquals('bar (2)', AttachmentService::getUniqueFileName($folder, 'bar'));
		$this->assertEquals('plop (3).png', AttachmentService::getUniqueFileName($folder, 'plop.png'));
		$this->assertEquals('lala (4).png', AttachmentService::getUniqueFileName($folder, 'lala.png'));
		$this->assertEquals('yay (4).png', AttachmentService::getUniqueFileName($folder, 'yay.png'));
		$this->assertEquals('file.ext (2).ext', AttachmentService::getUniqueFileName($folder, 'file.ext.ext'));
	}

	// Replacement expected
	public static function contentReplacedProvider(): array {
		return [
			['![image.png](.attachments.1/image.png)', '![image.png](.attachments.2/image.png)'],
			// Spaces surrounding link URL
			['![image.png](  .attachments.1/image%20%282%29.png  )', '![image.png](  .attachments.2/image%20%282%29.png  )'],
			// Escaped square brackets in title
			['![title \[#1\]](.attachments.1/image.png)', '![title \[#1\]](.attachments.2/image.png)'],
			// Angle brackets surrounding link URL
			['![image.png](<.attachments.1/image.png>)', '![image.png](<.attachments.2/image.png>)'],
			// Spaces and angle brackets surrounding link URL
			['![image.png](  <.attachments.1/image.png>  )', '![image.png](  <.attachments.2/image.png>  )'],
			// Spaces in title
			['![title with space](.attachments.1/image.png)', '![title with space](.attachments.2/image.png)'],
			// Several links in a row
			['Some text\n\n![image.png](.attachments.1/image.png)\n\nMore text. [file.tar.gz](.attachments.1/file.tar.gz) ...', 'Some text\n\n![image.png](.attachments.2/image.png)\n\nMore text. [file.tar.gz](.attachments.2/file.tar.gz) ...'],
			// Reference link syntax
			['[reference]: .attachments.1/image.png', '[reference]: .attachments.2/image.png'],
			// Reference link syntax with title
			['[reference]: .attachments.1/image.png "title"', '[reference]: .attachments.2/image.png "title"'],
			// Reference link syntax with escaped square brackets in reference name
			['[reference \[#1\]]: .attachments.1/image.png "title"', '[reference \[#1\]]: .attachments.2/image.png "title"'],
		];
	}

	// No replacement expected
	public static function contentNotReplacedProvider(): array {
		return [
			// Empty title
			[ '![](.attachments.1/image.png)' ],
			// Empty filename
			[ '![title](.attachments.1/)' ],
			// Wrong fileId #1
			[ '![image.png](.attachments.01/image.png)' ],
			// Wrong fileId #2
			[ '![image.png](.attachments.12/image.png)' ],
			// Normal brackets around title
			[ '!(image.png)(.attachments.1/image.png)' ],
			// Square brackets in title
			['![title [#1]](.attachments.1/image.png)' ],
			// Reference link syntax with square brackets in reference name
			['[reference [#1]]: .attachments.1/image.png' ],
		];
	}

	/**
	 * @dataProvider contentReplacedProvider
	 */
	public function testReplaceAttachmentFolderId(string $sourceContent, string $targetContent): void {
		$source = $this->createMock(File::class);
		$source->method('getId')->willReturn(1);
		$target = $this->createMock(File::class);
		$target->method('getId')->willReturn(2);
		$target->method('getContent')->willReturn($sourceContent);
		$replacedContent = '';
		$target->method('putContent')->willReturnCallback(function (string $content) use (&$replacedContent) {
			$replacedContent = $content;
		});

		AttachmentService::replaceAttachmentFolderId($source, $target);
		$this->assertEquals($targetContent, $replacedContent);
	}

	/**
	 * @dataProvider contentNotReplacedProvider
	 */
	public function testReplaceAttachmentFolderIdNoReplace(string $sourceContent): void {
		$source = $this->createMock(File::class);
		$source->method('getId')->willReturn(1);
		$target = $this->createMock(File::class);
		$target->method('getId')->willReturn(2);
		$target->method('getContent')->willReturn($sourceContent);
		$replacedContent = '';
		$target->method('putContent')->willReturnCallback(function (string $content) use (&$replacedContent) {
			$replacedContent = $content;
		});

		AttachmentService::replaceAttachmentFolderId($source, $target);
		$this->assertEquals($sourceContent, $replacedContent);
	}

	// Replacement expected
	public static function contentReplaceAttachmentFileIdProvider(): array {
		return [
			['[image.png](https://localhost:8000/f/1)', '[image.png](https://localhost:8000/f/2)'],
			['[image.png](https://localhost:8000/f/1(preview))', '[image.png](https://localhost:8000/f/2(preview))'],
			['[image.png](https://localhost:8000/f/1 (preview))', '[image.png](https://localhost:8000/f/2 (preview))'],
			// Link in title
			['[https://localhost:8000/f/1](https://localhost:8000/f/1)', '[https://localhost:8000/f/1](https://localhost:8000/f/2)'],
			['[https://localhost:8000/f/1](https://localhost:8000/f/1 (preview))', '[https://localhost:8000/f/1](https://localhost:8000/f/2 (preview))'],
			// Spaces surrounding link URL
			['[image.png](  https://localhost:8000/f/1  )', '[image.png](  https://localhost:8000/f/2  )'],
			['[image.png](  https://localhost:8000/f/1   (preview))', '[image.png](  https://localhost:8000/f/2   (preview))'],
			['[image.png](  https://localhost:8000/f/1   (preview)  )', '[image.png](  https://localhost:8000/f/2   (preview)  )'],
			// Escaped square brackets in title
			['[title \[#1\]](https://localhost:8000/f/1)', '[title \[#1\]](https://localhost:8000/f/2)'],
			['[title \[#1\]](https://localhost:8000/f/1 (preview))', '[title \[#1\]](https://localhost:8000/f/2 (preview))'],
			// Spaces in title
			['[title with space](https://localhost:8000/f/1)', '[title with space](https://localhost:8000/f/2)'],
			['[title with space](https://localhost:8000/f/1 (preview))', '[title with space](https://localhost:8000/f/2 (preview))'],
			// Several links in a row
			['Some text\n\n[image.png](https://localhost:8000/f/1 (preview))\n\nMore text. [file.tar.gz](https://localhost:8000/f/3) ...', 'Some text\n\n[image.png](https://localhost:8000/f/2 (preview))\n\nMore text. [file.tar.gz](https://localhost:8000/f/4) ...'],
		];
	}

	/**
	 * @dataProvider contentReplaceAttachmentFileIdProvider
	 */
	public function testReplaceAttachmentFileId(string $sourceContent, string $targetContent): void {
		$target = $this->createMock(File::class);
		$target->method('getId')->willReturn(2);
		$target->method('getContent')->willReturn($sourceContent);
		$replacedContent = '';
		$target->method('putContent')->willReturnCallback(function (string $content) use (&$replacedContent) {
			$replacedContent = $content;
		});

		$fileIdMapping = [
			[1, 2],
			[3, 4],
		];
		AttachmentService::replaceAttachmentFileIds($target, $fileIdMapping);
		$this->assertEquals($targetContent, $replacedContent);
	}

	// No replacement expected
	public static function contentReplaceAttachmentFileIdNoReplaceProvider(): array {
		return [
			// Empty title
			[ '[](https://localhost:8000/f/1)' ],
			// Different url
			[ '[title](https://localhost:8000/f/1/a/asdf.png)' ],
			// Wrong fileId #1
			[ '[image.png](https://localhost:8000/f/112)' ],
			// Wrong fileId #2
			[ '[image.png](https://localhost:8000/f/12)' ],
			// Normal brackets around title
			[ '(image.png)(https://localhost:8000/f/1)' ],
			// Square brackets in title
			['[title [#1]](https://localhost:8000/f/1)' ],
			// Space between brackets
			['[title] (https://localhost:8000/f/1)' ],
		];
	}

	/**
	 * @dataProvider contentReplaceAttachmentFileIdNoReplaceProvider
	 */
	public function testReplaceAttachmentFileIdNoReplace(string $sourceContent): void {
		$target = $this->createMock(File::class);
		$target->method('getId')->willReturn(2);
		$target->method('getContent')->willReturn($sourceContent);
		$replacedContent = '';
		$target->method('putContent')->willReturnCallback(function (string $content) use (&$replacedContent) {
			$replacedContent = $content;
		});

		AttachmentService::replaceAttachmentFileIds($target, [[1, 2]]);
		$this->assertEquals($sourceContent, $replacedContent);
	}
}
