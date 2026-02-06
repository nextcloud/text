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
				definition: 'Default file extension for new text files',
				lazy: false,
			),
			new Entry(
				key: 'open_read_only_enabled',
				type: ValueType::BOOL,
				defaultRaw: false,
				definition: 'Whether opening files in read-only mode is enabled',
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
				definition: 'Whether rich workspace feature is available',
				lazy: false,
			),
			new Entry(
				key: 'notify_push',
				type: ValueType::BOOL,
				defaultRaw: true,
				definition: 'Whether notify_push synchronization is enabled',
				lazy: false,
			),
		];
	}

	public function getUserConfigs(): array {
		return [
			new Entry(
				key: 'workspace_enabled',
				type: ValueType::BOOL,
				defaultRaw: true,
				definition: 'Whether rich workspace is enabled for the user',
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
