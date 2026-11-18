<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Db;

use OCP\AppFramework\Db\Entity;
use OCP\DB\Types;

/**
 * The summary of the changes between two exact texts of a file
 *
 * @method int getFileId()
 * @method void setFileId(int $fileId)
 * @method int getPromptVersion()
 * @method void setPromptVersion(int $promptVersion)
 * @method string getFromHash()
 * @method void setFromHash(string $fromHash)
 * @method string getToHash()
 * @method void setToHash(string $toHash)
 * @method int getState()
 * @method void setState(int $state)
 * @method int|null getTaskId()
 * @method void setTaskId(?int $taskId)
 * @method string|null getSummary()
 * @method void setSummary(?string $summary)
 * @method string|null getErrorCode()
 * @method void setErrorCode(?string $errorCode)
 * @method string|null getErrorMessage()
 * @method void setErrorMessage(?string $errorMessage)
 * @method int getCreatedAt()
 * @method void setCreatedAt(int $createdAt)
 * @method int getUpdatedAt()
 * @method void setUpdatedAt(int $updatedAt)
 */
class VersionSummary extends Entity {
	public const int STATE_PENDING = 1;
	public const int STATE_DONE = 2;
	public const int STATE_FAILED = 3;

	public $id;
	protected int $fileId = 0;
	protected int $promptVersion = 0;
	protected string $fromHash = '';
	protected string $toHash = '';
	protected int $state = self::STATE_PENDING;
	protected ?int $taskId = null;
	protected ?string $summary = null;
	protected ?string $errorCode = null;
	protected ?string $errorMessage = null;
	protected int $createdAt = 0;
	protected int $updatedAt = 0;

	public function __construct() {
		$this->addType('fileId', Types::BIGINT);
		$this->addType('promptVersion', Types::SMALLINT);
		$this->addType('state', Types::SMALLINT);
		$this->addType('taskId', Types::BIGINT);
		$this->addType('createdAt', Types::BIGINT);
		$this->addType('updatedAt', Types::BIGINT);
	}
}
