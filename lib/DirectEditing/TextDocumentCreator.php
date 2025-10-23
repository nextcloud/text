<?php

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\DirectEditing;

use OCP\DirectEditing\ACreateEmpty;
use OCP\IAppConfig;
use OCP\IL10N;

final class TextDocumentCreator extends ACreateEmpty {
	public const CREATOR_ID = 'textdocument';

	/**
	 * @var IL10N
	 */
	private $l10n;

	/**
	 * @var IAppConfig
	 */
	private $appConfig;

	public function __construct(IL10N $l10n, IAppConfig $appConfig) {
		$this->l10n = $l10n;
		$this->appConfig = $appConfig;
	}

	#[\Override]
	public function getId(): string {
		return self::CREATOR_ID;
	}

	#[\Override]
	public function getName(): string {
		return $this->l10n->t('text document');
	}

	#[\Override]
	public function getExtension(): string {
		return $this->appConfig->getValueString('text', 'default_file_extension', 'md');
	}

	#[\Override]
	public function getMimetype(): string {
		switch ($this->getExtension()) {
			case 'txt':
				return 'text/plain';
			case 'md':
			default:
				return 'text/markdown';
		}
	}
}
