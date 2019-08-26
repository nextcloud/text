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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Text\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\QBMapper;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IDBConnection;
use OCP\Security\ISecureRandom;

/**
 * @method insert(Direct $entity) : Direct
 */
class DirectMapper extends QBMapper {

	public const TOKEN_TTL = 600000;

	/** @var ISecureRandom */
	protected $random;

	/**@var ITimeFactory */
	protected $timeFactory;

	public function __construct(IDBConnection $db,
								ISecureRandom $random,
								ITimeFactory $timeFactory) {
		parent::__construct($db, 'text_direct', Direct::class);

		$this->random = $random;
		$this->timeFactory = $timeFactory;
	}

	public function newToken(string $userId, int $fileId): Direct {
		$direct = new Direct();
		$direct->setUserId($userId);
		$direct->setFileId($fileId);
		$direct->setToken($this->random->generate(64, ISecureRandom::CHAR_DIGITS . ISecureRandom::CHAR_LOWER . ISecureRandom::CHAR_UPPER));
		$direct->setTimestamp($this->timeFactory->getTime());
		return $this->insert($direct);
	}

	/**
	 * @param string $token
	 * @return Direct
	 * @throws DoesNotExistException
	 */
	public function getByToken(string $token): Direct {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('token', $qb->createNamedParameter($token)));

		$cursor = $qb->execute();
		$row = $cursor->fetch();
		$cursor->closeCursor();

		//There can only be one as the token is unique
		if ($row === false) {
			throw new DoesNotExistException('Could not find token.');
		}

		$direct = Direct::fromRow($row);

		if (($direct->getTimestamp() + self::TOKEN_TTL) < $this->timeFactory->getTime()) {
			$this->delete($direct);
			throw new DoesNotExistException('Could not find token.');
		}

		return $direct;
	}
}
