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

use OCA\Text\Db\DocumentMapper;
use OCA\Text\Db\SessionMapper;
use OCA\Text\Db\StepMapper;
use OCA\Text\Service\DocumentService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ResetDocument extends Command {
	protected DocumentService $documentService;
	protected DocumentMapper $documentMapper;
	protected StepMapper $stepMapper;
	protected SessionMapper $sessionMapper;

	public function __construct(DocumentService $documentService, DocumentMapper $documentMapper, StepMapper $stepMapper, SessionMapper $sessionMapper) {
		parent::__construct();

		$this->documentService = $documentService;
		$this->documentMapper = $documentMapper;
		$this->stepMapper = $stepMapper;
		$this->sessionMapper = $sessionMapper;
	}

	protected function configure(): void {
		$this
			->setName('text:reset')
			->setDescription('Reset a text document')
			->addArgument(
				'file-id',
				InputArgument::REQUIRED,
				'File id of the document to rest'
			)
			->addOption(
				'full',
				'f',
				null,
				'Drop all existing steps and use the currently saved version'
			)
		;
	}

	/**
	 * @param InputInterface $input
	 * @param OutputInterface $output
	 * @return int
	 */
	protected function execute(InputInterface $input, OutputInterface $output): int {
		$fileId = $input->getArgument('file-id');
		$fullReset = $input->getOption('full');

		if ($fullReset) {
			$output->writeln('Full document reset');
			$this->documentService->resetDocument($fileId, true);

			return 0;
		} else {
			$output->writeln('Trying to restore to last saved version');
			$document = $this->documentMapper->find($fileId);
			$deleted = $this->stepMapper->deleteAfterVersion($fileId, $document->getLastSavedVersion());
			if ($deleted > 0) {
				$this->sessionMapper->deleteByDocumentId($fileId);
				$output->writeln('Reverted document to the last saved version');

				return 0;
			} else {
				$output->writeln('Failed revert changes that are newer than the last saved version');
			}

			return 1;
		}
	}
}
