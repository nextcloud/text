<?php

namespace OCA\Text\Tests;

use OCA\Text\Db\DocumentMapper;
use OCA\Text\Db\SessionMapper;
use OCA\Text\Db\StepMapper;
use OCA\Text\Service\DocumentService;
use OCP\Constants;
use OCP\Files\Config\IUserMountCache;
use OCP\Files\Folder;
use OCP\Files\IAppData;
use OCP\Files\IRootFolder;
use OCP\Files\Lock\ILockManager;
use OCP\Files\NotPermittedException;
use OCP\ICacheFactory;
use OCP\IConfig;
use OCP\IRequest;
use OCP\Share\IManager;
use Psr\Log\LoggerInterface;

class DocumentServiceTest extends \PHPUnit\Framework\TestCase {
	private DocumentService $documentService;

	private DocumentMapper $documentMapper;
	private StepMapper $setpMapper;
	private SessionMapper $sessionMapper;
	private IAppData $appData;
	private string $userId;
	private IRootFolder $rootFolder;
	private ICacheFactory $cacheFactory;
	private LoggerInterface $loggerInterface;
	private IManager $shareManager;
	private IRequest $request;
	private \OCP\DirectEditing\IManager $directManager;
	private ILockManager $lockManager;
	private IUserMountCache $userMountCache;

	public function setUp(): void {
		$this->documentMapper = $this->createMock(DocumentMapper::class);
		$this->setpMapper = $this->createMock(StepMapper::class);
		$this->sessionMapper = $this->createMock(SessionMapper::class);
		$this->appData = $this->createMock(IAppData::class);
		$this->userId = 'admin';
		$this->rootFolder = $this->createMock(IRootFolder::class);
		$this->cacheFactory = $this->createMock(ICacheFactory::class);
		$this->loggerInterface = $this->createMock(LoggerInterface::class);
		$this->shareManager = $this->createMock(IManager::class);
		$this->request = $this->createMock(IRequest::class);
		$this->directManager = $this->createMock(\OCP\DirectEditing\IManager::class);
		$this->lockManager = $this->createMock(ILockManager::class);
		$this->userMountCache = $this->createMock(IUserMountCache::class);
		$config = $this->createMock(IConfig::class);

		$this->documentService = new DocumentService(
			$this->documentMapper,
			$this->setpMapper,
			$this->sessionMapper,
			$this->appData,
			$this->userId,
			$this->rootFolder,
			$this->cacheFactory,
			$this->loggerInterface,
			$this->shareManager,
			$this->request,
			$this->directManager,
			$this->lockManager,
			$this->userMountCache,
			$config,
		);
	}

	public function testGetFileById() {
		$userFolder = $this->createMock(Folder::class);
		$this->rootFolder->method('getUserFolder')->willReturn($userFolder);

		$file = $this->createMock(\OCP\Files\File::class);
		$file->method('getPermissions')->willReturn(Constants::PERMISSION_READ);
		$userFolder->method('getById')->willReturn([$file]);
		$actual = $this->documentService->getFileById(1234);
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
		$actual = $this->documentService->getFileById(1234);
		self::assertEquals($file2, $actual);
	}

	public function testGetFileByIdNoRead() {
		$userFolder = $this->createMock(Folder::class);
		$this->rootFolder->method('getUserFolder')->willReturn($userFolder);

		$file = $this->createMock(\OCP\Files\File::class);
		$file->method('getPermissions')->willReturn(Constants::PERMISSION_UPDATE);
		$userFolder->method('getById')->willReturn([$file]);
		$this->expectException(NotPermittedException::class);
		$actual = $this->documentService->getFileById(1234);
	}
}
