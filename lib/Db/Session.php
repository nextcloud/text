<?php

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Db;

use JsonSerializable;
use OCA\Text\Exception\InvalidSessionException;
use OCP\AppFramework\Db\Entity;
use OCP\DB\Types;

/**
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
 * @method string getDocumentId()
 * @method void setDocumentId(string $documentId)
 */
class Session extends Entity implements JsonSerializable {
	public $id;
	protected ?string $userId = null;
	protected string $token = '';
	protected string $color = '';
	protected ?string $guestName = null;
	protected ?string $lastAwarenessMessage = '';
	protected int $lastContact = 0;
	protected string $documentId = '';

	public function __construct() {
		$this->addType('documentId', Types::STRING);
		$this->addType('lastContact', Types::INTEGER);
	}

	public function isGuest(): bool {
		return $this->userId === null;
	}

	public function getUserId(): string {
		if ($this->userId === null) {
			throw new InvalidSessionException('No user id found');
		}
		return $this->userId;
	}

	public function jsonSerialize(): array {
		return [
			'id' => $this->getId(),
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
