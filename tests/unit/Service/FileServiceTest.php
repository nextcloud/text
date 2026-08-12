<?php

namespace OCA\Text\Tests;

use OCA\Text\Exception\InvalidSessionException;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\NotPermittedException;
use OCP\ISession;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;
use OCP\Share\IShare;

class FileServiceTest extends \PHPUnit\Framework\TestCase {
	private FileService $fileService;

	private ISession $session;
	private IRootFolder $rootFolder;
	private IManager $shareManager;

	public function setUp(): void {
		$this->session = $this->createMock(ISession::class);
		$this->rootFolder = $this->createMock(IRootFolder::class);
		$this->shareManager = $this->createMock(IManager::class);

		$this->fileService = new FileService(
			$this->session,
			$this->rootFolder,
			$this->createMock(LockService::class),
			$this->shareManager,
		);
	}

	public function testGetFileById() {
		$userFolder = $this->createMock(Folder::class);
		$this->rootFolder->method('getUserFolder')->willReturn($userFolder);

		$file = $this->createMock(\OCP\Files\File::class);
		$file->method('getPermissions')->willReturn(Constants::PERMISSION_READ);
		$userFolder->method('getById')->willReturn([$file]);
		$actual = $this->fileService->getFileById(1234, 'userid');
		self::assertEquals($file, $actual);
	}

	public function testGetFileByIdSortUpdatableFirst() {
		$userFolder = $this->createMock(Folder::class);
		$this->rootFolder->method('getUserFolder')->willReturn($userFolder);

		$file1 = $this->createMock(\OCP\Files\File::class);
		$file1->method('getPermissions')->willReturn(Constants::PERMISSION_READ);
		$file2 = $this->createMock(\OCP\Files\File::class);
		$file2->method('getPermissions')->willReturn(Constants::PERMISSION_READ & Constants::PERMISSION_UPDATE);
		$userFolder->method('getById')->willReturn([$file1, $file2]);
		$actual = $this->fileService->getFileById(1234, 'userid');
		self::assertEquals($file2, $actual);
	}

	public function testGetFileByIdNoRead() {
		$userFolder = $this->createMock(Folder::class);
		$this->rootFolder->method('getUserFolder')->willReturn($userFolder);

		$file = $this->createMock(\OCP\Files\File::class);
		$file->method('getPermissions')->willReturn(Constants::PERMISSION_UPDATE);
		$userFolder->method('getById')->willReturn([$file]);
		$this->expectException(NotPermittedException::class);
		$actual = $this->fileService->getFileById(1234, 'userid');
	}

	public function testInvalidToken(): void {
		$this->expectException(InvalidSessionException::class);

		$this->shareManager->method('getShareByToken')->with('invalid')->willThrowException(new ShareNotFound());

		$this->fileService->getDocumentIdFromShare(123, 'invalid');
	}

	public function testValidTokenWithoutPassword(): void {
		$share = $this->createShare('plain-share');

		$result = $this->invokeGetDocumentIdFromShare(123, $share);
		self::assertEquals(123, $result);
	}

	public function testValidTokenMissingPassword(): void {
		$this->expectException(InvalidSessionException::class);

		$share = $this->createShare('protected-share', 'password');
		$this->session->method('get')->with('public_link_authenticated')->willReturn(null);

		$this->invokeGetDocumentIdFromShare(123, $share);
	}

	public function testValidTokenWithPasswordArray(): void {
		$share = $this->createShare('42', 'password');
		$this->session->method('get')->with('public_link_authenticated')->willReturn(['1', '42']);

		$result = $this->invokeGetDocumentIdFromShare(123, $share);
		self::assertEquals(123, $result);
	}

	public function testValidTokenWithSinglePassword(): void {
		$share = $this->createShare('42', 'password');
		$this->session->method('get')->with('public_link_authenticated')->willReturn('42');

		$result = $this->invokeGetDocumentIdFromShare(123, $share);
		self::assertEquals(123, $result);
	}

	public function testValidTokenWithOtherPassword(): void {
		$this->expectException(InvalidSessionException::class);

		$share = $this->createShare('42', 'password');
		$this->session->method('get')->with('public_link_authenticated')->willReturn('10');

		$this->invokeGetDocumentIdFromShare(123, $share);
	}

	public function testValidTokenWithOtherPasswords(): void {
		$this->expectException(InvalidSessionException::class);

		$share = $this->createShare('42', 'password');
		$this->session->method('get')->with('public_link_authenticated')->willReturn(['10', '20', '30']);

		$this->invokeGetDocumentIdFromShare(123, $share);
	}

	private function invokeGetDocumentIdFromShare(int $fileId, IShare $share): int {
		$this->shareManager->method('getShareByToken')->willReturn($share);

		$folder = $this->createMock(Folder::class);
		$folder->method('getFirstNodeById')->willReturn($this->createMock(File::class));
		$this->rootFolder->method('getUserFolder')->with('owner')->willReturn($folder);

		return $this->fileService->getDocumentIdFromShare($fileId, 'token');
	}

	private function createShare(string $id, ?string $password = null): IShare {
		$share = $this->createMock(IShare::class);
		$share->method('getId')->willReturn($id);
		$share->method('getPassword')->willReturn($password);
		$share->method('getPermissions')->willReturn(Constants::PERMISSION_READ);
		$share->method('getShareOwner')->willReturn('owner');
		$share->method('getAttributes')->willReturn(null);
		return $share;
	}

}
