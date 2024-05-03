<?php

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Migration;

use OCA\Text\Db\Document;
use OCA\Text\Service\DocumentService;
use OCP\IAppConfig;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

class ResetSessionsBeforeYjs implements IRepairStep {
	public function __construct(private IAppConfig $config,
		private DocumentService $documentService) {
	}

	/**
	 * @return string
	 */
	public function getName(): string {
		return 'Force-reset all Text document sessions';
	}

	public function run(IOutput $output): void {
		$appVersion = $this->config->getValueString('text', 'installed_version');

		if (!$appVersion || version_compare($appVersion, '4.0.1') !== -1) {
			return;
		}

		$fileIds = array_map(static function (Document $document) {
			return $document->getId();
		}, $this->documentService->getAll());

		if (!$fileIds) {
			return;
		}

		$output->startProgress(count($fileIds));
		foreach ($fileIds as $fileId) {
			$this->documentService->unlock($fileId);
			$this->documentService->resetDocument($fileId, true);
			$output->advance();
		}
		$output->finishProgress();
	}
}
