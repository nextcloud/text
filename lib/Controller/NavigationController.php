<?php
declare(strict_types=1);

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
