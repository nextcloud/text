<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Tests\Teams;

use OCA\Text\Teams\TeamsProvider;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IFilenameValidator;
use OCP\Files\IRootFolder;
use OCP\Files\IUserFolder;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Teams\ITeamAppProvider;
use OCP\Teams\TeamAppActionResult;
use OCP\Teams\TeamAppNavigation;
use OCP\Teams\TeamAppRouteAlias;
use OCP\Teams\TeamFolder;
use PHPUnit\Framework\TestCase;

final class TeamsProviderTest extends TestCase {
	private function fixture(): array {
		$root = $this->createMock(IRootFolder::class);
		$home = $this->createMock(IUserFolder::class);
		$folder = $this->createMock(Folder::class);
		$system = $this->createMock(Folder::class);
		$teams = $this->createMock(Folder::class);
		$pages = $this->createMock(Folder::class);
		$page = $this->createMock(File::class);
		$root->method('getUserFolder')->with('member')->willReturn($home);
		$home->method('get')->with('Team')->willReturn($folder);
		$home->method('getRelativePath')->willReturn('/Team/.system/teams/pages/Guide.md');
		$folder->method('get')->with('.system/teams/pages')->willReturn($pages);
		$folder->method('getOrCreateFolder')->with('.system')->willReturn($system);
		$system->method('getOrCreateFolder')->with('teams')->willReturn($teams);
		$teams->method('getOrCreateFolder')->with('pages')->willReturn($pages);
		$folder->method('isCreatable')->willReturn(true);
		$pages->method('isCreatable')->willReturn(true);
		$pages->method('getDirectoryListing')->willReturn([$page]);
		$pages->method('getPath')->willReturn('/member/files/Team/.system/teams/pages');
		$page->method('getId')->willReturn(42);
		$page->method('getName')->willReturn('Guide.md');
		$page->method('getPath')->willReturn('/member/files/Team/.system/teams/pages/Guide.md');
		$page->method('getParent')->willReturn($pages);
		$page->method('isReadable')->willReturn(true);
		$page->method('isUpdateable')->willReturn(true);
		$page->method('isDeletable')->willReturn(true);
		$filenames = $this->createMock(IFilenameValidator::class);
		$filenames->method('isFilenameValid')->willReturnCallback(static fn (string $name): bool => !str_contains($name, '/'));
		$l10n = $this->createMock(IL10N::class);
		$l10n->method('t')->willReturnArgument(0);
		$provider = new TeamsProvider($this->createMock(IEventDispatcher::class), $this->createMock(IURLGenerator::class), $root, $filenames, $l10n);
		$context = ['teamId' => 'team', 'teamName' => 'Team', 'userId' => 'member', 'isAdmin' => true, 'folder' => new TeamFolder(1, 'Team'), 'resources' => [], 'navigationEntryIds' => []];
		return [$provider, $context, $pages, $page, $folder, $system, $teams];
	}

	public function testPhpDiscoversPagesAndDeclaresActionsAndViewData(): void {
		[$provider, $context] = $this->fixture();
		$result = $provider->getNavigation($context);
		$this->assertSame('42', $result->entries[0]->id);
		$this->assertSame(['path' => '/Team/.system/teams/pages/Guide.md'], $result->entries[0]->viewData);
		$this->assertSame(['rename-42', 'delete-42'], array_column($result->entries[0]->actions, 'id'));
		$this->assertSame('text-create', $result->actions[0]->id);
		$this->assertSame('Guide', $result->entries[0]->actions[0]->prompt->value);
		$context['isAdmin'] = false;
		$this->assertSame([], $provider->getNavigation($context)->entries[0]->actions);
		$this->assertSame([], $provider->getNavigation($context)->actions);
	}

	public function testNonadminCannotMutatePages(): void {
		[$provider, $context, , $page] = $this->fixture();
		$context['isAdmin'] = false;
		$page->expects($this->never())->method('delete');
		$this->expectException(NotPermittedException::class);
		$provider->executeAction($context, 'delete-42', []);
	}

	public function testRenameAndDeleteResolveThePageInsideThisTeam(): void {
		[$provider, $context, , $page] = $this->fixture();
		$page->expects($this->once())->method('move')->with('/member/files/Team/.system/teams/pages/Renamed.md');
		$page->expects($this->once())->method('delete');
		$this->assertEquals(new TeamAppActionResult(), $provider->executeAction($context, 'rename-42', ['value' => 'Renamed']));
		$this->assertEquals(new TeamAppActionResult(), $provider->executeAction($context, 'delete-42', []));
	}

	public function testCannotMutateAFileOutsideTheDiscoveredPages(): void {
		[$provider, $context, , $page] = $this->fixture();
		$page->expects($this->never())->method('delete');
		$this->expectException(NotPermittedException::class);
		$provider->executeAction($context, 'delete-99', []);
	}

	public function testCreateUsesTheTeamsPagesFolderAndReturnsTheNewEntry(): void {
		[$provider, $context, $pages, , $folder, $system, $teams] = $this->fixture();
		$folder->expects($this->once())->method('getOrCreateFolder')->with('.system');
		$system->expects($this->once())->method('getOrCreateFolder')->with('teams');
		$teams->expects($this->once())->method('getOrCreateFolder')->with('pages');
		$new = $this->createMock(File::class);
		$new->method('getId')->willReturn(43);
		$pages->expects($this->once())->method('newFile')->with('New.md', '')->willReturn($new);
		$this->assertEquals(new TeamAppActionResult(open: '43'), $provider->executeAction($context, 'text-create', ['value' => 'New']));
	}

	public function testCreateRejectsTraversalAndDoesNotOverwrite(): void {
		[$provider, $context, $pages] = $this->fixture();
		$pages->expects($this->never())->method('newFile');
		$this->expectException(\InvalidArgumentException::class);
		$provider->executeAction($context, 'text-create', ['value' => '../secret']);
	}

	public function testCreateRejectsExistingNames(): void {
		[$provider, $context, $pages] = $this->fixture();
		$pages->method('nodeExists')->willReturn(true);
		$pages->expects($this->never())->method('newFile');
		$this->expectException(\InvalidArgumentException::class);
		$provider->executeAction($context, 'text-create', ['value' => 'Guide']);
	}

	public function testNoFolderProducesNoEntriesOrCreationActions(): void {
		[$provider, $context] = $this->fixture();
		$context['folder'] = null;
		$this->assertEquals(new TeamAppNavigation([], []), $provider->getNavigation($context));
	}

	public function testImplementsCoreProviderAndLoadsItsModule(): void {
		if (!interface_exists(ITeamAppProvider::class)) {
			$this->markTestSkipped('Requires the core Teams app provider API');
		}
		$urlGenerator = $this->createMock(IURLGenerator::class);
		$urlGenerator->expects($this->once())->method('linkTo')->with('text', 'js/text-teams.mjs')->willReturn('/apps/text/js/text-teams.mjs');
		$dispatcher = $this->createMock(IEventDispatcher::class);
		$dispatcher->expects($this->once())->method('dispatchTyped');
		$provider = new TeamsProvider($dispatcher, $urlGenerator, $this->createMock(IRootFolder::class), $this->createMock(IFilenameValidator::class), $this->createMock(IL10N::class));
		$this->assertInstanceOf(ITeamAppProvider::class, $provider);
		$this->assertSame('text', $provider->getId());
		$this->assertEquals([new TeamAppRouteAlias('page/:fileId', 'fileId')], $provider->getRouteAliases());
		$this->assertSame('/apps/text/js/text-teams.mjs', $provider->load());
	}
}
