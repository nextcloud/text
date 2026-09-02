<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Db\Document;
use OCA\Text\Service\FileService;
use OCP\Files\File;
use OCP\Files\GenericFileException;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Lock\LockedException;
use Override;

class UnauthorizedFileContext implements IContext {

	public function __construct(
		private readonly FileService $fileService,
		private readonly File $file,
	) {
	}

	#[Override]
	public function getId(): int {
		return $this->file->getId();
	}

	#[Override]
	public function getType(): string {
		return 'file';
	}

	#[Override]
	public function toString(): string {
		return $this->getType() . ' (' . $this->getId() . ')';
	}

	/**
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	#[Override]
	public function getFile(): File {
		return $this->file;
	}

	/**
	 * @throws NotPermittedException
	 */
	#[Override]
	public function buildDocument(): Document {
		throw new NotPermittedException();
	}

	#[Override]
	public function prepareSession(DocumentData $documentData): SessionInfo {
		throw new NotPermittedException();
	}

	public function isReadOnly(): bool {
		return true;
	}

	/**
	 * Update the document last saved version metadata to be in line with the data saved in the context.
	 *
	 * @throws GenericFileException if the file changed and reading the content fails.
	 * @throws LockedException if the file changed and a lock prevents reading the content.
	 * @throws NotPermittedException if the file changed and reading is not allowed.
	 * @return Document|null Updated document if there was an update
	 */
	public function updateDocument(Document $document): ?Document {
		$lastMTime = $document->getLastSavedVersionTime();
		$lastEtag = $document->getLastSavedVersionEtag();

		$file = $this->getFile();
		$fileMtime = $file->getMtime();
		$fileEtag = $file->getEtag();

		if ($lastEtag === $fileEtag && $lastMTime === $fileMtime) {
			return null;
		}

		$fileContent = $file->getContent();
		$fileChecksum = self::computeCheckSum($fileContent);

		$document->setChecksum($fileChecksum);
		$document->setLastSavedVersionTime($fileMtime);
		$document->setLastSavedVersionEtag($fileEtag);
		return $document;
	}

	public function loadContent(): ?string {
		return $this->fileService->loadContent($this->getFile());
	}

	public function saveWithLock(string $content, callable $doWhileLocked): void {
		throw new NotPermittedException();
	}

	#[Override]
	public function cleanup(): void {
		throw new NotPermittedException();
	}

	private function computeCheckSum(?string $content = null): string {
		$content ??= $this->getFile()->getContent();
		return hash('crc32', $content);
	}

}
