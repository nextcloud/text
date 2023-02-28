<?php

declare(strict_types=1);

namespace OC\Hooks {
    class Emitter {}
}

namespace OC\AppFramework\OCS {
	class BaseResponse {}
}

namespace OCA\Viewer\Event {
	class LoadViewer extends \OCP\EventDispatcher\Event {}
}

namespace OCA\Files_Sharing\Event {
	class BeforeTemplateRenderedEvent extends \OCP\EventDispatcher\Event {
		abstract public function getShare(): \OCP\Share\IShare;
	}
}

namespace OC\User {
	class NoUserException extends \Exception {}
}

namespace OCA\Files_Sharing {
	abstract class SharedStorage implements \OCP\Files\Storage\IStorage {
		abstract public function getShare(): \OCP\Share\IShare;
	}
}
