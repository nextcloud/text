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


namespace OCA\Text\Controller;

use OCP\IEventSource;


class EventSource implements IEventSource {

	/**
	 * @var bool
	 */
	private $started = false;

	protected function init(): void {
		if ($this->started) {
			return;
		}
		$this->started = true;

		// prevent php output buffering, caching and nginx buffering
		while (ob_get_level()) {
			ob_end_clean();
		}
		header('Cache-Control: no-cache');
		header('X-Accel-Buffering: no');
		header("Content-Type: text/event-stream");
		flush();
	}

	/**
	 * Sends a message to the client
	 *
	 * If only one parameter is given, a typeless message will be sent with that parameter as data
	 *
	 * @param string $type
	 * @param mixed $data
	 *
	 * @throws \BadMethodCallException
	 */
	public function send($type, $data = null) {
		$this->validateMessage($type, $data);
		$this->init();
		if (is_null($data)) {
			$data = $type;
			$type = null;
		}

		if (!empty($type)) {
			echo 'event: ' . $type . PHP_EOL;
		}
		echo 'data: ' . json_encode($data) . PHP_EOL;

		echo PHP_EOL;
		flush();
	}

	/**
	 * Closes the connection of the event source
	 *
	 * It's best to let the client close the stream
	 */
	public function close() {
		$this->send(
			'__internal__', 'close'
		);
	}

	/**
	 * Makes sure we have a message we can use
	 *
	 * @param string $type
	 * @param mixed $data
	 */
	private function validateMessage($type, $data) {
		if ($data && !preg_match('/^[A-Za-z0-9_]+$/', $type)) {
			throw new \BadMethodCallException('Type needs to be alphanumeric (' . $type . ')');
		}
	}
}
