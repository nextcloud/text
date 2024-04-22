<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2024 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
			$markdownFile->setIconSvgInline(file_get_contents($this->appManager->getAppPath('text') . '/img/article.svg'));
			$markdownFile->setRatio(1);
			$markdownFile->setOrder(10);
			$markdownFile->setActionLabel($this->l10n->t('Create new text file'));
			return $markdownFile;
		});


	}
}
