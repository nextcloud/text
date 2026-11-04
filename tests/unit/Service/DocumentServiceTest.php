<?php

namespace OCA\Text\Tests;

use OCA\Text\Db\Document;
use OCA\Text\Db\DocumentMapper;
use OCA\Text\Db\Session;
use OCA\Text\Db\SessionMapper;
use OCA\Text\Db\StepMapper;
use OCA\Text\Exception\DocumentSaveConflictException;
use OCA\Text\Service\DocumentService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\Constants;
use OCP\Files\Config\IUserMountCache;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IAppData;
use OCP\Files\IRootFolder;
use OCP\Files\Lock\ILockManager;
use OCP\Files\Lock\LockContext;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Files\SimpleFS\ISimpleFolder;
use OCP\ICacheFactory;
use OCP\IConfig;
use OCP\IRequest;
use OCP\Lock\LockedException;
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

	private function createDocumentWithContent(string $content): Document {
		$document = new Document();
		$document->setId(42);
		$document->setLastSavedVersion(3);
		$document->setChecksum(DocumentService::computeCheckSum($content));
		return $document;
	}

	private function createFile(string $content): File {
		$file = $this->createMock(File::class);
		$file->method('getId')->willReturn(42);
		$file->method('isUpdateable')->willReturn(true);
		$file->method('getContent')->willReturn($content);
		$file->method('getMTime')->willReturn(1000);
		$file->method('getEtag')->willReturn('etag');
		return $file;
	}

	public function testKeepsDocumentWhenFileIsUnchanged(): void {
		$loaded = $this->createDocumentWithContent('content');
		$this->documentMapper->method('find')->willReturn($loaded);
		$this->documentMapper->expects(self::never())->method('delete');
		$this->documentMapper->expects(self::never())->method('insert');

		self::assertSame($loaded, $this->documentService->getOrCreateDocument($this->createFile('content')));
	}

	public function testKeepsDocumentWithUnsavedChangesWhenFileChangedOutside(): void {
		$loaded = $this->createDocumentWithContent('content');
		$this->documentMapper->method('find')->willReturn($loaded);
		$this->setpMapper->method('getLatestVersion')->willReturn(4);
		$this->documentMapper->expects(self::never())->method('delete');
		$this->documentMapper->expects(self::never())->method('insert');

		self::assertSame($loaded, $this->documentService->getOrCreateDocument($this->createFile('changed outside')));
	}

	public function testResetsDocumentWhenFileChangedOutside(): void {
		$loaded = $this->createDocumentWithContent('content');
		$this->documentMapper->method('find')->willReturn($loaded);
		$this->setpMapper->method('getLatestVersion')->willReturn(3);
		$this->documentMapper->expects(self::once())->method('delete')->with($loaded);
		$this->documentMapper->expects(self::once())->method('insert')->willReturnArgument(0);

		$document = $this->documentService->getOrCreateDocument($this->createFile('changed outside'));
		self::assertNotSame($loaded, $document);
		self::assertSame(DocumentService::computeCheckSum('changed outside'), $document->getChecksum());
	}

	public function testNoConflictIfTextSavedInTheMeantime(): void {
		$document = $this->createDocumentWithContent('old content');
		$document->setLastSavedVersionTime(1000);
		$document->setLastSavedVersionEtag('etag');
		$document->resetUpdatedFields();
		$stored = $this->createDocumentWithContent('saved by text');
		$stored->setLastSavedVersion(5);
		$stored->setLastSavedVersionTime(1000);
		$stored->setLastSavedVersionEtag('etag');
		$file = $this->createFile('saved by text');
		$this->documentMapper->method('find')->with(42)->willReturn($stored);
		$this->setpMapper->method('getLatestVersion')->willReturn(5);
		$file->expects(self::never())->method('putContent');

		$result = $this->documentService->autosave($document, $file, 4, 'new content', 'doc state');
		self::assertSame($stored, $result);
	}

	public function testConflictIfFileChangedOutside(): void {
		$document = $this->createDocumentWithContent('old content');
		$document->setLastSavedVersionTime(1000);
		$document->resetUpdatedFields();
		$stored = $this->createDocumentWithContent('old content');
		$file = $this->createFile('outside content');
		$this->documentMapper->method('find')->with(42)->willReturn($stored);
		$file->expects(self::never())->method('putContent');

		$this->expectException(DocumentSaveConflictException::class);
		$this->documentService->autosave($document, $file, 1, 'new content', 'doc state');
	}

	public function testNotFoundIfDocumentWasResetInTheMeantime(): void {
		$document = $this->createDocumentWithContent('old content');
		$document->setLastSavedVersionTime(1000);
		$document->resetUpdatedFields();
		$file = $this->createFile('outside content');
		$this->documentMapper->method('find')->with(42)
			->willThrowException(new DoesNotExistException('Document was reset'));
		$file->expects(self::never())->method('putContent');

		$this->expectException(NotFoundException::class);
		$this->documentService->autosave($document, $file, 1, 'new content', 'doc state');
	}

	public function testStoresChecksumIfWritingTheStateFails(): void {
		$document = $this->createDocumentWithContent('old content');
		$document->setLastSavedVersionTime(1000);
		$document->setLastSavedVersionEtag('etag');
		$document->resetUpdatedFields();
		$file = $this->createFile('old content');
		$this->setpMapper->method('getLatestVersion')->willReturn(4);
		$this->lockManager->method('runInScope')->willReturnCallback(
			static fn (LockContext $lock, callable $callback) => $callback()
		);
		$stateFile = $this->createMock(ISimpleFile::class);
		$stateFile->method('putContent')->willThrowException(new LockedException('documents/42.yjs'));
		$folder = $this->createMock(ISimpleFolder::class);
		$folder->method('getFile')->willReturn($stateFile);
		$this->appData->method('getFolder')->willReturn($folder);
		$file->expects(self::once())->method('putContent')->with('new content');
		$this->documentMapper->expects(self::once())->method('update')->with($document);

		$this->documentService->autosave($document, $file, 4, 'new content', 'doc state');
		self::assertSame(DocumentService::computeCheckSum('new content'), $document->getChecksum());
	}

	public function testThrottledAutosaveSkipsConflictCheck(): void {
		$document = $this->createDocumentWithContent('content');
		$document->setLastSavedVersionTime(time());
		$document->resetUpdatedFields();
		$file = $this->createFile('outside content');
		$file->expects(self::never())->method('getContent');
		$file->expects(self::never())->method('putContent');

		$result = $this->documentService->autosave($document, $file, 3, 'new content', 'doc state');
		self::assertSame($document, $result);
	}

	public function testManualSaveChecksForConflictsWithinAutosaveDelay(): void {
		$document = $this->createDocumentWithContent('old content');
		$document->setLastSavedVersionTime(time());
		$document->resetUpdatedFields();
		$stored = $this->createDocumentWithContent('old content');
		$file = $this->createFile('outside content');
		$this->documentMapper->method('find')->with(42)->willReturn($stored);
		$file->expects(self::never())->method('putContent');

		$this->expectException(DocumentSaveConflictException::class);
		$this->documentService->autosave($document, $file, 3, 'new content', 'doc state', false, true);
	}
}
