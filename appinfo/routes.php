<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
		/** @see Controller\AttachmentController::createAttachment() */
		['name' => 'Attachment#createAttachment', 'url' => '/attachment/create', 'verb' => 'POST'],
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
