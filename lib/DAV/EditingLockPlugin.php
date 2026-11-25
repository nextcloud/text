<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\DAV;

use OCA\DAV\Connector\Sabre\File as DavFile;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\LockService;
use OCA\Text\Service\SessionService;
use OCP\Files\File;
use OCP\Files\Mount\IMovableMount;
use Sabre\DAV\Exception\Forbidden;
use Sabre\DAV\Exception\NotFound;
use Sabre\DAV\Server;
use Sabre\DAV\ServerPlugin;
use Sabre\HTTP\RequestInterface;

/**
 * Let a user delete, rename or move a file Text holds a lock on, when nobody else is editing it right now.
 *
 * The request passes Sabre's lock check with Text's lock token. The lock itself is only released once
 * the server's own checks passed, by BeforeNodeDeletedListener and BeforeNodeRenamedListener.
 * A share recipient removing, renaming or moving the share therefore keeps the owner's file locked.
 *
 * Overwriting an edited file, also with COPY or MOVE, stays blocked as it would replace the content being edited.
 * So does renaming it to or from Markdown, as Text then discards the changes that are not saved yet.
 */
class EditingLockPlugin extends ServerPlugin {
	private Server $server;

	public function __construct(
		private readonly DocumentService $documentService,
		private readonly SessionService $sessionService,
		private readonly LockService $lockService,
		private readonly ?string $userId,
	) {
	}

	public function initialize(Server $server): void {
		$this->server = $server;
		// Plugins of apps are only added on beforeMethod, so provide the token right before Sabre checks locks
		$this->server->on('validateTokens', $this->beforeValidateTokens(...), 50);
	}

	/**
	 * @param list<array{uri: string, tokens: list<array{token: string, etag: string, negate: bool, validToken: bool}>}> $conditions
	 */
	private function beforeValidateTokens(RequestInterface $request, array &$conditions): void {
		$method = $request->getMethod();
		if (!in_array($method, ['DELETE', 'MOVE'], true) || $this->userId === null) {
			return;
		}
		try {
			// The file itself, for MOVE the source
			$node = $this->server->tree->getNodeForPath($request->getPath());
		} catch (NotFound) {
			return;
		}
		if (!$node instanceof DavFile) {
			return;
		}
		if ($method === 'MOVE' && $this->changesFormat($node->getFileInfo()->getMimetype(), $request)) {
			return;
		}
		$file = $node->getNode();
		if (!$file instanceof File) {
			return;
		}
		$lock = $this->lockService->getOwnLock($file->getId());
		if ($lock === null) {
			return;
		}
		$document = $this->documentService->getDocumentForFile($file->getId());
		if ($document !== null && $this->sessionService->hasRecentlyActiveSessions((string)$document->getId(), $this->userId)) {
			return;
		}
		// Moving the mount point of a share leaves the file and its lock untouched
		$movesMountPoint = $file->getInternalPath() === '' && $file->getMountPoint() instanceof IMovableMount;
		if ($method === 'MOVE' && !$movesMountPoint) {
			$this->lockService->permitUnlock($file->getId());
		}
		$conditions[] = [
			'uri' => $request->getPath(),
			'tokens' => [[
				'token' => 'opaquelocktoken:' . $lock->getToken(),
				'etag' => '',
				'negate' => false,
				'validToken' => false,
			]],
		];
	}

	/**
	 * Whether the file is renamed to or from Markdown, like BeforeNodeRenamedListener checks it
	 */
	private function changesFormat(string $mimeType, RequestInterface $request): bool {
		try {
			$destination = $this->server->calculateUri($request->getHeader('Destination') ?? '');
		} catch (Forbidden) {
			return true;
		}
		return ($mimeType === 'text/markdown') xor (pathinfo($destination, PATHINFO_EXTENSION) === 'md');
	}
}
