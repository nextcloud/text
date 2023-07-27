<?php

declare(strict_types=1);

namespace OCA\Text\Migration;

use Closure;
use Doctrine\DBAL\Types\Types;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version010000Date20190617184535 extends SimpleMigrationStep {

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 *
	 * @return void
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
			$table->addColumn('id', Types::BIGINT, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('current_version', Types::BIGINT, [
				'notnull' => true,
				'default' => 0,
				'unsigned' => true,
			]);
			$table->addColumn('last_saved_version', Types::BIGINT, [
				'notnull' => true,
				'default' => 0,
				'unsigned' => true,
			]);
			$table->addColumn('last_saved_version_time', Types::BIGINT, [
				'notnull' => true,
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
		}

		if (!$schema->hasTable('text_sessions')) {
			$table = $schema->createTable('text_sessions');
			$table->addColumn('id', Types::BIGINT, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('user_id', Types::STRING, [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('guest_name', Types::STRING, [
				'notnull' => false,
				'length' => 64,
			]);
			$table->addColumn('color', Types::STRING, [
				'notnull' => false,
				'length' => 7,
			]);
			$table->addColumn('token', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('document_id', Types::BIGINT, [
				'notnull' => true,
			]);
			$table->addColumn('last_contact', Types::BIGINT, [
				'notnull' => true,
				'length' => 20,
				'unsigned' => true,
			]);
			$table->setPrimaryKey(['id']);
			$table->addIndex(['token'], 'rd_session_token_idx');
			$table->addIndex(['last_contact'], 'ts_lastcontact');
		}

		if (!$schema->hasTable('text_steps')) {
			$table = $schema->createTable('text_steps');
			$table->addColumn('id', Types::BIGINT, [
				'autoincrement' => true,
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('document_id', Types::BIGINT, [
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('session_id', Types::BIGINT, [
				'notnull' => true,
				'unsigned' => true,
			]);
			$table->addColumn('data', Types::TEXT, [
				'notnull' => true,
			]);
			$table->addColumn('version', Types::BIGINT, [
				'notnull' => true,
				'default' => 0,
				'unsigned' => true,
			]);
			$table->setPrimaryKey(['id']);
			$table->addIndex(['document_id'], 'rd_steps_did_idx');
			$table->addIndex(['version'], 'rd_steps_version_idx');
			$table->addIndex(['session_id'], 'textstep_session');
		}
		return $schema;
	}

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 *
	 * @return void
	 */
	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options) {
	}
}
