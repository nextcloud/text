<?php

namespace OCA\Text;

use Test\TestCase;

class YjsMessageTest extends TestCase {
	protected function setUp(): void {
		parent::setUp();
	}

	// https://github.com/yjs/y-dat/blob/745d25f9690fceae5901d1225575fe8b6bcafdd7/src/y-dat.js#LL207C59-L210C1
	public function dataMessageTypes() {
		return [
			//
			['AAABAA==', 0, 0],
			// messageSync messageYjsSyncStep1
			['AAAyCIqghaQNBvrS2LoMB8L10I8KrQPD+t3RB2DcrYL4A40Ema2O4AMHz9bk8AIOtbm0PAE=', 0, 0],
			// messageAwareness
			['AQoBkZWK7gMAAnt9', 1, null],
			['AUIBwvXQjwqWAzl7InVzZXIiOnsibmFtZSI6ImFkbWluIiwiY29sb3IiOiIjZDA5ZTZkIn0sImN1cnNvciI6bnVsbH0=', 1, null],
			['AegBAcP63dEHtwHeAXsidXNlciI6eyJuYW1lIjoiR3Vlc3QiLCJjb2xvciI6IiM5M2IyN2IifSwiY3Vyc29yIjp7ImFuY2hvciI6eyJ0eXBlIjp7ImNsaWVudCI6MjcxNzEzNzYwMiwiY2xvY2siOjl9LCJ0bmFtZSI6bnVsbCwiaXRlbSI6bnVsbCwiYXNzb2MiOjB9LCJoZWFkIjp7InR5cGUiOnsiY2xpZW50IjoyNzE3MTM3NjAyLCJjbG9jayI6OX0sInRuYW1lIjpudWxsLCJpdGVtIjpudWxsLCJhc3NvYyI6MH19fQ==', 1, null],
			['AbsBAZGViu4DArIBeyJ1c2VyIjp7Im5hbWUiOiJHdWVzdCIsImNvbG9yIjoiI2I4YmU2OCJ9LCJjdXJzb3IiOnsiYW5jaG9yIjp7InR5cGUiOm51bGwsInRuYW1lIjoiZGVmYXVsdCIsIml0ZW0iOm51bGwsImFzc29jIjowfSwiaGVhZCI6eyJ0eXBlIjpudWxsLCJ0bmFtZSI6ImRlZmF1bHQiLCJpdGVtIjpudWxsLCJhc3NvYyI6MH19fQ==', 1, null],
			// messageSync messageYjsUpdate
			['AAISAQHD+t3RB2CEwvXQjwpHAWEA', 0, 2],
			['AAI0AQOKoIWkDQAHAQdkZWZhdWx0AwlwYXJhZ3JhcGgHAIqghaQNAAYEAIqghaQNAQR0ZXN0AA==', 0, 2],
			['AAIdAQGRlYruAx2okZWK7gMbAXcCaC0BkZWK7gMBGwE=', 0, 2],
			['AAIKAAGRlYruAwEVBA==', 0, 2],
			// query, response
			['AAABAA==', YjsMessage::YJS_MESSAGE_SYNC, YjsMessage::YJS_MESSAGE_SYNC_STEP1],
			['AAECAAA=', YjsMessage::YJS_MESSAGE_SYNC, YjsMessage::YJS_MESSAGE_SYNC_STEP2],
		];
	}

	/** @dataProvider dataMessageTypes */
	public function testMessageTypes($data, $type, $subtype) {
		$buffer = YjsMessage::fromBase64($data);
		$unpack1 = $buffer->getYjsMessageType();
		self::assertEquals($type, $unpack1, 'type');
		if ($subtype !== null) {
			$unpack2 = $buffer->getYjsSyncType();
			self::assertEquals($subtype, $unpack2);
		}
	}

	public function testV() {
		self::assertEquals(0, YjsMessage::fromBase64('AA==')->readVarUint());
		self::assertEquals(127, YjsMessage::fromBase64('fw==')->readVarUint());
		self::assertEquals(128, YjsMessage::fromBase64('gAE=')->readVarUint());
		self::assertEquals(129, YjsMessage::fromBase64('gQE=')->readVarUint());
		self::assertEquals(259, YjsMessage::fromBase64('gwI=')->readVarUint());
		self::assertEquals(0, YjsMessage::fromBase64('AA==')->readVarUint());
		self::assertEquals(13372342, YjsMessage::fromBase64('tpewBg==')->readVarUint());
		self::assertEquals(1357913579, YjsMessage::fromBase64('67vAhwU=')->readVarUint());

		$buffer = YjsMessage::fromBase64('tpewBg==');
		self::assertEquals(13372342, $buffer->readVarUint());
	}
}
