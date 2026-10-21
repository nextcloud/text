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

/**
 * Replaces a descending text_steps_doc_id_id_index on Oracle with an ascending one.
 *
 * Oracle stores a DESC key as a hidden virtual column (SYS_NC...$). Its index then
 * references a column the table does not list, and the schema comparison of every
 * later migration fails with "There is no column with name ...".
 */
#[AddIndex(table: 'text_steps', type: IndexType::INDEX, description: 'Replace descending index on Oracle')]
class Version080000Date20261020120000 extends SimpleMigrationStep {
	public function __construct(
		private readonly IDBConnection $connection,
	) {
	}

	#[Override]
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		if ($this->connection->getDatabaseProvider() !== IDBConnection::PLATFORM_ORACLE) {
			return null;
		}

		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();
		$table = $schema->getTable('text_steps');
		if ($this->hasHiddenIndexColumn($schema)) {
			// Dropped from the target schema, so the comparison never rebuilds it and only emits a DROP INDEX
			$table->dropIndex('text_steps_doc_id_id_index');
		}

		if (!$table->hasIndex('text_steps_doc_id_id_index')) {
			$table->addIndex(['document_id', 'id'], 'text_steps_doc_id_id_index');
			return $schema;
		}

		return null;
	}

	private function hasHiddenIndexColumn(ISchemaWrapper $schema): bool {
		$table = $schema->getTable('text_steps');
		if (!$table->hasIndex('text_steps_doc_id_id_index')) {
			return false;
		}

		foreach ($table->getIndex('text_steps_doc_id_id_index')->getColumns() as $column) {
			if ($column === '' || !$table->hasColumn($column)) {
				return true;
			}
		}

		return false;
	}
}
