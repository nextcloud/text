<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Db;

use OCP\Server;

/**
 * @group DB
 */
class DocumentMapperTest extends \Test\TestCase {
	private DocumentMapper $documentMapper;
	private SessionMapper $sessionMapper;
	private Document $document;

	public function setUp(): void {
		parent::setUp();
		$this->documentMapper = Server::get(DocumentMapper::class);
		$this->sessionMapper = Server::get(SessionMapper::class);
		$this->document = $this->documentMapper->insert(Document::fromParams([
			'contextType' => 'file',
			'contextId' => 900001,
			'lastSavedVersionTime' => 1000,
			'lastSavedVersionEtag' => 'saved-etag',
			'baseVersionEtag' => 'base-etag',
		]));
	}

	public function tearDown(): void {
		$this->sessionMapper->deleteByDocumentId($this->document->getId());
		$this->documentMapper->delete($this->document);
		parent::tearDown();
	}

	private function pendingDocumentIds(): array {
		return array_map(
			static fn (Document $document): string => $document->getId(),
			iterator_to_array($this->documentMapper->findAllPendingAttachmentCleanup()),
		);
	}

	public function testUnprocessedDocumentsArePending(): void {
		self::assertSame(0, $this->documentMapper->find($this->document->getId())->getLastAttachmentCleanup());
		self::assertContains($this->document->getId(), $this->pendingDocumentIds());
	}

	public function testDocumentsWithSessionsAreExcluded(): void {
		$session = $this->sessionMapper->insert(Session::fromParams([
			'documentId' => $this->document->getId(),
			'userId' => 'admin',
			'token' => uniqid(),
			'lastContact' => time(),
		]));
		self::assertNotContains($this->document->getId(), $this->pendingDocumentIds());
		$this->sessionMapper->delete($session);
		self::assertContains($this->document->getId(), $this->pendingDocumentIds());
	}

	public function testCleanedDocumentsAreExcludedUntilSavedAgain(): void {
		$this->document->setLastAttachmentCleanup(1000);
		$this->documentMapper->update($this->document);
		self::assertNotContains($this->document->getId(), $this->pendingDocumentIds());

		$this->document->setLastSavedVersionTime(1001);
		$this->documentMapper->update($this->document);
		self::assertContains($this->document->getId(), $this->pendingDocumentIds());
	}

	public function testOlderSavedTimestampsAreExcluded(): void {
		$this->document->setLastAttachmentCleanup(1001);
		$this->documentMapper->update($this->document);

		self::assertNotContains($this->document->getId(), $this->pendingDocumentIds());
	}
}
