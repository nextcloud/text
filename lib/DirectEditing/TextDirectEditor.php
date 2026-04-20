<?php

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Text\DirectEditing;

use OCA\Text\AppInfo\Application;
use OCA\Text\Service\ApiService;
use OCA\Text\Service\InitialStateProvider;
use OCP\AppFramework\Http\NotFoundResponse;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\DirectEditing\IEditor;
use OCP\DirectEditing\IToken;
use OCP\Files\InvalidPathException;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;
use OCP\IAppConfig;
use OCP\IL10N;
use OCP\Util;

class TextDirectEditor implements IEditor {

	/** @var IL10N */
	private $l10n;

	/** @var InitialStateProvider */
	private $initialStateProvider;

	/** @var ApiService */
	private $apiService;

	/**
	 * @var IAppConfig
	 */
	private $appConfig;

	public function __construct(IL10N $l10n, InitialStateProvider $initialStateProvider, ApiService $apiService, IAppConfig $appConfig) {
		$this->l10n = $l10n;
		$this->initialStateProvider = $initialStateProvider;
		$this->apiService = $apiService;
		$this->appConfig = $appConfig;
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
			'text/x-nfo',
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
			new TextDocumentCreator($this->l10n, $this->appConfig),
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
			$this->initialStateProvider->provideFile([
				'fileId' => $token->getFile()->getId(),
				'mimetype' => $token->getFile()->getMimeType(),
				'session' => \json_encode($session->getData())
			]);
			$this->initialStateProvider->provideDirectEditToken($token->getToken());
			$this->initialStateProvider->provideState();
			Util::addScript('text', 'text-text');
			Util::addStyle('text', 'text-text');
			return new TemplateResponse('text', 'main', [], 'base');
		} catch (InvalidPathException $e) {
		} catch (NotFoundException $e) {
		} catch (NotPermittedException $e) {
		}
		return new NotFoundResponse();
	}
}
