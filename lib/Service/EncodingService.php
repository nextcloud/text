<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2022 Raul Ferreira Fuentes <raul@nextcloud.com>
 *
 * @author Raul Ferreira Fuentes <raul@nextcloud.com>
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
namespace OCA\Text\Service;

class EncodingService {
	public const COMMON_ENCODINGS = ['UTF-8', 'GB2312', 'GBK', 'BIG-5', 'SJIS-win', 'EUC-JP', 'Windows-1252', 'ISO-8859-15', 'ISO-8859-1', 'ASCII'];

    public const UTF_BOMs = [
        'UTF-32BE' => "\x00\x00\xfe\xff",
        'UTF-32LE' => "\xff\xfe\x00\x00",
        'UTF-16BE' => "\xfe\xff",
        'UTF-16LE' => "\xff\xfe",
        'UTF-8' => "\xef\xbb\xbf"
    ];


	public function encodeToUtf8(string $string): ?string {
		$encoding = $this->detectEncoding($string);
		if (!$encoding) {
			return null;
		}

		return mb_convert_encoding($string, 'UTF-8', $encoding);
	}

	public function detectEncoding(string $string): ?string {
        $bom_detect = $this->detectUtfBom($string);
        if ($bom_detect) {
            return $bom_detect;
        }

		$encodings = $this->getEncodings();
		foreach ($encodings as $encoding) {
			if (mb_check_encoding($string, $encoding)) {
				return $encoding;
			}
		}

		return null;
	}

    public function detectUtfBom(string $string): ?string {
        foreach (self::UTF_BOMs as $encoding => $utf_bom) {
            $bom = substr($string, 0, strlen($utf_bom));
            if ($bom === $utf_bom) {
                return $encoding;
            }
        }

        return null;
    }

	/**
	 * @return string[]
	 */
	private function getEncodings(): array {
		$mb_order = mb_detect_order() ?: [];
		return array_merge($mb_order, self::COMMON_ENCODINGS);
	}
}
