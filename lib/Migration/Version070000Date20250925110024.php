<?php

declare(strict_types=1);

namespace OCA\Text\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\Attributes\AddColumn;
use OCP\Migration\Attributes\ColumnType;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

#[AddColumn(table: 'text_documents', name: 'checksum', type: ColumnType::STRING, description: 'CRC32 checksum of document content')]
class Version070000Date20250925110024 extends SimpleMigrationStep {
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('text_documents');
		if (!$table->hasColumn('checksum')) {
			$table->addColumn('checksum', Types::STRING, [
				'notnull' => false,
				'length' => 8,
			]);
			return $schema;
		}

		return null;
	}
}
