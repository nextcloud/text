<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\Attributes\AddIndex;
use OCP\Migration\Attributes\IndexType;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;
use Override;

#[AddIndex(table: 'text_steps', type: IndexType::INDEX, description: 'Optimize cleanup job')]
class Version080000Date20260331132113 extends SimpleMigrationStep {
	private bool $addIndexLater = false;

	public function __construct(
		private readonly IDBConnection $connection,
	) {
	}

	#[Override]
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('text_steps');
		if (!$table->hasIndex('text_steps_doc_id_id_index')) {
			if ($this->connection->getDatabaseProvider() === IDBConnection::PLATFORM_MARIADB
				|| $this->connection->getDatabaseProvider() === IDBConnection::PLATFORM_MYSQL) {
				$table->addIndex(['document_id', 'id'], 'text_steps_doc_id_id_index');
			} else {
				$this->addIndexLater = true;
			}
			return $schema;
		}

		return null;
	}

	#[Override]
	public function postSchemaChange(IOutput $output, \Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();
		if ($this->addIndexLater) {
			// We need to add the index with a DESC manually
			// See https://github.com/doctrine/orm/issues/8128
			if ($this->connection->getDatabaseProvider() === IDBConnection::PLATFORM_POSTGRES) {
				$stm = $this->connection->prepare('CREATE INDEX CONCURRENTLY text_steps_doc_id_id_index ON *PREFIX*text_steps (document_id, id DESC);');
			} elseif ($this->connection->getDatabaseProvider() === IDBConnection::PLATFORM_ORACLE) {
				$stm = $this->connection->prepare('CREATE INDEX text_steps_doc_id_id_index ON *PREFIX*text_steps (document_id, id DESC) ONLINE;');
			} elseif ($this->connection->getDatabaseProvider() === IDBConnection::PLATFORM_SQLITE) {
				$stm = $this->connection->prepare('CREATE INDEX text_steps_doc_id_id_index ON *PREFIX*text_steps (document_id, id DESC);');
			} else {
				throw new \RuntimeException('Unsupported platform');
			}
			$stm->execute();
			return $schema;
		}
		return null;
	}
}
