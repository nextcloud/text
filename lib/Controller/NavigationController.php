<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\AppInfo\Application;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\TemplateResponse;

class NavigationController extends Controller {

	/**
	 *
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 *
	 * @return TemplateResponse
	 */
	public function navigate(): TemplateResponse {
		return new TemplateResponse(Application::APP_NAME, 'main');
	}
}
