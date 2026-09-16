<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Db\Document;

readonly class DocumentData {
	public function __construct(
		public Document $document,
		public ?string $documentState,
	) {
	}

	public function jsonSerialize(): array {
		return [
			'document' => $this->document,
			'documentState' => $this->documentState,
		];
	}
}
