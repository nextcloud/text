<?php

namespace OCA\Text\Tests;

use OCA\Text\Db\Document;
use OCA\Text\Db\DocumentMapper;
use OCA\Text\Db\Session;
use OCA\Text\Db\SessionMapper;
use OCA\Text\Db\StepMapper;
use OCA\Text\Service\DocumentService;
use OCP\Constants;
use OCP\Files\Config\IUserMountCache;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IAppData;
use OCP\Files\IRootFolder;
use OCP\Files\Lock\ILockManager;
use OCP\Files\NotPermittedException;
use OCP\ICacheFactory;
use OCP\IConfig;
use OCP\IRequest;
use OCP\Share\IManager;
use OCP\Share\IShare;
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

	private function createDocument(): Document {
		return Document::fromRow([
			'id' => 1,
			'last_saved_version' => 3,
			'last_saved_version_time' => 1000,
		]);
	}

	public function testGetAllPendingAttachmentCleanup(): void {
		$document = $this->createDocument();
		$documents = (static function () use ($document): \Generator {
			yield $document;
		})();
		$this->documentMapper->expects(self::once())
			->method('findAllPendingAttachmentCleanup')->willReturn($documents);

		self::assertSame($documents, $this->documentService->getAllPendingAttachmentCleanup());
	}

	public function testMarksOnlyTheProcessedSavedTimestamp(): void {
		$document = $this->createDocument();
		$document->resetUpdatedFields();
		$this->documentMapper->expects(self::once())
			->method('update')->with($document)->willReturn($document);

		$this->documentService->markAttachmentCleanup($document);

		self::assertSame(1000, $document->getLastAttachmentCleanup());
		self::assertSame(1000, $document->getLastSavedVersionTime());
		self::assertSame(['lastAttachmentCleanup' => true], $document->getUpdatedFields());
	}

	public function testDetectsUnsavedChanges(): void {
		$document = $this->createDocument();
		$this->setpMapper->expects(self::once())
			->method('getLatestVersion')->with(1)->willReturn(4);

		self::assertTrue($this->documentService->hasUnsavedChanges($document));
	}

	public function testSavedStepsHaveNoUnsavedChanges(): void {
		$document = $this->createDocument();
		$this->setpMapper->expects(self::once())
			->method('getLatestVersion')->with(1)->willReturn(3);

		self::assertFalse($this->documentService->hasUnsavedChanges($document));
	}

	public function testDocumentWithoutStepsHasNoUnsavedChanges(): void {
		$document = $this->createDocument();
		$document->setLastSavedVersion(0);
		$this->setpMapper->expects(self::once())
			->method('getLatestVersion')->with(1)->willReturn(null);

		self::assertFalse($this->documentService->hasUnsavedChanges($document));
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

	public function testGetFileForSessionFromShare() {
		$file = $this->createMock(File::class);
		$file->method('getId')->willReturn(1234);
		$share = $this->createMock(IShare::class);
		$share->method('getNode')->willReturn($file);
		$this->shareManager->method('getShareByToken')->willReturn($share);

		$session = new Session();
		$session->setDocumentId(1234);
		$actual = $this->documentService->getFileForSession($session, 'shareToken');
		self::assertEquals($file, $actual);
	}

	public function testGetFileForSessionFromShareOfOtherFile() {
		$file = $this->createMock(\OCP\Files\File::class);
		$file->method('getId')->willReturn(5678);
		$share = $this->createMock(IShare::class);
		$share->method('getNode')->willReturn($file);
		$this->shareManager->method('getShareByToken')->willReturn($share);

		$session = new Session();
		$session->setDocumentId(1234);
		$this->expectException(\InvalidArgumentException::class);
		$this->documentService->getFileForSession($session, 'shareToken');
	}
}
