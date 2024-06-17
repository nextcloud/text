<?php
/**
 * @copyright Copyright (c) 2018 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Text\Command;

use OCA\Text\Db\Document;
use OCA\Text\Exception\DocumentHasUnsavedChangesException;
use OCA\Text\Service\DocumentService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ResetDocument extends Command {
	protected DocumentService $documentService;

	public function __construct(DocumentService $documentService) {
		parent::__construct();
		$this->documentService = $documentService;
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
			if ($fullReset) {
				$output->writeln('Force-reset the document session for file ' . $id);
				$this->documentService->resetDocument($id, true);
				continue;
			}

			$output->writeln('Reset the document session for file ' . $id);
			try {
				$this->documentService->resetDocument($id);
			} catch (DocumentHasUnsavedChangesException) {
				$output->writeln('Not resetting due to unsaved changes');
				$rc = 1;
			}
		}

		return $rc;
	}
}
