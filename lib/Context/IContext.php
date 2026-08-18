<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Db\Document;
use OCA\Text\Db\Session;
use OCP\Files\File;
use OCP\Files\Lock\ILock;

interface IContext {
	public function getId(): int;
	public function getType(): string;
	public function toString(): string;
	public function buildDocument(): Document|string;
	public function prepareSession(DocumentData $documentData): SessionInfo;
	public function isReadOnly(): bool;
	public function updateDocument(Document $document): ?Document;
	public function getFile(): ?File;
}

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

readonly class SessionInfo {
	public function __construct(
		public ?string $content,
		public bool $readOnly,
		public ?ILock $lock,
		public bool $hasOwner,
	) {
	}

	public function jsonSerialize(): array {
		return [
			'content' => $this->content,
			'readOnly' => $this->readOnly,
			'lock' => $this->lock,
			'hasOwner' => $this->hasOwner,
		];
	}
}

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
