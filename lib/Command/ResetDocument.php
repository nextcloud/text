<?php

/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Command;

use OCA\Text\Exception\DocumentHasUnsavedChangesException;
use OCA\Text\Service\DocumentService;
use OCA\Text\Service\FileService;
use OCA\Text\Service\LockService;
use OCP\Files\Config\IUserMountCache;
use OCP\Files\NotFoundException;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ResetDocument extends Command {
	public function __construct(
		protected DocumentService $documentService,
		protected IUserMountCache $userMountCache,
		protected FileService $fileService,
		protected LockService $lockService,
	) {
		parent::__construct();
	}

	protected function configure(): void {
		$this
			->setName('text:reset')
			->setDescription('Reset a text document session to the current file content')
			->addArgument(
				'file-id',
				InputArgument::OPTIONAL,
				'File id of the document to reset'
			)
			->addOption(
				'all',
				'a',
				null,
				'Reset all document sessions'
			)
			->addOption(
				'force',
				'f',
				null,
				'Reset the document session even with unsaved changes'
			)
		;
	}

	protected function execute(InputInterface $input, OutputInterface $output): int {
		$fileId = $input->getArgument('file-id');
		$all = $input->getOption('all');
		$fullReset = $input->getOption('force');

		if (!$fileId && !$all) {
			$output->writeln('<error>Either --all option or file-id argument is required.</error>');
			return 1;
		}
		if ($fileId && $all) {
			$output->writeln('<error>The --all option and file id argument are exclusionary.</error>');
			return 1;
		}

		if ($all && $fullReset) {
			// Truncate tables and clear document directory
			$this->documentService->clearAll();
			return 0;
		}

		if ($all) {
			$fileIds = [];
			foreach ($this->documentService->getAll() as $document) {
				$fileIds[] = $document->getId();
			}
		} else {
			$fileIds = [$fileId];
		}

		$rc = 0;
		foreach ($fileIds as $id) {

			$mounts = $this->userMountCache->getMountsForFileId($fileId);
			$anyMount = array_shift($mounts);
			if ($anyMount === null) {
				$output->writeln('Could not fallback to file from mounts for ' . $fileId);
				continue;
			}
			$userId = $anyMount->getUser()->getUID();

			try {
				$file = $this->fileService->getFileById($fileId, $userId);
				$this->lockService->unlock($file);
			} catch (NotFoundException) {
				// Continue with the cleanup even if the file does not exist.
			}

			if ($fullReset) {
				$output->writeln('Force-reset the document session for file ' . $id);
				$this->documentService->resetDocument('file', $id, true);
				continue;
			}

			$output->writeln('Reset the document session for file ' . $id);
			try {
				$this->documentService->resetDocument('file', $id);
			} catch (DocumentHasUnsavedChangesException) {
				$output->writeln('Not resetting due to unsaved changes');
				$rc = 1;
			}
		}

		return $rc;
	}
}
