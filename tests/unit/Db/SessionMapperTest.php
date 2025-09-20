<?php

namespace OCA\Text\Db;

/**
 * @group DB
 */
class SessionMapperTest extends \Test\TestCase {

	private SessionMapper $sessionMapper;
	private StepMapper $stepMapper;

	public function setUp(): void {
		parent::setUp();
		$this->sessionMapper = \OCP\Server::get(SessionMapper::class);
		$this->stepMapper = \OCP\Server::get(StepMapper::class);

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
		$this->stepMapper->deleteAll(1);
		$this->sessionMapper->deleteByDocumentId(1);

		// Create session
		$session = $this->sessionMapper->insert(Session::fromParams([
			'userId' => 'admin',
			'documentId' => 1,
			'lastContact' => time(),
			'token' => uniqid(),
			'color' => '00ff00',
		]));

		// Create steps for session
		$this->stepMapper->insert(Step::fromParams([
			'sessionId' => $session->getId(),
			'documentId' => 1,
			'data' => 'YJSDATA1',
			'version' => 1,
		]));
		$this->stepMapper->insert(Step::fromParams([
			'sessionId' => $session->getId(),
			'documentId' => 1,
			'data' => 'YJSDATA2',
			'version' => 2,
		]));

		// Create orphaned steps
		$this->stepMapper->insert(Step::fromParams([
			'sessionId' => 99999, // Non-existent session
			'documentId' => 1,
			'data' => 'ORPHANED1',
			'version' => 3,
		]));
		$this->stepMapper->insert(Step::fromParams([
			'sessionId' => 99998, // Non-existent session
			'documentId' => 1,
			'data' => 'ORPHANED2',
			'version' => 4,
		]));

		// Verify 4 steps total
		$allSteps = $this->stepMapper->find(1, 0);
		self::assertCount(4, $allSteps);

		// Delete orphaned steps
		$deletedCount = $this->sessionMapper->deleteOrphanedSteps();

		// Should have deleted 2 orphaned steps
		self::assertEquals(2, $deletedCount);

		// Should have 2 valid steps remaining
		$remainingSteps = $this->stepMapper->find(1, 0);
		self::assertCount(2, $remainingSteps);
	}
}
