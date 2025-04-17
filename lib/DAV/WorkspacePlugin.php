<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\DAV;

use Exception;
use OC\Files\Node\File;
use OCA\DAV\Connector\Sabre\Directory;
use OCA\DAV\Files\FilesHome;
use OCA\Text\AppInfo\Application;
use OCA\Text\Service\WorkspaceService;
use OCP\Files\GenericFileException;
use OCP\Files\IRootFolder;
use OCP\Files\NotPermittedException;
use OCP\ICacheFactory;
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
	public const WORKSPACE_PROPERTY_FLAT = '{http://nextcloud.org/ns}rich-workspace-flat';
	public const WORKSPACE_FILE_PROPERTY_FLAT = '{http://nextcloud.org/ns}rich-workspace-file-flat';

	private Server $server;

	public function __construct(
		private WorkspaceService $workspaceService,
		private IRootFolder $rootFolder,
		private ICacheFactory $cacheFactory,
		private IConfig $config,
		private LoggerInterface $logger,
		private ?string $userId,
	) {
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
		if (!array_intersect([
			self::WORKSPACE_PROPERTY,
			self::WORKSPACE_FILE_PROPERTY,
			self::WORKSPACE_PROPERTY_FLAT,
			self::WORKSPACE_FILE_PROPERTY_FLAT
		], $propFind->getRequestedProperties())) {
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

		$shouldFetchChildren = array_intersect([
			self::WORKSPACE_PROPERTY,
			self::WORKSPACE_FILE_PROPERTY,
		], $propFind->getRequestedProperties());

		// In most cases we only need the workspace property for the root node
		// So we can skip the propFind for further nodes for performance reasons
		// Fetching the workspace property for all children is still required for mobile apps

		if ($propFind->getDepth() !== $this->server->getHTTPDepth() && !$shouldFetchChildren) {
			return;
		}

		$node = $node->getNode();
		try {
			$file = $this->workspaceService->getFile($node);
		} catch (\Exception $e) {
			$file = null;
		}
		$workspaceContentCallback = function () use ($file) {
			$cachedContent = '';
			if ($file instanceof File) {
				$cache = $this->cacheFactory->createDistributed('text_workspace');
				$cacheKey = $file->getFileInfo()->getId() . '_' . $file->getFileInfo()->getEtag();
				if (($cachedContent = $cache->get($cacheKey)) !== null) {
					return $cachedContent;
				}

				try {
					$cachedContent = $file->getContent();
					$cache->set($cacheKey, $cachedContent, 3600);
				} catch (GenericFileException|NotPermittedException|LockedException $e) {
					// Ignore but log when debugging
					$this->logger->debug($e->getMessage(), [
						'exception' => $e,
					]);
				} catch (Exception $e) {
					$this->logger->error($e->getMessage(), [
						'exception' => $e,
					]);
				}
			}
			return $cachedContent;
		};

		$workspaceFileCallback = function () use ($file) {
			if ($file instanceof File) {
				return $file->getFileInfo()->getId();
			}
			return '';
		};

		$propFind->handle(self::WORKSPACE_PROPERTY, $workspaceContentCallback);
		$propFind->handle(self::WORKSPACE_PROPERTY_FLAT, $workspaceContentCallback);
		$propFind->handle(self::WORKSPACE_FILE_PROPERTY, $workspaceFileCallback);
		$propFind->handle(self::WORKSPACE_FILE_PROPERTY_FLAT, $workspaceFileCallback);
	}
}
