<?php

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method getData(): string
 * @method setData(string $data): void
 * @method getVersion(): int
 * @method setVersion(int $version): void
 * @method getSessionId(): int
 * @method setSessionId(int $sessionId): void
 * @method getDocumentId(): int
 * @method setDocumentId(int $documentId): void
 * @method getTimestamp(): int
 * @method setTimestamp(int $timestam): void
 */
class Step extends Entity implements JsonSerializable {

	/*
	 * Transition: We now use the auto-incrementing id as the version.
	 * To ensure that new steps always have a larger version than those that
	 * used the version field, use the largest possible 32-bit integer value.
	 */
	public const VERSION_STORED_IN_ID = 2147483647;

	public $id = null;
	protected string $data = '';
	protected int $version = 0;
	protected int $sessionId = 0;
	protected int $documentId = 0;
	protected int $timestamp = 0;

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('version', 'integer');
		$this->addType('documentId', 'integer');
		$this->addType('sessionId', 'integer');
		$this->addType('timestamp', 'integer');
	}

	public function jsonSerialize(): array {
		$jsonData = \json_decode($this->data, false);
		if (\json_last_error() !== JSON_ERROR_NONE) {
			throw new \InvalidArgumentException('Failed to parse step data');
		}
		$version = $this->getVersion() === self::VERSION_STORED_IN_ID
			? $this->getId()
			: $this->getVersion();
		return [
			'id' => $this->getId(),
			'data' => $jsonData,
			'version' => $version,
			'sessionId' => $this->getSessionId(),
			'timestamp' => $this->getTimestamp(),
		];
	}
}
