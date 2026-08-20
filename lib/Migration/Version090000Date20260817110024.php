<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\Attributes\AddColumn;
use OCP\Migration\Attributes\ColumnType;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

#[AddColumn(table: 'text_documents', name: 'context_type', type: ColumnType::STRING, description: 'Type of the context - file, deck_card, ...')]
#[AddColumn(table: 'text_documents', name: 'context_id', type: ColumnType::BIGINT, description: 'Id of the context of the document - i.e. the files id, card id')]
class Version090000Date20260817110024 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('text_documents');

		if (!$table->hasColumn('context_type')) {
			$table->addColumn('context_type', Types::STRING, [
				'notnull' => false,
				'length' => 64,
			]);
		}

		if (!$table->hasColumn('context_id')) {
			$table->addColumn('context_id', Types::BIGINT, [
				'notnull' => false,
				'unsigned' => true,
			]);
		}

		$column = $table->getColumn('id');
		if (!$column->getAutoincrement()) {
			$table->modifyColumn('id', [
				'autoincrement' => true,
			]);
		}
		return $schema;
	}
}
