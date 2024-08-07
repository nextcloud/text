<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
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

#[AddColumn(table: 'text_steps', name: 'timestamp', type: ColumnType::BIGINT, description: 'Tracking the timestamp of a document editing step')]
class Version040100Date20240611165300 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if ($schema->hasTable('text_steps')) {
			$table = $schema->getTable('text_steps');
			if (!$table->hasColumn('timestamp')) {
				$table->addColumn('timestamp', Types::BIGINT, [
					'notnull' => true,
					'length' => 6,
					'default' => 0,
				]);
				return $schema;
			}
		}
		return null;
	}
}
