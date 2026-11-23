<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Model;

use JsonSerializable;

/**
 * One end of a comparison: the current file or one of its retained versions.
 */
class VersionEnd implements JsonSerializable {
	public const string CURRENT = 'current';

	public function __construct(
		public readonly string $id,
		public readonly int $mtime,
		public readonly int|float $size,
		public readonly string $label,
		public readonly ?string $authorId,
		public readonly ?string $authorName,
	) {
	}

	/**
	 * @return array{id: string, mtime: int, size: int|float, label: string, author: array{id: string, displayName: string}|null}
	 */
	public function jsonSerialize(): array {
		return [
			'id' => $this->id,
			'mtime' => $this->mtime,
			'size' => $this->size,
			'label' => $this->label,
			'author' => $this->authorId === null
				? null
				: ['id' => $this->authorId, 'displayName' => $this->authorName ?? $this->authorId],
		];
	}
}
