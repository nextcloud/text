<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCA\Text\Service\ConfigService;
use OCP\AppFramework\Http\Events\BeforeTemplateRenderedEvent;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Services\IInitialState;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\MockObject\MockObject;
use Test\TestCase;

class LoadViewerListenerTest extends TestCase {
	private IInitialState&MockObject $initialState;
	private ConfigService&MockObject $config;
	private IUserSession&MockObject $session;
	private LoadViewerListener $listener;

	protected function setUp(): void {
		parent::setUp();
		$this->initialState = $this->createMock(IInitialState::class);
		$this->config = $this->createMock(ConfigService::class);
		$this->session = $this->createMock(IUserSession::class);
		$this->listener = new LoadViewerListener($this->initialState, $this->session, $this->config);
	}

	private function event(string $renderAs = TemplateResponse::RENDER_AS_USER): BeforeTemplateRenderedEvent {
		return new BeforeTemplateRenderedEvent(true, new TemplateResponse('files', 'index', [], $renderAs));
	}

	public function testTellsPagesWhetherComparisonsOfferSummaries(): void {
		$user = $this->createMock(IUser::class);
		$this->session->method('getUser')->willReturn($user);
		$this->config->method('isVersionSummariesAvailableFor')->with($user)->willReturn(true);
		$provided = null;
		$this->initialState->expects($this->once())->method('provideLazyInitialState')
			->with('version_summaries', $this->callback(function (\Closure $value) use (&$provided) {
				$provided = $value;
				return true;
			}));

		$this->listener->handle($this->event());

		$this->assertTrue($provided());
	}

	public function testLeavesErrorPagesAlone(): void {
		$this->initialState->expects($this->never())->method('provideLazyInitialState');

		$this->listener->handle($this->event(TemplateResponse::RENDER_AS_ERROR));
	}
}
