<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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

namespace OCA\Text\AppInfo;

use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCA\Files_Sharing\Event\BeforeTemplateRenderedEvent;
use OCA\Text\Event\LoadEditor;
use OCA\Text\Listeners\AddMissingIndicesListener;
use OCA\Text\Listeners\BeforeAssistantNotificationListener;
use OCA\Text\Listeners\BeforeNodeDeletedListener;
use OCA\Text\Listeners\BeforeNodeRenamedListener;
use OCA\Text\Listeners\BeforeNodeWrittenListener;
use OCA\Text\Listeners\FilesLoadAdditionalScriptsListener;
use OCA\Text\Listeners\FilesSharingLoadAdditionalScriptsListener;
use OCA\Text\Listeners\LoadEditorListener;
use OCA\Text\Listeners\LoadViewerListener;
use OCA\Text\Listeners\NodeCopiedListener;
use OCA\Text\Listeners\RegisterDirectEditorEventListener;
use OCA\Text\Middleware\SessionMiddleware;
use OCA\Text\Notification\Notifier;
use OCA\Text\Service\ConfigService;
use OCA\TPAssistant\Event\BeforeAssistantNotificationEvent;
use OCA\Viewer\Event\LoadViewer;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\DB\Events\AddMissingIndicesEvent;
use OCP\DirectEditing\RegisterDirectEditorEvent;
use OCP\Files\Events\Node\BeforeNodeDeletedEvent;
use OCP\Files\Events\Node\BeforeNodeRenamedEvent;
use OCP\Files\Events\Node\BeforeNodeWrittenEvent;
use OCP\Files\Events\Node\NodeCopiedEvent;
use OCP\Files\Template\ITemplateManager;
use OCP\Files\Template\TemplateFileCreator;
use OCP\IL10N;

class Application extends App implements IBootstrap {
	public const APP_NAME = 'text';

	public function __construct(array $params = []) {
		parent::__construct(self::APP_NAME, $params);
	}

	public function register(IRegistrationContext $context): void {
		$context->registerEventListener(RegisterDirectEditorEvent::class, RegisterDirectEditorEventListener::class);
		$context->registerEventListener(LoadViewer::class, LoadViewerListener::class);
		$context->registerEventListener(LoadAdditionalScriptsEvent::class, FilesLoadAdditionalScriptsListener::class);
		$context->registerEventListener(BeforeTemplateRenderedEvent::class, FilesSharingLoadAdditionalScriptsListener::class);
		$context->registerEventListener(LoadEditor::class, LoadEditorListener::class);
		// for attachments
		$context->registerEventListener(NodeCopiedEvent::class, NodeCopiedListener::class);
		$context->registerEventListener(BeforeNodeWrittenEvent::class, BeforeNodeWrittenListener::class);
		$context->registerEventListener(BeforeNodeRenamedEvent::class, BeforeNodeRenamedListener::class);
		$context->registerEventListener(BeforeNodeDeletedEvent::class, BeforeNodeDeletedListener::class);
		$context->registerEventListener(AddMissingIndicesEvent::class, AddMissingIndicesListener::class);
		$context->registerEventListener(BeforeAssistantNotificationEvent::class, BeforeAssistantNotificationListener::class);

		$context->registerNotifierService(Notifier::class);
		$context->registerMiddleware(SessionMiddleware::class);
	}

	public function boot(IBootContext $context): void {
		$context->injectFn(function (ITemplateManager $templateManager, IL10N $l, ConfigService $configService) {
			$templateManager->registerTemplateFileCreator(function () use ($l, $configService) {
				$markdownFile = new TemplateFileCreator(Application::APP_NAME, $l->t('New text file'), '.' . $configService->getDefaultFileExtension());
				$markdownFile->addMimetype('text/markdown');
				$markdownFile->addMimetype('text/plain');
				$markdownFile->setIconClass('icon-filetype-text');
				$markdownFile->setRatio(1);
				$markdownFile->setOrder(10);
				$markdownFile->setActionLabel($l->t('Create new text file'));
				return $markdownFile;
			});
		});
	}
}
