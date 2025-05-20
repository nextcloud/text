<?php

namespace OCA\Text\Tests;

use OCA\Text\Db\Document;
use OCA\Text\Service\ApiService;
use OCA\Text\Service\ConfigService;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\EncodingService;
use OCA\Text\Service\SessionService;
use OCP\IL10N;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

class ApiServiceTest extends \PHPUnit\Framework\TestCase {
	private ApiService $apiService;

	private IRequest $request;
	private ConfigService $configService;
	private SessionService $sessionService;
	private DocumentService $documentService;
	private EncodingService $encodingService;
	private LoggerInterface $loggerInterface;
	private IL10N $l10n;
	private string $userId;

	public function setUp(): void {
		$this->request = $this->createMock(IRequest::class);
		$this->configService = $this->createMock(ConfigService::class);
		$this->sessionService = $this->createMock(SessionService::class);
		$this->documentService = $this->createMock(DocumentService::class);
		$this->encodingService = $this->createMock(EncodingService::class);
		$this->loggerInterface = $this->createMock(LoggerInterface::class);
		$this->l10n = $this->createMock(IL10N::class);
		$this->userId = 'admin';

		$document = new Document();
		$document->setId(123);
		$this->documentService->method('getDocument')->willReturn($document);
		$this->documentService->method('isReadOnly')->willReturn(false);

		$this->apiService = new ApiService(
			$this->request,
			$this->configService,
			$this->sessionService,
			$this->documentService,
			$this->encodingService,
			$this->loggerInterface,
			$this->l10n,
			$this->userId,
			null,
		);
	}

	public function testCreateNewSession() {
		$file = $this->mockFile(1234, 'admin');
		$this->documentService->method('getFileById')->willReturn($file);
		$actual = $this->apiService->create(1234);
		self::assertTrue($actual->getData()['hasOwner']);
	}

	public function testCreateNewSessionWithoutOwner() {
		$file = $this->mockFile(1234, null);
		$this->documentService->method('getFileById')->willReturn($file);
		$actual = $this->apiService->create(1234);
		self::assertFalse($actual->getData()['hasOwner']);
	}

	private function mockFile(int $id, ?string $owner) {
		$file = $this->createMock(\OCP\Files\File::class);
		$storage = $this->createMock(\OCP\Files\Storage\IStorage::class);
		$file->method('getStorage')->willReturn($storage);
		$file->method('getId')->willReturn($id);
		$file->method('getOwner')->willReturn($owner);
		return $file;
	}

}
