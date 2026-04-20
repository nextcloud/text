<?php

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Text\Notification;

use OC\User\NoUserException;
use OCA\Text\Event\MentionEvent;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\File;
use OCP\Files\IRootFolder;
use OCP\Files\NotPermittedException;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\L10N\IFactory;
use OCP\Notification\AlreadyProcessedException;
use OCP\Notification\INotification;
use OCP\Notification\INotifier;
use OCP\Notification\UnknownNotificationException;

class Notifier implements INotifier {
	public const TYPE_MENTIONED = 'mentioned';
	public const SUBJECT_MENTIONED_SOURCE_USER = 'sourceUser';
	public const SUBJECT_MENTIONED_TARGET_USER = 'targetUser';

	public function __construct(
		private IFactory $factory,
		private IUserManager $userManager,
		private IURLGenerator $urlGenerator,
		private IRootFolder $rootFolder,
		private IEventDispatcher $eventDispatcher,
	) {
	}

	public function getID(): string {
		return 'text';
	}

	public function getName(): string {
		return 'Text';
	}

	public function prepare(INotification $notification, string $languageCode): INotification {
		if ($notification->getApp() !== 'text') {
			throw new UnknownNotificationException('Application should be text instead of ' . $notification->getApp());
		}

		$l = $this->factory->get('text', $languageCode);
		$notification->setIcon($this->urlGenerator->getAbsoluteURL($this->urlGenerator->imagePath('text', 'app-dark.svg')));
		switch ($notification->getSubject()) {
			case self::TYPE_MENTIONED:
				$parameters = $notification->getSubjectParameters();
				$sourceUser = $parameters[self::SUBJECT_MENTIONED_SOURCE_USER];
				$sourceUserDisplayName = $this->userManager->getDisplayName($sourceUser);
				$targetUser = $notification->getUser();
				$fileId = (int)$notification->getObjectId();

				if ($sourceUserDisplayName === null) {
					throw new UnknownNotificationException();
				}

				try {
					$userFolder = $this->rootFolder->getUserFolder($targetUser);
				} catch (NotPermittedException|NoUserException $e) {
					throw new UnknownNotificationException();
				}
				$node = $userFolder->getFirstNodeById($fileId);

				if (!$node instanceof File) {
					throw new AlreadyProcessedException();
				}

				$fileLink = $this->urlGenerator->linkToRouteAbsolute('files.viewcontroller.showFile', ['fileid' => $node->getId()]);

				$notification->setLink($fileLink);
				$notification->setRichSubject($l->t('{user} has mentioned you in the text document {node}'), [
					'user' => [
						'type' => 'user',
						'id' => $sourceUser,
						'name' => $sourceUserDisplayName,
					],
					'node' => [
						'type' => 'file',
						'id' => (string)$node->getId(),
						'name' => $node->getName(),
						'path' => $userFolder->getRelativePath($node->getPath()) ?? '',
						'link' => $fileLink,
					],
				]);

				$this->eventDispatcher->dispatchTyped(new MentionEvent($notification, $node));
				break;
			default:
				throw new UnknownNotificationException();
		}

		$this->setParsedSubjectFromRichSubject($notification);
		return $notification;
	}

	protected function setParsedSubjectFromRichSubject(INotification $notification): void {
		$placeholders = $replacements = [];
		foreach ($notification->getRichSubjectParameters() as $placeholder => $parameter) {
			$placeholders[] = '{' . $placeholder . '}';
			if ($parameter['type'] === 'file') {
				$replacements[] = $parameter['path'];
			} else {
				$replacements[] = $parameter['name'];
			}
		}

		$notification->setParsedSubject(str_replace($placeholders, $replacements, $notification->getRichSubject()));
	}
}
