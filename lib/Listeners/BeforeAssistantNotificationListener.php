<?php

namespace OCA\Text\Listeners;

use OCA\Text\AppInfo\Application;
use OCA\TPAssistant\Event\BeforeAssistantNotificationEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\IURLGenerator;

/** @template-implements IEventListener<BeforeAssistantNotificationEvent|Event> */
class BeforeAssistantNotificationListener implements \OCP\EventDispatcher\IEventListener {

	public function __construct(
		private IURLGenerator $urlGenerator,
	) {
	}

	/**
	 * @inheritDoc
	 */
	public function handle(Event $event): void {
		if (!$event instanceof BeforeAssistantNotificationEvent) {
			return;
		}

		$task = $event->getTask();
		if ($task->getAppId() !== Application::APP_NAME || $task->getUserId() === null) {
			return;
		}
		$fileId = (int)str_replace('text-file:', '', $task->getIdentifier());
		$fileLink = $this->urlGenerator->linkToRouteAbsolute('files.viewcontroller.showFile', ['fileid' => $fileId]);
		$event->setWantsNotification(true);
		$event->setNotificationTarget($fileLink);
	}
}
