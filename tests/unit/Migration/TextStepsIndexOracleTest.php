<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Migration;

use OC\DB\Connection;
use OC\DB\MigrationService;
use OCP\IDBConnection;
use OCP\Server;

/**
 * Fresh installs only run changeSchema, so the upgrade path is driven explicitly.
 *
 * @group DB
 */
class TextStepsIndexOracleTest extends \Test\TestCase {
	private const INDEX_NAME = 'text_steps_doc_id_id_index';

	private Connection $connection;

	public function setUp(): void {
		parent::setUp();
		$this->connection = Server::get(Connection::class);
		if ($this->connection->getDatabaseProvider() !== IDBConnection::PLATFORM_ORACLE) {
			$this->markTestSkipped('Oracle only');
		}
	}

	public function testFreshInstallHasAscendingIndex(): void {
		self::assertSame(['document_id', 'id'], $this->getIndexColumns());
	}

	public function testUpgradeCreatesAscendingIndex(): void {
		$this->connection->executeStatement('DROP INDEX ' . self::INDEX_NAME);

		$this->executeStep('080000Date20260331132113');

		self::assertSame(['document_id', 'id'], $this->getIndexColumns());
		$this->assertSchemaComparisonWorks();
	}

	private function executeStep(string $version): void {
		(new MigrationService('text', $this->connection))->executeStep($version);
	}

	private function getIndexColumns(): array {
		$table = $this->connection->createSchema()->getTable($this->connection->getPrefix() . 'text_steps');
		return array_map(
			static fn (string $column): string => trim($column, '"'),
			$table->getIndex(self::INDEX_NAME)->getColumns(),
		);
	}

	private function assertSchemaComparisonWorks(): void {
		// A DESC key would be a hidden column here and break this comparison for every later migration
		self::assertIsString($this->connection->migrateToSchema($this->connection->createSchema(), true));
	}
}
