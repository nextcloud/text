<?php
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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
