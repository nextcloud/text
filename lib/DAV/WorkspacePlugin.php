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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Text\DAV;

use Exception;
use OC\Files\Node\File;
use OC\Files\Node\Folder;
use OCA\DAV\Connector\Sabre\Directory;
use OCA\DAV\Files\FilesHome;
use OCA\Text\AppInfo\Application;
use OCA\Text\Service\WorkspaceService;
use OCP\Files\GenericFileException;
use OCP\Files\IRootFolder;
use OCP\Files\NotPermittedException;
use OCP\Files\StorageNotAvailableException;
use OCP\IConfig;
use OCP\Lock\LockedException;
use Psr\Log\LoggerInterface;
use Sabre\DAV\INode;
use Sabre\DAV\PropFind;
use Sabre\DAV\Server;
use Sabre\DAV\ServerPlugin;

class WorkspacePlugin extends ServerPlugin {
	public const WORKSPACE_PROPERTY = '{http://nextcloud.org/ns}rich-workspace';
	public const WORKSPACE_FILE_PROPERTY = '{http://nextcloud.org/ns}rich-workspace-file';

	/** @var Server */
	private $server;

	/** @var WorkspaceService */
	private $workspaceService;

	/**  @var IRootFolder */
	private $rootFolder;

	/** @var LoggerInterface */
	private $logger;

	/** @var IConfig */
	private $config;

	/** @var string|null */
	private $userId;

	public function __construct(WorkspaceService $workspaceService, IRootFolder $rootFolder, IConfig $config, LoggerInterface $logger, $userId) {
		$this->workspaceService = $workspaceService;
		$this->rootFolder = $rootFolder;
		$this->config = $config;
		$this->logger = $logger;
		$this->userId = $userId;
	}

	/**
	 * This initializes the plugin.
	 *
	 * This function is called by Sabre\DAV\Server, after
	 * addPlugin is called.
	 *
	 * This method should set up the required event subscriptions.
	 *
	 * @param Server $server
	 * @return void
	 */
	public function initialize(Server $server) {
		$this->server = $server;

		$this->server->on('propFind', [$this, 'propFind']);
	}


	public function propFind(PropFind $propFind, INode $node) {
		if (!in_array(self::WORKSPACE_PROPERTY, $propFind->getRequestedProperties())
			&& !in_array(self::WORKSPACE_FILE_PROPERTY, $propFind->getRequestedProperties())) {
			return;
		}

		if (!$node instanceof Directory && !$node instanceof FilesHome) {
			return;
		}

		$workspaceAvailable = $this->config->getAppValue(Application::APP_NAME, 'workspace_available', '1') === '1';
		$workspaceEnabled = $this->config->getUserValue($this->userId, Application::APP_NAME, 'workspace_enabled', '1') === '1';

		if (!$workspaceAvailable || !$workspaceEnabled) {
			return;
		}

		$file = null;
		$owner = $this->userId ?? $node->getFileInfo()->getStorage()->getOwner('');
		/** @var Folder[] $nodes */
		$nodes = $this->rootFolder->getUserFolder($owner)->getById($node->getId());
		if (count($nodes) > 0) {
			/** @var File $file */
			try {
				$file = $this->workspaceService->getFile($nodes[0]);
			} catch (StorageNotAvailableException $e) {
				// If a storage is not available we can for the propfind response assume that there is no rich workspace present
			}
		}

		// Only return the property for the parent node and ignore it for further in depth nodes
		$propFind->handle(self::WORKSPACE_PROPERTY, function () use ($file) {
			try {
				if ($file instanceof File) {
					return $file->getContent();
				}
			} catch (GenericFileException|NotPermittedException|LockedException) {
			} catch (Exception $e) {
				$this->logger->error($e->getMessage(), [
					'exception' => $e,
				]);
			}

			return '';
		});
		$propFind->handle(self::WORKSPACE_FILE_PROPERTY, function () use ($file) {
			if ($file instanceof File) {
				return $file->getFileInfo()->getId();
			}
			return '';
		});
	}
}
