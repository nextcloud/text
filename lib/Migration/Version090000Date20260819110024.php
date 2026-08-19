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
use OCP\Migration\Attributes\ColumnType;
use OCP\Migration\Attributes\ModifyColumn;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

#[ModifyColumn(table: 'text_documents', name: 'context_type', type: ColumnType::STRING, description: 'Type of the context - file, deck_card, ...')]
#[ModifyColumn(table: 'text_documents', name: 'context_id', type: ColumnType::BIGINT, description: 'Id of the context of the document - i.e. the files id, card id')]
class Version090000Date20260819110024 extends SimpleMigrationStep {

	public function __construct(
		private readonly IDBConnection $connection,
	) {
	}

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 *
	 * @return void
	 */
	public function preSchemaChange(IOutput $output, Closure $schemaClosure, array $options) {
		$qb = $this->connection->getQueryBuilder();
		$qb->update('text_documents', 'd')
			->set('d.context_type', $qb->createNamedParameter('file'))
			->where($qb->expr()->isNull('context_type'))
			->executeStatement();
		$qb->update('text_documents', 'd')
			->set('d.context_id', 'd.id')
			->where($qb->expr()->isNull('context_id'))
			->executeStatement();
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('text_documents');

		$column = $table->getColumn('context_type');
		if (!$column->getNotnull()) {
			$table->modifyColumn('context_type', [
				'notnull' => true,
			]);
		}

		$column = $table->getColumn('context_id');
		if (!$column->getNotnull()) {
			$table->modifyColumn('context_id', [
				'notnull' => true,
			]);
			return $schema;
		}
		return null;
	}
}
