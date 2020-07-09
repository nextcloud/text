<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2020 Morris Jobke <hey@morrisjobke.de>
 *
 * @author Morris Jobke <hey@morrisjobke.de>
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

use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCA\Text\AppInfo\Application;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\IConfig;
use OCP\IInitialStateService;
use OCP\IUserSession;

class FilesLoadAdditionalScriptsListener implements IEventListener {
	/** @var IConfig */
	protected $config;
	/** @var IInitialStateService */
	protected $initialStateService;
	/** @var IUserSession */
	protected $userSession;

	public function __construct(IConfig $config, IInitialStateService $initialStateService, IUserSession $userSession) {
		$this->config = $config;
		$this->initialStateService = $initialStateService;
		$this->userSession = $userSession;
	}

	public function handle(Event $event): void {
		if (!$event instanceof LoadAdditionalScriptsEvent) {
			return;
		}

		\OCP\Util::addScript('text', 'files');
		\OCP\Util::addStyle('text', 'icons');

		$this->initialStateService->provideInitialState(
			Application::APP_NAME,
			'workspace_available',
			$this->config->getAppValue(Application::APP_NAME, 'workspace_available', '1') === '1'
		);
		$this->initialStateService->provideInitialState(
			Application::APP_NAME,
			'workspace_enabled',
			$this->config->getUserValue($this->userSession->getUser()->getUID(), Application::APP_NAME, 'workspace_enabled', '1') === '1'
		);
	}
}
