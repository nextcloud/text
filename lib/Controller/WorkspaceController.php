<?php
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

namespace OCA\Text\Controller;

use Exception;
use OCA\Text\AppInfo\Application;
use OCA\Text\Service\WorkspaceService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\Constants;
use OCP\DirectEditing\IManager as IDirectEditingManager;
use OCP\DirectEditing\RegisterDirectEditorEvent;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\Files\StorageNotAvailableException;
use OCP\IRequest;
use OCP\ISession;
use OCP\IURLGenerator;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;
use Psr\Log\LoggerInterface;

class WorkspaceController extends OCSController {
	private IRootFolder $rootFolder;
	private IManager $shareManager;
	private WorkspaceService $workspaceService;
	private ?string $userId;
	private IDirectEditingManager $directEditingManager;
	private IURLGenerator $urlGenerator;

	/** @var IEventDispatcher */
	private $eventDispatcher;

	/** @var LoggerInterface */
	private $logger;

	/** @var ISession */
	private $session;

	public function __construct($appName, IRequest $request, IRootFolder $rootFolder, IManager $shareManager, IDirectEditingManager $directEditingManager, IURLGenerator $urlGenerator, WorkspaceService $workspaceService, IEventDispatcher $eventDispatcher, LoggerInterface $logger, ISession $session, $userId) {
		parent::__construct($appName, $request);
		$this->rootFolder = $rootFolder;
		$this->shareManager = $shareManager;
		$this->workspaceService = $workspaceService;
		$this->userId = $userId;
		$this->directEditingManager = $directEditingManager;
		$this->urlGenerator = $urlGenerator;
		$this->eventDispatcher = $eventDispatcher;
		$this->logger = $logger;
		$this->session = $session;
	}

	/**
	 * @NoAdminRequired
	 *
	 * Checks for available files in the current folder and returns required details to present
	 * the rich workspace
	 */
	public function folder(string $path = '/'): DataResponse {
		try {
			$userFolder = $this->rootFolder->getUserFolder($this->userId);
			$folder = $userFolder->get($path);
			if ($folder instanceof Folder) {
				$file = $this->workspaceService->getFile($folder);
				if ($file === null) {
					return new DataResponse([
						'message' => 'No workspace file found',
						'folder' => [
							'permissions' => $folder->getPermissions()
						]
					], Http::STATUS_NOT_FOUND);
				}

				return new DataResponse([
					'file' => [
						'id' => $file->getId(),
						'mimetype' => $file->getMimetype(),
						'name' => $file->getName(),
						'path' => $userFolder->getRelativePath($file->getPath())
					],
					'folder' => [
						'permissions' => $folder->getPermissions()
					]
				]);
			}
		} catch (NotFoundException | NotPermittedException $e) {
			return new DataResponse(['message' => 'No workspace file found'], Http::STATUS_NOT_FOUND);
		} catch (Exception $e) {
			$this->logger->error('Failed to get workspace file', ['exception' => $e]);
			return new DataResponse(['message' => 'No workspace file found'], Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * @NoAdminRequired
	 * @PublicPage
	 *
	 * Checks for available files in the current folder and returns required details to present
	 * the rich workspace
	 */
	public function publicFolder(string $shareToken, string $path = '/'): DataResponse {
		try {
			$share = $this->shareManager->getShareByToken($shareToken);
			if (!($share->getPermissions() & Constants::PERMISSION_READ)) {
				throw new ShareNotFound();
			}
			if ($share->getPassword() !== null) {
				$shareId = $this->session->get('public_link_authenticated');
				if ($share->getId() !== $shareId) {
					throw new ShareNotFound();
				}
			}
			$folder = $share->getNode()->get($path);
			if ($folder instanceof Folder) {
				$file = $this->workspaceService->getFile($folder);
				if ($file === null) {
					return new DataResponse(['message' => 'No workspace file found'], Http::STATUS_NOT_FOUND);
				}

				return new DataResponse([
					'file' => [
						'id' => $file->getId(),
						'mimetype' => $file->getMimetype(),
						'name' => $file->getName(),
						'path' => $path . '/' . $file->getName()
					]
				]);
			}
		} catch (NotFoundException | ShareNotFound | StorageNotAvailableException $e) {
			return new DataResponse(['message' => 'No workspace file found'], Http::STATUS_NOT_FOUND);
		} catch (Exception $e) {
			$this->logger->error('Failed to get public workspace file', ['exception' => $e]);
			return new DataResponse(['message' => 'No workspace file found'], Http::STATUS_NOT_FOUND);
		}
	}

	/**
	 * @NoAdminRequired
	 */
	public function direct(string $path): DataResponse {
		$this->eventDispatcher->dispatchTyped(new RegisterDirectEditorEvent($this->directEditingManager));

		try {
			$folder = $this->rootFolder->getUserFolder($this->userId)->get($path);
			if ($folder instanceof Folder) {
				$file = $this->getFile($folder);
				if ($file === null) {
					$token = $this->directEditingManager->create($path . '/'. $this->workspaceService->getSupportedFilenames()[0], Application::APP_NAME, 'textdocument');
				} else {
					$token = $this->directEditingManager->open($path . '/'. $file->getName(), Application::APP_NAME);
				}
				return new DataResponse([
					'url' => $this->urlGenerator->linkToRouteAbsolute('files.DirectEditingView.edit', ['token' => $token])
				]);
			}
		} catch (Exception $e) {
			$this->logger->error('Exception when creating a new file through direct editing', ['exception' => $e]);
			return new DataResponse('Failed to create file', Http::STATUS_FORBIDDEN);
		}
	}

	private function getFile(Folder $folder) {
		$file = null;
		foreach ($this->workspaceService->getSupportedFilenames() as $filename) {
			if ($folder->nodeExists($filename)) {
				$file = $folder->get($filename);
				continue;
			}
		}
		return $file;
	}
}
