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

#[AddColumn(table: 'text_documents', name: 'last_attachment_cleanup', type: ColumnType::BIGINT, description: 'Last saved timestamp processed by attachment cleanup')]
class Version100000Date20261011000000 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		$schema = $schemaClosure();
		$table = $schema->getTable('text_documents');
		if (!$table->hasColumn('last_attachment_cleanup')) {
			$table->addColumn('last_attachment_cleanup', Types::BIGINT, [
				'notnull' => true,
				'default' => 0,
				'unsigned' => true,
			]);
			return $schema;
		}

		return null;
	}
}
