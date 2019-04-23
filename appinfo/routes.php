<?php
declare(strict_types=1);

namespace OCA\Text\AppInfo;

return [
	'routes' => [
		['name' => 'Navigation#navigate', 'url' => '/', 'verb' => 'GET'],

		// Setup a new session
		['name' => 'Session#create', 'url' => '/session/create', 'verb' => 'GET'],
		// Load initial document
		['name' => 'Session#fetch', 'url' => '/session/fetch', 'verb' => 'GET'],
		// Load steps
		['name' => 'Session#sync', 'url' => '/session/sync', 'verb' => 'GET'],
		// Push own steps
		['name' => 'Session#push', 'url' => '/session/push', 'verb' => 'POST'],
		// Close session
		['name' => 'Session#close', 'url' => '/session/close', 'verb' => 'GET'],
	]
];
