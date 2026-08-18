<?php

namespace OCA\Text\Tests;

use OCA\Text\Context\ContextManager;
use OCA\Text\Context\DocumentData;
use OCA\Text\Context\IContext;
use OCA\Text\Context\SessionInfo;
use OCA\Text\Db\Document;
use OCA\Text\Db\Session;
use OCA\Text\Service\ApiService;
use OCA\Text\Service\ConfigService;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCA\Text\Service\SessionService;
use OCP\IL10N;
use Psr\Log\LoggerInterface;

class ApiServiceTest extends \PHPUnit\Framework\TestCase {
	private ApiService $apiService;

	private ConfigService $configService;
	private ContextManager $contextManager;
	private SessionService $sessionService;
	private DocumentService $documentService;
	private FileService $fileService;
	private LoggerInterface $loggerInterface;
	private LockService $lockService;
	private IL10N $l10n;

	public function setUp(): void {
		$this->configService = $this->createStub(ConfigService::class);
		$this->contextManager = $this->createStub(ContextManager::class);
		$this->sessionService = $this->createStub(SessionService::class);
		$this->documentService = $this->createStub(DocumentService::class);
		$this->fileService = $this->createStub(FileService::class);
		$this->loggerInterface = $this->createStub(LoggerInterface::class);
		$this->lockService = $this->createStub(LockService::class);
		$this->l10n = $this->createStub(IL10N::class);

		$this->apiService = new ApiService(
			$this->configService,
			$this->contextManager,
			$this->sessionService,
			$this->documentService,
			$this->fileService,
			$this->loggerInterface,
			$this->lockService,
			$this->l10n,
			null,
		);
	}

	public function testCreateNewSession() {
		$document = new Document();
		$document->setId(123);
		$context = $this->createMock(IContext::class);
		$documentData = new DocumentData(document: $document, documentState: 'documentState');
		$sessionInfo = new SessionInfo(content: 'content', readOnly: false, lock: null, hasOwner: true);
		$context
			->expects($this->once())
			->method('buildDocument')
			->willReturn($document);
		$this->documentService->method('getOrCreateDocument')->willReturn($document);
		$this->documentService->method('getDocumentData')->willReturn($documentData);
		$context
			->expects($this->once())
			->method('prepareSession')
			->with($documentData)
			->willReturn($sessionInfo);
		$actual = $this->apiService->create($context, null);
		foreach ($documentData as $key => $value) {
			self::assertEquals($value, $actual->getData()[$key]);
		}
		foreach ($sessionInfo as $key => $value) {
			self::assertEquals($value, $actual->getData()[$key]);
		}
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
