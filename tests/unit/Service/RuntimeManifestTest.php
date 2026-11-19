<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\Service\RuntimeManifest;
use PHPUnit\Framework\TestCase;

require_once dirname(__DIR__, 3) . '/lib/Service/RuntimeManifest.php';

class RuntimeManifestTest extends TestCase {
	private string $directory;
	private RuntimeManifest $service;
	private array $manifest;

	protected function setUp(): void {
		$this->directory = sys_get_temp_dir() . '/text-manifest-' . bin2hex(random_bytes(8));
		mkdir($this->directory);
		$this->service = new RuntimeManifest($this->directory . '/manifest.json', $this->directory . '/info.xml');
		$this->manifest = [
			'format' => 1, 'textVersion' => '10.0.0-dev.3', 'sourceRevision' => str_repeat('a', 40),
			'codeDigest' => str_repeat('b', 64), 'sessionAPI' => 'context-v1', 'updateEncoding' => 'yjs-sync-v1',
		];
		file_put_contents($this->directory . '/info.xml', '<info><version>10.0.0-dev.3</version></info>');
		$this->writeManifest();
	}

	protected function tearDown(): void {
		foreach (glob($this->directory . '/*') as $file) {
			unlink($file);
		}
		rmdir($this->directory);
	}

	private function writeManifest(): void {
		file_put_contents($this->directory . '/manifest.json', json_encode($this->manifest, JSON_THROW_ON_ERROR));
	}

	public function testMatchingManifestAndDigestAreAccepted(): void {
		$this->assertSame($this->manifest, $this->service->get());
		$this->assertTrue($this->service->matches(str_repeat('b', 64)));
		$this->assertFalse($this->service->matches(str_repeat('c', 64)));
	}

	public function testManifestWorksWithExternalEntityLoadingDisabled(): void {
		$previous = libxml_get_external_entity_loader();
		libxml_set_external_entity_loader(static fn () => null);
		try {
			$this->assertSame($this->manifest, $this->service->get());
		} finally {
			libxml_set_external_entity_loader($previous);
		}
	}

	public function testMissingAndMalformedManifestFailClosed(): void {
		unlink($this->directory . '/manifest.json');
		$this->assertNull($this->service->get());
		file_put_contents($this->directory . '/manifest.json', '{malformed');
		$this->assertNull($this->service->get());
	}

	public function testStaleManifestAfterAppUpgradeIsRejected(): void {
		file_put_contents($this->directory . '/info.xml', '<info><version>10.0.0-dev.4</version></info>');
		$this->assertNull($this->service->get());
		$this->assertFalse($this->service->matches($this->manifest['codeDigest']));
	}

	public function testUnsupportedProtocolAndInvalidDigestAreRejected(): void {
		$this->manifest['sessionAPI'] = 'context-v2';
		$this->writeManifest();
		$this->assertNull($this->service->get());
		$this->manifest['sessionAPI'] = 'context-v1';
		$this->manifest['codeDigest'] = '../invalid';
		$this->writeManifest();
		$this->assertNull($this->service->get());
	}

	public function testUnrelatedServerMetadataIsNotPublished(): void {
		$this->manifest['privatePath'] = '/example/internal/path';
		$this->writeManifest();
		$result = $this->service->get();
		$this->assertArrayNotHasKey('privatePath', $result);
		$this->assertCount(6, $result);
	}
}
