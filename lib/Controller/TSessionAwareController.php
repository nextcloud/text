<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Db\Document;
use OCA\Text\Db\Session;
use OCA\Text\Exception\InvalidSessionException;

trait TSessionAwareController {
	private ?Session $textSession = null;
	private ?Document $document = null;
	private ?string $userId = null;

	public function setSession(?Session $session): void {
		$this->textSession = $session;
	}

	public function setDocument(?Document $document): void {
		$this->document = $document;
	}

	public function setUserId(?string $userId): void {
		$this->userId = $userId;
	}

	public function getSession(): Session {
		if ($this->textSession === null) {
			throw new InvalidSessionException();
		}

		return $this->textSession;
	}

	public function getDocument(): Document {
		if ($this->document === null) {
			throw new InvalidSessionException();
		}

		return $this->document;
	}

	public function getUserId(): string {
		if ($this->userId === null) {
			throw new InvalidSessionException();
		}

		return $this->userId;
	}
}
