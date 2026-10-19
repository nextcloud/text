<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCP\Constants;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\SystemTag\ISystemTagObjectMapper;
use Psr\Log\LoggerInterface;

class AiTagService {
	public function __construct(
		private readonly ISystemTagObjectMapper $systemTagObjectMapper,
		private readonly IRootFolder $rootFolder,
		private readonly LoggerInterface $logger,
		private readonly ?string $userId,
	) {
	}

	/**
	 * @param int $fileId
	 *
	 * @return void
	 *
	 * @throws NotFoundException
	 * @throws NotPermittedException
	 *
	 * @since 34.0.0 (ISystemTagObjectMapper::assignGeneratedByAITag)
	 */
	public function tagFileAsAiGenerated(int $fileId): void {
		if ($this->userId === null) {
			throw new NotFoundException('File not found');
		}

		$nodes = $this->rootFolder->getUserFolder($this->userId)->getById($fileId);
		if ($nodes === []) {
			throw new NotFoundException('File not found');
		}

		foreach ($nodes as $node) {
			if (($node->getPermissions() & Constants::PERMISSION_UPDATE) === Constants::PERMISSION_UPDATE) {
				try {
					$this->systemTagObjectMapper->assignGeneratedByAITag((string)$fileId, 'files');
				} catch (\Exception $e) {
					$this->logger->warning('Failed to tag file {fileId} as AI-generated: {error}', [
						'fileId' => $fileId,
						'error' => $e->getMessage(),
						'exception' => $e,
					]);
				}
				return;
			}
		}

		throw new NotPermittedException('No permission to assign tag to ' . $fileId);
	}
}
