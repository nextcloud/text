<?php

declare(strict_types=1);

namespace OCA\Text\Migration;

use Closure;
use Doctrine\DBAL\Types\Types;
use OCP\DB\ISchemaWrapper;
use OCP\IConfig;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version030201Date20201116123153 extends SimpleMigrationStep {

	/** @var bool */
	private $isOracle;

	public function __construct(IConfig $config) {
		$this->isOracle = $config->getSystemValue('dbtype', 'sqlite') === 'oci';
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		if (!$this->isOracle) {
			return null;
		}

		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('text_documents')) {
			// Recreate table from the first migration since we cannot alter the autoincrement on the id column with oracle
			$table = $schema->createTable('text_documents');
			$table->addColumn('id', Types::BIGINT, [
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('current_version', Types::BIGINT, [
				// 'notnull' => true,
				'notnull' => false,
				'default' => 0,
				'unsigned' => true,
			]);
			$table->addColumn('last_saved_version', Types::BIGINT, [
				// 'notnull' => true,
				'notnull' => false,
				'default' => 0,
				'unsigned' => true,
			]);
			$table->addColumn('last_saved_version_time', Types::BIGINT, [
				'length' => 20,
				'unsigned' => true,
			]);
			$table->addColumn('last_saved_version_etag', Types::STRING, [
				'notnull' => false,
				'length' => 64,
				'default' => ''
			]);
			$table->addColumn('base_version_etag', Types::STRING, [
				'notnull' => false,
				'length' => 64,
				'default' => ''
			]);
			$table->setPrimaryKey(['id']);
			return $schema;
		}
		return null;
	}
}
