<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests\DAV;

use OCA\DAV\Connector\Sabre\File as DavFile;
use OCA\Text\DAV\EditingLockPlugin;
use OCA\Text\Db\Document;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\LockService;
use OCA\Text\Service\SessionService;
use OCP\Files\File;
use OCP\Files\FileInfo;
use OCP\Files\Lock\ILock;
use OCP\Files\Mount\IMovableMount;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Sabre\DAV\Server;
use Sabre\DAV\Tree;
use Sabre\HTTP\RequestInterface;

class EditingLockPluginTest extends TestCase {
	private DocumentService&MockObject $documentService;
	private SessionService&MockObject $sessionService;
	private LockService&MockObject $lockService;
	private FileInfo&MockObject $fileInfo;
	private File&MockObject $file;

	protected function setUp(): void {
		$this->documentService = $this->createMock(DocumentService::class);
		$this->sessionService = $this->createMock(SessionService::class);
		$this->lockService = $this->createMock(LockService::class);
		$this->fileInfo = $this->createMock(FileInfo::class);
		$this->file = $this->createMock(File::class);
		$this->file->method('getId')->willReturn(42);
		$lock = $this->createMock(ILock::class);
		$lock->method('getToken')->willReturn('files_lock/abc');
		$this->lockService->method('getOwnLock')->with(42)->willReturn($lock);
		$this->documentService->method('getDocumentForFile')->with(42)
			->willReturn(Document::fromRow(['id' => '111', 'context_type' => 'file', 'context_id' => 42]));
	}

	private function beforeValidateTokens(string $method = 'DELETE', ?string $userId = 'alice', string $destination = 'files/alice/renamed.md'): array {
		$node = $this->createMock(DavFile::class);
		$node->method('getFileInfo')->willReturn($this->fileInfo);
		$node->method('getNode')->willReturn($this->file);
		$tree = $this->createMock(Tree::class);
		$tree->method('getNodeForPath')->with('files/alice/notes.md')->willReturn($node);
		$server = $this->createMock(Server::class);
		$server->tree = $tree;
		$validateTokens = null;
		$server->expects($this->once())->method('on')
			->with('validateTokens', $this->anything(), 50)
			->willReturnCallback(function (string $eventName, callable $callback) use (&$validateTokens): void {
				$validateTokens = $callback;
			});
		$server->method('calculateUri')->with('https://cloud.example.com/remote.php/dav/' . $destination)->willReturn($destination);
		$request = $this->createMock(RequestInterface::class);
		$request->method('getMethod')->willReturn($method);
		$request->method('getPath')->willReturn('files/alice/notes.md');
		$request->method('getHeader')->with('Destination')->willReturn('https://cloud.example.com/remote.php/dav/' . $destination);

		$plugin = new EditingLockPlugin($this->documentService, $this->sessionService, $this->lockService, $userId);
		$plugin->initialize($server);
		$conditions = [];
		$validateTokens($request, $conditions);
		return $conditions;
	}

	private static function assertProvidesToken(array $conditions): void {
		self::assertSame([[
			'uri' => 'files/alice/notes.md',
			'tokens' => [[
				'token' => 'opaquelocktoken:files_lock/abc',
				'etag' => '',
				'negate' => false,
				'validToken' => false,
			]],
		]], $conditions);
	}

	public function testProvidesTokenIfNobodyElseIsEditing(): void {
		$this->sessionService->method('hasRecentlyActiveSessions')->with('111', 'alice')->willReturn(false);
		$this->lockService->expects(self::never())->method('unlock');
		$this->lockService->expects(self::never())->method('permitUnlock');

		self::assertProvidesToken($this->beforeValidateTokens());
	}

	public function testProvidesNoTokenWhileSomeoneElseIsEditing(): void {
		$this->sessionService->method('hasRecentlyActiveSessions')->with('111', 'alice')->willReturn(true);
		$this->lockService->expects(self::never())->method('permitUnlock');

		self::assertSame([], $this->beforeValidateTokens());
	}

	public function testPermitsUnlockOfMovedFile(): void {
		$this->file->method('getInternalPath')->willReturn('files/notes.md');
		$this->fileInfo->method('getMimetype')->willReturn('text/markdown');
		$this->sessionService->method('hasRecentlyActiveSessions')->with('111', 'alice')->willReturn(false);
		$this->lockService->expects(self::never())->method('unlock');
		$this->lockService->expects(self::once())->method('permitUnlock')->with(42);

		self::assertProvidesToken($this->beforeValidateTokens('MOVE'));
	}

	public function testKeepsLockOfFileWhoseShareIsMoved(): void {
		$this->file->method('getInternalPath')->willReturn('');
		$this->file->method('getMountPoint')->willReturn($this->createMock(IMovableMount::class));
		$this->fileInfo->method('getMimetype')->willReturn('text/markdown');
		$this->sessionService->method('hasRecentlyActiveSessions')->with('111', 'alice')->willReturn(false);
		$this->lockService->expects(self::never())->method('permitUnlock');

		self::assertProvidesToken($this->beforeValidateTokens('MOVE'));
	}

	public function testProvidesNoTokenIfRenamingChangesTheFormat(): void {
		$this->fileInfo->method('getMimetype')->willReturn('text/markdown');
		$this->sessionService->method('hasRecentlyActiveSessions')->willReturn(false);
		$this->lockService->expects(self::never())->method('permitUnlock');

		self::assertSame([], $this->beforeValidateTokens('MOVE', 'alice', 'files/alice/notes.txt'));
	}

	public function testProvidesNoTokenWithoutLockOfText(): void {
		$this->lockService = $this->createMock(LockService::class);
		$this->lockService->method('getOwnLock')->with(42)->willReturn(null);
		$this->lockService->expects(self::never())->method('permitUnlock');

		self::assertSame([], $this->beforeValidateTokens());
	}

	public function testProvidesNoTokenForOtherMethods(): void {
		self::assertSame([], $this->beforeValidateTokens('PUT'));
		self::assertSame([], $this->beforeValidateTokens('COPY'));
	}

	public function testProvidesNoTokenWithoutUser(): void {
		self::assertSame([], $this->beforeValidateTokens('DELETE', null));
	}
}
