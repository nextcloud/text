<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCA\Files_Versions\Versions\BackendNotFoundException;
use OCA\Files_Versions\Versions\IMetadataVersion;
use OCA\Files_Versions\Versions\IVersion;
use OCA\Files_Versions\Versions\IVersionManager;
use OCA\Text\Exception\VersionNotFoundException;
use OCA\Text\Model\VersionEnd;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\IUser;
use OCP\IUserManager;
use OCP\Lock\LockedException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\ContainerInterface;

/**
 * Which Markdown file a user may compare, and its versions.
 */
class VersionAccessService {
	public const array MARKDOWN_MIMETYPES = ['text/markdown', 'text/x-web-markdown'];

	public function __construct(
		private readonly IRootFolder $rootFolder,
		private readonly ContainerInterface $container,
		private readonly IUserManager $userManager,
		private readonly FileService $fileService,
	) {
	}

	/**
	 * The Markdown file with this id in the user's files, if the user may read
	 * it and it is not end-to-end encrypted. Its versions are listed as in the
	 * Versions tab, also where a share disables downloads.
	 *
	 * @throws NotFoundException
	 */
	public function resolveFile(IUser $user, int $fileId): File {
		return $this->findFile($user, $fileId, fn (File $file): bool => true);
	}

	/**
	 * The file, if its content may also leave the server: a summary sends it
	 * to the AI provider, which a share without downloads does not allow.
	 *
	 * @throws NotFoundException
	 */
	public function resolveSendableFile(IUser $user, int $fileId): File {
		return $this->findFile($user, $fileId, fn (File $file): bool => !$this->fileService->isDownloadDisabled($file));
	}

	/**
	 * The file with this id where the user may compare it and `$allowed` says
	 * yes: the same file can be in the user's files more than once, through
	 * shares with other permissions
	 *
	 * @param callable(File): bool $allowed
	 * @throws NotFoundException
	 */
	private function findFile(IUser $user, int $fileId, callable $allowed): File {
		$userFolder = $this->rootFolder->getUserFolder($user->getUID());
		foreach ($this->nodesById($userFolder, $fileId) as $node) {
			if ($node instanceof File
				&& $node->isReadable()
				&& in_array($node->getMimetype(), self::MARKDOWN_MIMETYPES, true)
				&& !$this->isEndToEndEncrypted($node, $userFolder)
				&& $allowed($node)) {
				return $node;
			}
		}
		throw new NotFoundException('No comparable file ' . $fileId);
	}

	/**
	 * The first node with this id, then every node with it, looked up only if needed
	 *
	 * @return \Generator<Node>
	 */
	private function nodesById(Folder $userFolder, int $fileId): \Generator {
		$first = $userFolder->getFirstNodeById($fileId);
		if ($first === null) {
			return;
		}
		yield $first;
		yield from $userFolder->getById($fileId);
	}

	/**
	 * The current file and its retained versions, newest first.
	 *
	 * Backends list the current file as a version with the file's own
	 * timestamp; it becomes the end `current`.
	 *
	 * @return list<VersionEnd>
	 * @throws NotFoundException When the versions backend cannot find the file
	 */
	public function listVersions(IUser $user, File $file): array {
		try {
			$versions = $this->versionManager()?->getVersionsForFile($user, $file) ?? [];
		} catch (BackendNotFoundException) {
			// A storage that keeps no versions
			$versions = [];
		}

		$currentVersion = null;
		$ends = [];
		foreach ($versions as $version) {
			if ((string)$version->getRevisionId() === (string)$file->getMTime()) {
				$currentVersion = $version;
				continue;
			}
			$ends[] = $this->end((string)$version->getRevisionId(), $version->getTimestamp(), $version->getSize(), $version, $version);
		}
		usort($ends, static fn (VersionEnd $a, VersionEnd $b) => $b->mtime <=> $a->mtime);

		$current = $this->end(VersionEnd::CURRENT, $file->getMTime(), $file->getSize(), $currentVersion, null);
		return [$current, ...$ends];
	}

	/**
	 * One end of a comparison of the file. A revision with the current file's
	 * timestamp is the current file.
	 *
	 * @param list<VersionEnd> $versions The file's versions, from listVersions()
	 * @throws VersionNotFoundException
	 */
	public function resolveEnd(File $file, array $versions, string $id): VersionEnd {
		if ($id === (string)$file->getMTime()) {
			$id = VersionEnd::CURRENT;
		}
		foreach ($versions as $end) {
			if ($end->id === $id) {
				return $end;
			}
		}
		throw new VersionNotFoundException('No version ' . $id . ' of file ' . $file->getId());
	}

	/**
	 * The bytes of an end, or null when there are more than allowed.
	 *
	 * @throws VersionNotFoundException
	 * @throws LockedException When a save holds the current file
	 */
	public function read(File $file, VersionEnd $end, int $maxBytes): ?string {
		try {
			$stream = $end->version === null ? $file->fopen('r') : $this->versionManager()?->read($end->version);
		} catch (NotFoundException) {
			// Expired since it was listed
			$stream = false;
		}
		if (!is_resource($stream)) {
			throw new VersionNotFoundException('Cannot read version ' . $end->id . ' of file ' . $file->getId());
		}
		try {
			$bytes = stream_get_contents($stream, $maxBytes + 1);
		} finally {
			fclose($stream);
		}
		if ($bytes === false) {
			throw new VersionNotFoundException('Cannot read version ' . $end->id . ' of file ' . $file->getId());
		}
		return strlen($bytes) > $maxBytes ? null : $bytes;
	}

	private function end(string $id, int $mtime, int|float $size, ?IVersion $metadata, ?IVersion $version): VersionEnd {
		$label = '';
		$authorId = null;
		if ($metadata instanceof IMetadataVersion) {
			$label = $metadata->getMetadataValue('label') ?? '';
			$author = $metadata->getMetadataValue('author');
			$authorId = $author === null || $author === '' ? null : $author;
		}
		$authorName = $authorId === null ? null : $this->userManager->getDisplayName($authorId);
		return new VersionEnd($id, $mtime, $size, $label, $authorId, $authorName, $version);
	}

	/**
	 * Whether a folder between the file and the user folder is end-to-end
	 * encrypted (`isEncrypted()` means end-to-end on a folder).
	 */
	private function isEndToEndEncrypted(File $file, Folder $userFolder): bool {
		$folder = $file->getParent();
		while (str_starts_with($folder->getPath(), $userFolder->getPath() . '/')) {
			if ($folder->isEncrypted()) {
				return true;
			}
			$folder = $folder->getParent();
		}
		return false;
	}

	/**
	 * Whether files keep versions at all
	 */
	public function hasVersions(): bool {
		return $this->versionManager() !== null;
	}

	/**
	 * Files Versions registers its manager only while it is enabled
	 */
	private function versionManager(): ?IVersionManager {
		try {
			$manager = $this->container->get(IVersionManager::class);
		} catch (ContainerExceptionInterface) {
			return null;
		}
		return $manager instanceof IVersionManager ? $manager : null;
	}
}
