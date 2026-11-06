<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

class RuntimeManifest {

	public function __construct(
		private string $manifestPath = __DIR__ . '/../../js/native-embedding.json',
		private string $versionPath = __DIR__ . '/../../appinfo/info.xml',
	) {
	}

	public function get(): ?array {
		if (!is_file($this->manifestPath) || !is_file($this->versionPath)) {
			return null;
		}
		try {
			$manifest = json_decode(file_get_contents($this->manifestPath), true, 32, JSON_THROW_ON_ERROR);
		} catch (\JsonException) {
			return null;
		}
		if (!is_array($manifest)
			|| ($manifest['format'] ?? null) !== 1
			|| ($manifest['sessionAPI'] ?? null) !== 'context-v1'
			|| ($manifest['updateEncoding'] ?? null) !== 'yjs-sync-v1') {
			return null;
		}
		foreach (['sourceRevision' => 40, 'codeDigest' => 64] as $key => $length) {
			if (!is_string($manifest[$key] ?? null) || !preg_match('/^[a-f0-9]{' . $length . '}$/D', $manifest[$key])) {
				return null;
			}
		}
		$info = simplexml_load_string(file_get_contents($this->versionPath), options: LIBXML_NONET);
		if ($info === false || ($manifest['textVersion'] ?? null) !== (string)$info->version) {
			return null;
		}
		return array_intersect_key($manifest, array_flip([
			'format', 'textVersion', 'sourceRevision', 'codeDigest', 'sessionAPI', 'updateEncoding',
		]));
	}

	public function matches(string $digest): bool {
		$manifest = $this->get();
		return $manifest !== null && hash_equals($manifest['codeDigest'], $digest);
	}
}
