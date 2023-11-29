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

use OCA\Text\Controller;

return [
	'routes' => [
		/** @see Controller\AttachmentController::getAttachmentList() */
		['name' => 'Attachment#getAttachmentList', 'url' => '/attachments', 'verb' => 'POST'],
		/** @see Controller\AttachmentController::insertAttachmentFile() */
		['name' => 'Attachment#insertAttachmentFile', 'url' => '/attachment/filepath', 'verb' => 'POST'],
		/** @see Controller\AttachmentController::uploadAttachment() */
		['name' => 'Attachment#uploadAttachment', 'url' => '/attachment/upload', 'verb' => 'POST'],
		/** @see Controller\AttachmentController::getImageFile() */
		['name' => 'Attachment#getImageFile', 'url' => '/image', 'verb' => 'GET'],
		/** @see Controller\AttachmentController::getMediaFile() */
		['name' => 'Attachment#getMediaFile', 'url' => '/media', 'verb' => 'GET'],
		/** @see Controller\AttachmentController::getMediaFilePreview() */
		['name' => 'Attachment#getMediaFilePreview', 'url' => '/mediaPreview', 'verb' => 'GET'],

		/** @see Controller\SessionController::create() */
		['name' => 'Session#create', 'url' => '/session/{documentId}/create', 'verb' => 'PUT'],
		/** @see Controller\SessionController::save() */
		['name' => 'Session#save', 'url' => '/session/{documentId}/save', 'verb' => 'POST'],
		/** @see Controller\SessionController::sync() */
		['name' => 'Session#sync', 'url' => '/session/{documentId}/sync', 'verb' => 'POST'],
		/** @see Controller\SessionController::push() */
		['name' => 'Session#push', 'url' => '/session/{documentId}/push', 'verb' => 'POST'],
		/** @see Controller\SessionController::close() */
		['name' => 'Session#close', 'url' => '/session/{documentId}/close', 'verb' => 'POST'],
		/** @see Controller\SessionController::mention() */
		['name' => 'Session#mention', 'url' => '/session/{documentId}/mention', 'verb' => 'PUT'],

		/** @see Controller\PublicSessionController::create() */
		['name' => 'PublicSession#create', 'url' => '/public/session/{documentId}/create', 'verb' => 'PUT'],
		/** @see Controller\PublicSessionController::updateSession() */
		['name' => 'PublicSession#updateSession', 'url' => '/public/session/{documentId}/session', 'verb' => 'POST'],
		/** @see Controller\PublicSessionController::save() */
		['name' => 'PublicSession#save', 'url' => '/public/session/{documentId}/save', 'verb' => 'POST'],
		/** @see Controller\PublicSessionController::sync() */
		['name' => 'PublicSession#sync', 'url' => '/public/session/{documentId}/sync', 'verb' => 'POST'],
		/** @see Controller\PublicSessionController::push() */
		['name' => 'PublicSession#push', 'url' => '/public/session/{documentId}/push', 'verb' => 'POST'],
		/** @see Controller\PublicSessionController::close() */
		['name' => 'PublicSession#close', 'url' => '/public/session/{documentId}/close', 'verb' => 'POST'],

		/** @see Controller\SettingsController::updateConfig() */
		['name' => 'Settings#updateConfig', 'url' => '/settings', 'verb' => 'POST'],

		/** @see Controller\UserApiController::index() */
		['name' => 'UserApi#index', 'url' => '/api/v1/users', 'verb' => 'POST'],
	],
	'ocs' => [
		/** @see Controller\WorkspaceController::folder() */
		['name' => 'Workspace#folder', 'url' => '/workspace', 'verb' => 'GET'],
		/** @see Controller\WorkspaceController::publicFolder() */
		['name' => 'Workspace#publicFolder', 'url' => '/public/workspace', 'verb' => 'GET'],
		/** @see Controller\WorkspaceController::direct() */
		['name' => 'Workspace#direct', 'url' => '/workspace/direct', 'verb' => 'POST'],
	]
];
