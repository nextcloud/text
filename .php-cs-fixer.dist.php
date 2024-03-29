<?php

declare(strict_types=1);

require_once './vendor/autoload.php';

use Nextcloud\CodingStandard\Config;

$config = new Config();
$config
	->getFinder()
	->ignoreVCSIgnored(true)
	->notPath('build')
	->notPath('composer')
	->notPath('l10n')
	->notPath('lib/Vendor')
	->notPath('src')
	->notPath('vendor')
	->in(__DIR__);
return $config;
