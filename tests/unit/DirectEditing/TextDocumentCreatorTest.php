<?php

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests;

use OCA\Text\DirectEditing\TextDocumentCreator;
use OCP\IAppConfig;
use OCP\IL10N;

class TextDocumentCreatorTest extends \PHPUnit\Framework\TestCase {
	private TextDocumentCreator $textDocumentCreator;

	private IL10N $l10n;

	private IAppConfig $appConfig;

	protected function setUp(): void {
		$this->l10n = $this->createMock(IL10N::class);
		$this->appConfig = $this->createMock(IAppConfig::class);
		$this->textDocumentCreator = new TextDocumentCreator($this->l10n, $this->appConfig);
	}

	public function testGetId(): void {
		$this->assertEquals('textdocument', $this->textDocumentCreator->getId());
	}

	public function testGetName(): void {
		$this->l10n->expects($this->once())
			->method('t')
			->with('text document')
			->willReturn('text document');
		$this->assertEquals('text document', $this->textDocumentCreator->getName());
	}

	public function testGetDefaultExtension(): void {
		$this->appConfig->expects($this->once())
			->method('getValueString')
			->with('text', 'default_file_extension', 'md')
			->willReturn('md');
		$this->assertEquals('md', $this->textDocumentCreator->getExtension());
	}

	public function testGetExtensionFromConfig(): void {
		$this->appConfig->expects($this->once())
			->method('getValueString')
			->with('text', 'default_file_extension', 'md')
			->willReturn('txt');

		$this->assertEquals('txt', $this->textDocumentCreator->getExtension());
	}

	public function testGetDefaultMimetype(): void {
		$this->assertEquals('text/markdown', $this->textDocumentCreator->getMimetype());
	}

	public function testGetMimetypeFromConfig(): void {
		$this->appConfig->expects($this->once())
			->method('getValueString')
			->with('text', 'default_file_extension', 'md')
			->willReturn('txt');

		$this->assertEquals('text/plain', $this->textDocumentCreator->getMimetype());
	}
}
