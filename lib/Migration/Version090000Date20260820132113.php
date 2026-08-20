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

#[AddIndex(table: 'text_documents', type: IndexType::INDEX, description: 'Speed up loading by context')]
class Version090000Date20260820132113 extends SimpleMigrationStep {
	public function __construct(
		private readonly IDBConnection $connection,
	) {
	}

	#[Override]
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('text_documents');
		if (!$table->hasIndex('text_documents_context_index')) {
			$table->addIndex(['context_type', 'context_id'], 'text_documents_context_index');
		}

		return $schema;
	}
}
