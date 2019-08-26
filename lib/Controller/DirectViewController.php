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
use OCA\Text\Db\DirectMapper;
use OCA\Text\Service\DocumentService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Http\NotFoundResponse;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IInitialStateService;
use OCP\IRequest;

class DirectViewController extends Controller {

	public function __construct($appName, IRequest $request, DocumentService $documentService, DirectMapper $directMapper, IInitialStateService $initialStateService) {
		parent::__construct($appName, $request);
		$this->documentService = $documentService;
		$this->directMapper = $directMapper;
		$this->initialStateService = $initialStateService;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 *
	 * @param string $token
	 * @return TemplateResponse
	 */
	public function show(string $token): Response {
		try {
			$direct = $this->directMapper->getByToken($token);
		} catch (DoesNotExistException $e) {
			//TODO show 404
			return new NotFoundResponse();
		}

		// Delete the token. They are for 1 time use only
		//$this->directMapper->delete($direct);

		$this->initialStateService->provideInitialState(Application::APP_NAME, 'direct_token', $token);
		$this->initialStateService->provideInitialState(Application::APP_NAME, 'direct_file_id', $direct->getFileId());
		$file = $this->documentService->getFileById($direct->getFileId(), $direct->getUserId());
		$this->initialStateService->provideInitialState(Application::APP_NAME, 'direct_mime', $file->getMimetype());
		return new TemplateResponse(Application::APP_NAME, 'main', [], 'empty');
	}

}
