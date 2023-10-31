<?php
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('version', 'integer');
		$this->addType('documentId', 'integer');
		$this->addType('sessionId', 'integer');
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
			'sessionId' => $this->getSessionId()
		];
	}
}
