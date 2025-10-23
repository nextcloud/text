<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text;

use OCA\Text\Service\EncodingService;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;

/**
 * Wrapper around a ISimpleFile object to ensure that it is correctly encoded (UTF-8) for the text app.
 */
final class TextFile implements ISimpleFile {
	private ISimpleFile $file;
	private EncodingService $encodingService;

	public function __construct(ISimpleFile $file, EncodingService $encodingService) {
		$this->file = $file;
		$this->encodingService = $encodingService;
	}

	#[\Override]
	public function getName(): string {
		return $this->file->getName();
	}

	#[\Override]
	public function getSize(): float|int {
		return $this->file->getSize();
	}

	#[\Override]
	public function getETag(): string {
		return $this->file->getETag();
	}

	#[\Override]
	public function getMTime(): int {
		return $this->file->getMTime();
	}

	#[\Override]
	public function getContent(): string {
		$content = $this->encodingService->encodeToUtf8($this->file->getContent());
		if ($content === null) {
			throw new NotFoundException('File not compatible with text because it could not be encoded to UTF-8.');
		}

		return $content;
	}

	#[\Override]
	public function putContent($data): void {
		$this->file->putContent($data);
	}

	#[\Override]
	public function delete(): void {
		$this->file->delete();
	}

	#[\Override]
	public function getMimeType(): string {
		return 'text/plain;encoding=utf-8';
	}

	#[\Override]
	public function getExtension(): string {
		return $this->file->getExtension();
	}

	#[\Override]
	public function read() {
		return $this->file->read();
	}

	#[\Override]
	public function write() {
		return $this->file->write();
	}
}
