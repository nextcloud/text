<?php
declare(strict_types=1);

namespace OCA\Text\AppInfo;

$eventDispatcher = \OC::$server->getEventDispatcher();

// only load text editor if the user is logged in
if (\OC::$server->getUserSession()->isLoggedIn()) {
	$eventDispatcher->addListener('OCA\Files::loadAdditionalScripts', function () {
		\OCP\Util::addScript('text', 'files');
		\OCP\Util::addStyle('text', 'icons');
	});
}

$eventDispatcher->addListener('OCA\Files_Sharing::loadAdditionalScripts', function () {
	\OCP\Util::addScript('text', 'public');
	\OCP\Util::addStyle('text', 'icons');
});
