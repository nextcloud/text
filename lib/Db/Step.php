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

class Step extends Entity implements \JsonSerializable {

	public $id;
	protected $data;
	protected $version;
	protected $sessionId;
	protected $documentId;

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('version', 'integer');
		$this->addType('documentId', 'integer');
		$this->addType('sessionId', 'integer');
	}

	/**
	 * @return array|mixed
	 */
	public function jsonSerialize() {
		$jsonData = \json_decode($this->data, false);
		if (\json_last_error() !== JSON_ERROR_NONE) {
			throw new \InvalidArgumentException('Failed to parse step data');
		}
		return [
			'id' => $this->id,
			'data' => $jsonData,
			'version' => $this->version,
			'sessionId' => $this->sessionId
		];
	}
}
