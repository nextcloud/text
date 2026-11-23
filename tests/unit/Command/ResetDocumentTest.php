<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\Command\ResetDocument;
use OCA\Text\Db\Document;
use OCA\Text\Service\DocumentService;
use OCP\Files\NotPermittedException;
use PHPUnit\Framework\MockObject\MockObject;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;

class ResetDocumentTest extends \PHPUnit\Framework\TestCase {
	private DocumentService&MockObject $documentService;
	private ResetDocument $command;

	public function setUp(): void {
		$this->documentService = $this->createMock(DocumentService::class);
		$this->command = new ResetDocument($this->documentService);
	}

	public function testForceResetOfAllDocumentsReleasesTheirLocks(): void {
		$this->documentService->method('getAll')->willReturnCallback(function (): \Generator {
			yield Document::fromRow(['id' => 456]);
			yield Document::fromRow(['id' => 789]);
		});
		$cleared = false;
		$this->documentService->expects(self::once())->method('clearAll')
			->willReturnCallback(function () use (&$cleared): void {
				$cleared = true;
			});
		$unlocked = [];
		$this->documentService->expects(self::exactly(2))->method('unlock')
			->willReturnCallback(function (int $fileId) use (&$cleared, &$unlocked): void {
				self::assertTrue($cleared);
				$unlocked[] = $fileId;
				if ($fileId === 456) {
					throw new NotPermittedException();
				}
			});

		$result = $this->command->run(new ArrayInput(['--all' => true, '--force' => true]), new BufferedOutput());

		self::assertSame(0, $result);
		self::assertSame([456, 789], $unlocked);
	}
}
