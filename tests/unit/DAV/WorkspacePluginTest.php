<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests\DAV;

use OCA\DAV\Connector\Sabre\Directory;
use OCA\Text\DAV\WorkspacePlugin;
use OCA\Text\Service\ConfigService;
use OCA\Text\Service\EncodingService;
use OCA\Text\Service\FileService;
use OCA\Text\Service\WorkspaceService;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\ICache;
use OCP\ICacheFactory;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use Sabre\DAV\PropFind;
use Sabre\DAV\Server;

class WorkspacePluginTest extends TestCase {
	private FileService&MockObject $fileService;
	private ICache&MockObject $cache;
	private WorkspacePlugin $plugin;
	private string $content = '## Readme';

	protected function setUp(): void {
		$file = $this->createMock(File::class);
		$file->method('getId')->willReturn(42);
		$file->method('getEtag')->willReturn('etag');
		$file->method('getContent')->willReturnCallback(fn () => $this->content);

		$workspaceService = $this->createMock(WorkspaceService::class);
		$workspaceService->method('getFile')->willReturn($file);

		$this->cache = $this->createMock(ICache::class);
		$cacheFactory = $this->createMock(ICacheFactory::class);
		$cacheFactory->method('createDistributed')->willReturn($this->cache);

		$configService = $this->createMock(ConfigService::class);
		$configService->method('isRichWorkspaceAvailable')->willReturn(true);
		$configService->method('isRichWorkspaceEnabledForUser')->willReturn(true);

		$this->fileService = $this->createMock(FileService::class);

		$this->plugin = new WorkspacePlugin(
			$workspaceService,
			$this->fileService,
			$cacheFactory,
			$configService,
			new EncodingService(),
			$this->createMock(LoggerInterface::class),
			'user',
		);
		$server = $this->createMock(Server::class);
		$server->method('getHTTPDepth')->willReturn(0);
		$this->plugin->initialize($server);
	}

	public function testWorkspaceContent(): void {
		$this->fileService->method('canSeeContent')->willReturn(true);

		$propFind = $this->propFind();

		$this->assertSame('## Readme', $propFind->get(WorkspacePlugin::WORKSPACE_PROPERTY));
		$this->assertSame(42, $propFind->get(WorkspacePlugin::WORKSPACE_FILE_PROPERTY));
	}

	public function testWorkspaceContentHidden(): void {
		$this->fileService->method('canSeeContent')->willReturn(false);
		$this->cache->expects($this->never())->method('get');

		$propFind = $this->propFind();

		$this->assertSame('', $propFind->get(WorkspacePlugin::WORKSPACE_PROPERTY));
		$this->assertSame(42, $propFind->get(WorkspacePlugin::WORKSPACE_FILE_PROPERTY));
	}

	public static function dataXmlInvalidContent(): array {
		return [
			'control characters' => ["a\x00b\x10c\x16d\x1ce\x0Bf", "a\u{FFFD}b\u{FFFD}c\u{FFFD}d\u{FFFD}e\u{FFFD}f"],
			'noncharacters' => ["a\u{FFFE}b\u{FFFF}c", "a\u{FFFD}b\u{FFFD}c"],
			'allowed whitespace and multibyte characters' => ["# Grüße 😀\t<&>\r\n", "# Grüße 😀\t<&>\r\n"],
			'UTF-16 with BOM' => ["\xff\xfe#\x00 \x00\xfc\x00", "\u{FEFF}# ü"],
		];
	}

	/**
	 * @dataProvider dataXmlInvalidContent
	 */
	public function testWorkspaceContentXmlInvalid(string $content, string $expected): void {
		$this->fileService->method('canSeeContent')->willReturn(true);
		$this->content = $content;
		$this->cache->expects($this->once())->method('set')->with('42_etag', $expected);

		$this->assertSame($expected, $this->propFind()->get(WorkspacePlugin::WORKSPACE_PROPERTY));
	}

	private function propFind(): PropFind {
		$propFind = new PropFind('files/user/folder', [
			WorkspacePlugin::WORKSPACE_PROPERTY,
			WorkspacePlugin::WORKSPACE_FILE_PROPERTY,
		], 0);
		$node = $this->createMock(Directory::class);
		$node->method('getNode')->willReturn($this->createMock(Folder::class));
		$this->plugin->propFind($propFind, $node);
		return $propFind;
	}
}
