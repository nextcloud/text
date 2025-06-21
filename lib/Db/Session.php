<?php

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Db;

use JsonSerializable;
use OCA\Text\Exception\InvalidSessionException;
use OCP\AppFramework\Db\Entity;

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
