<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2022 Raul Ferreira Fuentes <raul@nextcloud.com>
 *
 * @author Raul Ferreira Fuentes <raul@nextcloud.com>
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

namespace OCA\Text;

use OCA\Text\Service\EncodingService;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;

/**
 * Wrapper around a ISimpleFile object to ensure that it is correctly encoded (UTF-8) for the text app.
 */
class TextFile implements ISimpleFile {

	/** @var ISimpleFile */
	private $file;
	/** @var EncodingService */
	private $encodingService;

	public function __construct(ISimpleFile $file, EncodingService $encodingService) {
		$this->file = $file;
		$this->encodingService = $encodingService;
	}

	public function getName() {
		return $this->file->getName();
	}

	public function getSize() {
		return $this->file->getSize();
	}

	public function getETag() {
		return $this->file->getETag();
	}

	public function getMTime() {
		return $this->file->getMTime();
	}

	public function getContent() {
		$content = $this->encodingService->encodeToUtf8($this->file->getContent());
		if (!$content) {
			throw new NotFoundException('File not compatible with text because it could not be encoded to UTF-8.');
		}

		return $content;
	}

	public function putContent($data) {
		return $this->file->putContent($data);
	}

	public function delete() {
		$this->file->delete();
	}

	public function getMimeType() {
		return 'text/plain;encoding=utf-8';
	}

	public function getExtension(): string {
		return $this->file->getExtension();
	}

	public function read() {
		return $this->file->read();
	}

	public function write() {
		return $this->file->write();
	}
}
