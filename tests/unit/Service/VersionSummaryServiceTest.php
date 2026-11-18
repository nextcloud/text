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
	private IConfig&MockObject $systemConfig;
	private IUser&MockObject $user;
	private File&MockObject $file;
	private VersionSummaryService $service;

	/** @var array<string, string> Bytes of each end */
	private array $contents;
	/** When the current file was last written: restoring a version sets it to that version's time */
	private int $currentMtime = 2000;
	/** What the versions backend throws, if anything */
	private ?\Exception $failure = null;
	/** Whether a save holds the lock of the current file */
	private bool $locked = false;
	/** @var array<int, Task> Tasks core holds, by id */
	private array $stored = [];
	private int $nextTaskId = 100;
	private int $now = self::NOW;
	private bool $enabled = true;
	/** @var list<int> Tasks core cannot load */
	private array $broken = [];
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
		$this->access->method('listVersions')->willReturnCallback(fn () => $this->failure === null ? $this->ends() : throw $this->failure);
		$this->access->method('resolveEnd')->willReturnCallback(function (File $file, array $versions, string $id): VersionEnd {
			foreach ($versions as $end) {
				if ($end->id === $id) {
					return $end;
				}
			}
			throw new VersionNotFoundException($id);
		});
		$this->access->method('read')->willReturnCallback(fn (File $file, VersionEnd $end, int $max) => match (true) {
			$this->locked => throw new LockedException('plan.md'),
			default => strlen($this->contents[$end->id]) > $max ? null : $this->contents[$end->id],
		});

		$this->tasks = $this->createMock(IManager::class);
		$this->tasks->method('getAvailableTaskTypes')->willReturn([TextToTextChat::ID => ['optionalInputShape' => []]]);
		$this->tasks->method('scheduleTask')->willReturnCallback(function (Task $task): void {
			$task->setId($this->nextTaskId++);
			$task->setStatus(Task::STATUS_SCHEDULED);
			$task->setScheduledAt($this->now);
			$this->stored[$task->getId()] = $task;
		});
		$this->tasks->method('getTask')->willReturnCallback(fn (int $id) => match (true) {
			in_array($id, $this->broken, true) => throw new \OCP\TaskProcessing\Exception\Exception('Could not decode the task'),
			default => $this->stored[$id] ?? throw new TaskNotFoundException(),
		});
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
		$this->systemConfig = $this->createMock(IConfig::class);
		$this->systemConfig->method('getSystemValueBool')->willReturn(true);

		$this->mapper = Server::get(VersionSummaryMapper::class);
		$this->service = $this->serviceWith();
	}

	private function configWith(int $instanceLimit = 20, int $personLimit = 20, int $maxInputBytes = 240_000, ?\Closure $enabled = null): ConfigService&MockObject {
		$config = $this->createMock(ConfigService::class);
		$config->method('isVersionSummariesEnabled')->willReturnCallback($enabled ?? fn () => true);
		$config->method('isVersionSummariesAvailableFor')->willReturnCallback(fn () => ($enabled ?? fn () => true)());
		$config->method('getVersionSummariesHourlyLimit')->willReturn($instanceLimit);
		$config->method('getVersionSummariesUserHourlyLimit')->willReturn($personLimit);
		$config->method('getVersionSummariesMaxInputBytes')->willReturn($maxInputBytes);
		$config->method('setVersionSummariesEnabled')->willReturnCallback(function (bool $enabled): void {
			$this->enabled = $enabled;
		});
		return $config;
	}

	private function serviceWith(?ConfigService $config = null, ?VersionAccessService $access = null, ?IManager $tasks = null, ?IConfig $systemConfig = null, ?VersionSummaryMapper $mapper = null, ?ILockingProvider $locks = null): VersionSummaryService {
		$time = $this->createMock(ITimeFactory::class);
		$time->method('getTime')->willReturnCallback(fn () => $this->now);
		return new VersionSummaryService($config ?? $this->config, $access ?? $this->access, $mapper ?? $this->mapper, $tasks ?? $this->tasks, $locks ?? $this->locks, $time, $systemConfig ?? $this->systemConfig, $this->createMock(LoggerInterface::class));
	}

	/**
	 * The mapper, telling `$onClaim` of every claim it makes
	 *
	 * @param \Closure(?VersionSummary): ?VersionSummary $onClaim
	 */
	private function mapperWith(\Closure $onClaim): VersionSummaryMapper {
		return new class(Server::get(IDBConnection::class), $onClaim) extends VersionSummaryMapper {
			public function __construct(
				IDBConnection $db,
				private readonly \Closure $onClaim,
			) {
				parent::__construct($db);
			}

			public function claim(int $fileId, int $promptVersion, string $fromHash, string $toHash, int $now): ?VersionSummary {
				return ($this->onClaim)(parent::claim($fileId, $promptVersion, $fromHash, $toHash, $now));
			}
		};
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
			new VersionEnd('current', $this->currentMtime, strlen($this->contents['current']), '', 'bob', 'Bob', null),
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
		return $this->mapper->findPair($this->fileId, VersionSummaryPrompt::VERSION, self::hash(self::BEFORE), self::hash(self::AFTER));
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
		$this->assertSame('invalid_fingerprint', $this->refused(fn () => $this->lookup(self::hash(self::BEFORE) . "\n"))->reason);
	}

	public function testRefusesAVersionThatIsGone(): void {
		$e = $this->refused(fn () => $this->service->lookup($this->user, $this->fileId, '999', 'current', self::hash(self::BEFORE), self::hash(self::AFTER)));
		$this->assertSame(['version_missing', 404], [$e->reason, $e->status]);
	}

	public function testRefusesTheNewerEndFirst(): void {
		$e = $this->refused(fn () => $this->service->lookup($this->user, $this->fileId, 'current', '1000', self::hash(self::AFTER), self::hash(self::BEFORE)));
		$this->assertSame(['invalid_order', 400], [$e->reason, $e->status]);
	}

	public function testTakesTheCurrentFileAsTheNewerEndAfterARestore(): void {
		// Restoring version 500 over the current file sets its mtime to 500
		$this->currentMtime = 500;

		$this->assertSame('absent', $this->lookup()['state']);
		$this->assertSame('queued', $this->generate()['state']);
	}

	public function testAsksToWaitWhileASaveHoldsTheFile(): void {
		$this->locked = true;

		$e = $this->refused(fn () => $this->lookup());
		$this->assertSame(['busy', Http::STATUS_SERVICE_UNAVAILABLE], [$e->reason, $e->status]);
	}

	public function testRefusesWhenTheVersionsBackendCannotFindTheFile(): void {
		// LegacyVersionsBackend, for a share whose owner is gone
		$this->failure = new NotFoundException('No owner');

		$e = $this->refused(fn () => $this->lookup());
		$this->assertSame(['not_found', Http::STATUS_NOT_FOUND], [$e->reason, $e->status]);
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
		$this->assertSame('text-version-summary:' . $this->row()->getId(), $task->getCustomId());
		$input = $task->getInput();
		$this->assertMatchesRegularExpression('/^BEFORE:\n<<<BEGIN-([0-9a-f]{12})>>>\n/', $input['input']);
		$nonce = substr($input['input'], strlen("BEFORE:\n<<<BEGIN-"), 12);
		// Without the room for the list of edits, which this provider takes no limit for
		$request = VersionSummaryPrompt::request(self::BEFORE, self::AFTER, $nonce);
		unset($request['max_tokens']);
		$this->assertSame($request, $input);
		// Rows are shared by content, so no dates or authors go to the model
		$this->assertStringNotContainsString('Bob', $input['input']);
		$this->assertSame($task->getId(), $this->row()->getTaskId());
		$this->assertSame(1, $this->starts());
	}

	public function testLeavesRoomForTheListOfEditsWhenTheProviderTakesALimit(): void {
		$tasks = $this->createMock(IManager::class);
		$tasks->method('getAvailableTaskTypes')->willReturn([TextToTextChat::ID => ['optionalInputShape' => ['max_tokens' => []]]]);
		$tasks->method('scheduleTask')->willReturnCallback(function (Task $task): void {
			$task->setId($this->nextTaskId++);
			$task->setStatus(Task::STATUS_SCHEDULED);
			$this->stored[$task->getId()] = $task;
		});
		$tasks->method('getTask')->willReturnCallback(fn (int $id) => $this->stored[$id]);

		$this->serviceWith(tasks: $tasks)->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));

		$this->assertSame(VersionSummaryPrompt::request(self::BEFORE, self::AFTER)['max_tokens'], reset($this->stored)->getInput()['max_tokens']);
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
		$this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, "The pilot runs 3 weeks instead of 2.\n</summary>");

		$answer = $this->lookup();

		$this->assertSame(['done', 'The pilot runs 3 weeks instead of 2.'], [$answer['state'], $answer['summary']]);
		$this->assertSame(VersionSummary::STATE_PENDING, $this->row()->getState());
	}

	public function testStoresTheSummaryWhenTheTaskFinishes(): void {
		$this->generate();
		$task = $this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, "The pilot runs 3 weeks instead of 2.\n</summary>");

		$this->service->onTaskFinished($task);

		$row = $this->row();
		$this->assertSame(VersionSummary::STATE_DONE, $row->getState());
		$this->assertSame('The pilot runs 3 weeks instead of 2.', $row->getSummary());
		$this->assertSame('done', $this->lookup()['state']);
	}

	public function testCountsAStartForOneHourOnly(): void {
		$service = $this->serviceWith(config: $this->configWith(personLimit: 1));
		$service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));
		$this->contents['current'] = '# Else';
		$this->now = self::NOW + 3600;

		$this->assertSame('queued', $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash('# Else'))['state']);
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

	public function testRejectsAnAnswerItCannotShow(): void {
		$this->generate();
		$task = $this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, 'The pilot runs 3 weeks instead of 2.');

		$this->service->onTaskFinished($task);

		$this->assertSame(['state' => 'failed', 'error' => ['code' => 'invalid_output', 'message' => null]], array_intersect_key($this->lookup(), ['state' => 1, 'error' => 1]));
	}

	public function testChecksLinksAgainstTheTextsOfItsTask(): void {
		$this->contents['current'] = self::AFTER . "Board: https://example.com/board/7\n";
		$this->service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash($this->contents['current']));
		$row = $this->mapper->findPair($this->fileId, VersionSummaryPrompt::VERSION, self::hash(self::BEFORE), self::hash($this->contents['current']));
		$task = $this->finishTask($row->getTaskId(), Task::STATUS_SUCCESSFUL, "The board link https://example.com/board/7 was added.\n</summary>");

		$this->service->onTaskFinished($task);

		$this->assertSame(VersionSummary::STATE_DONE, $this->mapper->findById($row->getId())->getState());
	}

	public function testIgnoresTasksThatAreNotItsOwn(): void {
		$this->generate();
		$own = $this->stored[$this->row()->getTaskId()];
		$this->finishTask($own->getId(), Task::STATUS_SUCCESSFUL, "Summary\n</summary>");
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
		$task = $this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, "Summary\n</summary>");
		$this->service->turnOff();

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
		$this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, "The pilot runs 3 weeks.\n</summary>");

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
		$this->service->onTaskFinished($this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, "Summary\n</summary>"));
		$service = $this->serviceWith(config: $this->configWith(maxInputBytes: 10));

		$answer = $service->lookup($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));

		$this->assertSame(['done', 'Summary', 'too_large'], [$answer['state'], $answer['summary'], $answer['generation']['reason']]);
	}

	public function testKeepsStoredSummariesWithoutAProvider(): void {
		$this->generate();
		$this->service->onTaskFinished($this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, "Summary\n</summary>"));
		$tasks = $this->createMock(IManager::class);
		$tasks->method('getAvailableTaskTypes')->willReturn([]);
		$service = $this->serviceWith(tasks: $tasks);

		$answer = $service->lookup($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));
		$this->assertSame(['done', 'no_provider'], [$answer['state'], $answer['generation']['reason']]);

		$this->contents['current'] = '# Else';
		$e = $this->refused(fn () => $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash('# Else')));
		$this->assertSame(['no_provider', 503], [$e->reason, $e->status]);
	}

	public function testSaysThatNoneMayStartWhileALimitIsZero(): void {
		$service = $this->serviceWith(config: $this->configWith(instanceLimit: 0));

		$lookup = $service->lookup($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));
		$this->assertSame(['available' => false, 'reason' => 'instance_cap', 'retryAfter' => null], $lookup['generation']);
		$e = $this->refused(fn () => $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER)));
		$this->assertSame(['instance_cap', 429, null], [$e->reason, $e->status, $e->retryAfter]);
	}

	public function testTriesAFailedSummaryAgainWithoutClaimingThePairAnew(): void {
		$claims = 0;
		$service = $this->serviceWith(mapper: $this->mapperWith(function (?VersionSummary $row) use (&$claims) {
			$claims++;
			return $row;
		}));
		$generate = fn () => $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));
		$generate();
		$service->onTaskFinished($this->finishTask($this->row()->getTaskId(), Task::STATUS_FAILED));

		$this->assertSame('queued', $generate()['state']);
		// A second claim is an insert the unique index refuses, an error in the database's log
		$this->assertSame(1, $claims);
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
		// This request read the switch on, an admin has turned it off since
		$service = $this->serviceWith(config: $this->configWith(enabled: fn (bool $fresh = false) => !$fresh));

		$this->assertSame('disabled', $this->refused(fn () => $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER)))->reason);
		$this->assertSame([], $this->stored);
		$this->assertNull($this->row());
	}

	public function testLeavesTheSummaryAnotherRequestStartedWhenItsOwnStartIsRefusedWithoutLocking(): void {
		$systemConfig = $this->createMock(IConfig::class);
		$systemConfig->method('getSystemValueBool')->with('filelocking.enabled', true)->willReturn(false);
		$freshReads = 0;
		// Another request claims the pair and schedules its task just before this one
		$mapper = $this->mapperWith(function (?VersionSummary $row) {
			$task = new Task(TextToTextChat::ID, ['input' => ''], 'text', null, 'text-version-summary:' . $row->getId());
			$task->setId(777);
			$task->setStatus(Task::STATUS_SCHEDULED);
			$this->stored[777] = $task;
			$this->mapper->attachTask($row->getId(), 777, $this->now);
			return null;
		});
		// Turned off right after the start, before its check without locking
		$service = $this->serviceWith(config: $this->configWith(enabled: function (bool $fresh = false) use (&$freshReads) {
			return !$fresh || ++$freshReads <= 1;
		}), systemConfig: $systemConfig, mapper: $mapper);

		$answer = $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER));

		// The summary under way is the other request's, shown as such
		$this->assertSame('queued', $answer['state']);
		$this->assertArrayHasKey(777, $this->stored);
		$this->assertSame(777, $this->row()?->getTaskId());
	}

	public function testTakesItsTaskBackWhenTurnedOffWithoutLocking(): void {
		$systemConfig = $this->createMock(IConfig::class);
		$systemConfig->method('getSystemValueBool')->with('filelocking.enabled', true)->willReturn(false);
		$freshReads = 0;
		// Turned off right after the start, before its check without locking
		$service = $this->serviceWith(config: $this->configWith(enabled: function (bool $fresh = false) use (&$freshReads) {
			return !$fresh || ++$freshReads <= 1;
		}), systemConfig: $systemConfig);

		$this->assertSame('disabled', $this->refused(fn () => $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER)))->reason);
		$this->assertSame([], $this->stored);
		$this->assertNull($this->row());
	}

	public function testPurgesSummariesAndTasksWhenTurnedOff(): void {
		$this->generate();

		$this->assertTrue($this->service->turnOff());

		$this->assertNull($this->row());
		$this->assertSame([], $this->stored);
		$this->assertSame('disabled', $this->refused(fn () => $this->lookup())->reason);
	}

	public function testStoresOffBeforeRemovingAnything(): void {
		$this->generate();
		$enabledWhileRemoving = null;
		// A start re-reads the switch under the shared lock, which the removal takes exclusively
		$this->locks->method('acquireLock')->willReturnCallback(function () use (&$enabledWhileRemoving): void {
			$enabledWhileRemoving = $this->enabled;
		});

		$this->service->turnOff();

		$this->assertFalse($enabledWhileRemoving);
	}

	public function testSaysRemovalIsPendingWhenTheRemovalFails(): void {
		$this->generate();
		$this->locks->method('acquireLock')->willThrowException(new \RuntimeException('Deadlock'));

		$this->assertFalse($this->service->turnOff());

		$this->assertFalse($this->enabled);
		$this->assertNotNull($this->row());
	}

	public function testPurgeWaitsForAStartToFinish(): void {
		$this->generate();
		$this->locks->expects($this->exactly(2))->method('acquireLock')
			->with('text/version-summaries', ILockingProvider::LOCK_EXCLUSIVE)
			->willReturnOnConsecutiveCalls($this->throwException(new LockedException('text/version-summaries')), null);

		$this->assertTrue($this->service->turnOff());
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

		$this->assertFalse($service->turnOff());
		$this->assertSame(600, $this->row()->getTaskId());
		$this->assertSame([600], array_keys($this->stored));

		$this->assertTrue($service->turnOff());
		$this->assertNull($this->row());
		$this->assertSame([], $this->stored);
	}

	public function testTakesNoLockToDeleteAFileWithoutSummaries(): void {
		$this->generate();
		$this->locks->expects($this->never())->method('acquireLock');

		$this->assertTrue($this->service->purgeFile($this->fileId + 1));
		$this->assertNotNull($this->row());
	}

	public function testCleanupLeavesTheSweepToTheNextRunWhileAStartHoldsTheLock(): void {
		$locks = $this->createMock(ILockingProvider::class);
		$locks->method('acquireLock')->willThrowException(new LockedException('text/version-summaries'));
		$service = $this->serviceWith(locks: $locks);

		$started = microtime(true);
		$service->cleanup();

		$this->assertLessThan(1.0, microtime(true) - $started);
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
		$row = $this->mapper->claim($this->fileId, VersionSummaryPrompt::VERSION, self::hash(self::BEFORE), self::hash(self::AFTER), self::NOW);
		$orphan = new Task(TextToTextChat::ID, [], 'text', null, 'text-version-summary:' . $row->getId());
		$this->tasks->scheduleTask($orphan);
		// A user's own task that happens to carry the same ids stays
		$users = new Task(TextToTextChat::ID, [], 'text', 'alice', 'text-version-summary:' . $row->getId());
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
		$this->finishTask($this->row()->getTaskId(), Task::STATUS_SUCCESSFUL, "Summary\n</summary>");
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

	public function testCleanupReadsTheSwitchAsStoredNotAsThisProcessCachedIt(): void {
		$this->generate();
		// A cron or worker process that read the switch before an admin turned summaries on
		$service = $this->serviceWith(config: $this->configWith(enabled: fn (bool $fresh = false) => $fresh));

		$service->cleanup();

		$this->assertNotNull($this->row());
	}

	public function testCleanupGoesOnPastATaskItCannotLoad(): void {
		$this->generate();
		$broken = $this->row()->getTaskId();
		$this->contents['current'] = '# Else';
		$this->service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash('# Else'));
		$other = $this->mapper->findPair($this->fileId, VersionSummaryPrompt::VERSION, self::hash(self::BEFORE), self::hash('# Else'));
		$this->finishTask($other->getTaskId(), Task::STATUS_SUCCESSFUL, "Summary\n</summary>");
		$this->broken[] = $broken;

		$this->service->cleanup();

		$this->assertSame(VersionSummary::STATE_DONE, $this->mapper->findById($other->getId())->getState());
	}

	public function testPurgeGoesOnPastATaskItCannotLoad(): void {
		$this->generate();
		$broken = $this->row()->getTaskId();
		$this->contents['current'] = '# Else';
		$this->service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash('# Else'));
		$this->broken[] = $broken;

		$this->assertFalse($this->service->turnOff());

		// The row stays, so the next purge or Cleanup can find its task again
		$this->assertSame($broken, $this->row()?->getTaskId());
		$this->assertNull($this->mapper->findPair($this->fileId, VersionSummaryPrompt::VERSION, self::hash(self::BEFORE), self::hash('# Else')));
		$this->assertSame([$broken], array_keys($this->stored));
	}

	public function testPurgeGoesOnPastAFullBatchThatKeepsARow(): void {
		// A batch is 500 rows; the first holds a task core cannot load
		$first = $this->mapper->claim($this->fileId, VersionSummaryPrompt::VERSION, self::hash('0'), self::hash('0 changed'), self::NOW);
		$this->mapper->attachTask($first->getId(), 999, self::NOW);
		$this->broken[] = 999;
		for ($i = 1; $i <= 500; $i++) {
			$this->mapper->claim($this->fileId, VersionSummaryPrompt::VERSION, self::hash((string)$i), self::hash("$i changed"), self::NOW);
		}

		$this->assertFalse($this->service->turnOff());

		$this->assertSame([$first->getId()], array_map(fn (VersionSummary $row) => $row->getId(), $this->mapper->findByFileId($this->fileId)));
	}

	public function testCleanupSweepGoesOnPastATaskItCannotLoad(): void {
		$this->generate();
		$broken = $this->row()->getTaskId();
		$this->finishTask($broken, Task::STATUS_SUCCESSFUL, "Summary\n</summary>");
		$this->service->onTaskFinished($this->stored[$broken]);
		$this->contents['current'] = '# Else';
		$this->service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash('# Else'));
		$this->broken[] = $broken;
		$this->now += 31 * 86_400;

		$this->service->cleanup();

		$this->assertNotNull($this->row());
		$this->assertNull($this->mapper->findPair($this->fileId, VersionSummaryPrompt::VERSION, self::hash(self::BEFORE), self::hash('# Else')));
	}

	public function testReleasesNoStartWhenCoreCannotListTheTasksOfAFailedSchedule(): void {
		$tasks = $this->createMock(IManager::class);
		$tasks->method('getAvailableTaskTypes')->willReturn([TextToTextChat::ID => ['optionalInputShape' => []]]);
		$tasks->method('scheduleTask')->willThrowException(new \RuntimeException('provider down'));
		$tasks->method('getTasks')->willThrowException(new \OCP\TaskProcessing\Exception\Exception('database gone'));
		$service = $this->serviceWith(tasks: $tasks);

		$e = $this->refused(fn () => $service->generate($this->user, $this->fileId, '1000', 'current', self::hash(self::BEFORE), self::hash(self::AFTER)));

		// Core may hold the task: the start stays counted and Cleanup finds the task by its custom id
		$this->assertSame(['busy', 503], [$e->reason, $e->status]);
		$this->assertSame(1, $this->starts());
		$this->assertSame(VersionSummary::STATE_PENDING, $this->row()?->getState());
	}

	public function testCleanupPurgesEverythingWhileTurnedOff(): void {
		$this->generate();
		$this->enabled = false;

		$this->service->cleanup();

		$this->assertNull($this->row());
		$this->assertSame([], $this->stored);
	}
}
