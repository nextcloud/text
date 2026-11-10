<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Db;

/**
 * @group DB
 */
class StepMapperTest extends \Test\TestCase {
	private const int OLD = 1000;
	private const int NOW = 5000;
	private const int OLDER_THAN = 2000;
	private const int KEEP = 2;

	private StepMapper $stepMapper;
	private DocumentMapper $documentMapper;
	/** @var Document[] */
	private array $documents = [];

	public function setUp(): void {
		parent::setUp();
		$this->stepMapper = \OCP\Server::get(StepMapper::class);
		$this->documentMapper = \OCP\Server::get(DocumentMapper::class);
	}

	public function tearDown(): void {
		foreach ($this->documents as $document) {
			$this->stepMapper->deleteAll($document->id);
			$this->documentMapper->delete($document);
		}
		parent::tearDown();
	}

	/**
	 * Create a document with steps of the given timestamps,
	 * saved up to and including step number $saved (0 for none).
	 *
	 * @param int[] $timestamps
	 * @return array{Document, int[]} document and step ids
	 */
	private function createDocument(array $timestamps, int $saved): array {
		$document = Document::fromParams([
			'contextId' => random_int(1, PHP_INT_MAX),
			'contextType' => 'file',
			'lastSavedVersionTime' => self::NOW,
		]);
		$document->generateId();
		$document = $this->documentMapper->insert($document);
		$this->documents[] = $document;

		$ids = [];
		foreach ($timestamps as $timestamp) {
			$ids[] = $this->stepMapper->insert(Step::fromParams([
				'sessionId' => 1,
				'documentId' => $document->id,
				'data' => 'YJSDATA',
				'version' => Step::VERSION_STORED_IN_ID,
				'timestamp' => $timestamp,
			]))->getId();
		}
		if ($saved > 0) {
			$document->setLastSavedVersion($ids[$saved - 1]);
			$this->documentMapper->update($document);
		}
		return [$document, $ids];
	}

	private function findDocumentIdsWithSavedSteps(): array {
		$documents = $this->stepMapper->findDocumentsWithSavedSteps(self::OLDER_THAN, self::KEEP);
		return array_column($documents, 'lastSavedVersion', 'documentId');
	}

	public function testFindDocumentsWithSavedSteps(): void {
		[$saved, $savedIds] = $this->createDocument([self::OLD, self::OLD, self::OLD, self::OLD, self::NOW], 5);
		[$tooFew] = $this->createDocument([self::OLD, self::OLD, self::NOW, self::NOW, self::NOW], 5);
		[$recent] = $this->createDocument([self::NOW, self::NOW, self::NOW, self::NOW, self::NOW], 5);
		[$unsaved] = $this->createDocument([self::OLD, self::OLD, self::OLD, self::OLD, self::OLD], 0);
		[$savedEarlier] = $this->createDocument([self::OLD, self::OLD, self::OLD, self::OLD, self::OLD], 2);

		$found = $this->findDocumentIdsWithSavedSteps();

		self::assertArrayHasKey($saved->id, $found);
		self::assertSame($savedIds[4], $found[$saved->id]);
		self::assertArrayNotHasKey($tooFew->id, $found);
		self::assertArrayNotHasKey($recent->id, $found);
		self::assertArrayNotHasKey($unsaved->id, $found);
		self::assertArrayNotHasKey($savedEarlier->id, $found);
	}

	public function testDeleteBeforeVersion(): void {
		[$document, $ids] = $this->createDocument([self::OLD, self::OLD, self::OLD, self::NOW, self::NOW], 5);
		[$other, $otherIds] = $this->createDocument([self::OLD, self::OLD], 2);

		// Only old steps up to and including the version
		self::assertSame(2, $this->stepMapper->deleteBeforeVersion($document->id, $ids[1], self::OLDER_THAN));
		self::assertSame(
			[$ids[2], $ids[3], $ids[4]],
			array_map(static fn (Step $step) => $step->getId(), $this->stepMapper->find($document->id, 0)),
		);

		// Recent steps are kept even before the version
		self::assertSame(1, $this->stepMapper->deleteBeforeVersion($document->id, $ids[4], self::OLDER_THAN));
		self::assertSame(
			[$ids[3], $ids[4]],
			array_map(static fn (Step $step) => $step->getId(), $this->stepMapper->find($document->id, 0)),
		);

		self::assertCount(count($otherIds), $this->stepMapper->find($other->id, 0));
	}

	public function testRemovedStepsStayFoundUntilKeepIsReached(): void {
		[$document, $ids] = $this->createDocument([self::OLD, self::OLD, self::OLD, self::OLD, self::OLD, self::NOW], 6);
		self::assertArrayHasKey($document->id, $this->findDocumentIdsWithSavedSteps());

		$version = $this->stepMapper->getBeforeVersion($document->id, $ids[5], self::KEEP);
		self::assertSame($ids[3], $version);
		self::assertSame(4, $this->stepMapper->deleteBeforeVersion($document->id, $version, self::OLDER_THAN));

		self::assertSame(
			[$ids[4], $ids[5]],
			array_map(static fn (Step $step) => $step->getId(), $this->stepMapper->find($document->id, 0)),
		);
		self::assertArrayNotHasKey($document->id, $this->findDocumentIdsWithSavedSteps());
	}
}
