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

	public function find($documentId, $fromVersion, $lastAckedVersion = null) {
		/* @var $qb IQueryBuilder */
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->gt('version', $qb->createNamedParameter($fromVersion)));
		if ($lastAckedVersion) {
			$qb->andWhere($qb->expr()->lte('version', $qb->createNamedParameter($lastAckedVersion)));
		}
		$qb
			->setMaxResults(1000)
			->orderBy('version')
			->orderBy('id');

		return $this->findEntities($qb);
	}

	public function getLatestVersion($documentId): ?int {
		/* @var $qb IQueryBuilder */
		$qb = $this->db->getQueryBuilder();
		$result = $qb->select('version')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->setMaxResults(1)
			->orderBy('version', 'DESC')
			->execute();

		$data = $result->fetch();
		if ($data === false) {
			return null;
		}

		return $data['version'];
	}

	public function deleteAll($documentId): void {
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->executeStatement();
	}

	public function deleteBeforeVersion($documentId, $version): void {
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->lte('version', $qb->createNamedParameter($version)))
			->executeStatement();
	}

	public function deleteAfterVersion($documentId, $version): int {
		$qb = $this->db->getQueryBuilder();
		return $qb->delete($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->gt('version', $qb->createNamedParameter($version)))
			->executeStatement();
	}
}
