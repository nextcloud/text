<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text;

use OCP\Config\Lexicon\Entry;
use OCP\Config\Lexicon\ILexicon;
use OCP\Config\Lexicon\Strictness;
use OCP\Config\ValueType;

class ConfigLexicon implements ILexicon {
	public function getStrictness(): Strictness {
		return Strictness::WARNING;
	}

	public function getAppConfigs(): array {
		return [
			new Entry(
				key: 'default_file_extension',
				type: ValueType::STRING,
				defaultRaw: 'md',
				definition: 'Default file extension for new text files (usually `md` or `txt`)',
				lazy: false,
			),
			new Entry(
				key: 'open_read_only_enabled',
				type: ValueType::BOOL,
				defaultRaw: false,
				definition: 'Whether files are opened in read-only mode per default',
				lazy: false,
			),
			new Entry(
				key: 'rich_editing_enabled',
				type: ValueType::BOOL,
				defaultRaw: true,
				definition: 'Whether rich editing is enabled',
				lazy: false,
			),
			new Entry(
				key: 'workspace_available',
				type: ValueType::BOOL,
				defaultRaw: true,
				definition: 'Whether folder descriptions are available',
				lazy: false,
			),
			new Entry(
				key: 'notify_push',
				type: ValueType::BOOL,
				defaultRaw: true,
				definition: 'Whether notify_push is used for real-time synchronization',
				lazy: false,
			),
			new Entry(
				key: 'offline_readonly_delay',
				type: ValueType::INT,
				defaultRaw: 5 * 60,
				definition: 'Delay before editor switches to read-onl when offline (in seconds)',
				lazy: false,
			),
			new Entry(
				key: 'version_summaries_enabled',
				type: ValueType::BOOL,
				defaultRaw: false,
				definition: 'Whether people can summarize the changes between two versions of a Markdown file with the configured AI provider',
				lazy: false,
			),
			new Entry(
				key: 'version_summaries_hourly_limit',
				type: ValueType::INT,
				defaultRaw: 60,
				definition: 'How many summaries of changes the whole instance may start per hour',
				lazy: true,
			),
			new Entry(
				key: 'version_summaries_user_hourly_limit',
				type: ValueType::INT,
				defaultRaw: 10,
				definition: 'How many summaries of changes one person may start per hour',
				lazy: true,
			),
			new Entry(
				key: 'version_summaries_max_input_bytes',
				type: ValueType::INT,
				defaultRaw: 240_000,
				definition: 'Largest input in bytes, both versions and the instructions, sent to the AI provider for a summary of changes (at most 480000)',
				lazy: true,
			),
		];
	}

	public function getUserConfigs(): array {
		return [
			new Entry(
				key: 'workspace_enabled',
				type: ValueType::BOOL,
				defaultRaw: true,
				definition: 'Whether folder description is enabled for the user',
				lazy: false,
			),
			new Entry(
				key: 'is_full_width_editor',
				type: ValueType::BOOL,
				defaultRaw: false,
				definition: 'Whether the editor should be displayed in full width mode',
				lazy: false,
			),
		];
	}
}
