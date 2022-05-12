<?php

namespace OCA\Text\Service;

use Test\TestCase;

class LabelServiceTest extends TestCase {
	private $encodingService;

	protected function setUp(): void {
		parent::setUp();
		$this->encodingService = new EncodingService();
	}

	/**
	 * Attempt to decode the file using the default decoding order.
	 * For files with encodings not included in the COMMON_ENCODINGS array encoding to UTF-8 will fail.
	 * @dataProvider dataFileEncodings
	 */
	public function testDefault(string $file, string $encoding) {
		$utf8_string = $this->encodingService->encodeToUtf8(file_get_contents($file));

		// If encoding is not part of the default encodings we can expect it to fail
		// It might still succeed because encoding detection is not precise.
		if (!$utf8_string && !in_array($encoding, EncodingService::COMMON_ENCODINGS, true)) {
			return;
		}

		$this->assertNotNull($utf8_string);
		$this->assertNotFalse(mb_detect_encoding($utf8_string, 'UTF-8', true));
	}

	/**
	 * Includes the encoding of the file in the detection order config value.
	 * This means that all files should be successfully encoded to UTF-8.
	 * @dataProvider dataFileEncodings
	 */
	public function testCustomOrder(string $file, string $encoding) {
		$original_order = mb_detect_order();
		$this->assertNotFalse(mb_detect_order($encoding));

		$utf8_string = $this->encodingService->encodeToUtf8(file_get_contents($file));
		$this->assertNotNull($utf8_string);
		$this->assertNotFalse(mb_detect_encoding($utf8_string, 'UTF-8', true));

		mb_detect_order($original_order);
	}

	public function dataFileEncodings(): array {
		return [
			['./tests/data/iso-8859.txt', 'ISO-8859-1'],
			['./tests/data/big5.txt', 'BIG-5'],
			['./tests/data/gbk.txt', 'GBK']
		];
	}
}
