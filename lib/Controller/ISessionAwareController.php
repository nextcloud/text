<?php

namespace OCA\Text\Controller;

use OCA\Text\Db\Document;
use OCA\Text\Db\Session;

interface ISessionAwareController {
	public function getSession(): Session;
	public function setSession(Session $session): void;
	public function getDocumentId(): int;
	public function setDocumentId(int $documentId): void;
	public function getDocument(): Document;
	public function setDocument(Document $document): void;
	public function getUserId(): string;
	public function setUserId(string $userId): void;
}
