<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Event\RegisterContextEvent;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\NotFoundException;
use OCP\IUser;
use OCP\Share\IShare;
use Psr\Container\ContainerInterface;
use Psr\Log\LoggerInterface;

class ContextManager {
	/** @var array<string, string> */
	private array $contexts = [];
	public function __construct(
		private readonly ContainerInterface $c,
		private readonly IEventDispatcher $eventDispatcher,
		private readonly LoggerInterface $logger,
	) {
	}

	private function getContexts(): array {
		$contexts = $this->contexts;
		if (!empty($contexts)) {
			return $contexts;
		}
		$this->eventDispatcher->dispatchTyped(new RegisterContextEvent($this));
		if (empty($this->contexts)) {
			$this->logger->warning('Failed to register contexts.');
		}
		return $this->contexts;
	}

	public function registerContext(string $type, string $factoryClassName): void {
		$this->logger->debug('Registering context for type "' . $type . '".');
		if (array_key_exists($type, $this->contexts)) {
			$this->logger->warning('Context of type "' . $type . '" was already registered!');
			return;
		}
		$this->contexts[$type] = $factoryClassName;
	}

	public function getContext(string $type, int $id, IShare|IUser $auth): IContext {
		$factoryClassName = $this->getContexts()[$type];
		if ($factoryClassName === null) {
			throw new NotFoundException('Context of type "' . $type . '" was not registered!');
		}
		$factory = $this->c->get($factoryClassName);
		if (!$factory instanceof IContextFactory) {
			throw new NotFoundException('Context factory of type "' . $type . '" is not an IContextFactory.');
		}
		return $factory->build($auth, $type, $id);
	}

}
