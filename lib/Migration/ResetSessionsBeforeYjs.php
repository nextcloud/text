<?php

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Migration;

use OCA\Text\AppInfo\Application;
use OCP\IAppConfig;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

class ResetSessionsBeforeYjs implements IRepairStep {
	public function __construct(
		private IAppConfig $config,
	) {
	}

	/**
	 * @return string
	 */
	public function getName(): string {
		return 'Force-reset all Text document sessions';
	}

	public function run(IOutput $output): void {
		$appVersion = $this->config->getValueString('text', 'installed_version');

		if (!$appVersion || version_compare($appVersion, '4.0.1') !== -1) {
			return;
		}

		// Set the timestamp of the upgrade to reset documents when the create request tries to obtain the state
		$this->config->setValueInt(Application::APP_NAME, 'update_reset_before', time());
	}
}
