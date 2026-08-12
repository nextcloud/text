<?php

namespace OCA\Text\Tests;

use OCA\Text\Db\Document;
use OCA\Text\Db\Session;
use OCA\Text\Service\ApiService;
use OCA\Text\Service\ConfigService;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\EncodingService;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCA\Text\Service\SessionService;
use OCP\IL10N;
use Psr\Log\LoggerInterface;

class ApiServiceTest extends \PHPUnit\Framework\TestCase {
	private ApiService $apiService;

	private ConfigService $configService;
	private SessionService $sessionService;
	private DocumentService $documentService;
	private FileService $fileService;
	private EncodingService $encodingService;
	private LoggerInterface $loggerInterface;
	private LockService $lockService;
	private IL10N $l10n;

	public function setUp(): void {
		$this->configService = $this->createMock(ConfigService::class);
		$this->sessionService = $this->createMock(SessionService::class);
		$this->documentService = $this->createMock(DocumentService::class);
		$this->fileService = $this->createMock(FileService::class);
		$this->encodingService = $this->createMock(EncodingService::class);
		$this->loggerInterface = $this->createMock(LoggerInterface::class);
		$this->lockService = $this->createMock(LockService::class);
		$this->l10n = $this->createMock(IL10N::class);

		$document = new Document();
		$document->setId(123);
		$this->documentService->method('getOrCreateDocument')->willReturn($document);
		$this->fileService->method('isReadOnly')->willReturn(false);
		$this->encodingService->method('encodeToUtf8')->willReturnCallback(fn ($str) => $str);

		$this->apiService = new ApiService(
			$this->configService,
			$this->sessionService,
			$this->documentService,
			$this->fileService,
			$this->encodingService,
			$this->loggerInterface,
			$this->lockService,
			$this->l10n,
			null,
		);
	}

	public function testCreateNewSession() {
		$file = $this->mockFile(1234, 'admin');
		$actual = $this->apiService->create($file);
		self::assertTrue($actual->getData()['hasOwner']);
		self::assertEquals('file content', $actual->getData()['content']);
	}

	public function testCreateNewSessionWithoutOwner() {
		$file = $this->mockFile(1234, null);
		$actual = $this->apiService->create($file);
		self::assertFalse($actual->getData()['hasOwner']);
	}

	public function testSaveWithNotPermittedException() {
		$session = new Session();
		$session->setDocumentId(123);

		$document = new Document();

		$file = $this->mockFile(123, 'admin');

		$this->fileService->method('getFileForSession')->willReturn($file);
		$this->documentService->method('autosave')->willThrowException(new  \OCP\Files\NotPermittedException());

		$this->l10n->method('t')
			->with('Read-only permission cannot save document changes. Please reload the page.')
			->willReturn('Read-only permission cannot save document changes. Please reload the page.');

		$response = $this->apiService->save($session, $document, 1, 'content', 'state');

		self::assertEquals(\OCP\AppFramework\Http::STATUS_FORBIDDEN, $response->getStatus());
		self::assertEquals('Read-only permission cannot save document changes. Please reload the page.',
			$response->getData()['error']
		);
	}

	private function mockFile(int $id, ?string $owner) {
		$file = $this->createMock(\OCP\Files\File::class);
		$storage = $this->createMock(\OCP\Files\Storage\IStorage::class);
		$file->method('getStorage')->willReturn($storage);
		$file->method('getId')->willReturn($id);
		$file->method('getOwner')->willReturn($owner);
		$file->method('getName')->willReturn('name');
		$file->method('getContent')->willReturn('file content');
		return $file;
	}

}
