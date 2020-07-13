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

use OCA\Text\AppInfo\Application;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\IConfig;
use OCP\IInitialStateService;

class FilesSharingLoadAdditionalScriptsListener implements IEventListener {
	/** @var IConfig */
	protected $config;
	/** @var IInitialStateService */
	protected $initialStateService;

	public function __construct(IConfig $config, IInitialStateService $initialStateService) {
		$this->config = $config;
		$this->initialStateService = $initialStateService;
	}

	public function handle(Event $event): void {
		\OCP\Util::addScript('text', 'public');
		\OCP\Util::addStyle('text', 'icons');

		$this->initialStateService->provideInitialState(
			Application::APP_NAME,
			'workspace_available',
			$this->config->getAppValue(Application::APP_NAME, 'workspace_available', '1') === '1'
		);
	}
}
