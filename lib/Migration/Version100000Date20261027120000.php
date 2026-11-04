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
use OCP\Migration\Attributes\CreateTable;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

#[CreateTable(table: 'text_version_summaries', description: 'AI summaries of the changes between two versions of a file, keyed by the content of both')]
#[CreateTable(table: 'text_summary_starts', description: 'Summary tasks started in the last hour, for the hourly limits of the instance and of each person')]
class Version100000Date20261027120000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();
		$changed = false;

		if (!$schema->hasTable('text_version_summaries')) {
			$table = $schema->createTable('text_version_summaries');
			$table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true]);
			$table->addColumn('file_id', Types::BIGINT, ['notnull' => true, 'unsigned' => true]);
			$table->addColumn('prompt_version', Types::SMALLINT, ['notnull' => true, 'unsigned' => true]);
			$table->addColumn('from_hash', Types::STRING, ['notnull' => true, 'length' => 64]);
			$table->addColumn('to_hash', Types::STRING, ['notnull' => true, 'length' => 64]);
			$table->addColumn('state', Types::SMALLINT, ['notnull' => true, 'unsigned' => true]);
			$table->addColumn('task_id', Types::BIGINT, ['notnull' => false, 'unsigned' => true]);
			$table->addColumn('summary', Types::TEXT, ['notnull' => false]);
			$table->addColumn('error_code', Types::STRING, ['notnull' => false, 'length' => 32]);
			$table->addColumn('error_message', Types::STRING, ['notnull' => false, 'length' => 4000]);
			$table->addColumn('created_at', Types::BIGINT, ['notnull' => true, 'unsigned' => true]);
			$table->addColumn('updated_at', Types::BIGINT, ['notnull' => true, 'unsigned' => true]);
			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['file_id', 'prompt_version', 'from_hash', 'to_hash'], 'text_vsum_pair');
			$table->addIndex(['task_id'], 'text_vsum_task');
			$table->addIndex(['state', 'updated_at'], 'text_vsum_state');
			$table->addIndex(['created_at'], 'text_vsum_created');
			$changed = true;
		}

		if (!$schema->hasTable('text_summary_starts')) {
			$table = $schema->createTable('text_summary_starts');
			$table->addColumn('id', Types::BIGINT, ['autoincrement' => true, 'notnull' => true, 'unsigned' => true]);
			$table->addColumn('started_at', Types::BIGINT, ['notnull' => true, 'unsigned' => true]);
			$table->addColumn('user_id', Types::STRING, ['notnull' => true, 'length' => 64]);
			$table->setPrimaryKey(['id']);
			$table->addIndex(['started_at'], 'text_vsum_started');
			$table->addIndex(['user_id', 'started_at'], 'text_vsum_user_started');
			$changed = true;
		}

		return $changed ? $schema : null;
	}
}
