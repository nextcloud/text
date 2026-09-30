<?php

namespace OCA\Text\Tests;

use OCA\Files_Sharing\SharedStorage;
use OCA\Text\Exception\InvalidSessionException;
use OCA\Text\Service\EncodingService;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCP\Constants;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\IUserFolder;
use OCP\Files\NotPermittedException;
use OCP\Files\Storage\IStorage;
use OCP\ISession;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IAttributes;
use OCP\Share\IManager;
use OCP\Share\IShare;
use Psr\Log\LoggerInterface;

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
			$this->createStub(EncodingService::class),
			$this->session,
			$this->rootFolder,
			$this->createMock(LockService::class),
			$this->createStub(LoggerInterface::class),
			$this->shareManager,
		);
	}

	public function testGetFileById() {
		$userFolder = $this->createMock(IUserFolder::class);
		$this->rootFolder->method('getUserFolder')->willReturn($userFolder);

		$file = $this->createMock(\OCP\Files\File::class);
		$file->method('getPermissions')->willReturn(Constants::PERMISSION_READ);
		$userFolder->method('getById')->willReturn([$file]);
		$actual = $this->fileService->getFileById(1234, 'userid');
		self::assertEquals($file, $actual);
	}

	public function testGetFileByIdSortUpdatableFirst() {
		$userFolder = $this->createMock(IUserFolder::class);
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
		$userFolder = $this->createMock(IUserFolder::class);
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

		$this->fileService->checkFileAccessFromShare(123, 'invalid');
	}

	public function testValidTokenWithoutPassword(): void {
		$share = $this->createShare('plain-share');

		$this->invokeCheckFileAccessFromShare(123, $share);
	}

	public function testValidTokenMissingPassword(): void {
		$this->expectException(InvalidSessionException::class);

		$share = $this->createShare('protected-share', 'password');
		$this->session->method('get')->with('public_link_authenticated')->willReturn(null);

		$this->invokeCheckFileAccessFromShare(123, $share);
	}

	public function testValidTokenWithPasswordArray(): void {
		$share = $this->createShare('42', 'password');
		$this->session->method('get')->with('public_link_authenticated')->willReturn(['1', '42']);

		$this->invokeCheckFileAccessFromShare(123, $share);
	}

	public function testValidTokenWithSinglePassword(): void {
		$share = $this->createShare('42', 'password');
		$this->session->method('get')->with('public_link_authenticated')->willReturn('42');

		$this->invokeCheckFileAccessFromShare(123, $share);
	}

	public function testValidTokenWithOtherPassword(): void {
		$this->expectException(InvalidSessionException::class);

		$share = $this->createShare('42', 'password');
		$this->session->method('get')->with('public_link_authenticated')->willReturn('10');

		$this->invokeCheckFileAccessFromShare(123, $share);
	}

	public function testValidTokenWithOtherPasswords(): void {
		$this->expectException(InvalidSessionException::class);

		$share = $this->createShare('42', 'password');
		$this->session->method('get')->with('public_link_authenticated')->willReturn(['10', '20', '30']);

		$this->invokeCheckFileAccessFromShare(123, $share);
	}

	private function invokeCheckFileAccessFromShare(int $fileId, IShare $share): void {
		$this->shareManager->expects($this->once())->method('getShareByToken')->willReturn($share);

		$userFolder = $this->createMock(IUserFolder::class);
		$userFolder->method('getFirstNodeById')->willReturn($this->createMock(File::class));
		$this->rootFolder->method('getUserFolder')->with('owner')->willReturn($userFolder);

		$this->fileService->checkFileAccessFromShare($fileId, 'token');
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

	public function testIsDownloadDisabledNotShared(): void {
		$storage = $this->createMock(IStorage::class);
		$storage->method('instanceOfStorage')->willReturn(false);
		$file = $this->createMock(File::class);
		$file->method('getStorage')->willReturn($storage);

		$this->assertFalse($this->fileService->isDownloadDisabled($file));
	}

	public function testIsDownloadDisabledSharedWithoutAttributes(): void {
		$file = $this->createSharedFile(null);
		$this->assertFalse($this->fileService->isDownloadDisabled($file));
	}

	public function testIsDownloadDisabledSharedDownloadAllowed(): void {
		$file = $this->createSharedFile(true);
		$this->assertFalse($this->fileService->isDownloadDisabled($file));
	}

	public function testIsDownloadDisabledSharedDownloadDisabled(): void {
		$file = $this->createSharedFile(false);
		$this->assertTrue($this->fileService->isDownloadDisabled($file));
	}

	private function createSharedFile(?bool $download): File {
		$share = $this->createMock(IShare::class);
		$share->method('getAttributes')
			->willReturn($download === null ? null : $this->createAttributes($download));
		$storage = $this->createMock(SharedStorage::class);
		$storage->method('instanceOfStorage')->willReturn(true);
		$storage->method('getShare')->willReturn($share);
		$file = $this->createMock(File::class);
		$file->method('getStorage')->willReturn($storage);
		return $file;
	}

	private function createAttributes(bool $download): IAttributes {
		$attributes = $this->createMock(IAttributes::class);
		$attributes->method('getAttribute')
			->with('permissions', 'download')
			->willReturn($download);
		return $attributes;
	}
}
