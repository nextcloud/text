<?php

namespace OCA\Text\Db;

/**
 * @group DB
 */
class SessionMapperTest extends \Test\TestCase {

	private SessionMapper $sessionMapper;
	private StepMapper $stepMapper;
	private DocumentMapper $documentMapper;

	public function setUp(): void {
		parent::setUp();
		$this->sessionMapper = \OCP\Server::get(SessionMapper::class);
		$this->stepMapper = \OCP\Server::get(StepMapper::class);
		$this->documentMapper = \OCP\Server::get(DocumentMapper::class);
	}

	public function testDeleteInactiveWithoutSteps() {
		$this->sessionMapper->deleteByDocumentId(1);
		$this->sessionMapper->deleteByDocumentId(2);
		$this->sessionMapper->insert(Session::fromParams([
			'userId' => 'admin',
			'documentId' => 1,
			'lastContact' => 1337,
			'token' => uniqid(),
			'color' => '00ff00',
		]));
		$this->sessionMapper->insert(Session::fromParams([
			'userId' => 'admin',
			'documentId' => 2,
			'lastContact' => 1337,
			'token' => uniqid(),
			'color' => '00ff00',
		]));
		$this->sessionMapper->deleteInactiveWithoutSteps(1);
		self::assertCount(0, $this->sessionMapper->findAll(1));
		self::assertCount(1, $this->sessionMapper->findAll(2));
		$this->sessionMapper->deleteInactiveWithoutSteps();
		self::assertCount(0, $this->sessionMapper->findAll(2));
	}

	public function testDeleteInactiveWithoutStepsKeep() {
		$this->stepMapper->deleteAll(1);
		$this->sessionMapper->deleteByDocumentId(1);
		$this->sessionMapper->deleteByDocumentId(2);

		$s1 = $this->sessionMapper->insert(Session::fromParams([
			'userId' => 'admin',
			'documentId' => 1,
			'lastContact' => 1337,
			'token' => uniqid(),
			'color' => '00ff00',
		]));
		$s2 = $this->sessionMapper->insert(Session::fromParams([
			'userId' => 'admin',
			'documentId' => 2,
			'lastContact' => 1337,
			'token' => uniqid(),
			'color' => '00ff00',
		]));
		$this->stepMapper->insert(Step::fromParams([
			'sessionId' => $s1->getId(),
			'documentId' => 1,
			'data' => 'YJSDATA',
			'version' => 1,
		]));
		self::assertCount(1, $this->sessionMapper->findAll(1));

		$this->sessionMapper->deleteInactiveWithoutSteps(1);
		self::assertCount(1, $this->sessionMapper->findAll(1));
		self::assertCount(1, $this->sessionMapper->findAll(2));

		$this->sessionMapper->deleteInactiveWithoutSteps();
		self::assertCount(1, $this->sessionMapper->findAll(1));
		self::assertCount(0, $this->sessionMapper->findAll(2));
	}

	public function testDeleteInactiveWithoutStepsMultiple() {
		$this->sessionMapper->deleteByDocumentId(1);

		$count = 1010;
		for ($i = 0;$i < $count;$i++) {
			$this->sessionMapper->insert(Session::fromParams([
				'userId' => 'admin',
				'documentId' => 1,
				'lastContact' => 1337,
				'token' => uniqid(),
				'color' => '00ff00',
			]));
		}

		self::assertCount($count, $this->sessionMapper->findAll(1));

		$deleted = $this->sessionMapper->deleteInactiveWithoutSteps();
		self::assertEquals($count, $deleted);

		self::assertCount(0, $this->sessionMapper->findAll(1));
	}

	public function testDeleteOrphanedSteps() {
		$this->documentMapper->clearAll();
		$this->sessionMapper->clearAll();
		$this->stepMapper->clearAll();

		$oldTimestamp = time() - 86401;

		// Create document
		$document = $this->documentMapper->insert(Document::fromParams([
			'id' => 1,
			'currentVersion' => 0,
			'lastSavedVersion' => 100,
			'lastSavedVersionTime' => time()
		]));

		// Create Orphaned step without document (delete)
		$this->stepMapper->insert(Step::fromParams([
			'sessionId' => 99999,
			'documentId' => 99999,
			'data' => 'ORPHANED_NO_DOC',
			'version' => 1
		]));

		// Orphaned "old" step with document and old version (delete)
		$this->stepMapper->insert(Step::fromParams([
			'id' => 1,
			'sessionId' => 99999,
			'documentId' => $document->getId(),
			'data' => 'ORPHANED_OLD_VERSION',
			'timestamp' => $oldTimestamp,
			'version' => 1
		]));

		// Orphaned "new" step with document and current version (keep)
		$this->stepMapper->insert(Step::fromParams([
			'id' => 100,
			'sessionId' => 99999,
			'documentId' => $document->getId(),
			'data' => 'ORPHANED_CURRENT_VERSION',
			'version' => 2
		]));

		// Orphaned step with document and new version (keep)
		$this->stepMapper->insert(Step::fromParams([
			'id' => 101,
			'sessionId' => 99999,
			'documentId' => $document->getId(),
			'data' => 'ORPHANED_NEW_VERSION',
			'timestamp' => $oldTimestamp,
			'version' => 3
		]));

		// Verify steps for document 1 and 99999
		self::assertCount(3, $this->stepMapper->find(1, 0));
		self::assertCount(1, $this->stepMapper->find(99999, 0));

		// Verify orphan delete
		$deletedCount = $this->sessionMapper->deleteOrphanedSteps();
		self::assertEquals(2, $deletedCount);
	}
}
