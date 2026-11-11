<?php

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCA\Text\AppInfo\Application;
use OCP\Config\IUserConfig;
use OCP\IAppConfig;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\IUser;

class ConfigService {
	/** Bytes of both versions a summary may read, under core's 512,000-byte limit per text field */
	public const int VERSION_SUMMARY_INPUT_CEILING = 480_000;

	public function __construct(
		private readonly IAppConfig $appConfig,
		private readonly IUserConfig $userConfig,
		private readonly IConfig $config,
		private readonly IDBConnection $db,
	) {
	}

	public function getDefaultFileExtension(): string {
		return $this->appConfig->getValueString(Application::APP_NAME, 'default_file_extension', 'md');
	}

	public function isOpenReadOnlyEnabled(): bool {
		return $this->appConfig->getValueBool(Application::APP_NAME, 'open_read_only_enabled');
	}

	public function isRichEditingEnabled(): bool {
		return $this->appConfig->getValueBool(Application::APP_NAME, 'rich_editing_enabled', true);
	}

	public function isRichWorkspaceAvailable(): bool {
		if ($this->config->getSystemValueBool('enable_non-accessible_features', true) === false) {
			return false;
		}
		return $this->appConfig->getValueBool(Application::APP_NAME, 'workspace_available', true);
	}

	public function isRichWorkspaceEnabledForUser(?string $userId): bool {
		if ($userId === null) {
			return true;
		}
		return $this->userConfig->getValueBool($userId, Application::APP_NAME, 'workspace_enabled', true);
	}

	public function isNotifyPushSyncEnabled(): bool {
		return $this->appConfig->getValueBool(Application::APP_NAME, 'notify_push', true);
	}

	public function isFullWidthEditor(?string $userId): bool {
		if ($userId === null) {
			return false;
		}
		return $this->userConfig->getValueBool($userId, Application::APP_NAME, 'is_full_width_editor');
	}

	public function getOfflineReadonlyDelay(): int {
		// Default to 20 seconds
		return $this->appConfig->getValueInt(Application::APP_NAME, 'offline_readonly_delay', 5 * 60);
	}

	/**
	 * @param bool $fresh Read the stored value, not the one cached for this request
	 */
	public function isVersionSummariesEnabled(bool $fresh = false): bool {
		if (!$fresh) {
			return $this->appConfig->getValueBool(Application::APP_NAME, 'version_summaries_enabled');
		}
		// One row, without emptying the cache of every app's config
		$qb = $this->db->getQueryBuilder();
		$qb->select('configvalue')
			->from('appconfig')
			->where($qb->expr()->eq('appid', $qb->createNamedParameter(Application::APP_NAME)))
			->andWhere($qb->expr()->eq('configkey', $qb->createNamedParameter('version_summaries_enabled')));
		$result = $qb->executeQuery();
		$value = $result->fetchOne();
		$result->closeCursor();
		return in_array(strtolower((string)$value), ['1', 'true', 'yes', 'on'], true);
	}

	/**
	 * Whether this user may see and ask for summaries at all: the feature is
	 * on, and core's rule for guests lets them use AI
	 */
	public function isVersionSummariesAvailableFor(?IUser $user): bool {
		if ($user === null || !$this->isVersionSummariesEnabled()) {
			return false;
		}
		if ($this->appConfig->getValueString('core', 'ai.taskprocessing_guests', 'false') === 'true') {
			return true;
		}
		// The guests app's backend, which core's rule refers to
		return $user->getBackendClassName() !== 'Guests';
	}

	public function setVersionSummariesEnabled(bool $enabled): void {
		$this->appConfig->setValueBool(Application::APP_NAME, 'version_summaries_enabled', $enabled);
	}

	public function getVersionSummariesHourlyLimit(): int {
		return max(0, $this->appConfig->getValueInt(Application::APP_NAME, 'version_summaries_hourly_limit', 60, true));
	}

	public function setVersionSummariesHourlyLimit(int $limit): void {
		$this->appConfig->setValueInt(Application::APP_NAME, 'version_summaries_hourly_limit', max(0, $limit), true);
	}

	public function getVersionSummariesUserHourlyLimit(): int {
		return max(0, $this->appConfig->getValueInt(Application::APP_NAME, 'version_summaries_user_hourly_limit', 10, true));
	}

	public function setVersionSummariesUserHourlyLimit(int $limit): void {
		$this->appConfig->setValueInt(Application::APP_NAME, 'version_summaries_user_hourly_limit', max(0, $limit), true);
	}

	/**
	 * Bytes of input a new summary may send: both versions and the instructions
	 */
	public function getVersionSummariesMaxInputBytes(): int {
		$bytes = $this->appConfig->getValueInt(Application::APP_NAME, 'version_summaries_max_input_bytes', 240_000, true);
		return max(1, min($bytes, self::VERSION_SUMMARY_INPUT_CEILING));
	}
}
