<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCA\Text\AppInfo\Application;
use OCA\Text\Db\VersionSummary;
use OCA\Text\Db\VersionSummaryMapper;
use OCA\Text\Exception\VersionNotFoundException;
use OCA\Text\Exception\VersionSummaryException;
use OCA\Text\Model\VersionEnd;
use OCP\AppFramework\Http;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use OCP\IConfig;
use OCP\IUser;
use OCP\Lock\ILockingProvider;
use OCP\Lock\LockedException;
use OCP\TaskProcessing\Exception\Exception as TaskProcessingException;
use OCP\TaskProcessing\Exception\NotFoundException as TaskNotFoundException;
use OCP\TaskProcessing\IManager;
use OCP\TaskProcessing\Task;
use OCP\TaskProcessing\TaskTypes\TextToTextChat;
use Psr\Log\LoggerInterface;

/**
 * Summaries of the changes between two exact texts of a Markdown file, made
 * by the instance's AI provider in tasks without a user.
 *
 * A summary is keyed by the file and the SHA-256 of both texts, so it fits
 * every comparison of those texts, whoever asks. Every request reads both
 * ends and compares their hashes with the ones the browser computed from what
 * it shows, so a summary is never shown for, or made from, other texts.
 *
 * @psalm-type SummaryAnswer = array{
 *     state: 'absent'|'queued'|'running'|'done'|'failed'|'changed',
 *     summary: string|null,
 *     error: array{code: string, message: string|null}|null,
 *     queuePosition: int|null,
 *     progress: float|null,
 *     ends: array{from: VersionEnd, to: VersionEnd},
 *     fileName: string,
 *     generation: array{available: bool, reason: string|null, retryAfter: int|null},
 * }
 */
class VersionSummaryService {
	private const string CUSTOM_ID_PREFIX = 'text-version-summary:';

	private const string LOCK = 'text/version-summaries';
	private const int HOUR = 3600;
	private const int KEEP_SECONDS = 30 * 86400;
	private const int STUCK_SECONDS = 86400;
	private const int ORPHAN_SECONDS = 600;
	private const int BATCH = 500;

	public function __construct(
		private readonly ConfigService $configService,
		private readonly VersionAccessService $versionAccessService,
		private readonly VersionSummaryMapper $mapper,
		private readonly IManager $taskProcessing,
		private readonly ILockingProvider $lockingProvider,
		private readonly ITimeFactory $timeFactory,
		private readonly IConfig $config,
		private readonly LoggerInterface $logger,
	) {
	}

	/**
	 * The summary of a pair of texts, if there is one. Reads both ends but
	 * writes nothing, starts nothing and counts against no limit.
	 *
	 * @return SummaryAnswer
	 * @throws VersionSummaryException
	 */
	public function lookup(IUser $user, int $fileId, string $from, string $to, string $fromHash, string $toHash): array {
		[$file, $ends] = $this->authorize($user, $fileId, $from, $to, $fromHash, $toHash);
		$texts = $this->readEnds($file, $ends, ConfigService::VERSION_SUMMARY_INPUT_CEILING);
		if ($texts === null) {
			return $this->answer($file, $ends, null, 'absent', ['available' => false, 'reason' => 'too_large', 'retryAfter' => null]);
		}
		if (!$this->matches($texts, $fromHash, $toHash)) {
			return $this->answer($file, $ends, null, 'changed', ['available' => false, 'reason' => null, 'retryAfter' => null]);
		}
		$row = $this->mapper->findPair($fileId, VersionSummaryPrompt::VERSION, $fromHash, $toHash);
		return $this->answer($file, $ends, $row, null, $this->availability($texts, $user));
	}

	/**
	 * Start summarizing a pair of texts, or answer with the summary that is
	 * there or under way.
	 *
	 * @return SummaryAnswer
	 * @throws VersionSummaryException
	 */
	public function generate(IUser $user, int $fileId, string $from, string $to, string $fromHash, string $toHash): array {
		[$file, $ends] = $this->authorize($user, $fileId, $from, $to, $fromHash, $toHash);
		$budget = $this->configService->getVersionSummariesMaxInputBytes();
		$texts = $this->readEnds($file, $ends, $budget);
		if ($texts === null) {
			throw new VersionSummaryException('too_large', Http::STATUS_REQUEST_ENTITY_TOO_LARGE);
		}
		if (!$this->matches($texts, $fromHash, $toHash)) {
			throw new VersionSummaryException('texts_changed', Http::STATUS_CONFLICT);
		}

		$existing = $this->mapper->findPair($fileId, VersionSummaryPrompt::VERSION, $fromHash, $toHash);
		if ($existing !== null && $existing->getState() === VersionSummary::STATE_PENDING) {
			// Its task may have ended without the result being stored yet
			$this->finalize($existing);
			$existing = $this->mapper->findById($existing->getId());
		}
		if ($existing !== null && $existing->getState() !== VersionSummary::STATE_FAILED) {
			return $this->answer($file, $ends, $existing, null, $this->availability($texts, $user));
		}
		$request = $this->requestToStart($texts);

		// None, or a failed one to try again
		$row = $this->startLocked($user, $fileId, $fromHash, $toHash, $request, $existing);
		return $this->answer($file, $ends, $row, null, $this->availability($texts, $user));
	}

	/**
	 * Check the user, the file and both ends, in the order that reveals nothing
	 * before the user may know it.
	 *
	 * @return array{0: File, 1: array{from: VersionEnd, to: VersionEnd}}
	 * @throws VersionSummaryException
	 */
	private function authorize(IUser $user, int $fileId, string $from, string $to, string $fromHash, string $toHash): array {
		if (!$this->configService->isVersionSummariesEnabled()) {
			throw new VersionSummaryException('disabled');
		}
		if (!$this->configService->isVersionSummariesAvailableFor($user)) {
			throw new VersionSummaryException('not_found');
		}
		if (!preg_match('/^[0-9a-f]{64}$/D', $fromHash) || !preg_match('/^[0-9a-f]{64}$/D', $toHash)) {
			throw new VersionSummaryException('invalid_fingerprint', Http::STATUS_BAD_REQUEST);
		}
		try {
			$file = $this->versionAccessService->resolveSendableFile($user, $fileId);
		} catch (NotFoundException) {
			throw new VersionSummaryException('not_found');
		}
		try {
			$versions = $this->versionAccessService->listVersions($user, $file);
		} catch (NotFoundException) {
			// The versions backend could not find the file, as for a share whose owner is gone
			throw new VersionSummaryException('not_found');
		}
		try {
			$ends = [
				'from' => $this->versionAccessService->resolveEnd($file, $versions, $from),
				'to' => $this->versionAccessService->resolveEnd($file, $versions, $to),
			];
		} catch (VersionNotFoundException) {
			throw new VersionSummaryException('version_missing');
		}
		if (!self::isOlder($ends['from'], $ends['to'])) {
			throw new VersionSummaryException('invalid_order', Http::STATUS_BAD_REQUEST);
		}
		return [$file, $ends];
	}

	/**
	 * Whether one end is older than the other: the current file is the newest
	 * whatever its time, which restoring a version sets back to that version's
	 */
	private static function isOlder(VersionEnd $end, VersionEnd $other): bool {
		if ($end->id === VersionEnd::CURRENT) {
			return false;
		}
		return $other->id === VersionEnd::CURRENT || $end->mtime < $other->mtime;
	}

	/**
	 * Both ends, within one allowance of bytes, or null when they need more
	 *
	 * @param array{from: VersionEnd, to: VersionEnd} $ends
	 * @return array{from: string, to: string}|null
	 * @throws VersionSummaryException
	 */
	private function readEnds(File $file, array $ends, int $allowance): ?array {
		if ((float)$ends['from']->size + (float)$ends['to']->size > $allowance) {
			return null;
		}
		try {
			$from = $this->versionAccessService->read($file, $ends['from'], $allowance);
			if ($from === null) {
				return null;
			}
			$to = $this->versionAccessService->read($file, $ends['to'], $allowance - strlen($from));
		} catch (VersionNotFoundException) {
			throw new VersionSummaryException('version_missing');
		} catch (LockedException) {
			// A save holds the file; the browser asks again
			throw new VersionSummaryException('busy', Http::STATUS_SERVICE_UNAVAILABLE);
		}
		return $to === null ? null : ['from' => $from, 'to' => $to];
	}

	/**
	 * @param array{from: string, to: string} $texts
	 */
	private function matches(array $texts, string $fromHash, string $toHash): bool {
		return hash_equals($fromHash, hash('sha256', $texts['from']))
			&& hash_equals($toHash, hash('sha256', $texts['to']));
	}

	/**
	 * Whether a summary of these texts could be started now, and why not
	 *
	 * @param array{from: string, to: string} $texts
	 * @return array{available: bool, reason: string|null, retryAfter: int|null}
	 */
	private function availability(array $texts, IUser $user): array {
		try {
			$this->requestToStart($texts);
		} catch (VersionSummaryException $e) {
			return ['available' => false, 'reason' => $e->reason, 'retryAfter' => $e->retryAfter];
		}
		$cap = $this->capReached($user->getUID(), false);
		if ($cap !== null) {
			return ['available' => false, 'reason' => $cap->reason, 'retryAfter' => $cap->retryAfter];
		}
		return ['available' => true, 'reason' => null, 'retryAfter' => null];
	}

	/**
	 * The hourly limit a start passes, if any: the instance's, then the
	 * person's; until when, unless a limit of zero allows none at all
	 *
	 * @param bool $counted Whether the starts already count this one
	 */
	private function capReached(string $userId, bool $counted): ?VersionSummaryException {
		$since = $this->now() - self::HOUR;
		$limits = [
			['instance_cap', null, $this->configService->getVersionSummariesHourlyLimit()],
			['user_cap', $userId, $this->configService->getVersionSummariesUserHourlyLimit()],
		];
		foreach ($limits as [$reason, $of, $limit]) {
			$starts = $this->mapper->countStartsSince($since, $of);
			if ($limit < $starts['count'] + ($counted ? 0 : 1)) {
				$until = $limit === 0 ? null : ($starts['oldest'] ?? $this->now()) + self::HOUR;
				return new VersionSummaryException($reason, Http::STATUS_TOO_MANY_REQUESTS, $until);
			}
		}
		return null;
	}

	/**
	 * The request a summary of these texts sends, if one may start now
	 *
	 * @param array{from: string, to: string} $texts
	 * @return array{system_prompt: string, input: string, history: list<never>, max_tokens: int}
	 * @throws VersionSummaryException
	 */
	private function requestToStart(array $texts): array {
		if (!mb_check_encoding($texts['from'], 'UTF-8') || !mb_check_encoding($texts['to'], 'UTF-8')) {
			throw new VersionSummaryException('unsupported_encoding', Http::STATUS_UNPROCESSABLE_ENTITY);
		}
		if ($texts['from'] === $texts['to']) {
			throw new VersionSummaryException('no_changes', Http::STATUS_UNPROCESSABLE_ENTITY);
		}
		$request = VersionSummaryPrompt::request($texts['from'], $texts['to']);
		if (strlen($request['system_prompt']) + strlen($request['input']) > $this->configService->getVersionSummariesMaxInputBytes()) {
			throw new VersionSummaryException('too_large', Http::STATUS_REQUEST_ENTITY_TOO_LARGE);
		}
		if (!isset($this->taskProcessing->getAvailableTaskTypes()[TextToTextChat::ID])) {
			throw new VersionSummaryException('no_provider', Http::STATUS_SERVICE_UNAVAILABLE);
		}
		return $request;
	}

	/**
	 * Claim the pair, count the start and schedule the task, all while no
	 * purge can run, so no task outlives its row.
	 *
	 * @param array{system_prompt: string, input: string, history: list<never>, max_tokens: int} $request
	 * @throws VersionSummaryException
	 */
	private function startLocked(IUser $user, int $fileId, string $fromHash, string $toHash, array $request, ?VersionSummary $failed): VersionSummary {
		try {
			$this->lockingProvider->acquireLock(self::LOCK, ILockingProvider::LOCK_SHARED);
		} catch (LockedException) {
			throw new VersionSummaryException('busy', Http::STATUS_SERVICE_UNAVAILABLE);
		}
		try {
			// The feature or the file may have gone while the texts were read
			$this->assertStillAllowed($user, $fileId);
			[$row, $scheduled] = $this->start($fileId, $fromHash, $toHash, $request, $user->getUID(), $failed);
		} finally {
			$this->lockingProvider->releaseLock(self::LOCK, ILockingProvider::LOCK_SHARED);
		}

		// Without locking, a purge may have run meanwhile: take back the task this request scheduled
		if (!$this->config->getSystemValueBool('filelocking.enabled', true) && $scheduled) {
			try {
				$this->assertStillAllowed($user, $fileId);
			} catch (VersionSummaryException $e) {
				$this->deleteRows([$row]);
				throw $e;
			}
		}
		return $row;
	}

	/**
	 * Summaries are still on and the file still may be sent, as read now
	 *
	 * @throws VersionSummaryException
	 */
	private function assertStillAllowed(IUser $user, int $fileId): void {
		if (!$this->configService->isVersionSummariesEnabled(true)) {
			throw new VersionSummaryException('disabled');
		}
		try {
			$this->versionAccessService->resolveSendableFile($user, $fileId);
		} catch (NotFoundException) {
			throw new VersionSummaryException('not_found');
		}
	}

	/**
	 * Claim the pair, or take over its failed row, count the start and schedule the task
	 *
	 * @param array{system_prompt: string, input: string, history: list<never>, max_tokens: int} $request
	 * @param VersionSummary|null $failed The failed row of the pair, to try again
	 * @return array{0: VersionSummary, 1: bool} The row, and whether this request scheduled its task
	 * @throws VersionSummaryException
	 */
	private function start(int $fileId, string $fromHash, string $toHash, array $request, string $userId, ?VersionSummary $failed): array {
		$now = $this->now();
		$row = $failed ?? $this->mapper->claim($fileId, VersionSummaryPrompt::VERSION, $fromHash, $toHash, $now);
		$previousError = null;
		if ($row === null) {
			// Another request claimed the pair meanwhile
			$row = $this->mapper->findPair($fileId, VersionSummaryPrompt::VERSION, $fromHash, $toHash);
			if ($row === null || $row->getState() !== VersionSummary::STATE_FAILED) {
				return [$row ?? throw new VersionSummaryException('busy', Http::STATUS_SERVICE_UNAVAILABLE), false];
			}
		}
		if ($row->getState() === VersionSummary::STATE_FAILED) {
			$previousError = [$row->getErrorCode(), $row->getErrorMessage()];
			$oldTaskId = $row->getTaskId();
			// A row tracks one task: the old one goes first, or the row stays failed
			if ($oldTaskId !== null && !$this->deleteTask($oldTaskId, $row->getId())) {
				return [$row, false];
			}
			// Cleanup may have detached the old task meanwhile
			if (!$this->mapper->reclaim($row->getId(), $oldTaskId, $now)
				&& ($oldTaskId === null || !$this->mapper->reclaim($row->getId(), null, $now))) {
				return [$this->mapper->findById($row->getId()) ?? $row, false];
			}
		}
		try {
			$startId = $this->reserveStart($now, $userId);
		} catch (VersionSummaryException $e) {
			if ($previousError === null) {
				$this->mapper->delete($row);
			} else {
				$this->mapper->finish($row->getId(), taskId: null, state: VersionSummary::STATE_FAILED, summary: null, errorCode: $previousError[0], errorMessage: $previousError[1], now: $now);
			}
			throw $e;
		}

		try {
			$task = $this->schedule($request, $row->getId());
		} catch (\Throwable $e) {
			$this->logger->warning('Could not schedule a summary of changes', ['exception' => $e]);
			// Core may have stored the task before failing
			$stored = $this->deleteTasksOf($row->getId());
			if ($stored['found'] === 0) {
				$this->mapper->removeStart($startId);
			}
			if (!$stored['removed']) {
				// Cleanup finds the task by its custom id while the row waits without one
				throw new VersionSummaryException('busy', Http::STATUS_SERVICE_UNAVAILABLE);
			}
			$this->mapper->finish($row->getId(), taskId: null, state: VersionSummary::STATE_FAILED, summary: null, errorCode: 'provider_failed', errorMessage: null, now: $this->now());
			return [$this->mapper->findById($row->getId()) ?? $row, false];
		}

		if (!$this->mapper->attachTask($row->getId(), (int)$task->getId(), $this->now())) {
			$this->deleteTask((int)$task->getId(), $row->getId());
			return [$this->mapper->findById($row->getId()) ?? $row, false];
		}
		return [$this->mapper->findById($row->getId()) ?? $row, true];
	}

	/**
	 * Count a start against the instance's and the person's hourly limits, or refuse it
	 *
	 * @throws VersionSummaryException
	 */
	private function reserveStart(int $now, string $userId): int {
		$startId = $this->mapper->addStart($now, $userId);
		$cap = $this->capReached($userId, true);
		if ($cap !== null) {
			$this->mapper->removeStart($startId);
			throw $cap;
		}
		return $startId;
	}

	/**
	 * Schedule a user-less chat task, paid by the instance
	 *
	 * @param array{system_prompt: string, input: string, history: list<never>, max_tokens: int} $request
	 * @throws \Throwable
	 */
	private function schedule(array $request, int $rowId): Task {
		$type = $this->taskProcessing->getAvailableTaskTypes()[TextToTextChat::ID] ?? [];
		if (!isset($type['optionalInputShape']['max_tokens'])) {
			unset($request['max_tokens']);
		}
		$task = new Task(TextToTextChat::ID, $request, Application::APP_NAME, null, self::CUSTOM_ID_PREFIX . $rowId);
		$task->setIncludeWatermark(false);
		$this->taskProcessing->scheduleTask($task);
		return $task;
	}

	/**
	 * The summary a successful task answered, or null when it cannot be shown
	 */
	private function summaryOf(Task $task): ?string {
		$answer = $task->getOutput()['output'] ?? null;
		$input = $task->getInput()['input'] ?? null;
		return is_string($answer) ? VersionSummaryPrompt::summary($answer, is_string($input) ? $input : '') : null;
	}

	/**
	 * The task of a row: the task, false when it is gone, null when the row has none
	 */
	private function taskOf(VersionSummary $row): Task|false|null {
		$taskId = $row->getTaskId();
		if ($taskId === null) {
			return null;
		}
		try {
			return $this->taskProcessing->getTask($taskId);
		} catch (TaskNotFoundException) {
			return false;
		}
	}

	/**
	 * What a finished task says, without storing it, or null while it waits or runs
	 *
	 * @return array{state: int, summary: string|null, code: string|null, message: string|null}|null
	 */
	private function outcome(Task|false $task): ?array {
		if ($task === false) {
			return ['state' => VersionSummary::STATE_FAILED, 'summary' => null, 'code' => 'task_missing', 'message' => null];
		}
		if ($task->getStatus() === Task::STATUS_SUCCESSFUL) {
			$summary = $this->summaryOf($task);
			return $summary === null
				? ['state' => VersionSummary::STATE_FAILED, 'summary' => null, 'code' => 'invalid_output', 'message' => null]
				: ['state' => VersionSummary::STATE_DONE, 'summary' => $summary, 'code' => null, 'message' => null];
		}
		return match ($task->getStatus()) {
			Task::STATUS_FAILED => ['state' => VersionSummary::STATE_FAILED, 'summary' => null, 'code' => 'provider_failed', 'message' => $task->getUserFacingErrorMessage()],
			Task::STATUS_CANCELLED => ['state' => VersionSummary::STATE_FAILED, 'summary' => null, 'code' => 'cancelled', 'message' => null],
			default => null,
		};
	}

	/**
	 * Store the outcome of a pending row's finished task, once
	 *
	 * @return Task|null The task when it still waits or runs
	 */
	private function finalize(VersionSummary $row): ?Task {
		$task = $row->getState() === VersionSummary::STATE_PENDING ? $this->taskOf($row) : null;
		if ($task === null) {
			return null;
		}
		$outcome = $this->outcome($task);
		if ($outcome === null) {
			return $task === false ? null : $task;
		}
		$this->mapper->finish($row->getId(), taskId: $row->getTaskId(), state: $outcome['state'], summary: $outcome['summary'], errorCode: $outcome['code'], errorMessage: $outcome['message'], now: $this->now());
		return null;
	}

	/**
	 * Store the outcome of a task of a summary when core says it finished
	 */
	public function onTaskFinished(Task $task): void {
		$rowId = self::summaryIdOf($task);
		$taskId = $task->getId();
		$row = $rowId === null || $taskId === null ? null : $this->mapper->findByTaskId($taskId);
		if ($row !== null && $row->getId() === $rowId) {
			$this->finalize($row);
		}
	}

	/**
	 * The summary a task of core is for, or null for any task that is not one
	 * of Text's user-less summary tasks. Reads only the task, so it can check
	 * the tasks of every app.
	 */
	public static function summaryIdOf(Task $task): ?int {
		$customId = $task->getCustomId() ?? '';
		if ($task->getUserId() !== null
			|| $task->getAppId() !== Application::APP_NAME
			|| $task->getTaskTypeId() !== TextToTextChat::ID
			|| !str_starts_with($customId, self::CUSTOM_ID_PREFIX)) {
			return null;
		}
		$id = substr($customId, strlen(self::CUSTOM_ID_PREFIX));
		return ctype_digit($id) && (string)(int)$id === $id ? (int)$id : null;
	}

	/**
	 * @param array{from: VersionEnd, to: VersionEnd} $ends
	 * @param 'absent'|'changed'|null $state A state that is not the row's
	 * @param array{available: bool, reason: string|null, retryAfter: int|null} $generation
	 * @return SummaryAnswer
	 */
	private function answer(File $file, array $ends, ?VersionSummary $row, ?string $state, array $generation): array {
		$answer = [
			'state' => $state ?? 'absent',
			'summary' => null,
			'error' => null,
			'queuePosition' => null,
			'progress' => null,
			'ends' => $ends,
			'fileName' => $file->getName(),
			'generation' => $generation,
		];
		if ($state !== null || $row === null) {
			return $answer;
		}

		$stored = $row->getState();
		$summary = $row->getSummary();
		$code = $row->getErrorCode();
		$message = $row->getErrorMessage();
		$task = null;
		if ($stored === VersionSummary::STATE_PENDING) {
			$task = $this->taskOf($row);
			$outcome = $task === null ? null : $this->outcome($task);
			if ($outcome !== null) {
				['state' => $stored, 'summary' => $summary, 'code' => $code, 'message' => $message] = $outcome;
			}
		}

		if ($stored === VersionSummary::STATE_DONE) {
			$answer['state'] = 'done';
			$answer['summary'] = $summary;
		} elseif ($stored === VersionSummary::STATE_FAILED) {
			$answer['state'] = 'failed';
			$answer['error'] = ['code' => $code ?? 'provider_failed', 'message' => $message];
		} elseif ($task instanceof Task && $task->getStatus() === Task::STATUS_RUNNING) {
			$answer['state'] = 'running';
			$answer['progress'] = $task->getProgress();
		} else {
			$answer['state'] = 'queued';
			$answer['queuePosition'] = $task instanceof Task ? $this->queuePosition($task) : null;
		}
		return $answer;
	}

	private function queuePosition(Task $task): ?int {
		try {
			return $this->taskProcessing->getTaskQueuePosition((int)$task->getId(), null);
		} catch (\Exception) {
			return null;
		}
	}

	/**
	 * Turn summaries off and remove every summary and task. Off is stored
	 * first: a start re-reads it under the lock the removal waits for, so
	 * none starts after it.
	 *
	 * @param bool $evenIfBusy Go on without the lock once waiting for it failed,
	 *                         where nothing would try again, as when Text is disabled
	 * @return bool Whether everything is gone; otherwise Cleanup removes the rest while summaries stay off
	 */
	public function turnOff(bool $evenIfBusy = false): bool {
		$this->configService->setVersionSummariesEnabled(false);
		try {
			return $this->purgeAll($evenIfBusy);
		} catch (\Throwable $e) {
			$this->logger->warning('Could not remove the summaries of changes yet', ['exception' => $e]);
			return false;
		}
	}

	/**
	 * Remove every summary and task
	 *
	 * @param bool $evenIfBusy Go on without the lock once waiting for it failed
	 * @return bool Whether everything is gone
	 */
	private function purgeAll(bool $evenIfBusy = false): bool {
		return $this->whileNoneStarts(function (): bool {
			// Past the rows that stay, so that they hold up none of the others
			$allGone = true;
			$after = 0;
			do {
				$rows = $this->mapper->findAfter($after, self::BATCH);
				$allGone = $this->deleteRows($rows) && $allGone;
				$after = $rows === [] ? $after : $rows[array_key_last($rows)]->getId();
			} while (count($rows) === self::BATCH);
			return $allGone;
		}, true, $evenIfBusy);
	}

	public function startedLastHour(): int {
		return $this->mapper->countStartsSince($this->now() - self::HOUR)['count'];
	}

	public function hasSummaries(): bool {
		return $this->mapper->hasAny();
	}

	/**
	 * Remove the summaries of a file, if no summary is being started; otherwise
	 * Cleanup removes them once it finds the file gone
	 */
	public function purgeFile(int $fileId): bool {
		if ($this->mapper->findByFileId($fileId) === []) {
			return true;
		}
		return $this->whileNoneStarts(fn (): bool => $this->deleteRows($this->mapper->findByFileId($fileId)), false);
	}

	/**
	 * Run a purge under the exclusive lock, so that no summary starts between
	 * finding the rows and removing them
	 *
	 * @param callable(): bool $purge
	 * @param bool $wait Wait up to ten seconds for summaries being started
	 */
	private function whileNoneStarts(callable $purge, bool $wait, bool $evenIfBusy = false): bool {
		$locked = $this->lockExclusively($wait);
		if (!$locked && !$evenIfBusy) {
			return false;
		}
		try {
			return $purge();
		} finally {
			if ($locked) {
				$this->lockingProvider->releaseLock(self::LOCK, ILockingProvider::LOCK_EXCLUSIVE);
			}
		}
	}

	private function lockExclusively(bool $wait): bool {
		$until = microtime(true) + ($wait ? 10.0 : 0.0);
		while (true) {
			try {
				$this->lockingProvider->acquireLock(self::LOCK, ILockingProvider::LOCK_EXCLUSIVE);
				return true;
			} catch (LockedException) {
				if (microtime(true) >= $until) {
					return false;
				}
				usleep(200_000);
			}
		}
	}

	/**
	 * Delete rows whose tasks are gone; a row whose task could not be removed
	 * stays, so that the next purge or Cleanup can find its task again
	 *
	 * @param list<VersionSummary> $rows
	 * @return bool Whether every row is gone
	 */
	private function deleteRows(array $rows): bool {
		$deleted = [];
		foreach ($rows as $row) {
			$taskId = $row->getTaskId();
			if ($taskId !== null) {
				$tasksGone = $this->deleteTask($taskId, $row->getId());
			} elseif ($row->getState() === VersionSummary::STATE_PENDING) {
				// Scheduled, but its id not stored yet: only its custom id finds it
				$tasksGone = $this->deleteTasksOf($row->getId())['removed'];
			} else {
				$tasksGone = true;
			}
			if ($tasksGone) {
				$deleted[] = $row->getId();
			}
		}
		$this->mapper->deleteByIds($deleted);
		return count($deleted) === count($rows);
	}

	/**
	 * The periodic part: finish, recover, expire and delete
	 */
	public function cleanup(): void {
		$now = $this->now();
		$this->mapper->deleteStartsBefore($now - 2 * self::HOUR);
		// As stored: a cron or worker process may have read it before an admin changed it
		if (!$this->configService->isVersionSummariesEnabled(true)) {
			$this->purgeAll();
			return;
		}

		foreach ($this->mapper->findPendingWithTask(self::BATCH) as $row) {
			// One task core cannot load stops neither the others nor the rest of the cleanup
			try {
				$running = $this->finalize($row);
				if ($running !== null && $row->getUpdatedAt() < $now - self::STUCK_SECONDS && $this->deleteTask((int)$row->getTaskId(), $row->getId())) {
					$this->mapper->finish($row->getId(), taskId: $row->getTaskId(), state: VersionSummary::STATE_FAILED, summary: null, errorCode: 'timeout', errorMessage: null, now: $now);
				}
			} catch (\Exception $e) {
				$this->logger->warning('Could not check the task of a summary of changes', ['exception' => $e]);
			}
		}
		// A crash between scheduling and storing the task id
		foreach ($this->mapper->findPendingWithoutTaskBefore($now - self::ORPHAN_SECONDS, self::BATCH) as $row) {
			if ($this->deleteTasksOf($row->getId())['removed']) {
				$this->mapper->finish($row->getId(), taskId: null, state: VersionSummary::STATE_FAILED, summary: null, errorCode: 'task_missing', errorMessage: null, now: $now);
			}
		}
		foreach ($this->mapper->findFinishedWithTask(self::BATCH) as $row) {
			$taskId = (int)$row->getTaskId();
			// Only this task: a retry may have replaced it meanwhile
			if ($this->deleteTask($taskId, $row->getId())) {
				$this->mapper->detachTask($row->getId(), $taskId);
			}
		}
		// Files that are gone, also with a folder or a whole storage; a start under way leaves it to the next run
		$this->whileNoneStarts(fn (): bool => $this->deleteRows([
			...$this->mapper->findCreatedBefore($now - self::KEEP_SECONDS, self::BATCH),
			...$this->mapper->findOfMissingFiles(self::BATCH),
		]), false);
	}

	/**
	 * Cancel and delete a task of a summary, never a task of anything else
	 *
	 * @return bool Whether it is gone
	 */
	private function deleteTask(int $taskId, int $rowId): bool {
		try {
			$task = $this->taskProcessing->getTask($taskId);
		} catch (TaskNotFoundException) {
			return true;
		} catch (TaskProcessingException $e) {
			$this->logger->warning('Could not load a summary task', ['exception' => $e]);
			return false;
		}
		// Another task under this id is none of ours to delete
		return self::summaryIdOf($task) !== $rowId || $this->removeTask($task);
	}

	/**
	 * Cancel and delete the tasks of a summary, found by its custom id
	 *
	 * @return array{found: int|null, removed: bool} How many tasks there were, unknown when core could not list them, and whether all are gone
	 */
	private function deleteTasksOf(int $rowId): array {
		try {
			$tasks = $this->taskProcessing->getTasks('', TextToTextChat::ID, Application::APP_NAME, self::CUSTOM_ID_PREFIX . $rowId);
		} catch (TaskProcessingException $e) {
			$this->logger->warning('Could not list the tasks of a summary', ['exception' => $e]);
			return ['found' => null, 'removed' => false];
		}
		$found = 0;
		$removed = true;
		foreach ($tasks as $task) {
			if (self::summaryIdOf($task) === $rowId) {
				$found++;
				$removed = $this->removeTask($task) && $removed;
			}
		}
		return ['found' => $found, 'removed' => $removed];
	}

	/**
	 * @return bool Whether it is gone
	 */
	private function removeTask(Task $task): bool {
		try {
			if (in_array($task->getStatus(), [Task::STATUS_SCHEDULED, Task::STATUS_RUNNING], true)) {
				$this->taskProcessing->cancelTask((int)$task->getId());
			}
			$this->taskProcessing->deleteTask($task);
			return true;
		} catch (\Exception $e) {
			$this->logger->warning('Could not delete a summary task', ['exception' => $e]);
			return false;
		}
	}

	private function now(): int {
		return $this->timeFactory->getTime();
	}
}
