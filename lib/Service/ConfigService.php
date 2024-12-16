<?php

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCA\Text\AppInfo\Application;
use OCP\IAppConfig;
use OCP\IConfig;

class ConfigService {
	public function __construct(
		private IAppConfig $appConfig,
		private IConfig $config,
	) {
	}

	public function getDefaultFileExtension(): string {
		return $this->appConfig->getValueString(Application::APP_NAME, 'default_file_extension', 'md');
	}

	public function isOpenReadOnlyEnabled(): bool {
		return $this->appConfig->getValueString(Application::APP_NAME, 'open_read_only_enabled', '0') === '1';
	}

	public function isRichEditingEnabled(): bool {
		return ($this->appConfig->getValueString(Application::APP_NAME, 'rich_editing_enabled', '1') === '1');
	}

	public function isRichWorkspaceAvailable(): bool {
		if ($this->config->getSystemValueBool('enable_non-accessible_features', true) === false) {
			return false;
		}
		return $this->appConfig->getValueString(Application::APP_NAME, 'workspace_available', '1') === '1';
	}

	public function isRichWorkspaceEnabledForUser(?string $userId): bool {
		if ($userId === null) {
			return true;
		}
		return $this->config->getUserValue($userId, Application::APP_NAME, 'workspace_enabled', '1') === '1';
	}

	public function isNotifyPushSyncEnabled(): bool {
		return $this->appConfig->getValueBool(Application::APP_NAME, 'notify_push');

	}

	public function isFullWidthEditor(?string $userId): bool {
		return $this->config->getUserValue($userId, Application::APP_NAME, 'is_full_width_editor', '0') === '1';
	}
}
