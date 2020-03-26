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

use OCA\Text\DirectEditing\TextDirectEditor;
use OCA\Viewer\Event\LoadViewer;
use OCP\AppFramework\App;
use OCP\DirectEditing\RegisterDirectEditorEvent;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IInitialStateService;

class Application extends App {


	const APP_NAME = 'text';

	/** @var IInitialStateService */
	private $initialStateService;
	/**
	 * @var \OCP\IUserSession
	 */
	private $userSession;
	/**
	 * @var \OCP\IConfig
	 */
	private $config;


	/**
	 * Application constructor.
	 *
	 * @param array $params
	 * @throws \OCP\AppFramework\QueryException
	 */
	public function __construct(array $params = []) {
		parent::__construct(self::APP_NAME, $params);

		$container = $this->getContainer();
		$server = $container->getServer();
		/** @var IEventDispatcher $eventDispatcher */
		$eventDispatcher = $server->query(IEventDispatcher::class);
		$this->initialStateService = $server->query(IInitialStateService::class);
		$this->userSession = $server->getUserSession();
		$this->config = $this->getContainer()->getServer()->getConfig();

		$eventDispatcher->addListener(RegisterDirectEditorEvent::class, function (RegisterDirectEditorEvent $event) use ($container) {
			$editor = $container->query(TextDirectEditor::class);
			$event->register($editor);
		});

		$eventDispatcher->addListener(LoadViewer::class, function () {
			\OCP\Util::addScript('text', 'viewer');
			\OCP\Util::addStyle('text', 'icons');
		});

		if ($this->userSession->isLoggedIn()) {
			$eventDispatcher->addListener('OCA\Files::loadAdditionalScripts', function () {
				\OCP\Util::addScript('text', 'files');
				\OCP\Util::addStyle('text', 'icons');

				$this->initialStateService->provideInitialState(
					self::APP_NAME,
					'workspace_available',
					$this->config->getAppValue(self::APP_NAME, 'workspace_available', '1') === '1'
				);
				$this->initialStateService->provideInitialState(
					self::APP_NAME,
					'workspace_enabled',
					$this->config->getUserValue($this->userSession->getUser()->getUID(), self::APP_NAME, 'workspace_enabled', '1') === '1'
				);
			});
		}

		$eventDispatcher->addListener('OCA\Files_Sharing::loadAdditionalScripts', function () {
			\OCP\Util::addScript('text', 'public');
			\OCP\Util::addStyle('text', 'icons');
			$this->initialStateService->provideInitialState(
				self::APP_NAME,
				'workspace_available',
				$this->config->getAppValue(self::APP_NAME, 'workspace_available', '1') === '1'
			);
		});
	}

}

