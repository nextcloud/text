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
	public function find(int $documentId, int $fromVersion): array {
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
	public function getLatestVersion(int $documentId): ?int {
		/* @var $qb IQueryBuilder */
		$qb = $this->db->getQueryBuilder();
		$result = $qb->select('id')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->setMaxResults(1)
			->orderBy('id', 'DESC')
			->executeQuery();

		$data = $result->fetch();
		if ($data === false) {
			return null;
		}

		return $data['id'];
	}

	public function getBeforeVersion(int $documentId, int $version, int $offset): int {
		$qb = $this->db->getQueryBuilder();
		$result = $qb->select('id')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->lt('id', $qb->createNamedParameter($version)))
			->setMaxResults($offset)
			->orderBy('id', 'DESC')
			->executeQuery();

		$rows = $result->fetchAll();
		$data = end($rows);
		if ($data === false) {
			return $version;
		}

		return $data['id'];
	}

	public function deleteAll(int $documentId): void {
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

	// not in use right now
	public function deleteBeforeVersion(int $documentId, int $version): int {
		$qb = $this->db->getQueryBuilder();
		return $qb->delete($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->lte('id', $qb->createNamedParameter($version)))
			->executeStatement();
	}

	public function deleteAfterVersion(int $documentId, int $version): int {
		$qb = $this->db->getQueryBuilder();
		return $qb->delete($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->gt('version', $qb->createNamedParameter($version)))
			->andWhere($qb->expr()->gt('id', $qb->createNamedParameter($version)))
			->executeStatement();
	}
}
