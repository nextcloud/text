<?php

namespace OCA\Text\Service;

use OCA\Text\AppInfo\Application;
use OCP\IConfig;

class ConfigService {
	private IConfig $config;

	public function __construct(IConfig $config) {
		$this->config = $config;
	}

	public function getDefaultFileExtension(): string {
		return $this->config->getAppValue(Application::APP_NAME, 'default_file_extension', 'md');
	}

	public function isRichEditingEnabled(): bool {
		return ($this->config->getAppValue(Application::APP_NAME, 'rich_editing_enabled', '1') === '1');
	}

	public function isRichWorkspaceAvailable(): bool {
		return $this->config->getAppValue(Application::APP_NAME, 'workspace_available', '1') === '1';
	}

	public function isRichWorkspaceEnabledForUser(?string $userId): bool {
		if ($userId === null) {
			return true;
		}
		return $this->config->getUserValue($userId, Application::APP_NAME, 'workspace_enabled', '1') === '1';
	}
}
