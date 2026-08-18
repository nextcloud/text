<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\Exception;

use Throwable;

class DocumentSaveConflictException extends \Exception {

	public function __construct(
		private readonly string $content,
		int $code = 0,
		?Throwable $previous = null,
	) {
		$message = 'File changed in the meantime from outside';
		parent::__construct($message, $code, $previous);
	}

	public function getContent(): string {
		return $this->content;
	}
}
