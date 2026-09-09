<?php

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Db;

use OCP\AppFramework\Db\Entity;

/**
 * @method getId(): int
 * @method getCurrentVersion(): int
 * @method setCurrentVersion(int $version): void
 * @method getLastSavedVersion(): int
 * @method setLastSavedVersion(int $version): void
 * @method getInitialVersion(): int
 * @method setInitialVersion(int $version): void
 * @method getLastSavedVersionTime(): int
 * @method setLastSavedVersionTime(int $time): void
 * @method getLastSavedVersionEtag(): string
 * @method setLastSavedVersionEtag(string $etag): void
 * @method getBaseVersionEtag(): string
 * @method setBaseVersionEtag(string $etag): void
 * @method getChecksum(): ?string
 * @method setChecksum(?string $checksum): void
 * @method getContextType(): string
 * @method setContextType(string $contextType): void
 * @method getContextId(): int
 * @method setContextId(int $contextId): void
 */
class Document extends Entity implements \JsonSerializable {
	public $id = null;
	// TODO: Remove obsolete field `currentVersion`
	protected int $currentVersion = 0;
	protected int $lastSavedVersion = 0;
	protected int $initialVersion = 0;
	protected int $lastSavedVersionTime = 0;
	protected string $lastSavedVersionEtag = '';
	protected string $baseVersionEtag = '';
	protected ?string $checksum = null;
	protected string $contextType = '';
	protected int $contextId = 0;

	public function __construct() {
		$this->addType('currentVersion', 'integer');
		$this->addType('lastSavedVersion', 'integer');
		$this->addType('lastSavedVersionTime', 'integer');
		$this->addType('initialVersion', 'integer');
		$this->addType('checksum', 'string');
		$this->addType('contextType', 'string');
		$this->addType('contextId', 'integer');
	}

	public function jsonSerialize(): array {
		return [
			'id' => $this->getId(),
			'lastSavedVersion' => $this->lastSavedVersion,
			'lastSavedVersionTime' => $this->lastSavedVersionTime,
			'baseVersionEtag' => $this->baseVersionEtag,
			'initialVersion' => $this->initialVersion,
			'checksum' => $this->checksum,
			'contextType' => $this->contextType,
			'contextId' => $this->contextId,
		];
	}

	/**
	 * Short identifier - mostly for logging
	 */
	public function toString(): string {
		return $this->contextType . ' (' . $this->contextId . ')';
	}
}
