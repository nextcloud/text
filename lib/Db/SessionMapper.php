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
