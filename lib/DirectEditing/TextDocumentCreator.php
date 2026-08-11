<?php

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\DirectEditing;

use OCP\DirectEditing\ACreateEmpty;
use OCP\IAppConfig;
use OCP\IL10N;

class TextDocumentCreator extends ACreateEmpty {
	public const string CREATOR_ID = 'textdocument';

	public function __construct(
		private readonly IL10N $l10n,
		private readonly IAppConfig $appConfig,
	) {
	}

	public function getId(): string {
		return self::CREATOR_ID;
	}

	public function getName(): string {
		return $this->l10n->t('Text document');
	}

	public function getExtension(): string {
		return $this->appConfig->getValueString('text', 'default_file_extension', 'md');
	}

	public function getMimetype(): string {
		return match ($this->getExtension()) {
			'txt' => 'text/plain',
			default => 'text/markdown',
		};
	}
}
