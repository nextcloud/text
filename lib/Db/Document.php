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

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('currentVersion', 'integer');
		$this->addType('lastSavedVersion', 'integer');
		$this->addType('lastSavedVersionTime', 'integer');
		$this->addType('initialVersion', 'integer');
	}

	public function jsonSerialize(): array {
		return [
			'id' => $this->id,
			'lastSavedVersion' => $this->lastSavedVersion,
			'lastSavedVersionTime' => $this->lastSavedVersionTime,
			'baseVersionEtag' => $this->baseVersionEtag,
			'initialVersion' => $this->initialVersion
		];
	}
}
