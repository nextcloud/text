<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\DirectEditing;

use OCP\DirectEditing\ACreateEmpty;
use OCP\IL10N;

class TextDocumentCreator extends ACreateEmpty {
	public const CREATOR_ID = 'textdocument';

	/**
	 * @var IL10N
	 */
	private $l10n;

	public function __construct(IL10N $l10n) {
		$this->l10n = $l10n;
	}

	public function getId(): string {
		return self::CREATOR_ID;
	}

	public function getName(): string {
		return $this->l10n->t('text document');
	}

	public function getExtension(): string {
		return 'md';
	}

	public function getMimetype(): string {
		return 'text/markdown';
	}
}
