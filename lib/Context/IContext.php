<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Db\Document;
use OCP\Files\Lock\ILock;
use OCP\IUser;

interface IContext {
	public function check(): ?string;
	public function checkDocument(Document $document): ?string;
	public function isReadOnly(): bool;
	public function getId(): int;
	public function getType(): string;
	public function toString(): string;
	public function loadContent(): ?string;
	public function getLockInfo(): ?ILock;
	public function getOwner(): ?IUser;
	public function lock(): bool;
	public function createDocument(): Document;
}
