<?php

declare(strict_types=1);

namespace OCA\Text\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\IConfig;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version030201Date20201116110353 extends SimpleMigrationStep {

	/** @var bool */
	private $isOracle;

	public function __construct(IConfig $config) {
		$this->isOracle = $config->getSystemValue('dbtype', 'sqlite') === 'oci';
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$this->ensureColumnIsNullable($schema, 'text_steps', 'version');

		if ($this->isOracle) {
			// Drop table if we are on oracle and recreate it with the next migration Version030201Date20201116123153
			if ($schema->hasTable('text_documents')) {
				$schema->dropTable('text_documents');
			}
		} else {
			$this->ensureColumnIsNullable($schema, 'text_documents', 'current_version');
			$this->ensureColumnIsNullable($schema, 'text_documents', 'last_saved_version');
			$table = $schema->getTable('text_documents');
			$column = $table->getColumn('id');
			if ($column->getAutoincrement()) {
				$table->changeColumn('id', [
					'autoincrement' => false,
				]);
			}
		}

		return $schema;
	}

	protected function ensureColumnIsNullable(ISchemaWrapper $schema, string $tableName, string $columnName): bool {
		$table = $schema->getTable($tableName);
		$column = $table->getColumn($columnName);

		if ($column->getNotnull()) {
			$column->setNotnull(false);
			return true;
		}

		return false;
	}
}
