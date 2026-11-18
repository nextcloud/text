<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Controller;

use OCA\Text\Exception\VersionSummaryException;
use OCA\Text\Service\VersionSummaryService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\UserRateLimit;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;
use OCP\IUserSession;

class VersionSummaryController extends OCSController {
	public function __construct(
		string $appName,
		IRequest $request,
		private readonly VersionSummaryService $versionSummaryService,
		private readonly IUserSession $userSession,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * The summary of the changes between two exact texts of a file, if there
	 * is one, and whether one can be made. Starts nothing.
	 *
	 * @param int $fileId Id of the file
	 * @param string $from The older end: `current` or a revision
	 * @param string $to The newer end
	 * @param string $fromHash SHA-256 of the older text, as the browser loaded it
	 * @param string $toHash SHA-256 of the newer text
	 */
	#[NoAdminRequired]
	public function lookup(int $fileId, string $from, string $to, string $fromHash, string $toHash): DataResponse {
		return $this->respond(fn ($user) => $this->versionSummaryService->lookup($user, $fileId, $from, $to, $fromHash, $toHash));
	}

	/**
	 * Start summarizing the changes between two exact texts of a file
	 *
	 * @param int $fileId Id of the file
	 * @param string $from The older end: `current` or a revision
	 * @param string $to The newer end
	 * @param string $fromHash SHA-256 of the older text, as the browser loaded it
	 * @param string $toHash SHA-256 of the newer text
	 */
	#[NoAdminRequired]
	// The browser waits out the same period after a refusal: RATE_LIMIT_SECONDS in src/versionSummary/states.ts
	#[UserRateLimit(limit: 5, period: 120)]
	public function generate(int $fileId, string $from, string $to, string $fromHash, string $toHash): DataResponse {
		return $this->respond(fn ($user) => $this->versionSummaryService->generate($user, $fileId, $from, $to, $fromHash, $toHash));
	}

	/**
	 * @param callable(\OCP\IUser): array<string, mixed> $answer
	 */
	private function respond(callable $answer): DataResponse {
		$user = $this->userSession->getUser();
		if ($user === null) {
			return new DataResponse(['error' => 'not_found'], Http::STATUS_NOT_FOUND);
		}
		try {
			return new DataResponse($answer($user));
		} catch (VersionSummaryException $e) {
			return new DataResponse(['error' => $e->reason, 'retryAfter' => $e->retryAfter], $e->status);
		}
	}
}
