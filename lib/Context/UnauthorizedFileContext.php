<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Db\Document;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCP\Files\File;
use OCP\Files\GenericFileException;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Lock\LockedException;
use Override;

class UnauthorizedFileContext implements IContext {

	public function __construct(
		private readonly FileService $fileService,
		private readonly LockService $lockService,
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
		return 'unauthorized ' . $this->getType() . ' (' . $this->getId() . ')';
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
	public function prepareSession(): SessionInfo {
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
	 */
	public function updateDocument(Document $document): void {
		$file = $this->getFile();
		$document->setChecksum($this->computeCheckSum());
		$document->setLastSavedVersionTime($file->getMtime());
		$document->setLastSavedVersionEtag($file->getEtag());
	}

	public function loadContent(): ?string {
		return $this->fileService->loadContent($this->getFile());
	}

	public function save(string $content, callable $afterSave): void {
		throw new NotPermittedException();
	}

	#[Override]
	public function cleanup(): void {
		$this->lockService->unlock($this->file);
	}

	private function computeCheckSum(?string $content = null): string {
		$content ??= $this->getFile()->getContent();
		return hash('crc32', $content);
	}

}
