<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Listeners;

use OCP\AppFramework\Http\Events\BeforeTemplateRenderedEvent;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Util;

/** @implements IEventListener<BeforeTemplateRenderedEvent> */
class LoadViewerListener implements IEventListener {
	public function handle(Event $event): void {
		if (!($event instanceof BeforeTemplateRenderedEvent)) {
			return;
		}

		if ($event->getResponse()->getRenderAs() === TemplateResponse::RENDER_AS_ERROR) {
			return;
		}

		Util::addInitScript('text', 'text-viewer');
		Util::addStyle('text', 'text-viewer');
	}
}
