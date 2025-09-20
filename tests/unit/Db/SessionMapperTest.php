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

	public function testRemoveOldSessions() {
		$this->stepMapper->deleteAll(1);
		$this->sessionMapper->deleteByDocumentId(1);

		$fourMonthsAgo = time() - (120 * 24 * 60 * 60);
		$oneWeekAgo = time() - (7 * 24 * 60 * 60);

		// Create old and recent session
		$oldSession = $this->sessionMapper->insert(Session::fromParams([
			'userId' => 'admin',
			'documentId' => 1,
			'lastContact' => $fourMonthsAgo,
			'token' => uniqid(),
			'color' => '00ff00',
		]));
		$recentSession = $this->sessionMapper->insert(Session::fromParams([
			'userId' => 'admin',
			'documentId' => 1,
			'lastContact' => $oneWeekAgo,
			'token' => uniqid(),
			'color' => 'ff0000',
		]));

		// Create steps for old and recent session
		$this->stepMapper->insert(Step::fromParams([
			'sessionId' => $oldSession->getId(),
			'documentId' => 1,
			'data' => 'OLD_STEP',
			'version' => 1,
		]));
		$this->stepMapper->insert(Step::fromParams([
			'sessionId' => $recentSession->getId(),
			'documentId' => 1,
			'data' => 'RECENT_STEP',
			'version' => 2,
		]));

		// Verify 2 sessions and 2 steps
		self::assertCount(2, $this->sessionMapper->findAll(1));
		self::assertCount(2, $this->stepMapper->find(1, 0));

		// Delete sessions older than 90 days
		$threeMonths = 90 * 24 * 60 * 60;
		$deletedCount = $this->sessionMapper->deleteOldSessions($threeMonths);
		self::assertEquals(1, $deletedCount);

		// Should have 1 recent session remaining
		$remainingSessions = $this->sessionMapper->findAll(1);
		self::assertCount(1, $remainingSessions);
		self::assertEquals($recentSession->getId(), $remainingSessions[0]->getId());

		// Should have 1 step from recent session remaining
		$remainingSteps = $this->stepMapper->find(1, 0);
		self::assertCount(1, $remainingSteps);
		self::assertEquals($recentSession->getId(), $remainingSteps[0]->getSessionId());
	}
}
