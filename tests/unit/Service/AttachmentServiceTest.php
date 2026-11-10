<?php

namespace OCA\Text\Tests;

use OCA\Text\Context\IContext;
use OCA\Text\Service\AttachmentService;
use OCA\Text\Service\FileService;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IFilenameValidator;
use OCP\Files\IMimeTypeDetector;
use OCP\Files\IRootFolder;
use OCP\Files\IUserFolder;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\FilesMetadata\IFilesMetadataManager;
use OCP\IPreview;
use OCP\ISession;
use OCP\IURLGenerator;
use OCP\IUser;
use OCP\Share\IManager as ShareManager;
use OCP\Share\IShare;
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

	private function createService(?IRootFolder $rootFolder = null, ?FileService $fileService = null, ?IPreview $previewManager = null): AttachmentService {
		return new AttachmentService(
			$rootFolder ?? $this->createMock(IRootFolder::class),
			$this->createMock(ShareManager::class),
			$previewManager ?? $this->createMock(IPreview::class),
			$this->createMock(IMimeTypeDetector::class),
			$this->createMock(IURLGenerator::class),
			$this->createMock(IFilenameValidator::class),
			$this->createMock(IFilesMetadataManager::class),
			$this->createMock(ISession::class),
			$fileService ?? $this->createMock(FileService::class),
		);
	}

	private function createContext(File $file): IContext {
		$context = $this->createMock(IContext::class);
		$context->method('getFile')->willReturn($file);
		return $context;
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
			->willReturnCallback(fn ($name) => in_array($name, $fileNameList));

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
		$target->method('putContent')->willReturnCallback(function (string $content) use (&$replacedContent): void {
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
		$target->method('putContent')->willReturnCallback(function (string $content) use (&$replacedContent): void {
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
		$target->method('putContent')->willReturnCallback(function (string $content) use (&$replacedContent): void {
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
		$target->method('putContent')->willReturnCallback(function (string $content) use (&$replacedContent): void {
			$replacedContent = $content;
		});

		AttachmentService::replaceAttachmentFileIds($target, [[1, 2]]);
		$this->assertEquals($sourceContent, $replacedContent);
	}

	public function testCopyAttachmentsInFolderRewritesFolderAndFileIds(): void {
		$service = $this->createService();

		$sourceMd = $this->createMock(File::class);
		$sourceMd->method('getId')->willReturn(1);
		$sourceMd->method('getName')->willReturn('page.md');
		$sourceMd->method('getMimeType')->willReturn('text/markdown');

		$sourceAttachment = $this->createMock(File::class);
		$sourceAttachment->method('getId')->willReturn(10);
		$sourceAttachment->method('getName')->willReturn('board.whiteboard');

		$sourceAttachmentDir = $this->createMock(Folder::class);
		$sourceAttachmentDir->method('getDirectoryListing')->willReturn([$sourceAttachment]);

		$sourceFolder = $this->createMock(Folder::class);
		$sourceFolder->method('getDirectoryListing')->willReturn([$sourceMd]);
		$sourceFolder->method('get')->with('.attachments.1')->willReturn($sourceAttachmentDir);

		$content = "![a.png](.attachments.1/a.png)\n\n[board](https://localhost/f/10 (preview))\n";
		$targetMd = $this->createMock(File::class);
		$targetMd->method('getId')->willReturn(2);
		$targetMd->method('getContent')->willReturnCallback(function () use (&$content) {
			return $content;
		});
		$targetMd->method('putContent')->willReturnCallback(function (string $new) use (&$content): void {
			$content = $new;
		});

		$targetAttachment = $this->createMock(File::class);
		$targetAttachment->method('getId')->willReturn(20);

		$targetAttachmentDir = $this->createMock(Folder::class);
		$targetAttachmentDir->method('nodeExists')->with('board.whiteboard')->willReturn(true);
		$targetAttachmentDir->method('get')->with('board.whiteboard')->willReturn($targetAttachment);
		$targetAttachmentDir->expects($this->once())->method('move')->with('/target/.attachments.2');

		$targetFolder = $this->createMock(Folder::class);
		$targetFolder->method('getPath')->willReturn('/target');
		$targetFolder->method('get')->willReturnMap([
			['page.md', $targetMd],
			['.attachments.1', $targetAttachmentDir],
		]);

		$service->copyAttachmentsInFolder($sourceFolder, $targetFolder);

		$this->assertEquals("![a.png](.attachments.2/a.png)\n\n[board](https://localhost/f/20 (preview))\n", $content);
	}

	public function testGetMediaFileWithDownloadDisabled(): void {
		$fileService = $this->createMock(FileService::class);
		$fileService->method('canSeeContent')->willReturn(true);
		$fileService->method('isDownloadDisabled')->willReturn(true);
		$service = $this->createService(fileService: $fileService);
		$textFile = $this->createMock(File::class);
		$textFile->expects($this->never())->method('getOwner');

		$this->assertNull($service->getMediaFile($this->createContext($textFile), 'media.zip', $this->createMock(IUser::class)));
	}

	public function testGetMediaFileWithLinkShareDownloadDisabled(): void {
		$fileService = $this->createMock(FileService::class);
		$fileService->method('canSeeContent')->willReturn(true);
		$service = $this->createService(fileService: $fileService);
		$share = $this->createMock(IShare::class);
		$share->method('canDownload')->willReturn(false);
		$textFile = $this->createMock(File::class);
		$textFile->expects($this->never())->method('getOwner');

		$this->assertNull($service->getMediaFile($this->createContext($textFile), 'media.zip', $share));
	}

	public function testInsertAttachmentFileWithDownloadDisabled(): void {
		$textFile = $this->createMock(File::class);
		$textFile->method('isUpdateable')->willReturn(true);
		$textFile->expects($this->never())->method('getOwner');
		$userFolder = $this->createMock(IUserFolder::class);
		$userFolder->method('nodeExists')->with('/shared.png')->willReturn(true);
		$userFolder->method('get')->with('/shared.png')->willReturn($this->createMock(File::class));
		$rootFolder = $this->createMock(IRootFolder::class);
		$rootFolder->method('getUserFolder')->with('user')->willReturn($userFolder);
		$user = $this->createMock(IUser::class);
		$user->method('getUID')->willReturn('user');

		$fileService = $this->createMock(FileService::class);
		$fileService->method('isDownloadDisabled')->willReturn(true);
		$fileService->method('canSeeContent')->willReturn(true);
		$service = $this->createService($rootFolder, $fileService);

		$this->expectException(NotFoundException::class);
		$service->insertAttachmentFile($this->createContext($textFile), '/shared.png', $user);
	}

	public static function dataGetImageFilePreferRawImage(): array {
		return [
			'download allowed' => [false, true],
			'download disabled' => [true, false],
		];
	}

	/**
	 * @dataProvider dataGetImageFilePreferRawImage
	 */
	public function testGetImageFilePreferRawImage(bool $downloadDisabled, bool $expectRaw): void {
		$imageFile = $this->createMock(File::class);
		$imageFile->method('getMimeType')->willReturn('image/jpeg');
		$attachmentFolder = $this->createMock(Folder::class);
		$attachmentFolder->method('get')->with('photo.jpg')->willReturn($imageFile);
		$parentFolder = $this->createMock(Folder::class);
		$parentFolder->method('nodeExists')->with('.attachments.1')->willReturn(true);
		$parentFolder->method('get')->with('.attachments.1')->willReturn($attachmentFolder);
		$ownerTextFile = $this->createMock(File::class);
		$ownerTextFile->method('getParent')->willReturn($parentFolder);
		$userFolder = $this->createMock(IUserFolder::class);
		$userFolder->method('getFirstNodeById')->with(1)->willReturn($ownerTextFile);
		$rootFolder = $this->createMock(IRootFolder::class);
		$rootFolder->method('getUserFolder')->with('owner')->willReturn($userFolder);

		$owner = $this->createMock(IUser::class);
		$owner->method('getUID')->willReturn('owner');
		$textFile = $this->createMock(File::class);
		$textFile->method('getId')->willReturn(1);
		$textFile->method('getOwner')->willReturn($owner);

		$preview = $this->createMock(ISimpleFile::class);
		$previewManager = $this->createMock(IPreview::class);
		$previewManager->method('isMimeSupported')->with('image/jpeg')->willReturn(true);
		$previewManager->method('getPreview')->with($imageFile, 1024, 1024)->willReturn($preview);

		$fileService = $this->createMock(FileService::class);
		$fileService->method('canSeeContent')->willReturn(true);
		$fileService->method('isDownloadDisabled')->willReturn($downloadDisabled);
		$service = $this->createService($rootFolder, $fileService, $previewManager);

		$result = $service->getImageFile($this->createContext($textFile), 'photo.jpg', true, $this->createMock(IUser::class));
		$this->assertSame($expectRaw ? $imageFile : $preview, $result);
	}
}
