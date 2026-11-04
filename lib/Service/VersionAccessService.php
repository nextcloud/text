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
use OCA\Text\Model\VersionEnd;
use OCP\Files\File;
use OCP\Files\Folder;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\IUser;
use OCP\IUserManager;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\ContainerInterface;

/**
 * Which Markdown file a user may compare, and its versions.
 */
class VersionAccessService {
	public function __construct(
		private readonly IRootFolder $rootFolder,
		private readonly ContainerInterface $container,
		private readonly IUserManager $userManager,
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
		$userFolder = $this->rootFolder->getUserFolder($user->getUID());
		$file = $userFolder->getFirstNodeById($fileId);
		if (!$file instanceof File
			|| !$file->isReadable()
			|| $file->getMimetype() !== 'text/markdown'
			|| $this->isEndToEndEncrypted($file, $userFolder)) {
			throw new NotFoundException('No comparable file ' . $fileId);
		}
		return $file;
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
			$ends[] = $this->end((string)$version->getRevisionId(), $version->getTimestamp(), $version->getSize(), $version);
		}
		usort($ends, static fn (VersionEnd $a, VersionEnd $b) => $b->mtime <=> $a->mtime);

		$current = $this->end(VersionEnd::CURRENT, $file->getMTime(), $file->getSize(), $currentVersion);
		return [$current, ...$ends];
	}

	private function end(string $id, int $mtime, int|float $size, ?IVersion $metadata): VersionEnd {
		$label = '';
		$authorId = null;
		if ($metadata instanceof IMetadataVersion) {
			$label = $metadata->getMetadataValue('label') ?? '';
			$author = $metadata->getMetadataValue('author');
			$authorId = $author === null || $author === '' ? null : $author;
		}
		$authorName = $authorId === null ? null : $this->userManager->getDisplayName($authorId);
		return new VersionEnd($id, $mtime, $size, $label, $authorId, $authorName);
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
