<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCP\SystemTag\ISystemTagObjectMapper;
use Psr\Log\LoggerInterface;

class AiTagService {
	public function __construct(
		private ISystemTagObjectMapper $systemTagObjectMapper,
		private LoggerInterface $logger,
	) {
	}

	/**
	 * @param int $fileId
	 *
	 * @return void
	 *
	 * @throws \Exception
	 *
	 * @since 34.0.0 (ISystemTagObjectMapper::assignGeneratedByAITag)
	 */
	public function tagFileAsAiGenerated(int $fileId): void {
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
