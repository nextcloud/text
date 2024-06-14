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
class TextFile implements ISimpleFile {
	private ISimpleFile $file;
	private EncodingService $encodingService;

	public function __construct(ISimpleFile $file, EncodingService $encodingService) {
		$this->file = $file;
		$this->encodingService = $encodingService;
	}

	public function getName(): string {
		return $this->file->getName();
	}

	public function getSize(): float|int {
		return $this->file->getSize();
	}

	public function getETag(): string {
		return $this->file->getETag();
	}

	public function getMTime(): int {
		return $this->file->getMTime();
	}

	public function getContent(): string {
		$content = $this->encodingService->encodeToUtf8($this->file->getContent());
		if ($content === null) {
			throw new NotFoundException('File not compatible with text because it could not be encoded to UTF-8.');
		}

		return $content;
	}

	public function putContent($data): void {
		$this->file->putContent($data);
	}

	public function delete(): void {
		$this->file->delete();
	}

	public function getMimeType(): string {
		return 'text/plain;encoding=utf-8';
	}

	public function getExtension(): string {
		return $this->file->getExtension();
	}

	public function read() {
		return $this->file->read();
	}

	public function write() {
		return $this->file->write();
	}
}
