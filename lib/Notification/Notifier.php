<?php
/*
 * @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

declare(strict_types=1);

namespace OCA\Text\Notification;

use InvalidArgumentException;
use OC\User\NoUserException;
use OCP\Files\IRootFolder;
use OCP\Files\NotPermittedException;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\L10N\IFactory;
use OCP\Notification\INotification;
use OCP\Notification\INotifier;

class Notifier implements INotifier {
	public const TYPE_MENTIONED = 'mentioned';
	public const SUBJECT_MENTIONED_SOURCE_USER = 'sourceUser';
	public const SUBJECT_MENTIONED_TARGET_USER = 'targetUser';

	private IFactory $factory;
	private IURLGenerator $url;
	private IUserManager $userManager;
	private IRootFolder $rootFolder;

	public function __construct(IFactory $factory, IUserManager $userManager, IURLGenerator $urlGenerator, IRootFolder $rootFolder) {
		$this->factory = $factory;
		$this->userManager = $userManager;
		$this->url = $urlGenerator;
		$this->rootFolder = $rootFolder;
	}

	public function getID(): string {
		return 'text';
	}

	public function getName(): string {
		return 'Text';
	}

	public function prepare(INotification $notification, string $languageCode): INotification {
		if ($notification->getApp() !== 'text') {
			throw new InvalidArgumentException('Application should be text instead of ' . $notification->getApp());
		}

		$l = $this->factory->get('text', $languageCode);

		switch ($notification->getSubject()) {
			case self::TYPE_MENTIONED:
				$parameters = $notification->getSubjectParameters();
				$sourceUser = $parameters[self::SUBJECT_MENTIONED_SOURCE_USER];
				$sourceUserDisplayName = $this->userManager->getDisplayName($sourceUser);
				$targetUser = $notification->getUser();
				$fileId = (int)$notification->getObjectId();

				if ($sourceUserDisplayName === null) {
					throw new InvalidArgumentException();
				}

				try {
					$userFolder = $this->rootFolder->getUserFolder($targetUser);
				} catch (NotPermittedException|NoUserException $e) {
					throw new InvalidArgumentException();
				}
				$nodes = $userFolder->getById($fileId);
				$node = array_shift($nodes);

				if ($node === null) {
					throw new InvalidArgumentException();
				}

				$fileLink = $this->url->linkToRouteAbsolute('files.viewcontroller.showFile', ['fileid' => $node->getId()]);

				$notification->setRichSubject($l->t('{user} has mentioned you in the text document {node}'), [
					'user' => [
						'type' => 'user',
						'id' => $sourceUser,
						'name' => $sourceUserDisplayName,
					],
					'node' => [
						'type' => 'file',
						'id' => $node->getId(),
						'name' => $node->getName(),
						'path' => $userFolder->getRelativePath($node->getPath()),
						'link' => $fileLink,
					],
				]);
				break;
			default:
				throw new InvalidArgumentException();
		}
		$notification->setIcon($this->url->getAbsoluteURL($this->url->imagePath('text', 'app-dark.svg')));
		$notification->setLink($fileLink);
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
