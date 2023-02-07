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
 * @method ?string getUserId()
 * @method void setUserId(?string $userId)
 * @method string getToken()
 * @method void setToken(string $token)
 * @method string getColor()
 * @method void setColor(string $color)
 * @method string|null getGuestName()
 * @method void setGuestName(string $guestName)
 * @method string|null getAwarenessMessage()
 * @method void setLastAwarenessMessage(string $message)
 * @method int getLastContact()
 * @method void setLastContact(int $getTime)
 * @method int getDocumentId()
 * @method void setDocumentId(int $documentId)
 */
class Session extends Entity implements JsonSerializable {
	public $id;
	protected ?string $userId = null;
	protected string $token = '';
	protected string $color = '';
	protected ?string $guestName = null;
	protected ?string $lastAwarenessMessage = '';
	protected int $lastContact = 0;
	protected int $documentId = 0;

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('documentId', 'integer');
		$this->addType('lastContact', 'integer');
	}

	public function jsonSerialize(): array {
		return [
			'id' => $this->id,
			'userId' => $this->userId,
			'token' => $this->token,
			'color' => $this->color,
			'lastAwarenessMessage' => $this->lastAwarenessMessage,
			'lastContact' => $this->lastContact,
			'guestName' => $this->guestName,
			'documentId' => $this->documentId,
		];
	}
}
