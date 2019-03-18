<?php
declare(strict_types=1);

namespace OCA\Text\AppInfo;

return [
	'routes' => [
		['name' => 'Navigation#navigate', 'url' => '/', 'verb' => 'GET'],

		['name' => 'Session#create', 'url' => '/session/create', 'verb' => 'GET'],
		['name' => 'Sync#sync', 'url' => '/session/sync', 'verb' => 'GET'],
		['name' => 'Session#push', 'url' => '/session/push', 'verb' => 'GET'],
		['name' => 'Session#get', 'url' => '/session/get', 'verb' => 'GET'],
		['name' => 'Session#close', 'url' => '/session/close', 'verb' => 'GET'],

	]
];
