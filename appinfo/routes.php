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

return [
	'routes' => [
		['name' => 'Session#create', 'url' => '/session/create', 'verb' => 'GET'],
		['name' => 'Session#fetch', 'url' => '/session/fetch', 'verb' => 'GET'],
		['name' => 'Session#sync', 'url' => '/session/sync', 'verb' => 'POST'],
		['name' => 'Session#push', 'url' => '/session/push', 'verb' => 'POST'],
		['name' => 'Session#close', 'url' => '/session/close', 'verb' => 'GET'],

		['name' => 'PublicSession#create', 'url' => '/public/session/create', 'verb' => 'GET'],
		['name' => 'PublicSession#updateSession', 'url' => '/public/session', 'verb' => 'POST'],
		['name' => 'PublicSession#fetch', 'url' => '/public/session/fetch', 'verb' => 'GET'],
		['name' => 'PublicSession#sync', 'url' => '/public/session/sync', 'verb' => 'POST'],
		['name' => 'PublicSession#push', 'url' => '/public/session/push', 'verb' => 'POST'],
		['name' => 'PublicSession#close', 'url' => '/public/session/close', 'verb' => 'GET'],
	]
];
