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
use OCA\Text\Listeners\FilesLoadAdditionalScriptsListener;
use OCA\Text\Listeners\FilesSharingLoadAdditionalScriptsListener;
use OCA\Text\Listeners\LoadViewerListener;
use OCA\Text\Listeners\RegisterDirectEditorEventListener;
use OCA\Viewer\Event\LoadViewer;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\DirectEditing\RegisterDirectEditorEvent;

class Application extends App implements IBootstrap {
	const APP_NAME = 'text';

	public function __construct(array $params = []) {
		parent::__construct(self::APP_NAME, $params);
	}

	public function register(IRegistrationContext $context): void {
		$context->registerEventListener(RegisterDirectEditorEvent::class, RegisterDirectEditorEventListener::class);
		$context->registerEventListener(LoadViewer::class, LoadViewerListener::class);
		$context->registerEventListener(LoadAdditionalScriptsEvent::class, FilesLoadAdditionalScriptsListener::class);
		$context->registerEventListener(BeforeTemplateRenderedEvent::class, FilesSharingLoadAdditionalScriptsListener::class);
	}

	public function boot(IBootContext $context): void {
	}
}

