<?php

declare(strict_types=1);

namespace OCA\Text\Controller;

use OCA\Text\Db\Document;
use OCA\Text\Db\Session;
use OCA\Text\Exception\InvalidSessionException;

trait TSessionAwareController {
	private ?Session $textSession = null;
	private ?int $documentId = null;
	private ?Document $document = null;
	private ?string $userId = null;

	public function setSession(?Session $session): void {
		$this->textSession = $session;
	}

	public function setDocumentId(int $documentId): void {
		$this->documentId = $documentId;
	}

	public function setDocument(?Document $document): void {
		$this->document = $document;
	}

	public function setUserId(?string $userId): void {
		$this->userId = $userId;
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
	public function getUserId(): string {
		if ($this->userId === null) {
			throw new InvalidSessionException();
		}

		return $this->userId;
	}
}
