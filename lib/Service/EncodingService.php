<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Text\Service;

class EncodingService {
	public const COMMON_ENCODINGS = [ 'UTF-8', 'GB2312', 'GBK', 'BIG-5', 'SJIS-win', 'EUC-JP', 'Windows-1252', 'ISO-8859-15', 'ISO-8859-1', 'ASCII'];

	public const UTF_BOMs = [
		'UTF-32BE' => "\x00\x00\xfe\xff",
		'UTF-32LE' => "\xff\xfe\x00\x00",
		'UTF-16BE' => "\xfe\xff",
		'UTF-16LE' => "\xff\xfe",
		'UTF-8' => "\xef\xbb\xbf"
	];

	public function encodeToUtf8(string $string): ?string {
		$encoding = $this->detectEncoding($string);
		if ($encoding === null) {
			return null;
		}

		$encoded = mb_convert_encoding($string, 'UTF-8', $encoding);
		return is_string($encoded) ? $encoded : null;
	}

	public function detectEncoding(string $string): ?string {
		$bomDetect = $this->detectUtfBom($string);
		if ($bomDetect !== null) {
			return $bomDetect;
		}

		foreach ($this->getEncodings() as $encoding) {
			if (mb_check_encoding($string, $encoding)) {
				return $encoding;
			}
		}

		return mb_detect_encoding($string, $this->getEncodings(), true) ?: null;
	}

	private function detectUtfBom(string $string): ?string {
		foreach (self::UTF_BOMs as $encoding => $utfBom) {
			$bom = substr($string, 0, strlen($utfBom));
			if ($bom === $utfBom) {
				return $encoding;
			}
		}

		return null;
	}

	/**
	 * @return string[]
	 */
	private function getEncodings(): array {
		$mbOrder = mb_detect_order() ?: [];
		return array_merge(is_array($mbOrder) ? $mbOrder : [], self::COMMON_ENCODINGS);
	}
}
