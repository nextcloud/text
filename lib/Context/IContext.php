<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Db\Document;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;

interface IContext {
	public function getId(): int;
	public function getType(): string;
	/**
	 * A simple string to use in logs such as "File (123)"
	 */
	public function toString(): string;
	/**
	 * Create a document with context, etag, mtime etc set
	 *
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 */
	public function buildDocument(): Document;
	/**
	 * Prepare a new session.
	 *
	 * Lock the context here when using locks.
	 */
	public function prepareSession(): SessionInfo;
	/**
	 * Permission check if editing is allowed.
	 */
	public function isReadOnly(): bool;
	/**
	 * Update document metadata such as etag, mtime
	 */
	public function updateDocument(Document $document): void;
	/**
	 * Access the underlying file
	 *
	 * This may be slow - require file system setup etc.
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 * @return ?File null for non-file contexts
	 */
	public function getFile(): ?File;
	/**
	 * Load the content stored in the context.
	 *
	 * This may be slow - require file system setup etc.
	 */
	public function loadContent(): ?string;
	/**
	 * Save the content in the context.
	 *
	 * Make sure to call `$afterSave()`.
	 * Call it within the lock scope when using locks.
	 *
	 * @param string $content to save
	 * @param callable $afterSave hook for storing the document state
	 *                            This may be slow - require file system setup etc.
	 */
	public function save(string $content, callable $afterSave): void;
	/**
	 * Cleanup the editing session
	 *
	 * Called when the last active editing session ends.
	 * Use to unlock the context.
	 */
	public function cleanup(): void;
}
