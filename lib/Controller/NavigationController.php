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
	 *
	 * @return TemplateResponse
	 */
	#[\OCP\AppFramework\Http\Attribute\NoCSRFRequired]
	#[\OCP\AppFramework\Http\Attribute\NoAdminRequired]
	public function navigate(): TemplateResponse {
		return new TemplateResponse(Application::APP_NAME, 'main');
	}
}
