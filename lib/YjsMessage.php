<?php

namespace OCA\Text;

use InvalidArgumentException;

/**
 * Steps are base64 encoded messages of the yjs protocols
 * https://github.com/yjs/y-protocols
 *
 * This class is a simple representation of a message containing some methods
 * to decode parts of it for what we need on the backend
 *
 * Relevant resources:
 * https://github.com/yjs/y-protocols/blob/master/PROTOCOL.md
 * https://github.com/yjs/y-websocket/blob/master/src/y-websocket.js#L19-L22
 * https://github.com/yjs/y-protocols/blob/master/sync.js#L38-L40
 * https://github.com/dmonad/lib0/blob/master/decoding.js
 */
class YjsMessage {

	public const YJS_MESSAGE_SYNC = 0;
	public const YJS_MESSAGE_AWARENESS = 1;
	public const YJS_MESSAGE_AWARENESS_QUERY = 3;

	public const YJS_MESSAGE_SYNC_STEP1 = 0;
	public const YJS_MESSAGE_SYNC_STEP2 = 1;
	public const YJS_MESSAGE_SYNC_UPDATE = 2;

	private int $pos = 0;

	public function __construct(
		private string $data = ''
	) {
	}

	public static function fromBase64(string $data = ''): self {
		return new self(base64_decode($data));
	}

	/**
	 * https://github.com/dmonad/lib0/blob/bd69ab4dc701d77e808f2bab08d96d63acd297da/decoding.js#L242
	 */
	public function readVarUint(): int {
		$bytes = array_values(unpack('C*', $this->data));
		$num = 0;
		$mult = 1;
		$len = count($bytes);
		while ($this->pos < $len) {
			$r = $bytes[$this->pos++];
			// num = num | ((r & binary.BITS7) << len)
			$num = $num + ($r & 0b1111111) * $mult;
			$mult *= 128;
			if ($r <= 0b1111111) {
				return $num;
			}
			// Number.MAX_SAFE_INTEGER in JS
			if ($num > 9007199254740990) {
				throw new \OutOfBoundsException();
			}
		}
		throw new InvalidArgumentException();
	}

	public function getYjsMessageType(): int {
		$oldPos = $this->pos;
		$this->pos = 0;
		$messageType = $this->readVarUint();
		$this->pos = $oldPos;
		return $messageType;
	}

	public function getYjsSyncType(): int {
		$oldPos = $this->pos;
		$this->pos = 0;
		$messageType = $this->readVarUint();
		if ($messageType !== self::YJS_MESSAGE_SYNC) {
			throw new \ValueError('Message is not a sync message');
		}
		$syncType = $this->readVarUint();
		$this->pos = $oldPos;
		return $syncType;
	}

	/**
	 * Based on https://github.com/yjs/y-protocols/blob/master/PROTOCOL.md#handling-read-only-users
	 */
	public function isUpdate(): bool {
		if ($this->getYjsMessageType() === self::YJS_MESSAGE_SYNC) {
			if (in_array($this->getYjsSyncType(), [self::YJS_MESSAGE_SYNC_STEP2, self::YJS_MESSAGE_SYNC_UPDATE])) {
				return true;
			}
		}

		return false;
	}

}
