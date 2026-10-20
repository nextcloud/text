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
 * Fresh installs only run changeSchema, so this drives the upgrade path explicitly.
 *
 * @group DB
 */
class TextStepsIndexOracleTest extends \Test\TestCase {
	private const string INDEX_NAME = 'text_steps_doc_id_id_index';

	private Connection $connection;

	public function setUp(): void {
		parent::setUp();
		$this->connection = Server::get(Connection::class);
		if ($this->connection->getDatabaseProvider() !== IDBConnection::PLATFORM_ORACLE) {
			$this->markTestSkipped('Oracle only');
		}
	}

	public function testUpgradeCreatesAscendingIndex(): void {
		if ($this->getTextStepsTable()->hasIndex(self::INDEX_NAME)) {
			$this->connection->executeStatement('DROP INDEX ' . self::INDEX_NAME);
		}

		(new MigrationService('text', $this->connection))->executeStep('080000Date20260331132113');

		$columns = array_map(
			static fn (string $column): string => trim($column, '"'),
			$this->getTextStepsTable()->getIndex(self::INDEX_NAME)->getColumns(),
		);
		self::assertSame(['document_id', 'id'], $columns);

		// A DESC key would be a hidden column here and break this comparison for every later migration
		self::assertIsString($this->connection->migrateToSchema($this->connection->createSchema(), true));
	}

	private function getTextStepsTable(): \Doctrine\DBAL\Schema\Table {
		return $this->connection->createSchema()->getTable($this->connection->getPrefix() . 'text_steps');
	}
}
