<?php

declare(strict_types=1);

namespace OCA\Text\Migration;

use Closure;
use Doctrine\DBAL\Types\Type;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\SimpleMigrationStep;
use OCP\Migration\IOutput;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version010000Date20190617184535 extends SimpleMigrationStep {

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 */
	public function preSchemaChange(IOutput $output, Closure $schemaClosure, array $options) {
	}

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 * @return null|ISchemaWrapper
	 */
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('text_documents')) {
			$table = $schema->createTable('text_documents');
			$table->addColumn('id', Type::BIGINT, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('current_version', Type::BIGINT, [
				'notnull' => true,
				'default' => 0,
				'unsigned' => true,
			]);
			$table->addColumn('last_saved_version', Type::BIGINT, [
				'notnull' => true,
				'default' => 0,
				'unsigned' => true,
			]);
			$table->addColumn('last_saved_version_time', Type::BIGINT, [
				'notnull' => true,
				'length' => 20,
				'unsigned' => true,
			]);
			$table->addColumn('last_saved_version_etag', Type::STRING, [
				'notnull' => false,
				'length' => 64,
				'default' => ''
			]);
			$table->addColumn('base_version_etag', TYPE::STRING, [
				'notnull' => false,
				'length' => 64,
				'default' => ''
			]);
			$table->setPrimaryKey(['id']);
		}

		if (!$schema->hasTable('text_sessions')) {
			$table = $schema->createTable('text_sessions');
			$table->addColumn('id', Type::BIGINT, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('user_id', Type::STRING, [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('guest_name', Type::STRING, [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('color', Type::STRING, [
				'notnull' => false,
				'length' => 7,
			]);
			$table->addColumn('token', Type::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('document_id', Type::BIGINT, [
				'notnull' => true,
			]);
			$table->addColumn('last_contact', Type::BIGINT, [
				'notnull' => true,
				'length' => 20,
				'unsigned' => true,
			]);
			$table->setPrimaryKey(['id']);
			$table->addIndex(['token'], 'rd_session_token_idx');
		}

		if (!$schema->hasTable('text_steps')) {
			$table = $schema->createTable('text_steps');
			$table->addColumn('id', Type::BIGINT, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('document_id', Type::BIGINT, [
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('session_id', Type::BIGINT, [
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('data', Type::TEXT, [
				'notnull' => true,
			]);
			$table->addColumn('version', Type::BIGINT, [
				'notnull' => true,
				'default' => 0,
				'unsigned' => true,
			]);
			$table->setPrimaryKey(['id']);
			$table->addIndex(['document_id'], 'rd_steps_did_idx');
			$table->addIndex(['version'], 'rd_steps_version_idx');
		}
		return $schema;
	}

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 */
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options) {
	}
}
