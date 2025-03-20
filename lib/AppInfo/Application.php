<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\AppInfo;

use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCA\Files_Sharing\Event\BeforeTemplateRenderedEvent;
use OCA\Files_Versions\Events\VersionRestoredEvent;
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
use OCA\Text\Listeners\RegisterTemplateCreatorListener;
use OCA\Text\Listeners\VersionRestoredListener;
use OCA\Text\Middleware\SessionMiddleware;
use OCA\Text\Notification\Notifier;
use OCA\TpAssistant\Event\BeforeAssistantNotificationEvent;
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
use OCP\Files\Template\RegisterTemplateCreatorEvent;

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
		$context->registerEventListener(RegisterTemplateCreatorEvent::class, RegisterTemplateCreatorListener::class);

		$context->registerEventListener(VersionRestoredEvent::class, VersionRestoredListener::class);

		$context->registerNotifierService(Notifier::class);
		$context->registerMiddleware(SessionMiddleware::class);
	}

	public function boot(IBootContext $context): void {
	}
}
