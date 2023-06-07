<?php

declare(strict_types=1);

namespace OCA\Text\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Auto-generated migration step: Please modify to your needs!
 */
class Version030701Date20230207131313 extends SimpleMigrationStep {

	/**
	 * @param IOutput $output
	 * @param Closure $schemaClosure The `\Closure` returns a `ISchemaWrapper`
	 * @param array $options
	 * @return null|ISchemaWrapper
	 */
	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options) {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('text_sessions');
		if (!$table->hasColumn('last_awareness_message')) {
			$table->addColumn('last_awareness_message', \OCP\DB\Types::TEXT, [
				'notnull' => false,
				'default' => ''
			]);
			return $schema;
		}

		return null;
	}
}
