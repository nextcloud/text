<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Service;

use OCA\Text\Db\VersionSummary;
use OCA\Text\Db\VersionSummaryMapper;
use OCA\Text\Exception\VersionNotFoundException;
use OCA\Text\Exception\VersionSummaryException;
use OCA\Text\Model\VersionEnd;
use OCP\AppFramework\Http;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use OCP\IAppConfig;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\IUser;
use OCP\Lock\ILockingProvider;
use OCP\Lock\LockedException;
use OCP\Server;
use OCP\TaskProcessing\Exception\NotFoundException as TaskNotFoundException;
use OCP\TaskProcessing\IManager;
use OCP\TaskProcessing\Task;
use OCP\TaskProcessing\TaskTypes\TextToTextChat;
use PHPUnit\Framework\MockObject\MockObject;
use Psr\Log\LoggerInterface;
use Test\TestCase;

/**
 * @group DB
 */
class VersionSummaryServiceTest extends TestCase {
	private const string BEFORE = "# Plan\n\nThe pilot runs 2 weeks.\n";
	private const string AFTER = "# Plan\n\nThe pilot runs 3 weeks.\n";
	private const int NOW = 1_800_000_000;
	/** A storage no real file uses, for the file cache rows of these tests */
	private const int STORAGE = 987_654;

	private ConfigService&MockObject $config;
	private VersionAccessService&MockObject $access;
	private VersionSummaryMapper $mapper;
	private IManager&MockObject $tasks;
	private ILockingProvider&MockObject $locks;
	private IAppConfig&MockObject $appConfig;
	private IConfig&MockObject $systemConfig;
	private IUser&MockObject $user;
	private File&MockObject $file;
	private VersionSummaryService $service;

	/** @var array<string, string> Bytes of each end */
	private array $contents;
	/** @var array<int, Task> Tasks core holds, by id */
	private array $stored = [];
	private int $nextTaskId = 100;
	private int $now = self::NOW;
	private bool $enabled = true;
	/** @var \Closure(Task): void What else happens when core deletes a task */
	private ?\Closure $onDelete = null;
	private int $fileId;

	protected function setUp(): void {
		parent::setUp();
		$this->clearTables();
		$this->fileId = $this->addFile('files/plan.md');
		$this->contents = ['1000' => self::BEFORE, 'current' => self::AFTER];

		$this->config = $this->configWith(enabled: fn () => $this->enabled);

		$this->user = $this->createMock(IUser::class);
		$this->user->method('getUID')->willReturn('alice');
		$this->user->method('getBackendClassName')->willReturn('Database');
		$this->file = $this->createMock(File::class);
		$this->file->method('getId')->willReturn($this->fileId);
		$this->file->method('getMTime')->willReturn(2000);
		$this->file->method('getName')->willReturn('plan.md');

		$this->access = $this->createMock(VersionAccessService::class);
		$this->access->method('resolveSendableFile')->willReturn($this->file);
		$this->access->method('listVersions')->willReturnCallback(fn () => $this->ends());
		$this->access->method('resolveEnd')->willReturnCallback(function (File $file, array $versions, string $id): VersionEnd {
			foreach ($versions as $end) {
				if ($end->id === $id) {
					return $end;
				}
			}
			throw new VersionNotFoundException($id);
		});
		$this->access->method('read')->willReturnCallback(fn (File $file, VersionEnd $end, int $max) => strlen($this->contents[$end->id]) > $max ? null : $this->contents[$end->id]);

		$this->tasks = $this->createMock(IManager::class);
		$this->tasks->method('getAvailableTaskTypes')->willReturn([TextToTextChat::ID => ['optionalInputShape' => []]]);
		$this->tasks->method('scheduleTask')->willReturnCallback(function (Task $task): void {
			$task->setId($this->nextTaskId++);
			$task->setStatus(Task::STATUS_SCHEDULED);
			$task->setScheduledAt($this->now);
			$this->stored[$task->getId()] = $task;
		});
		$this->tasks->method('getTask')->willReturnCallback(fn (int $id) => $this->stored[$id] ?? throw new TaskNotFoundException());
		$this->tasks->method('getTasks')->willReturnCallback(fn (?string $userId, ?string $type, ?string $appId, ?string $customId) => array_values(array_filter(
			$this->stored,
			fn (Task $task) => $task->getAppId() === $appId && $task->getCustomId() === $customId,
		)));
		$this->tasks->method('deleteTask')->willReturnCallback(function (Task $task): void {
			unset($this->stored[$task->getId()]);
			$this->onDelete?->__invoke($task);
		});
		$this->tasks->method('cancelTask')->willReturnCallback(function (int $id): void {
			$this->stored[$id]->setStatus(Task::STATUS_CANCELLED);
		});

		$this->locks = $this->createMock(ILockingProvider::class);
		$this->appConfig = $this->createMock(IAppConfig::class);
		$this->appConfig->method('getValueString')->willReturn('false');
		$this->systemConfig = $this->createMock(IConfig::class);
		$this->systemConfig->method('getSystemValueBool')->willReturn(true);

		$this->mapper = Server::get(VersionSummaryMapper::class);
		$this->service = $this->serviceWith();
	}

	private function configWith(int $instanceLimit = 20, int $personLimit = 20, int $maxInputBytes = 240_000, ?\Closure $enabled = null): ConfigService&MockObject {
		$config = $this->createMock(ConfigService::class);
		$config->method('isVersionSummariesEnabled')->willReturnCallback($enabled ?? fn () => true);
		$config->method('getVersionSummariesHourlyLimit')->willReturn($instanceLimit);
		$config->method('getVersionSummariesUserHourlyLimit')->willReturn($personLimit);
		$config->method('getVersionSummariesMaxInputBytes')->willReturn($maxInputBytes);
		return $config;
	}

	private function serviceWith(?ConfigService $config = null, ?VersionAccessService $access = null, ?IManager $tasks = null, ?IAppConfig $appConfig = null, ?IConfig $systemConfig = null): VersionSummaryService {
		$time = $this->createMock(ITimeFactory::class);
		$time->method('getTime')->willReturnCallback(fn () => $this->now);
		return new VersionSummaryService($config ?? $this->config, $access ?? $this->access, $this->mapper, $tasks ?? $this->tasks, $this->locks, $time, $appConfig ?? $this->appConfig, $systemConfig ?? $this->systemConfig, $this->createMock(LoggerInterface::class));
	}

	protected function tearDown(): void {
		$this->clearTables();
		parent::tearDown();
	}

	private function clearTables(): void {
		$db = Server::get(IDBConnection::class);
		$db->getQueryBuilder()->delete('text_version_summaries')->executeStatement();
		$db->getQueryBuilder()->delete('text_summary_starts')->executeStatement();
		$qb = $db->getQueryBuilder();
		$qb->delete('filecache')->where($qb->expr()->eq('storage', $qb->createNamedParameter(self::STORAGE, IQueryBuilder::PARAM_INT)))->executeStatement();
	}

	private function addFile(string $path): int {
		$qb = Server::get(IDBConnection::class)->getQueryBuilder();
		$qb->insert('filecache')->values([
			'storage' => $qb->createNamedParameter(self::STORAGE, IQueryBuilder::PARAM_INT),
			'path' => $qb->createNamedParameter($path),
			'path_hash' => $qb->createNamedParameter(md5($path)),
			'name' => $qb->createNamedParameter(basename($path)),
		])->executeStatement();
		return $qb->getLastInsertId();
	}

	/**
	 * @return list<VersionEnd>
	 */
	private function ends(): array {
		return [
			new VersionEnd('current', 2000, strlen($this->contents['current']), '', 'bob', 'Bob', null),
			new VersionEnd('1000', 1000, strlen($this->contents['1000']), '', null, null, null),
		];
	}

	private static function hash(string $text): string {
		return hash('sha256', $text);
	}

	private function lookup(?string $fromHash = null, ?string $toHash = null): array {
		return $this->service->lookup($this->user, $this->fileId, '1000', 'current', $fromHash ?? self::hash(self::BEFORE), $toHash ?? self::hash(self::AFTER));
	}

	private function generate(?string $fromHash = null, ?string $toHash = null): array {
		return $this->service->generate($this->user, $this->fileId, '1000', 'current', $fromHash ?? self::hash(self::BEFORE), $toHash ?? self::hash(self::AFTER));
	}

	private function refused(callable $call): VersionSummaryException {
		try {
			$call();
		} catch (VersionSummaryException $e) {
			return $e;
		}
		$this->fail('Expected a refusal');
	}

	private function row(): ?VersionSummary {
		return $this->mapper->findPair($this->fileId, VersionSummaryService::PROMPT_VERSION, self::hash(self::BEFORE), self::hash(self::AFTER));
	}

	private function starts(): int {
		return $this->mapper->countStartsSince(0)['count'];
	}

	private function finishTask(int $id, int $status, ?string $output = null, ?string $userFacing = null): Task {
		$task = $this->stored[$id];
		$task->setStatus($status);
		$task->setStartedAt($this->now + 2);
		$task->setEndedAt($this->now + 5);
		$task->setOutput($output === null ? null : ['output' => $output, 'reasoning' => 'ignored']);
		$task->setUserFacingErrorMessage($userFacing);
		return $task;
	}

	public function testRefusesWhileTurnedOff(): void {
		$this->enabled = false;

		$e = $this->refused(fn () => $this->lookup());
		$this->assertSame(['disabled', 404], [$e->reason, $e->status]);
		$this->assertSame('disabled', $this->refused(fn () => $this->generate())->reason);
	}

	public function testRefusesGuestsUnlessCoreAllowsThemAi(): void {
		$guest = $this->createMock(IUser::class);
		$guest->method('getBackendClassName')->willReturn('Guests');

		$this->assertFalse($this->service->isAvailableFor($guest));
		$e = $this->refused(fn () => $this->service->lookup($guest, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER)));
		$this->assertSame('not_found', $e->reason);
		$this->assertTrue($this->service->isAvailableFor($this->user));
		$this->assertFalse($this->service->isAvailableFor(null));
	}

	public function testAllowsGuestsWhenCoreAllowsThemAi(): void {
		$appConfig = $this->createMock(IAppConfig::class);
		$appConfig->method('getValueString')->with('core', 'ai.taskprocessing_guests', 'false')->willReturn('true');
		$guest = $this->createMock(IUser::class);
		$guest->method('getBackendClassName')->willReturn('Guests');
		$service = $this->serviceWith(appConfig: $appConfig);

		$this->assertTrue($service->isAvailableFor($guest));
	}

	public function testRefusesAFileTheUserCannotSummarize(): void {
		// Unrelated users, download-disabled shares, end-to-end encrypted folders, other types, removed members
		$access = $this->createMock(VersionAccessService::class);
		$access->method('resolveSendableFile')->willThrowException(new NotFoundException());
		$service = $this->serviceWith(access: $access);
		$access->expects($this->never())->method('read');

		$e = $this->refused(fn () => $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER)));
		$this->assertSame(['not_found', 404], [$e->reason, $e->status]);
	}

	public function testStopsAnsweringWhenAccessIsRevokedDuringPolling(): void {
		$this->generate();
		$this->assertSame('queued', $this->lookup()['state']);

		$access = $this->createMock(VersionAccessService::class);
		$access->method('resolveSendableFile')->willThrowException(new NotFoundException());
		$service = $this->serviceWith(access: $access);

		$this->assertSame('not_found', $this->refused(fn () => $service->lookup($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER)))->reason);
	}

	public function testRefusesMalformedFingerprints(): void {
		$e = $this->refused(fn () => $this->lookup('abc'));
		$this->assertSame(['invalid_fingerprint', 400], [$e->reason, $e->status]);
		$this->assertSame('invalid_fingerprint', $this->refused(fn () => $this->lookup(null, strtoupper(self::hash(self::AFTER))))->reason);
	}

	public function testRefusesAVersionThatIsGone(): void {
		$e = $this->refused(fn () => $this->service->lookup($this->user, $this->fileId, '999', 'current', self::hash(self::BEFORE), self::hash(self::AFTER)));
		$this->assertSame(['version_missing', 404], [$e->reason, $e->status]);
	}

	public function testRefusesTheNewerEndFirst(): void {
		$e = $this->refused(fn () => $this->service->lookup($this->user, $this->fileId, 'current', '1000', self::hash(self::AFTER), self::hash(self::BEFORE)));
		$this->assertSame(['invalid_order', 400], [$e->reason, $e->status]);
	}

	public function testLooksUpWithoutWritingOrCounting(): void {
		$answer = $this->lookup();

		$this->assertSame('absent', $answer['state']);
		$this->assertSame(['available' => true, 'reason' => null, 'retryAfter' => null], $answer['generation']);
		$this->assertSame(['1000', 'current'], [$answer['ends']['from']->id, $answer['ends']['to']->id]);
		$this->assertSame('Bob', $answer['ends']['to']->authorName);
		$this->assertSame('plan.md', $answer['fileName']);
		$this->assertNull($this->row());
		$this->assertSame(0, $this->starts());
		$this->assertSame([], $this->stored);
	}

	public function testSaysTheTextsChangedWhenEitherEndNoLongerMatches(): void {
		$this->assertSame('changed', $this->lookup(self::hash('# Other'))['state']);
		// Someone saved the current file after the comparison loaded it
		$this->contents['current'] = self::AFTER . "More\n";
		$this->assertSame('changed', $this->lookup()['state']);

		$e = $this->refused(fn () => $this->generate());
		$this->assertSame(['texts_changed', 409], [$e->reason, $e->status]);
		$this->assertSame([], $this->stored);
		$this->assertSame(0, $this->starts());
	}

	public function testSchedulesOneUserlessTaskWithBothTexts(): void {
		$answer = $this->generate();

		$this->assertSame('queued', $answer['state']);
		$this->assertCount(1, $this->stored);
		$task = reset($this->stored);
		$this->assertNull($task->getUserId());
		$this->assertSame('text', $task->getAppId());
		$this->assertSame(TextToTextChat::ID, $task->getTaskTypeId());
		$this->assertFalse($task->getIncludeWatermark());
		$this->assertSame(VersionSummaryService::CUSTOM_ID_PREFIX . $this->row()->getId(), $task->getCustomId());
		$input = $task->getInput();
		$this->assertSame(VersionSummaryService::SYSTEM_PROMPT, $input['system_prompt']);
		$this->assertSame([], $input['history']);
		$this->assertArrayNotHasKey('max_tokens', $input);
		$this->assertMatchesRegularExpression('/^BEFORE:\n<<<BEGIN-([0-9a-f]{12})>>>\n' . preg_quote(self::BEFORE, '/') . '\n<<<END-\1>>>\n\nAFTER:\n<<<BEGIN-\1>>>\n' . preg_quote(self::AFTER, '/') . '\n<<<END-\1>>>$/', $input['input']);
		// Rows are shared by content, so no dates or authors go to the model
		$this->assertStringNotContainsString('Bob', $input['input']);
		$this->assertSame($task->getId(), $this->row()->getTaskId());
		$this->assertSame(1, $this->starts());
	}

	public function testStartsNothingTwiceForOnePair(): void {
		$this->generate();
		$again = $this->generate();

		$this->assertSame('queued', $again['state']);
		$this->assertCount(1, $this->stored);
		$this->assertSame(1, $this->starts());
	}

	public function testReportsWhatCoreSaysOfAPendingTask(): void {
		$this->generate();
		$taskId = $this->row()->getTaskId();
		$this->tasks->method('getTaskQueuePosition')->with($taskId, null)->willReturn(3);
		$this->assertSame(['queued', 3, null], [$this->lookup()['state'], $this->lookup()['queuePosition'], $this->lookup()['progress']]);

		$this->stored[$taskId]->setStatus(Task::STATUS_RUNNING);
		$this->stored[$taskId]->setProgress(0.4);
		$answer = $this->lookup();
		$this->assertSame(['running', null, 0.4], [$answer['state'], $answer['queuePosition'], $answer['progress']]);
	}

	public function testShowsAFinishedTaskBeforeItIsStoredWithoutWriting(): void {
		$this->generate();
		$this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, 'The pilot runs 3 weeks instead of 2.');

		$answer = $this->lookup();

		$this->assertSame(['done', 'The pilot runs 3 weeks instead of 2.'], [$answer['state'], $answer['summary']]);
		$this->assertSame(VersionSummary::STATE_PENDING, $this->row()->getState());
	}

	public function testStoresTheSummaryWhenTheTaskFinishes(): void {
		$this->generate();
		$task = $this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, 'The pilot runs 3 weeks instead of 2.');

		$this->service->onTaskFinished($task);

		$row = $this->row();
		$this->assertSame(VersionSummary::STATE_DONE, $row->getState());
		$this->assertSame('The pilot runs 3 weeks instead of 2.', $row->getSummary());
		$this->assertSame('done', $this->lookup()['state']);
	}

	public function testLimitsEachPersonWithinTheInstanceLimit(): void {
		$service = $this->serviceWith(config: $this->configWith(personLimit: 1));
		$service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));
		$this->contents['current'] = '# Else';

		$e = $this->refused(fn () => $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash('# Else')));
		$this->assertSame(['user_cap', Http::STATUS_TOO_MANY_REQUESTS, self::NOW + 3600], [$e->reason, $e->status, $e->retryAfter]);
		$this->assertSame(['available' => false, 'reason' => 'user_cap', 'retryAfter' => self::NOW + 3600], $service->lookup($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash('# Else'))['generation']);

		$bob = $this->createMock(IUser::class);
		$bob->method('getUID')->willReturn('bob');
		$bob->method('getBackendClassName')->willReturn('Database');
		$this->assertSame('queued', $service->generate($bob, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash('# Else'))['state']);
		$this->assertSame(['count' => 1, 'oldest' => self::NOW], $this->mapper->countStartsSince(0, 'bob'));
	}

	public function testStoresTheProvidersOwnMessageWhenTheTaskFails(): void {
		$this->generate();
		$task = $this->finishTask($this->row()->getTaskId(), Task::STATUS_FAILED, null, 'The provider is over its quota.');

		$this->service->onTaskFinished($task);

		$this->assertSame(['code' => 'provider_failed', 'message' => 'The provider is over its quota.'], $this->lookup()['error']);
	}

	public static function dataRejectedAnswers(): array {
		return [
			'empty' => ["  \n "],
			'too long' => [str_repeat('a', VersionSummaryService::MAX_SUMMARY_LENGTH + 1)],
			'a link to elsewhere' => ['See https://evil.example/x for details.'],
			'a bare link to elsewhere' => ['See www.evil.example for details.'],
		];
	}

	/**
	 * @dataProvider dataRejectedAnswers
	 */
	public function testRejectsAnswersItCannotShow(string $output): void {
		$this->generate();
		$task = $this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, $output);

		$this->service->onTaskFinished($task);

		$this->assertSame(['state' => 'failed', 'error' => ['code' => 'invalid_output', 'message' => null]], array_intersect_key($this->lookup(), ['state' => 1, 'error' => 1]));
	}

	public static function dataLinksInTheTexts(): array {
		return [
			'ending a sentence' => ['The board link https://example.com/board/7. was added.'],
			'in emphasis' => ['The board link **https://example.com/board/7** was added.'],
			'in quotes' => ['The board link “https://example.com/board/7” was added.'],
		];
	}

	/**
	 * @dataProvider dataLinksInTheTexts
	 */
	public function testKeepsLinksThatAreInTheTexts(string $output): void {
		$this->contents['current'] = self::AFTER . "Board: https://example.com/board/7\n";
		$this->service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash($this->contents['current']));
		$row = $this->mapper->findPair($this->fileId, VersionSummaryService::PROMPT_VERSION, self::hash(self::BEFORE), self::hash($this->contents['current']));
		$task = $this->finishTask($row->getTaskId(), Task::STATUS_SUCCESSFUL, $output);

		$this->service->onTaskFinished($task);

		$this->assertSame(VersionSummary::STATE_DONE, $this->mapper->findById($row->getId())->getState());
	}

	public function testIgnoresTasksThatAreNotItsOwn(): void {
		$this->generate();
		$own = $this->stored[$this->row()->getTaskId()];
		$this->finishTask($own->getId(), Task::STATUS_SUCCESSFUL, 'Summary');
		$foreign = [
			new Task(TextToTextChat::ID, [], 'assistant', null, $own->getCustomId()),
			new Task(TextToTextChat::ID, [], 'text', 'alice', $own->getCustomId()),
			new Task(TextToTextChat::ID, [], 'text', null, 'something-else'),
		];
		foreach ($foreign as $task) {
			$task->setId($own->getId());
			$this->service->onTaskFinished($task);
		}

		$this->assertSame(VersionSummary::STATE_PENDING, $this->row()->getState());
	}

	public function testDropsALateResultOfASummaryThatIsGone(): void {
		$this->generate();
		$task = $this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, 'Summary');
		$this->service->purgeAll();

		$this->service->onTaskFinished($task);

		$this->assertNull($this->row());
	}

	public function testTriesAFailedSummaryAgainWithANewTask(): void {
		$this->generate();
		$old = $this->finishTask($this->row()->getTaskId(), Task::STATUS_FAILED);
		$this->service->onTaskFinished($old);

		$answer = $this->generate();

		$this->assertSame('queued', $answer['state']);
		$this->assertArrayNotHasKey($old->getId(), $this->stored);
		$this->assertCount(1, $this->stored);
		$this->assertSame(reset($this->stored)->getId(), $this->row()->getTaskId());
		$this->assertNull($this->row()->getErrorCode());
		$this->assertSame(2, $this->starts());
	}

	public function testTriesAFailedSummaryAgainWhoseTaskCleanupJustDetached(): void {
		$this->generate();
		$this->service->onTaskFinished($this->finishTask($this->row()->getTaskId(), Task::STATUS_FAILED));
		$failed = $this->row();
		// Cleanup detaches the old task while the retry removes it
		$this->onDelete = fn (Task $task) => $this->mapper->detachTask($failed->getId(), (int)$task->getId());

		$this->assertSame('queued', $this->generate()['state']);
		$this->assertSame(VersionSummary::STATE_PENDING, $this->row()->getState());
	}

	public function testTriesAgainWhenTheTaskFailedBeforeItsResultWasStored(): void {
		$this->generate();
		$old = $this->finishTask($this->row()->getTaskId(), Task::STATUS_FAILED);

		$answer = $this->generate();

		$this->assertSame('queued', $answer['state']);
		$this->assertArrayNotHasKey($old->getId(), $this->stored);
		$this->assertSame(2, $this->starts());
	}

	public function testStartsNothingWhenTheTaskSucceededBeforeItsResultWasStored(): void {
		$this->generate();
		$this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, 'The pilot runs 3 weeks.');

		$this->assertSame('done', $this->generate()['state']);
		$this->assertSame(VersionSummary::STATE_DONE, $this->row()->getState());
		$this->assertSame(1, $this->starts());
	}

	public static function dataRefusedInputs(): array {
		return [
			'identical texts' => [self::BEFORE, self::BEFORE, 'no_changes', 422],
			'not UTF-8' => ["# caf\xe9\n", self::AFTER, 'unsupported_encoding', 422],
			'UTF-16' => ["\xff\xfe#\x00 \x00A\x00", self::AFTER, 'unsupported_encoding', 422],
			'too large' => [str_repeat('a', 239_500), self::AFTER, 'too_large', 413],
		];
	}

	/**
	 * @dataProvider dataRefusedInputs
	 */
	public function testStartsNothingForInputItCannotSummarize(string $before, string $after, string $reason, int $status): void {
		$this->contents = ['1000' => $before, 'current' => $after];

		$e = $this->refused(fn () => $this->service->generate($this->user, $this->fileId, '1000', 'current', self::hash($before), self::hash($after)));

		$this->assertSame([$reason, $status], [$e->reason, $e->status]);
		$this->assertSame([], $this->stored);
		$this->assertSame(0, $this->starts());
		$lookup = $this->service->lookup($this->user, $this->fileId, '1000', 'current', self::hash($before), self::hash($after));
		$this->assertSame(['available' => false, 'reason' => $reason, 'retryAfter' => null], $lookup['generation']);
	}

	public function testStripsAByteOrderMarkFromTheInput(): void {
		$this->contents['1000'] = "\xEF\xBB\xBF" . self::BEFORE;
		$this->service->generate($this->user, $this->fileId, '1000', 'current', self::hash($this->contents['1000']), self::hash(self::AFTER));

		$this->assertStringContainsString(">>>\n" . self::BEFORE . "\n<<<", reset($this->stored)->getInput()['input']);
		$this->assertStringNotContainsString("\xEF\xBB\xBF", reset($this->stored)->getInput()['input']);
	}

	public function testReadsNothingOverTheCeiling(): void {
		$access = $this->createMock(VersionAccessService::class);
		$access->method('resolveSendableFile')->willReturn($this->file);
		$access->method('listVersions')->willReturn([
			new VersionEnd('current', 2000, 300_000, '', null, null, null),
			new VersionEnd('1000', 1000, 300_000, '', null, null, null),
		]);
		$access->method('resolveEnd')->willReturnCallback(fn (File $file, array $versions, string $id) => $id === 'current' ? $versions[0] : $versions[1]);
		$access->expects($this->never())->method('read');
		$service = $this->serviceWith(access: $access);

		$answer = $service->lookup($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));

		$this->assertSame(['absent', 'too_large'], [$answer['state'], $answer['generation']['reason']]);
	}

	public function testShowsAStoredSummaryAfterTheBudgetWasLowered(): void {
		$this->generate();
		$this->service->onTaskFinished($this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, 'Summary'));
		$service = $this->serviceWith(config: $this->configWith(maxInputBytes: 10));

		$answer = $service->lookup($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));

		$this->assertSame(['done', 'Summary', 'too_large'], [$answer['state'], $answer['summary'], $answer['generation']['reason']]);
	}

	public function testKeepsStoredSummariesWithoutAProvider(): void {
		$this->generate();
		$this->service->onTaskFinished($this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, 'Summary'));
		$tasks = $this->createMock(IManager::class);
		$tasks->method('getAvailableTaskTypes')->willReturn([]);
		$service = $this->serviceWith(tasks: $tasks);

		$answer = $service->lookup($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));
		$this->assertSame(['done', 'no_provider'], [$answer['state'], $answer['generation']['reason']]);

		$this->contents['current'] = '# Else';
		$e = $this->refused(fn () => $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash('# Else')));
		$this->assertSame(['no_provider', 503], [$e->reason, $e->status]);
	}

	public function testStopsAtTheInstanceLimit(): void {
		$service = $this->serviceWith(config: $this->configWith(instanceLimit: 1));
		$this->mapper->addStart(self::NOW - 600, 'bob');

		$e = $this->refused(fn () => $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER)));

		$this->assertSame(['instance_cap', 429, self::NOW - 600 + 3600], [$e->reason, $e->status, $e->retryAfter]);
		$this->assertNull($this->row());
		$this->assertSame([], $this->stored);
		$this->assertSame(1, $this->starts());
		$lookup = $service->lookup($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));
		$this->assertSame(['available' => false, 'reason' => 'instance_cap', 'retryAfter' => self::NOW - 600 + 3600], $lookup['generation']);
	}

	public function testKeepsTheErrorOfAFailedSummaryWhenTheLimitStopsTheRetry(): void {
		$this->generate();
		$this->service->onTaskFinished($this->finishTask($this->row()->getTaskId(), Task::STATUS_FAILED, null, 'Quota'));
		for ($i = 0; $i < 20; $i++) {
			$this->mapper->addStart($this->now, 'bob');
		}

		$this->assertSame('instance_cap', $this->refused(fn () => $this->generate())->reason);
		$this->assertSame(['failed', ['code' => 'provider_failed', 'message' => 'Quota']], [$this->lookup()['state'], $this->lookup()['error']]);
	}

	public function testKeepsTheStartWhenCoreStoredTheTaskBeforeFailing(): void {
		$tasks = $this->createMock(IManager::class);
		$tasks->method('getAvailableTaskTypes')->willReturn([TextToTextChat::ID => ['optionalInputShape' => []]]);
		$tasks->method('scheduleTask')->willReturnCallback(function (Task $task): void {
			$task->setId(500);
			$task->setStatus(Task::STATUS_SCHEDULED);
			$this->stored[500] = $task;
			throw new \RuntimeException('job list unavailable');
		});
		$tasks->method('getTasks')->willReturnCallback(fn () => array_values($this->stored));
		$tasks->expects($this->once())->method('cancelTask')->with(500);
		$tasks->expects($this->once())->method('deleteTask')->willReturnCallback(function (Task $task): void {
			unset($this->stored[$task->getId()]);
		});
		$service = $this->serviceWith(tasks: $tasks);

		$answer = $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));

		$this->assertSame(['failed', 'provider_failed'], [$answer['state'], $answer['error']['code']]);
		$this->assertSame([], $this->stored);
		$this->assertSame(1, $this->starts());
	}

	public function testLeavesATaskCoreStoredButCouldNotRemoveToCleanup(): void {
		$tasks = $this->createMock(IManager::class);
		$tasks->method('getAvailableTaskTypes')->willReturn([TextToTextChat::ID => ['optionalInputShape' => []]]);
		$tasks->method('scheduleTask')->willReturnCallback(function (Task $task): void {
			$task->setId(500);
			$task->setStatus(Task::STATUS_SCHEDULED);
			$this->stored[500] = $task;
			throw new \RuntimeException('job list unavailable');
		});
		$tasks->method('getTasks')->willReturnCallback(fn () => array_values($this->stored));
		$tasks->method('cancelTask')->willThrowException(new \RuntimeException('database busy'));
		$service = $this->serviceWith(tasks: $tasks);

		$e = $this->refused(fn () => $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER)));

		$this->assertSame('busy', $e->reason);
		$this->assertSame([VersionSummary::STATE_PENDING, null], [$this->row()->getState(), $this->row()->getTaskId()]);
		$this->assertSame(1, $this->starts());
		$this->now = self::NOW + 601;
		$this->service->cleanup();
		$this->assertSame([], $this->stored);
		$this->assertSame(VersionSummary::STATE_FAILED, $this->row()->getState());
	}

	public function testKeepsAFailedSummaryWhoseOldTaskCouldNotBeRemoved(): void {
		$this->generate();
		$old = $this->finishTask($this->row()->getTaskId(), Task::STATUS_FAILED);
		$this->service->onTaskFinished($old);
		$tasks = $this->createMock(IManager::class);
		$tasks->method('getAvailableTaskTypes')->willReturn([TextToTextChat::ID => ['optionalInputShape' => []]]);
		$tasks->method('getTask')->willReturnCallback(fn (int $id) => $this->stored[$id]);
		$tasks->method('deleteTask')->willThrowException(new \RuntimeException('database busy'));
		$tasks->expects($this->never())->method('scheduleTask');
		$service = $this->serviceWith(tasks: $tasks);

		$answer = $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));

		$this->assertSame('failed', $answer['state']);
		$this->assertSame($old->getId(), $this->row()->getTaskId());
	}

	public function testReleasesTheStartWhenNoTaskWasStored(): void {
		$tasks = $this->createMock(IManager::class);
		$tasks->method('getAvailableTaskTypes')->willReturn([TextToTextChat::ID => ['optionalInputShape' => []]]);
		$tasks->method('scheduleTask')->willThrowException(new \RuntimeException('no provider after all'));
		$tasks->method('getTasks')->willReturn([]);
		$service = $this->serviceWith(tasks: $tasks);

		$this->assertSame('failed', $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER))['state']);
		$this->assertSame(0, $this->starts());
	}

	public function testRefusesWhileAPurgeHoldsTheLock(): void {
		$this->locks->method('acquireLock')->with('text/version-summaries', ILockingProvider::LOCK_SHARED)->willThrowException(new LockedException('text/version-summaries'));

		$e = $this->refused(fn () => $this->generate());

		$this->assertSame(['busy', 503], [$e->reason, $e->status]);
		$this->assertSame([], $this->stored);
		$this->assertNull($this->row());
	}

	public function testRefusesWhenTurnedOffWhileReadingTheTexts(): void {
		$calls = 0;
		$service = $this->serviceWith(config: $this->configWith(enabled: function () use (&$calls) {
			return ++$calls <= 2;
		}));

		$this->assertSame('disabled', $this->refused(fn () => $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER)))->reason);
		$this->assertSame([], $this->stored);
		$this->assertNull($this->row());
	}

	public function testTakesItsTaskBackWhenTurnedOffWithoutLocking(): void {
		$systemConfig = $this->createMock(IConfig::class);
		$systemConfig->method('getSystemValueBool')->with('filelocking.enabled', true)->willReturn(false);
		$calls = 0;
		$service = $this->serviceWith(config: $this->configWith(enabled: function () use (&$calls) {
			return ++$calls <= 3;
		}), systemConfig: $systemConfig);

		$this->assertSame('disabled', $this->refused(fn () => $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER)))->reason);
		$this->assertSame([], $this->stored);
		$this->assertNull($this->row());
	}

	public function testPurgesSummariesAndTasksWhenTurnedOff(): void {
		$this->generate();
		$this->enabled = false;

		$this->assertTrue($this->service->purgeAll());

		$this->assertNull($this->row());
		$this->assertSame([], $this->stored);
		$this->assertSame('disabled', $this->refused(fn () => $this->lookup())->reason);
	}

	public function testPurgeWaitsForAStartToFinish(): void {
		$this->generate();
		$this->locks->expects($this->exactly(2))->method('acquireLock')
			->with('text/version-summaries', ILockingProvider::LOCK_EXCLUSIVE)
			->willReturnOnConsecutiveCalls($this->throwException(new LockedException('text/version-summaries')), null);

		$this->assertTrue($this->service->purgeAll());
		$this->assertNull($this->row());
	}

	public function testKeepsASummaryWhoseTaskCouldNotBeRemoved(): void {
		$tasks = $this->createMock(IManager::class);
		$tasks->method('getAvailableTaskTypes')->willReturn([TextToTextChat::ID => ['optionalInputShape' => []]]);
		$tasks->method('scheduleTask')->willReturnCallback(function (Task $task): void {
			$task->setId(600);
			$task->setStatus(Task::STATUS_SCHEDULED);
			$this->stored[600] = $task;
		});
		$tasks->method('getTask')->willReturnCallback(fn (int $id) => $this->stored[$id] ?? throw new TaskNotFoundException());
		$tasks->method('getTasks')->willReturnCallback(fn () => array_values($this->stored));
		$failures = 1;
		$tasks->method('cancelTask')->willReturnCallback(function (int $id) use (&$failures): void {
			if ($failures-- > 0) {
				throw new \RuntimeException('database busy');
			}
			$this->stored[$id]->setStatus(Task::STATUS_CANCELLED);
		});
		$tasks->method('deleteTask')->willReturnCallback(function (Task $task): void {
			unset($this->stored[$task->getId()]);
		});
		$service = $this->serviceWith(tasks: $tasks);
		$service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));

		$this->assertFalse($service->purgeAll());
		$this->assertSame(600, $this->row()->getTaskId());
		$this->assertSame([600], array_keys($this->stored));

		$this->assertTrue($service->purgeAll());
		$this->assertNull($this->row());
		$this->assertSame([], $this->stored);
	}

	public function testPurgesTheSummariesOfDeletedFiles(): void {
		$this->generate();
		$this->assertTrue($this->service->hasSummaries());

		$this->service->purgeFile($this->fileId + 1);
		$this->assertNotNull($this->row());
		$this->service->purgeFile($this->fileId);
		$this->assertNull($this->row());
		$this->assertSame([], $this->stored);
		$this->assertFalse($this->service->hasSummaries());
	}

	public function testRecoversATaskWhoseIdWasNeverStored(): void {
		$row = $this->mapper->claim($this->fileId, VersionSummaryService::PROMPT_VERSION, self::hash(self::BEFORE), self::hash(self::AFTER), self::NOW);
		$orphan = new Task(TextToTextChat::ID, [], 'text', null, VersionSummaryService::CUSTOM_ID_PREFIX . $row->getId());
		$this->tasks->scheduleTask($orphan);
		// A user's own task that happens to carry the same ids stays
		$users = new Task(TextToTextChat::ID, [], 'text', 'alice', VersionSummaryService::CUSTOM_ID_PREFIX . $row->getId());
		$users->setId(900);
		$this->stored[900] = $users;
		$this->now = self::NOW + 601;

		$this->service->cleanup();

		$this->assertArrayNotHasKey($orphan->getId(), $this->stored);
		$this->assertArrayHasKey(900, $this->stored);
		$this->assertSame(['failed', 'task_missing'], [$this->lookup()['state'], $this->lookup()['error']['code']]);
	}

	public function testCleanupFinishesStuckAndOldSummaries(): void {
		$this->generate();
		$this->now += 86_401;

		$this->service->cleanup();

		$this->assertSame(['failed', 'timeout'], [$this->lookup()['state'], $this->lookup()['error']['code']]);
		$this->assertSame([], $this->stored);

		$this->now += 30 * 86_400;
		$this->service->cleanup();
		$this->assertNull($this->row());
	}

	public function testCleanupStoresFinishedTasksAndDeletesThem(): void {
		$this->generate();
		$this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, 'Summary');
		// Another app's task stays
		$other = new Task(TextToTextChat::ID, [], 'text', 'alice', 'assistant-thing');
		$other->setId(901);
		$this->stored[901] = $other;

		$this->service->cleanup();
		$this->assertSame(VersionSummary::STATE_DONE, $this->row()->getState());
		$this->service->cleanup();

		$this->assertNull($this->row()->getTaskId());
		$this->assertSame([901], array_keys($this->stored));
		$this->assertSame('done', $this->lookup()['state']);
	}

	public function testCleanupLeavesSummariesUnderWayToTheirTask(): void {
		$this->generate();

		$this->service->cleanup();

		$this->assertNotNull($this->row());
	}

	public function testCleanupPurgesEverythingWhileTurnedOff(): void {
		$this->generate();
		$this->enabled = false;

		$this->service->cleanup();

		$this->assertNull($this->row());
		$this->assertSame([], $this->stored);
	}
}
