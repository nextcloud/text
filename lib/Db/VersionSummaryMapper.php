<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\Exception;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<VersionSummary>
 */
class VersionSummaryMapper extends QBMapper {
	private const string STARTS = 'text_summary_starts';

	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'text_version_summaries', VersionSummary::class);
	}

	public function findPair(int $fileId, int $promptVersion, string $fromHash, string $toHash): ?VersionSummary {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('file_id', $qb->createNamedParameter($fileId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('prompt_version', $qb->createNamedParameter($promptVersion, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('from_hash', $qb->createNamedParameter($fromHash)))
			->andWhere($qb->expr()->eq('to_hash', $qb->createNamedParameter($toHash)));
		try {
			return $this->findEntity($qb);
		} catch (DoesNotExistException) {
			return null;
		}
	}

	public function findById(int $id): ?VersionSummary {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
		try {
			return $this->findEntity($qb);
		} catch (DoesNotExistException) {
			return null;
		}
	}

	public function findByTaskId(int $taskId): ?VersionSummary {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('task_id', $qb->createNamedParameter($taskId, IQueryBuilder::PARAM_INT)));
		try {
			return $this->findEntity($qb);
		} catch (DoesNotExistException) {
			return null;
		}
	}

	/**
	 * Insert a new pending row for a pair, or null when another request did first
	 *
	 * @throws Exception
	 */
	public function claim(int $fileId, int $promptVersion, string $fromHash, string $toHash, int $now): ?VersionSummary {
		// A plain insert: an entity leaves out fields that equal its defaults
		$qb = $this->db->getQueryBuilder();
		$qb->insert($this->getTableName())->values([
			'file_id' => $qb->createNamedParameter($fileId, IQueryBuilder::PARAM_INT),
			'prompt_version' => $qb->createNamedParameter($promptVersion, IQueryBuilder::PARAM_INT),
			'from_hash' => $qb->createNamedParameter($fromHash),
			'to_hash' => $qb->createNamedParameter($toHash),
			'state' => $qb->createNamedParameter(VersionSummary::STATE_PENDING, IQueryBuilder::PARAM_INT),
			'created_at' => $qb->createNamedParameter($now, IQueryBuilder::PARAM_INT),
			'updated_at' => $qb->createNamedParameter($now, IQueryBuilder::PARAM_INT),
		]);
		try {
			$qb->executeStatement();
		} catch (Exception $e) {
			if ($e->getReason() === Exception::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
				return null;
			}
			throw $e;
		}
		return $this->findById($qb->getLastInsertId());
	}

	/**
	 * Make a failed row pending again for a new task, unless another request already did
	 *
	 * @param int|null $taskId The task the row tracked when it was read
	 */
	public function reclaim(int $id, ?int $taskId, int $now): bool {
		$qb = $this->db->getQueryBuilder();
		$qb->update($this->getTableName())
			->set('state', $qb->createNamedParameter(VersionSummary::STATE_PENDING, IQueryBuilder::PARAM_INT))
			->set('task_id', $qb->createNamedParameter(null, IQueryBuilder::PARAM_NULL))
			->set('error_code', $qb->createNamedParameter(null, IQueryBuilder::PARAM_NULL))
			->set('error_message', $qb->createNamedParameter(null, IQueryBuilder::PARAM_NULL))
			// Kept for the retention period from the new request
			->set('created_at', $qb->createNamedParameter($now, IQueryBuilder::PARAM_INT))
			->set('updated_at', $qb->createNamedParameter($now, IQueryBuilder::PARAM_INT))
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('state', $qb->createNamedParameter(VersionSummary::STATE_FAILED, IQueryBuilder::PARAM_INT)))
			->andWhere($taskId === null
				? $qb->expr()->isNull('task_id')
				: $qb->expr()->eq('task_id', $qb->createNamedParameter($taskId, IQueryBuilder::PARAM_INT)));
		return $qb->executeStatement() === 1;
	}

	/**
	 * Record the task of a pending row that has none yet
	 */
	public function attachTask(int $id, int $taskId, int $now): bool {
		$qb = $this->db->getQueryBuilder();
		$qb->update($this->getTableName())
			->set('task_id', $qb->createNamedParameter($taskId, IQueryBuilder::PARAM_INT))
			->set('updated_at', $qb->createNamedParameter($now, IQueryBuilder::PARAM_INT))
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('state', $qb->createNamedParameter(VersionSummary::STATE_PENDING, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->isNull('task_id'));
		return $qb->executeStatement() === 1;
	}

	/**
	 * Store the outcome of a pending row's task, once
	 *
	 * @param int|null $taskId The task the outcome is of, or null for a row that never got one
	 */
	public function finish(int $id, ?int $taskId, int $state, ?string $summary, ?string $errorCode, ?string $errorMessage, int $now): bool {
		$qb = $this->db->getQueryBuilder();
		$qb->update($this->getTableName())
			->set('state', $qb->createNamedParameter($state, IQueryBuilder::PARAM_INT))
			->set('summary', $qb->createNamedParameter($summary))
			->set('error_code', $qb->createNamedParameter($errorCode))
			->set('error_message', $qb->createNamedParameter($errorMessage))
			->set('updated_at', $qb->createNamedParameter($now, IQueryBuilder::PARAM_INT))
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('state', $qb->createNamedParameter(VersionSummary::STATE_PENDING, IQueryBuilder::PARAM_INT)));
		if ($taskId === null) {
			$qb->andWhere($qb->expr()->isNull('task_id'));
		} else {
			$qb->andWhere($qb->expr()->eq('task_id', $qb->createNamedParameter($taskId, IQueryBuilder::PARAM_INT)));
		}
		return $qb->executeStatement() === 1;
	}

	/**
	 * Forget the core task of a row once it is deleted
	 */
	public function detachTask(int $id, int $taskId): void {
		$qb = $this->db->getQueryBuilder();
		$qb->update($this->getTableName())
			->set('task_id', $qb->createNamedParameter(null, IQueryBuilder::PARAM_NULL))
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->eq('task_id', $qb->createNamedParameter($taskId, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->neq('state', $qb->createNamedParameter(VersionSummary::STATE_PENDING, IQueryBuilder::PARAM_INT)));
		$qb->executeStatement();
	}

	public function hasAny(): bool {
		$qb = $this->db->getQueryBuilder();
		$qb->select('id')->from($this->getTableName())->setMaxResults(1);
		$result = $qb->executeQuery();
		$found = $result->fetchOne() !== false;
		$result->closeCursor();
		return $found;
	}

	/**
	 * @return list<VersionSummary>
	 */
	public function findByFileId(int $fileId): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('file_id', $qb->createNamedParameter($fileId, IQueryBuilder::PARAM_INT)));
		return $this->findEntities($qb);
	}

	/**
	 * @return list<VersionSummary>
	 */
	public function findSome(int $limit): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')->from($this->getTableName())->orderBy('id')->setMaxResults($limit);
		return $this->findEntities($qb);
	}

	/**
	 * Pending rows last changed before a time, with or without a task
	 *
	 * @return list<VersionSummary>
	 */
	public function findPendingBefore(int $before, bool $withTask, int $limit): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('state', $qb->createNamedParameter(VersionSummary::STATE_PENDING, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->lt('updated_at', $qb->createNamedParameter($before, IQueryBuilder::PARAM_INT)))
			->andWhere($withTask ? $qb->expr()->isNotNull('task_id') : $qb->expr()->isNull('task_id'))
			->orderBy('updated_at')
			->setMaxResults($limit);
		return $this->findEntities($qb);
	}

	/**
	 * Finished rows whose core task is not deleted yet
	 *
	 * @return list<VersionSummary>
	 */
	public function findFinishedWithTask(int $limit): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->neq('state', $qb->createNamedParameter(VersionSummary::STATE_PENDING, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->isNotNull('task_id'))
			->setMaxResults($limit);
		return $this->findEntities($qb);
	}

	/**
	 * @return list<VersionSummary>
	 */
	public function findCreatedBefore(int $before, int $limit): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->lt('created_at', $qb->createNamedParameter($before, IQueryBuilder::PARAM_INT)))
			->orderBy('created_at')
			->setMaxResults($limit);
		return $this->findEntities($qb);
	}

	/**
	 * Summaries of files that are gone from the file cache or in a trash bin,
	 * also with a folder deleted around them
	 *
	 * @return list<VersionSummary>
	 */
	public function findOfMissingFiles(int $limit): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('s.*')
			->from($this->getTableName(), 's')
			->leftJoin('s', 'filecache', 'f', $qb->expr()->eq('f.fileid', 's.file_id'))
			->where($qb->expr()->orX(
				$qb->expr()->isNull('f.fileid'),
				$qb->expr()->like('f.path', $qb->createNamedParameter($this->db->escapeLikeParameter('files_trashbin/') . '%')),
			))
			->orderBy('s.id')
			->setMaxResults($limit);
		return $this->findEntities($qb);
	}

	/**
	 * @param list<int> $ids
	 */
	public function deleteByIds(array $ids): void {
		foreach (array_chunk($ids, 1000) as $chunk) {
			$qb = $this->db->getQueryBuilder();
			$qb->delete($this->getTableName())
				->where($qb->expr()->in('id', $qb->createNamedParameter($chunk, IQueryBuilder::PARAM_INT_ARRAY)));
			$qb->executeStatement();
		}
	}

	public function addStart(int $now, string $userId): int {
		$qb = $this->db->getQueryBuilder();
		$qb->insert(self::STARTS)->values([
			'started_at' => $qb->createNamedParameter($now, IQueryBuilder::PARAM_INT),
			'user_id' => $qb->createNamedParameter($userId),
		]);
		$qb->executeStatement();
		return $qb->getLastInsertId();
	}

	public function removeStart(int $id): void {
		$qb = $this->db->getQueryBuilder();
		$qb->delete(self::STARTS)->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));
		$qb->executeStatement();
	}

	/**
	 * How many starts there were since a time, of everyone or of one person,
	 * and when the oldest was
	 *
	 * @return array{count: int, oldest: int|null}
	 */
	public function countStartsSince(int $since, ?string $userId = null): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select($qb->func()->count('id', 'count'))
			->selectAlias($qb->func()->min('started_at'), 'oldest')
			->from(self::STARTS)
			->where($qb->expr()->gte('started_at', $qb->createNamedParameter($since, IQueryBuilder::PARAM_INT)));
		if ($userId !== null) {
			$qb->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)));
		}
		$result = $qb->executeQuery();
		$row = $result->fetch();
		$result->closeCursor();
		return [
			'count' => (int)($row['count'] ?? 0),
			'oldest' => isset($row['oldest']) ? (int)$row['oldest'] : null,
		];
	}

	public function deleteStartsBefore(int $before): void {
		$qb = $this->db->getQueryBuilder();
		$qb->delete(self::STARTS)->where($qb->expr()->lt('started_at', $qb->createNamedParameter($before, IQueryBuilder::PARAM_INT)));
		$qb->executeStatement();
	}
}
