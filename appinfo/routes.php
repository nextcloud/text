<?php
declare(strict_types=1);

namespace OCA\Text\AppInfo;

return [
	'routes' => [
		['name' => 'Navigation#navigate', 'url' => '/', 'verb' => 'GET'],

		['name' => 'Session#create', 'url' => '/session/create', 'verb' => 'GET'],
		['name' => 'Session#fetch', 'url' => '/session/fetch', 'verb' => 'GET'],
		['name' => 'Session#sync', 'url' => '/session/sync', 'verb' => 'POST'],
		['name' => 'Session#push', 'url' => '/session/push', 'verb' => 'POST'],
		['name' => 'Session#close', 'url' => '/session/close', 'verb' => 'GET'],

		['name' => 'PublicSession#create', 'url' => '/public/session/create', 'verb' => 'GET'],
		['name' => 'PublicSession#fetch', 'url' => '/public/session/fetch', 'verb' => 'GET'],
		['name' => 'PublicSession#sync', 'url' => '/public/session/sync', 'verb' => 'POST'],
		['name' => 'PublicSession#push', 'url' => '/public/session/push', 'verb' => 'POST'],
		['name' => 'PublicSession#close', 'url' => '/public/session/close', 'verb' => 'GET'],

	]
];
