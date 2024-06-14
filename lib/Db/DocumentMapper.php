<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/** @extends QBMapper<Document> */
class DocumentMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'text_documents', Document::class);
	}

	/**
	 * @param $documentId
	 * @return Document
	 * @throws DoesNotExistException
	 */
	public function find(int $documentId): Document {
		/* @var $qb IQueryBuilder */
		$qb = $this->db->getQueryBuilder();
		$result = $qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('id', $qb->createNamedParameter($documentId)))
			->executeQuery();

		$data = $result->fetch();
		$result->closeCursor();
		if ($data === false) {
			throw new DoesNotExistException('Document doesn\'t exist');
		}
		return Document::fromRow($data);
	}

	public function findAll(): array {
		$qb = $this->db->getQueryBuilder();
		$result = $qb->select('*')
			->from($this->getTableName())
			->executeQuery();

		return $this->findEntities($qb);
	}
}
