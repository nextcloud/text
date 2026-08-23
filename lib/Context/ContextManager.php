<?php

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Context;

use OCA\Text\Event\RegisterContextEvent;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IUserSession;
use Psr\Log\LoggerInterface;
use Psr\Container\ContainerInterface;

class ContextManager {
	/** @var array<string, string> */
	private array $contexts = [];
	public function __construct(
		private readonly ContainerInterface $c,
		private readonly IEventDispatcher $eventDispatcher,
		private readonly LoggerInterface $logger,
		private readonly IUserSession $userSession,
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

	public function getContext(string $type, int $id, ?string $shareToken): IContext {
		$factoryClassName = $this->getContexts()[$type];
		if ($factoryClassName === null) {
			throw new NotFoundException('Context of type "' . $type . '" was not registered!');
		}
		$factory = $this->c->get($factoryClassName);
		if (!$factory instanceof IContextFactory) {
			throw new NotFoundException('Context factory of type "' . $type . '" is not an IContextFactory.');
		}
		if ($shareToken === null) {
			$user = $this->userSession->getUser();
			if ($user === null) {
				throw new NotPermittedException();
			}
			return $factory->buildForUser($user, $id);
		} else {
			return $factory->buildForShare($shareToken, $id);
		}
	}
}
