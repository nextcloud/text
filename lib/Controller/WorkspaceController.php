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

use OCA\Text\AppInfo\Application;
use OCA\Text\Service\SessionService;
use OCA\Text\Service\WorkspaceService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\OCSController;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\IRequest;
use OCP\Share\Exceptions\ShareNotFound;
use OCP\Share\IManager;

class WorkspaceController extends OCSController {

	/** @var IRootFolder */
	private $rootFolder;

	/** @var IManager */
	private $shareManager;

	/** @var WorkspaceService */
	private $workspaceService;

	/** @var string */
	private $userId;


	public function __construct($appName, IRequest $request, IRootFolder $rootFolder, IManager $shareManager, WorkspaceService $workspaceService, $userId) {
		parent::__construct($appName, $request);
		$this->rootFolder = $rootFolder;
		$this->shareManager = $shareManager;
		$this->workspaceService = $workspaceService;
		$this->userId = $userId;
	}

	/**
	 * @NoAdminRequired
	 *
	 * Checks for available files in the current folder and returns required details to present
	 * the rich workspace
	 */
	public function folder(string $path = '/'): DataResponse {
		try {
			$folder = $this->rootFolder->getUserFolder($this->userId)->get($path);
			if ($folder instanceof Folder) {
				$file = $this->workspaceService->getFile($folder);
				if ($file === null) {
					return new DataResponse(['message' => 'No workspace file found'], Http::STATUS_NOT_FOUND);
				}

				return new DataResponse([
					'file' => [
						'id' => $file->getId(),
						'mimetype' => $file->getMimetype(),
						'name' => $file->getName()
					]
				]);
			}
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => 'No valid folder found'], Http::STATUS_BAD_REQUEST);
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
		} catch (NotFoundException $e) {
			return new DataResponse(['message' => 'No valid folder found'], Http::STATUS_BAD_REQUEST);
		} catch (ShareNotFound $e) {
			return new DataResponse(['message' => 'No valid folder found'], Http::STATUS_BAD_REQUEST);
		}
	}

}
