<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\SystemTag\ISystemTagObjectMapper;
use Psr\Log\LoggerInterface;

class AiTagService {
	public function __construct(
		private ISystemTagObjectMapper $systemTagObjectMapper,
		private IRootFolder $rootFolder,
		private LoggerInterface $logger,
		private ?string $userId,
	) {
	}

	/**
	 * @param int $fileId
	 *
	 * @return void
	 *
	 * @throws NotFoundException
	 *
	 * @since 34.0.0 (ISystemTagObjectMapper::assignGeneratedByAITag)
	 */
	public function tagFileAsAiGenerated(int $fileId): void {
		if ($this->userId === null || $this->rootFolder->getUserFolder($this->userId)->getFirstNodeById($fileId) === null) {
			throw new NotFoundException('File not found');
		}

		try {
			$this->systemTagObjectMapper->assignGeneratedByAITag((string)$fileId, 'files');
		} catch (\Exception $e) {
			$this->logger->warning('Failed to tag file {fileId} as AI-generated: {error}', [
				'fileId' => $fileId,
				'error' => $e->getMessage(),
				'exception' => $e,
			]);
		}
	}
}
