<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Db\Session;

readonly class NewSessionData {
	public function __construct(
		public DocumentData $documentData,
		public SessionInfo $sessionInfo,
		public Session $session,
		public ?string $displayName,
	) {
	}

	public function jsonSerialize(): array {
		return array_merge(
			$this->documentData->jsonSerialize(),
			$this->sessionInfo->jsonSerialize(),
			[
				'session' => array_merge(
					$this->session->jsonSerialize(),
					['displayName' => $this->displayName],
				),
			],
		);
	}
}
