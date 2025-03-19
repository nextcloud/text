<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */


namespace OCA\Text\Listeners;

use OCA\Text\AppInfo\Application;
use OCA\Text\Service\ConfigService;
use OCP\App\IAppManager;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Template\RegisterTemplateCreatorEvent;
use OCP\Files\Template\TemplateFileCreator;
use OCP\IL10N;

/** @implements IEventListener<Event|RegisterTemplateCreatorEvent> */
class RegisterTemplateCreatorListener implements IEventListener {
	public function __construct(
		private IL10N $l10n,
		private ConfigService $configService,
		private IAppManager $appManager,
	) {
	}

	public function handle(Event $event): void {
		if (!$event instanceof RegisterTemplateCreatorEvent) {
			return;
		}

		$event->getTemplateManager()->registerTemplateFileCreator(function () {
			$markdownFile = new TemplateFileCreator(Application::APP_NAME, $this->l10n->t('New text file'), '.' . $this->configService->getDefaultFileExtension());
			$markdownFile->addMimetype('text/markdown');
			$markdownFile->addMimetype('text/plain');
			$markdownFile->setIconSvgInline((string)file_get_contents($this->appManager->getAppPath('text') . '/img/article.svg'));
			$markdownFile->setRatio(1);
			$markdownFile->setOrder(10);
			$markdownFile->setActionLabel($this->l10n->t('Create new text file'));
			return $markdownFile;
		});


	}
}
