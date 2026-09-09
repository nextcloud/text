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
use OCP\IUser;

trait TSessionAwareController {
	private ?Session $textSession = null;
	private ?int $documentId = null;
	private ?Document $document = null;
	private ?IUser $user = null;

	public function setSession(?Session $session): void {
		$this->textSession = $session;
	}

	public function setDocumentId(int $documentId): void {
		$this->documentId = $documentId;
	}

	public function setDocument(?Document $document): void {
		$this->document = $document;
	}

	public function setUser(IUser $user): void {
		$this->user = $user;
	}

	/**
	 * @throws InvalidSessionException
	 */
	public function getSession(): Session {
		if ($this->textSession === null) {
			throw new InvalidSessionException();
		}

		return $this->textSession;
	}

	/**
	 * @throws InvalidSessionException
	 */
	public function getDocumentId(): int {
		if ($this->documentId === null) {
			throw new InvalidSessionException();
		}

		return $this->documentId;
	}

	/**
	 * @throws InvalidSessionException
	 */
	public function getDocument(): Document {
		if ($this->document === null) {
			throw new InvalidSessionException();
		}

		return $this->document;
	}

	/**
	 * @throws InvalidSessionException
	 */
	public function getUser(): IUser {
		if ($this->user === null) {
			throw new InvalidSessionException();
		}

		return $this->user;
	}
}
