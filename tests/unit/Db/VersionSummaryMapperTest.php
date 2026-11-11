<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Db;

use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;
use OCP\Server;
use Test\TestCase;

/**
 * @group DB
 */
class VersionSummaryMapperTest extends TestCase {
	/** A storage no real file uses, for the file cache rows of these tests */
	private const int STORAGE = 987_655;

	private VersionSummaryMapper $mapper;

	protected function setUp(): void {
		parent::setUp();
		$this->mapper = Server::get(VersionSummaryMapper::class);
		$this->clear();
	}

	protected function tearDown(): void {
		$this->clear();
		parent::tearDown();
	}

	private function clear(): void {
		$db = Server::get(IDBConnection::class);
		$db->getQueryBuilder()->delete('text_version_summaries')->executeStatement();
		$db->getQueryBuilder()->delete('text_summary_starts')->executeStatement();
		$qb = $db->getQueryBuilder();
		$qb->delete('filecache')->where($qb->expr()->eq('storage', $qb->createNamedParameter(self::STORAGE, IQueryBuilder::PARAM_INT)))->executeStatement();
	}

	public function testClaimsAPairOnce(): void {
		$first = $this->mapper->claim(42, 1, str_repeat('a', 64), str_repeat('b', 64), 0);
		$second = $this->mapper->claim(42, 1, str_repeat('a', 64), str_repeat('b', 64), 0);

		$this->assertNotNull($first);
		$this->assertSame([VersionSummary::STATE_PENDING, 0], [$first->getState(), $first->getCreatedAt()]);
		$this->assertNull($second);
	}

	public function testReclaimsAFailedRowOnce(): void {
		$row = $this->mapper->claim(42, 1, str_repeat('a', 64), str_repeat('b', 64), 100);
		$this->assertTrue($this->mapper->attachTask($row->getId(), 7, 101));
		$this->assertFalse($this->mapper->attachTask($row->getId(), 8, 101));
		$this->assertTrue($this->mapper->finish($row->getId(), 7, VersionSummary::STATE_FAILED, null, 'provider_failed', null, 102));
		$this->assertFalse($this->mapper->finish($row->getId(), 7, VersionSummary::STATE_DONE, 'late', null, null, 103));

		$this->assertTrue($this->mapper->reclaim($row->getId(), 7, 104));
		$this->assertFalse($this->mapper->reclaim($row->getId(), 7, 104));
		$row = $this->mapper->findById($row->getId());
		$this->assertSame([VersionSummary::STATE_PENDING, null, null], [$row->getState(), $row->getTaskId(), $row->getErrorCode()]);
	}

	public function testCountsTheStartsOfEveryoneAndOfOnePerson(): void {
		$this->mapper->addStart(100, 'alice');
		$this->mapper->addStart(200, 'bob');
		$this->mapper->addStart(300, 'alice');
		$this->mapper->addStart(400, 'dave');

		$this->assertSame(['count' => 3, 'oldest' => 200], $this->mapper->countStartsSince(150));
		$this->assertSame(['count' => 2, 'oldest' => 100], $this->mapper->countStartsSince(0, 'alice'));
		$this->assertSame(['count' => 0, 'oldest' => null], $this->mapper->countStartsSince(0, 'carol'));
	}

	public function testFindsTheSummariesOfFilesThatAreGone(): void {
		$gone = $this->mapper->claim(PHP_INT_MAX - 1, 1, str_repeat('a', 64), str_repeat('b', 64), 100);
		$goneToo = $this->mapper->claim(PHP_INT_MAX - 1, 1, str_repeat('c', 64), str_repeat('b', 64), 100);
		$kept = $this->mapper->claim($this->addFile('files/notes/plan.md'), 1, str_repeat('a', 64), str_repeat('b', 64), 100);
		// Unreachable while in the trash, and right again once restored; its row goes with the trash
		$trashed = $this->mapper->claim($this->addFile('files_trashbin/files/notes.d1/plan.md'), 1, str_repeat('a', 64), str_repeat('b', 64), 100);
		// A folder of that name on another storage holds files in use
		$named = $this->mapper->claim($this->addFile('files_trashbin/plan.md'), 1, str_repeat('a', 64), str_repeat('b', 64), 100);

		$found = array_map(fn ($row) => $row->getId(), $this->mapper->findOfMissingFiles(10));

		$this->assertEqualsCanonicalizing([$gone->getId(), $goneToo->getId()], $found);
		$this->assertSame([$gone->getId()], array_map(fn ($row) => $row->getId(), $this->mapper->findOfMissingFiles(1)));
		$this->assertNotContains($kept->getId(), $found);
		$this->assertNotContains($trashed->getId(), $found);
		$this->assertNotContains($named->getId(), $found);
	}

	private function addFile(string $path): int {
		$qb = Server::get(IDBConnection::class)->getQueryBuilder();
		$qb->insert('filecache')->values([
			'storage' => $qb->createNamedParameter(self::STORAGE, IQueryBuilder::PARAM_INT),
			'path' => $qb->createNamedParameter($path),
			'path_hash' => $qb->createNamedParameter(md5($path)),
			'name' => $qb->createNamedParameter(basename($path)),
		])->executeStatement();
		return $qb->getLastInsertId();
	}

	public function testStoresOnlyTheOutcomeOfTheTaskItWaitsFor(): void {
		$row = $this->mapper->claim(42, 1, str_repeat('a', 64), str_repeat('b', 64), 100);
		$this->mapper->attachTask($row->getId(), 7, 101);

		$this->assertFalse($this->mapper->finish($row->getId(), 6, VersionSummary::STATE_DONE, 'old task', null, null, 102));
		$this->assertTrue($this->mapper->finish($row->getId(), 7, VersionSummary::STATE_DONE, 'Summary', null, null, 102));
	}
}
