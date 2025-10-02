<?php

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Db;

use OCA\Text\Service\SessionService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/** @extends QBMapper<Session> */
class SessionMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'text_sessions', Session::class);
	}

	/**
	 * @return array
	 */
	public function findAllDocuments(): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName());

		return $this->findEntities($qb);
	}

	/**
	 * @param $documentId
	 * @param $sessionId
	 * @param $token
	 * @return Session
	 * @throws DoesNotExistException
	 */
	public function find(int $documentId, int $sessionId, string $token): Session {
		/* @var $qb IQueryBuilder */
		$qb = $this->db->getQueryBuilder();
		$result = $qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->eq('id', $qb->createNamedParameter($sessionId)))
			->andWhere($qb->expr()->eq('token', $qb->createNamedParameter($token)))
			->executeQuery();

		$data = $result->fetch();
		$result->closeCursor();
		if ($data === false) {
			throw new DoesNotExistException('Session is invalid');
		}
		return Session::fromRow($data);
	}

	/**
	 * @return Session[]
	 *
	 * @psalm-return array<Session>
	 */
	public function findAll(int $documentId): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('id', 'color', 'document_id', 'last_awareness_message', 'last_contact', 'user_id', 'guest_name')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)));

		return $this->findEntities($qb);
	}

	public function countAll(int $documentId): int {
		$qb = $this->db->getQueryBuilder();
		$qb->select('id', 'color', 'document_id', 'last_awareness_message', 'last_contact', 'user_id', 'guest_name')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)));
		$result = $qb->executeQuery();
		$count = (int)$result->fetchOne();
		$result->closeCursor();
		return $count;
	}

	/**
	 * @return Session[]
	 *
	 * @psalm-return array<Session>
	 */
	public function findAllActive(int $documentId): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('id', 'color', 'document_id', 'last_awareness_message', 'last_contact', 'user_id', 'guest_name')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->gt('last_contact', $qb->createNamedParameter(time() - SessionService::SESSION_VALID_TIME)));

		return $this->findEntities($qb);
	}

	/**
	 * @return Session[]
	 *
	 * @psalm-return array<Session>
	 */
	public function findAllInactive(): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('id', 'color', 'document_id', 'last_awareness_message', 'last_contact', 'user_id', 'guest_name')
			->from($this->getTableName())
			->where($qb->expr()->lt('last_contact', $qb->createNamedParameter(time() - SessionService::SESSION_VALID_TIME)));

		return $this->findEntities($qb);
	}

	public function deleteInactiveWithoutSteps(?int $documentId = null): int {
		$lastContact = time() - SessionService::SESSION_VALID_TIME;

		$inactiveSessionBuilder = $this->db->getQueryBuilder();
		$inactiveSessionBuilder->select('s.id')
			->from('text_sessions', 's')
			->leftJoin('s', 'text_steps', 'st', $inactiveSessionBuilder->expr()->eq('st.session_id', 's.id'))
			->where($inactiveSessionBuilder->expr()->lt('last_contact', $inactiveSessionBuilder->createNamedParameter($lastContact)))
			->andWhere($inactiveSessionBuilder->expr()->isNull('st.id'));
		if ($documentId !== null) {
			$inactiveSessionBuilder->andWhere($inactiveSessionBuilder->expr()->eq('s.document_id', $inactiveSessionBuilder->createNamedParameter($documentId)));
		}
		$result = $inactiveSessionBuilder->executeQuery();
		$documentIds = array_map(function ($row) {
			return (int)$row['id'];
		}, $result->fetchAll());
		$result->closeCursor();

		$chunks = array_chunk($documentIds, 500);

		$deleteBuilder = $this->db->getQueryBuilder();
		$deleteBuilder->delete($this->getTableName())
			->where($deleteBuilder->expr()->in('id', $deleteBuilder->createParameter('ids'), IQueryBuilder::PARAM_INT_ARRAY));

		$deletedCount = 0;
		foreach ($chunks as $ids) {
			$deleteBuilder->setParameter('ids', $ids, IQueryBuilder::PARAM_INT_ARRAY);

			$deletedCount += $deleteBuilder->executeStatement();
		}
		return $deletedCount;
	}

	public function deleteOldSessions(int $ageInSeconds): int {
		$startTime = microtime(true);
		$maxExecutionSeconds = 30;
		$batchSize = 1000;
		$deletedCount = 0;
		$ageThreshold = time() - $ageInSeconds;

		do {
			$oldSessionsQb = $this->db->getQueryBuilder();
			$result = $oldSessionsQb->select('id')
				->from('text_sessions')
				->where($oldSessionsQb->expr()->lt('last_contact', $oldSessionsQb->createNamedParameter($ageThreshold)))
				->setMaxResults($batchSize)
				->executeQuery();

			$sessionIds = array_map(function ($row) {
				return (int)$row['id'];
			}, $result->fetchAll());
			$result->closeCursor();

			if (empty($sessionIds)) {
				break;
			}

			$deleteSessionsQb = $this->db->getQueryBuilder();
			$batchDeleted = $deleteSessionsQb->delete('text_sessions')
				->where($deleteSessionsQb->expr()->in('id', $deleteSessionsQb->createParameter('ids'), IQueryBuilder::PARAM_INT_ARRAY))
				->setParameter('ids', $sessionIds, IQueryBuilder::PARAM_INT_ARRAY)
				->executeStatement();

			$deletedCount += $batchDeleted;
		} while ((microtime(true) - $startTime) < $maxExecutionSeconds);

		return $deletedCount;
	}

	public function deleteOrphanedSteps(int $ageInSeconds): int {
		$startTime = microtime(true);
		$maxExecutionSeconds = 30;
		$batchSize = 1000;
		$deletedCount = 0;
		$ageThreshold = time() - $ageInSeconds;

		do {
			$orphanedStepsQb = $this->db->getQueryBuilder();
			$orphanedStepsQb->select('st.id')
				->from('text_steps', 'st')
				->leftJoin('st', 'text_sessions', 's', $orphanedStepsQb->expr()->eq('st.document_id', 's.document_id'))
				->leftJoin('st', 'text_documents', 'd', $orphanedStepsQb->expr()->eq('st.document_id', 'd.id'))
				->where($orphanedStepsQb->expr()->isNull('s.id'))
				->andWhere($orphanedStepsQb->expr()->lt('st.timestamp', $orphanedStepsQb->createNamedParameter($ageThreshold)))
				->andWhere(
					$orphanedStepsQb->expr()->orX(
						$orphanedStepsQb->expr()->isNull('d.id'),
						$orphanedStepsQb->expr()->lt('st.id', 'd.last_saved_version')
					)
				)
				->setMaxResults($batchSize);

			$result = $orphanedStepsQb->executeQuery();
			$stepIds = array_map(function ($row) {
				return (int)$row['id'];
			}, $result->fetchAll());
			$result->closeCursor();

			if (empty($stepIds)) {
				break;
			}

			$deleteQb = $this->db->getQueryBuilder();
			$batchDeleted = $deleteQb->delete('text_steps')
				->where($deleteQb->expr()->in('id', $deleteQb->createParameter('ids'), IQueryBuilder::PARAM_INT_ARRAY))
				->setParameter('ids', $stepIds, IQueryBuilder::PARAM_INT_ARRAY)
				->executeStatement();

			$deletedCount += $batchDeleted;
		} while ((microtime(true) - $startTime) < $maxExecutionSeconds);

		return $deletedCount;
	}

	public function deleteByDocumentId(int $documentId): int {
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)));
		return $qb->executeStatement();
	}

	public function clearAll(): void {
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
			->executeStatement();
	}

	public function isUserInDocument(int $documentId, string $userId): bool {
		$qb = $this->db->getQueryBuilder();
		$result = $qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)))
			->setMaxResults(1)
			->executeQuery();

		$data = $result->fetch();
		$result->closeCursor();
		if ($data === false) {
			return false;
		}

		return true;
	}
}
