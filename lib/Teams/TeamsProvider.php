<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Teams;

use InvalidArgumentException;
use OCA\Text\Event\LoadEditor;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IFilenameValidator;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Teams\ITeamAppProvider;
use OCP\Teams\TeamAppAction;
use OCP\Teams\TeamAppActionConfirmation;
use OCP\Teams\TeamAppActionPrompt;
use OCP\Teams\TeamAppActionResult;
use OCP\Teams\TeamAppEntry;
use OCP\Teams\TeamAppNavigation;
use OCP\Teams\TeamAppRouteAlias;

class TeamsProvider implements ITeamAppProvider {
	public function __construct(
		private IEventDispatcher $eventDispatcher,
		private IURLGenerator $urlGenerator,
		private IRootFolder $root,
		private IFilenameValidator $filenames,
		private IL10N $l10n,
	) {
	}

	public function getId(): string {
		return 'text';
	}

	public function load(): string {
		$this->eventDispatcher->dispatchTyped(new LoadEditor());
		return $this->urlGenerator->linkTo('text', 'js/text-teams.mjs');
	}

	public function getOrder(): int {
		return 30;
	}

	/** @return list<TeamAppRouteAlias> */
	public function getRouteAliases(): array {
		return [new TeamAppRouteAlias('page/:fileId', 'fileId')];
	}

	public function getNavigation(array $context): TeamAppNavigation {
		$entries = [];
		foreach ($this->pages($context) as $page) {
			$id = (string)$page->getId();
			$label = substr($page->getName(), 0, -3);
			$actions = [];
			if ($context['isAdmin'] && $page->isUpdateable()) {
				$actions[] = new TeamAppAction('rename-' . $id, $this->l10n->t('Rename page'), prompt: new TeamAppActionPrompt($this->l10n->t('Page name'), $label));
			}
			if ($context['isAdmin'] && $page->isDeletable()) {
				$actions[] = new TeamAppAction('delete-' . $id, $this->l10n->t('Delete page'), confirm: new TeamAppActionConfirmation($this->l10n->t('Delete page'), $this->l10n->t('Delete "%s"? It can be restored from the trash bin.', [$label])));
			}
			$entries[] = new TeamAppEntry(
				id: $id, label: $label, legacyIds: ['page-' . $id], actions: $actions,
				icon: 'M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M13 9V3.5L18.5 9H13Z',
				viewData: ['path' => '/' . ltrim($this->root->getUserFolder($context['userId'])->getRelativePath($page->getPath()), '/')],
			);
		}
		usort($entries, static fn (TeamAppEntry $left, TeamAppEntry $right): int => strnatcasecmp($left->label, $right->label));
		return new TeamAppNavigation($entries, $context['isAdmin'] && $context['folder'] !== null ? [
			new TeamAppAction('text-create', $this->l10n->t('New page'), prompt: new TeamAppActionPrompt($this->l10n->t('Page name'))),
		] : []);
	}

	public function executeAction(array $context, string $actionId, array $parameters): TeamAppActionResult {
		if (!$context['isAdmin']) {
			throw new NotPermittedException('Team administration required');
		}
		if ($actionId === 'text-create') {
			$name = $this->name($parameters['value'] ?? null);
			$folder = $this->teamFolder($context);
			if (!$folder->isCreatable()) {
				throw new NotPermittedException('Team folder is not writable');
			}
			// TODO: where to store with which permissions?
			$system = $folder->getOrCreateFolder('.system');
			$teams = $system->getOrCreateFolder('teams');
			$pages = $teams->getOrCreateFolder('pages');
			if (!$pages->isCreatable() || $pages->nodeExists($name . '.md')) {
				throw new InvalidArgumentException('Cannot create a page with this name');
			}
			$page = $pages->newFile($name . '.md', '');
			return new TeamAppActionResult(open: (string)$page->getId());
		}
		foreach ($this->pages($context) as $page) {
			$id = (string)$page->getId();
			if ($actionId === 'rename-' . $id && $page->isUpdateable()) {
				$name = $this->name($parameters['value'] ?? null) . '.md';
				if ($page->getName() !== $name && $page->getParent()->nodeExists($name)) {
					throw new InvalidArgumentException('A page with this name already exists');
				}
				$page->move($page->getParent()->getPath() . '/' . $name);
				return new TeamAppActionResult();
			}
			if ($actionId === 'delete-' . $id && $page->isDeletable()) {
				$page->delete();
				return new TeamAppActionResult();
			}
		}
		throw new NotPermittedException('Team page action is not accessible');
	}

	private function teamFolder(array $context): Folder {
		if ($context['folder'] === null) {
			throw new NotFoundException('Team has no folder');
		}
		$folder = $this->root->getUserFolder($context['userId'])->get($context['folder']->getMountPoint());
		if (!$folder instanceof Folder) {
			throw new NotFoundException('Team folder not found');
		}
		return $folder;
	}

	private function pages(array $context): array {
		if ($context['folder'] === null) {
			return [];
		}
		$folder = $this->teamFolder($context);
		try {
			$pages = $folder->get('.system/teams/pages');
		} catch (NotFoundException) {
			return [];
		}
		if (!$pages instanceof Folder) {
			throw new NotFoundException('Team pages folder not found');
		}
		return array_values(array_filter($pages->getDirectoryListing(), static fn ($node): bool => $node instanceof File && $node->isReadable() && str_ends_with(strtolower($node->getName()), '.md')));
	}

	private function name(mixed $value): string {
		if (!is_string($value) || trim($value) === '' || in_array(trim($value), ['.', '..'], true) || !$this->filenames->isFilenameValid(trim($value))) {
			throw new InvalidArgumentException('Invalid team page name');
		}
		return trim($value);
	}
}
