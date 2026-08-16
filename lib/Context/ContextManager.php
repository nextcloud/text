<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Event\RegisterContextEvent;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\NotFoundException;
use Psr\Log\LoggerInterface;

class ContextManager {
	/** @var array<string, callable> */
	private array $contexts = [];
	public function __construct(
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

	public function registerContext(string $type, callable $createContext): void {
		$this->logger->debug('Registering context for type "' . $type . '".');
		if (array_key_exists($type, $this->contexts)) {
			$this->logger->warning('Context of type "' . $type . '" was already registered!');
			return;
		}
		$this->contexts[$type] = $createContext;
	}

	public function getContext(int $id, string $type): IContext {
		$createContext = $this->getContexts()[$type];
		if (!is_callable($createContext)) {
			throw new NotFoundException('Context of type "' . $type . '" was not registered!');
		}
		$context = $createContext($id, $type);
		if (!$context instanceof IContext) {
			throw new NotFoundException('Failed to create context of type ' . $type . '!');
		}
		return $context;
	}
}
