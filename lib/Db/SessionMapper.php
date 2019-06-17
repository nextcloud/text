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

/**
 * @method Session update(Session $session)
 * @method Session insert(Session $session)
 */
class SessionMapper extends QBMapper {

	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'text_sessions', Session::class);
	}

	/**
	 * @param $documentId
	 * @param $sessionId
	 * @param $token
	 * @return Session
	 * @throws DoesNotExistException
	 */
	public function find($documentId, $sessionId, $token): Session {
		/* @var $qb IQueryBuilder */
		$qb = $this->db->getQueryBuilder();
		$result = $qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->eq('id', $qb->createNamedParameter($sessionId)))
			->andWhere($qb->expr()->eq('token', $qb->createNamedParameter($token)))
			->execute();

		$data = $result->fetch();
		$result->closeCursor();
		if ($data === false) {
			throw new DoesNotExistException('Session is invalid');
		}
		return Session::fromRow($data);
	}

	public function findAllActive($documentId) {
		/* @var $qb IQueryBuilder */
		$qb = $this->db->getQueryBuilder();
		$qb->select('id','color','document_id', 'last_contact','user_id','guest_name')
			->from($this->getTableName())
			->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
			->andWhere($qb->expr()->gt('last_contact', $qb->createNamedParameter(time()-SessionService::SESSION_VALID_TIME)))
			->execute();

		return $this->findEntities($qb);
	}

	public function findAllInactive() {
		/* @var $qb IQueryBuilder */
		$qb = $this->db->getQueryBuilder();
		$qb->select('id','color','document_id', 'last_contact','user_id','guest_name')
			->from($this->getTableName())
			->where($qb->expr()->lt('last_contact', $qb->createNamedParameter(time()-SessionService::SESSION_VALID_TIME)))
			->execute();

		return $this->findEntities($qb);
	}

	public function deleteInactive($documentId = -1) {
		/* @var $qb IQueryBuilder */
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName());
		if ($documentId === null) {
			$qb->where($qb->expr()->lt('last_contact', $qb->createNamedParameter(time()-SessionService::SESSION_VALID_TIME)));
		} else {
			$qb->where($qb->expr()->eq('document_id', $qb->createNamedParameter($documentId)))
				->andWhere($qb->expr()->lt('last_contact', $qb->createNamedParameter(time()-SessionService::SESSION_VALID_TIME)));
		}
		return $qb->execute();
	}

}
