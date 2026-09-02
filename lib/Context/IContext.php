<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Db\Document;
use OCA\Text\Db\Session;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;

interface IContext {
	public function getId(): int;
	public function getType(): string;
	public function toString(): string;
	/**
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	public function buildDocument(): Document;
	public function prepareSession(DocumentData $documentData): SessionInfo;
	public function isReadOnly(): bool;
	public function updateDocument(Document $document): ?Document;
	/**
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	public function getFile(): ?File;
	public function loadContent(): ?string;
	public function saveWithLock(string $content, callable $doWhileLocked): void;
	/**
	 * This will be called when the last active editing session ends.
	 */
	public function cleanup(): void;
}
