<?php

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/** @extends QBMapper<Step> */
class StepMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'text_steps', Step::class);
	}

	/**
	 * @return Step[]
	 */
	public function find(string $documentId, int $fromVersion): array {
		/* @var $qb IQueryBuilder */
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->gt('version', $qb->createNamedParameter($fromVersion)))
			->andWhere($qb->expr()->gt('id', $qb->createNamedParameter($fromVersion)));
		$qb
			->setMaxResults(1000)
			->orderBy('id');

		return $this->findEntities($qb);
	}

	/**
	 * @psalm-return ?positive-int
	 */
	public function getLatestVersion(string $documentId): ?int {
		/* @var $qb IQueryBuilder */
		$qb = $this->db->getQueryBuilder();
		$result = $qb->select('id')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->setMaxResults(1)
			->orderBy('id', 'DESC')
			->executeQuery();

		$data = $result->fetchAssociative();
		if ($data === false) {
			return null;
		}

		return $data['id'];
	}

	public function getBeforeVersion(string $documentId, int $version, int $offset): int {
		$qb = $this->db->getQueryBuilder();
		$result = $qb->select('id')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->lt('id', $qb->createNamedParameter($version)))
			->setMaxResults($offset)
			->orderBy('id', 'DESC')
			->executeQuery();

		$rows = $result->fetchAllAssociative();
		$data = end($rows);
		if ($data === false) {
			return $version;
		}

		return $data['id'];
	}

	public function deleteAll(string $documentId): void {
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->executeStatement();
	}

	public function clearAll(): void {
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
			->executeStatement();
	}

	/**
	 * Find documents with more than $keep steps that are older than $olderThan
	 * and included in the last saved version.
	 *
	 * @return list<array{documentId: string, lastSavedVersion: int}>
	 */
	public function findDocumentsWithSavedSteps(int $olderThan, int $keep): array {
		$qb = $this->db->getQueryBuilder();
		$result = $qb->select('st.document_id', 'd.last_saved_version')
			->from($this->getTableName(), 'st')
			->innerJoin('st', 'text_documents', 'd', $qb->expr()->eq('st.document_id', 'd.id'))
			->where($qb->expr()->lt('st.id', 'd.last_saved_version'))
			->andWhere($qb->expr()->lt('st.timestamp', $qb->createNamedParameter($olderThan, IQueryBuilder::PARAM_INT)))
			->groupBy('st.document_id', 'd.last_saved_version')
			->having($qb->expr()->gt($qb->func()->count('st.id'), $qb->createNamedParameter($keep, IQueryBuilder::PARAM_INT)))
			->executeQuery();

		$documents = [];
		while ($row = $result->fetchAssociative()) {
			$documents[] = [
				'documentId' => (string)$row['document_id'],
				'lastSavedVersion' => (int)$row['last_saved_version'],
			];
		}
		$result->closeCursor();
		return $documents;
	}

	public function deleteBeforeVersion(string $documentId, int $version, int $olderThan): int {
		$qb = $this->db->getQueryBuilder();
		return $qb->delete($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->lte('id', $qb->createNamedParameter($version)))
			->andWhere($qb->expr()->lt('timestamp', $qb->createNamedParameter($olderThan, IQueryBuilder::PARAM_INT)))
			->executeStatement();
	}

	public function deleteAfterVersion(string $documentId, int $version): int {
		$qb = $this->db->getQueryBuilder();
		return $qb->delete($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->gt('version', $qb->createNamedParameter($version)))
			->andWhere($qb->expr()->gt('id', $qb->createNamedParameter($version)))
			->executeStatement();
	}
}
