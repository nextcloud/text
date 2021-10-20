<?php

declare(strict_types=1);

/**
 * @copyright Copyright (c) 2021 Julien Veyssier <eneiluj@posteo.net>
 *
 * @author Julien Veyssier <eneiluj@posteo.net>
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

namespace OCA\Text\Service;

use Exception;
use OCP\Files\Folder;
use Throwable;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\ServerException;
use OCA\Text\AppInfo\Application;
use OCP\Http\Client\IClientService;
use OCP\Files\IRootFolder;
use Psr\Log\LoggerInterface;
use OCP\Share\IManager as ShareManager;
use function json_encode;
use function preg_replace;

class ImageService {

	/**
	 * @var ShareManager
	 */
	private $shareManager;
	/**
	 * @var IRootFolder
	 */
	private $rootFolder;
	/**
	 * @var IClientService
	 */
	private $clientService;
	/**
	 * @var LoggerInterface
	 */
	private $logger;

	public function __construct(IRootFolder $rootFolder,
								LoggerInterface $logger,
								ShareManager $shareManager,
								IClientService $clientService) {
		$this->rootFolder = $rootFolder;
		$this->shareManager = $shareManager;
		$this->clientService = $clientService;
		$this->logger = $logger;
	}

	/**
	 * @param string $link
	 * @return array
	 */
	public function downloadImageLink(string $link, string $userId): array {
		$fileName = (string) time();
		$saveDir = $this->getOrCreateTextDirectory($userId);
		if ($saveDir !== null) {
			$savedFile = $saveDir->newFile($fileName);
			$resource = $savedFile->fopen('w');
			$res = $this->simpleDownload($link, $resource);
			if (is_resource($resource)) {
				fclose($resource);
			}
			$savedFile->touch();
			if (isset($res['Content-Type'])) {
				if (in_array($res['Content-Type'], ['image/jpg', 'image/jpeg'])) {
					$fileName = $fileName . '.jpg';
				} elseif ($res['Content-Type'] === 'image/png') {
					$fileName = $fileName . '.png';
				} else {
					return [
						'error' => 'Unsupported file type',
					];
				}
				$targetPath = $saveDir->getPath() . '/' . $fileName;
				$savedFile->move($targetPath);
				$path = preg_replace('/^files/', '', $savedFile->getInternalPath());
				// get file type and name
				return [
					'name' => $fileName,
					'path' => $path,
				];
			} else {
				return $res;
			}
		} else {
			return [
				'error' => 'Impossible to create /Text directory',
			];
		}
	}

	private function getOrCreateTextDirectory(string $userId): ?Folder {
		$userFolder = $this->rootFolder->getUserFolder($userId);
		if ($userFolder->nodeExists('/Text')) {
			$node = $userFolder->get('Text');
			//if ($node->getType() === FileInfo::TYPE_FOLDER) {
			if ($node instanceof Folder) {
				return $node;
			} else {
				return null;
			}
		} else {
			return $userFolder->newFolder('/Text');
		}
	}

	private function simpleDownload(string $url, $resource, array $params = [], string $method = 'GET'): array {
		$client = $this->clientService->newClient();
		try {
			$options = [
				// does not work with sink if SSE is enabled
				// 'sink' => $resource,
				// rather use stream and write to the file ourselves
				'stream' => true,
				'timeout' => 0,
				'headers' => [
					'User-Agent' => 'Nextcloud Text',
				],
			];

			if (count($params) > 0) {
				if ($method === 'GET') {
					$paramsContent = http_build_query($params);
					$url .= '?' . $paramsContent;
				} else {
					$options['body'] = json_encode($params);
				}
			}

			if ($method === 'GET') {
				$response = $client->get($url, $options);
			} elseif ($method === 'POST') {
				$response = $client->post($url, $options);
			} elseif ($method === 'PUT') {
				$response = $client->put($url, $options);
			} elseif ($method === 'DELETE') {
				$response = $client->delete($url, $options);
			} else {
				return ['error' => 'Bad HTTP method'];
			}
			$respCode = $response->getStatusCode();

			$body = $response->getBody();
			while (!feof($body)) {
				// write ~5 MB chunks
				$chunk = fread($body, 5000000);
				fwrite($resource, $chunk);
			}

			return ['Content-Type' => $response->getHeader('Content-Type')];
		} catch (ServerException | ClientException $e) {
			//$response = $e->getResponse();
			//if ($response->getStatusCode() === 401) {
			$this->logger->warning('Impossible to download image: '.$e->getMessage(), ['app' => Application::APP_NAME]);
			return ['error' => 'Impossible to download image'];
		} catch (ConnectException $e) {
			$this->logger->error('Connection error: ' . $e->getMessage(), ['app' => Application::APP_NAME]);
			return ['error' => 'Connection error'];
		} catch (Throwable | Exception $e) {
			$this->logger->error('Unknown error: ' . $e->getMessage(), ['app' => Application::APP_NAME]);
			return ['error' => 'Unknown error'];
		}
	}
}
