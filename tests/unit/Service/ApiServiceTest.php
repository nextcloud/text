<?php

namespace OCA\Text\Tests;

use OCA\Text\Context\ContextManager;
use OCA\Text\Context\DocumentData;
use OCA\Text\Context\IContext;
use OCA\Text\Context\ILockingContext;
use OCA\Text\Context\SessionInfo;
use OCA\Text\Db\Document;
use OCA\Text\Db\Session;
use OCA\Text\Exception\DocumentLockedException;
use OCA\Text\Service\ApiService;
use OCA\Text\Service\ConfigService;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\LockService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Http;
use OCP\Files\Lock\ILock;
use OCP\IL10N;
use OCP\IUser;
use Psr\Log\LoggerInterface;

class ApiServiceTest extends \PHPUnit\Framework\TestCase {
	private ApiService $apiService;

	private ConfigService $configService;
	private ContextManager $contextManager;
	private SessionService $sessionService;
	private DocumentService $documentService;
	private LoggerInterface $loggerInterface;
	private LockService $lockService;
	private IL10N $l10n;

	public function setUp(): void {
		$this->configService = $this->createStub(ConfigService::class);
		$this->contextManager = $this->createStub(ContextManager::class);
		$this->sessionService = $this->createStub(SessionService::class);
		$this->documentService = $this->createStub(DocumentService::class);
		$this->loggerInterface = $this->createStub(LoggerInterface::class);
		$this->lockService = $this->createStub(LockService::class);
		$this->l10n = $this->createStub(IL10N::class);

		$this->apiService = new ApiService(
			$this->configService,
			$this->contextManager,
			$this->sessionService,
			$this->documentService,
			$this->loggerInterface,
			$this->l10n,
			null,
		);
	}

	public function testCreateNewSession() {
		$document = new Document();
		$document->generateId();
		$context = $this->createMock(IContext::class);
		$documentData = new DocumentData(document: $document, documentState: 'documentState');
		$sessionInfo = new SessionInfo(readOnly: false, lock: null, canAttachFiles: true);
		$context
			->expects($this->once())
			->method('buildDocument')
			->willReturn($document);
		$this->documentService->method('getOrCreateDocument')->willReturn($document);
		$this->documentService->method('getDocumentData')->willReturn($documentData);
		$context
			->expects($this->once())
			->method('prepareSession')
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
		$document->generateId();
		$user = $this->createStub(IUser::class);

		$this->documentService->method('autosave')->willThrowException(new  \OCP\Files\NotPermittedException());

		$this->l10n->method('t')
			->with('Read-only permission cannot save document changes. Please reload the page.')
			->willReturn('Read-only permission cannot save document changes. Please reload the page.');

		$response = $this->apiService->save($document, $user, 1, 'content', 'state');

		self::assertEquals(\OCP\AppFramework\Http::STATUS_FORBIDDEN, $response->getStatus());
		self::assertEquals('Read-only permission cannot save document changes. Please reload the page.',
			$response->getData()['error']
		);
	}

	/**
	 * @return array{ApiService, IContext&\PHPUnit\Framework\MockObject\MockObject}
	 */
	private function apiServiceForClose(bool $recentlyActive): array {
		$sessionService = $this->createMock(SessionService::class);
		$sessionService->expects(self::once())->method('closeSession')->with('111', 1, 'token');
		$sessionService->method('hasRecentlyActiveSessions')->with('111')->willReturn($recentlyActive);
		$documentService = $this->createStub(DocumentService::class);
		$documentService->method('getDocument')->willReturn(
			Document::fromRow(['id' => '111', 'context_type' => 'file', 'context_id' => 456]),
		);
		$context = $this->createMock(IContext::class);
		$contextManager = $this->createStub(ContextManager::class);
		$contextManager->method('getContext')->willReturn($context);
		$apiService = new ApiService(
			$this->configService,
			$contextManager,
			$sessionService,
			$documentService,
			$this->loggerInterface,
			$this->l10n,
			null,
		);
		return [$apiService, $context];
	}

	public function testCloseReleasesLockWithoutRecentlyActiveSessions(): void {
		[$apiService, $context] = $this->apiServiceForClose(false);
		$context->expects(self::once())->method('cleanup');

		$apiService->close('111', 1, 'token', $this->createStub(IUser::class));
	}

	public function testCloseKeepsLockForRecentlyActiveSessions(): void {
		[$apiService, $context] = $this->apiServiceForClose(true);
		$context->expects(self::never())->method('cleanup');

		$apiService->close('111', 1, 'token', $this->createStub(IUser::class));
	}

	public function testPushToLockedFileAnswersLocked(): void {
		$lock = $this->createMock(ILock::class);
		$sessionService = $this->createStub(SessionService::class);
		$session = Session::fromParams(['id' => 1, 'documentId' => '111', 'userId' => 'admin']);
		$sessionService->method('updateSessionAwareness')->willReturn($session);
		$documentService = $this->createStub(DocumentService::class);
		$documentService->method('addStep')->willThrowException(new DocumentLockedException($lock));
		$apiService = new ApiService(
			$this->configService,
			$this->contextManager,
			$sessionService,
			$documentService,
			$this->loggerInterface,
			$this->l10n,
			null,
		);
		$document = Document::fromRow(['id' => '111', 'context_type' => 'file', 'context_id' => 456]);

		$response = $apiService->push($session, $document, 0, ['step'], '', null, $this->createStub(IUser::class));

		self::assertSame(Http::STATUS_LOCKED, $response->getStatus());
		self::assertSame($lock, $response->getData()['lock']);
	}

	public function testSyncReportsLockOfOthers(): void {
		$lock = $this->createMock(ILock::class);
		$context = $this->createStub(ILockingContext::class);
		$context->method('isReadOnly')->willReturn(true);
		$context->method('getLock')->willReturn($lock);
		$contextManager = $this->createStub(ContextManager::class);
		$contextManager->method('getContext')->willReturn($context);
		$apiService = new ApiService(
			$this->configService,
			$contextManager,
			$this->sessionService,
			$this->documentService,
			$this->loggerInterface,
			$this->l10n,
			null,
		);
		$document = Document::fromRow(['id' => '111', 'context_type' => 'file', 'context_id' => 456]);

		$data = $apiService->sync($document, $this->createStub(IUser::class))->getData();

		self::assertTrue($data['readOnly']);
		self::assertSame($lock, $data['lock']);
	}

	/**
	 * Prepare saving version 5 with closing the session, where autosave stores the given version
	 *
	 * @return array{SessionService&\PHPUnit\Framework\MockObject\MockObject, \Closure(): \OCP\AppFramework\Http\DataResponse}
	 */
	private function saveAndClose(?int $savedVersion, bool $conflict = false): array {
		$document = Document::fromRow(['id' => '111', 'context_type' => 'file', 'context_id' => 456]);
		$documentService = $this->createStub(DocumentService::class);
		if ($conflict) {
			$documentService->method('autosave')->willThrowException(new \OCA\Text\Exception\DocumentSaveConflictException('outside'));
		} else {
			$saved = Document::fromRow(['id' => '111', 'last_saved_version' => $savedVersion]);
			$documentService->method('autosave')->willReturn($saved);
		}
		$documentService->method('getDocument')->willReturn($document);
		$sessionService = $this->createMock(SessionService::class);
		$sessionService->method('hasRecentlyActiveSessions')->willReturn(false);
		$apiService = new ApiService(
			$this->configService,
			$this->contextManager,
			$sessionService,
			$documentService,
			$this->loggerInterface,
			$this->l10n,
			null,
		);
		$session = Session::fromParams(['id' => 1, 'documentId' => '111', 'userId' => 'admin', 'token' => 'token']);
		$save = fn () => $apiService->save($document, $this->createStub(IUser::class), 5, 'content', 'state', false, true, $session);
		return [$sessionService, $save];
	}

	public function testSaveClosesTheSessionOnceSaved(): void {
		[$sessionService, $save] = $this->saveAndClose(5);
		$sessionService->expects(self::once())->method('closeSession')->with('111', 1, 'token');

		self::assertSame(\OCP\AppFramework\Http::STATUS_OK, $save()->getStatus());
	}

	public function testSaveKeepsTheSessionIfNotSaved(): void {
		[$sessionService, $save] = $this->saveAndClose(4);
		$sessionService->expects(self::never())->method('closeSession');

		$save();
	}

	public function testSaveKeepsTheSessionOnConflict(): void {
		[$sessionService, $save] = $this->saveAndClose(null, true);
		$sessionService->expects(self::never())->method('closeSession');

		self::assertSame(\OCP\AppFramework\Http::STATUS_CONFLICT, $save()->getStatus());
	}
}
