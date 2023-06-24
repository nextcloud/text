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

namespace OCA\Text\DirectEditing;

use OCA\Text\AppInfo\Application;
use OCA\Text\Service\ApiService;
use OCP\AppFramework\Http\NotFoundResponse;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Services\IInitialState;
use OCP\DirectEditing\IEditor;
use OCP\DirectEditing\IToken;
use OCP\Files\InvalidPathException;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IL10N;
use OCP\Util;

class TextDirectEditor implements IEditor {

	/** @var IL10N */
	private $l10n;

	/** @var IInitialState */
	private $initialStateService;

	/** @var ApiService */
	private $apiService;

	public function __construct(IL10N $l10n, IInitialState $initialStateService, ApiService $apiService) {
		$this->l10n = $l10n;
		$this->initialStateService = $initialStateService;
		$this->apiService = $apiService;
	}

	/**
	 * Return a unique identifier for the editor
	 *
	 * e.g. richdocuments
	 *
	 * @return string
	 */
	public function getId(): string {
		return Application::APP_NAME;
	}

	/**
	 * Return a readable name for the editor
	 *
	 * e.g. Collabora Online
	 *
	 * @return string
	 */
	public function getName(): string {
		return $this->l10n->t('Nextcloud Text');
	}

	/**
	 * A list of mimetypes that should open the editor by default
	 *
	 * @return string[]
	 */
	public function getMimetypes(): array {
		return [
			'text/markdown',
			'text/plain',
			'application/cmd',
			'application/x-empty',
			'application/x-msdos-program',
			'application/javascript',
			'application/json',
			'application/x-perl',
			'application/x-php',
			'application/x-tex',
			'application/xml',
			'application/yaml',
			'text/css',
			'text/csv',
			'text/html',
			'text/org',
			'text/x-c',
			'text/x-c++src',
			'text/x-h',
			'text/x-java-source',
			'text/x-ldif',
			'text/x-python',
			'text/x-shellscript',
		];
	}

	/**
	 * A list of mimetypes that can be opened in the editor optionally
	 *
	 * @return string[]
	 */
	public function getMimetypesOptional(): array {
		return [];
	}

	/**
	 * Return a list of file creation options to be presented to the user
	 *
	 * @return TextDocumentCreator[]
	 */
	public function getCreators(): array {
		return [
			new TextDocumentCreator($this->l10n),
		];
	}

	/**
	 * Return if the view is able to securely view a file without downloading it to the browser
	 *
	 * @return bool
	 */
	public function isSecure(): bool {
		return false;
	}

	/**
	 * Return a template response for displaying the editor
	 *
	 * open can only be called once when the client requests the editor with a one-time-use token
	 * For handling editing and later requests, editors need to impelement their own token handling and take care of invalidation
	 *
	 * This behavior is similar to the current direct editing implementation in collabora where we generate a one-time token and switch over to the regular wopi token for the actual editing/saving process
	 *
	 * @param IToken $token
	 * @return Response
	 */
	public function open(IToken $token): Response {
		$token->useTokenScope();
		try {
			$session = $this->apiService->create($token->getFile()->getId());
			$this->initialStateService->provideInitialState('file', [
				'fileId' => $token->getFile()->getId(),
				'mimetype' => $token->getFile()->getMimeType(),
				'session' => \json_encode($session->getData())
			]);
			$this->initialStateService->provideInitialState('directEditingToken', $token->getToken());
			Util::addScript('text', 'text-text');
			return new TemplateResponse('text', 'main', [], 'base');
		} catch (InvalidPathException $e) {
		} catch (NotFoundException $e) {
		} catch (NotPermittedException $e) {
		}
		return new NotFoundResponse();
	}
}
