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

class Session extends Entity implements \JsonSerializable {

	public $id;
	protected $userId;
	protected $token;
	protected $color;
	protected $guestName;
	protected $lastContact;
	protected $documentId;

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('documentId', 'integer');
		$this->addType('lastContact', 'integer');

	}

	public function jsonSerialize() {
		return [
			'id' => $this->id,
			'userId' => $this->userId,
			'token' => $this->token,
			'color' => $this->color,
			'lastContact' => $this->lastContact,
			'guestName' => $this->guestName
		];
	}
}
