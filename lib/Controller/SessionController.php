<?php
declare(strict_types=1);


namespace OCA\Text\Controller;

use OCA\Text\Service\DocumentService;
use OCA\Text\Service\SessionService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\FileDisplayResponse;
use OCP\AppFramework\Http\NotFoundResponse;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException;
use OCP\ICacheFactory;
use OCP\IRequest;
use OCP\ITempManager;
use OCP\Security\ISecureRandom;

class SessionController extends Controller {

	private $cache;
	private $sessionService;
	private $documentService;

	public function __construct(string $appName, IRequest $request, ICacheFactory $cacheFactory, SessionService $sessionService, DocumentService $documentService) {
		parent::__construct($appName, $request);

		$this->cache = $cacheFactory->createDistributed('textSession');
		$this->sessionService = $sessionService;
		$this->documentService = $documentService;
	}

	/**
	 * Initialize the session as a client so it can use the other methods
	 *
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 */
	public function create($file) {
		$document = $this->documentService->createDocumentByPath($file);
		$session = $this->sessionService->initSession($document->getId());
		return new DataResponse([
			'document' => $document,
			'session' => $session
		]);
	}

	/**
	 *
	 *
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 */
	public function fetch($documentId, $sessionId, $token) {
		if ($this->sessionService->isValidSession($documentId, $sessionId, $token)) {
			$this->sessionService->removeInactiveSessions($documentId);
			$file = $this->documentService->getBaseFile($documentId);
			return new FileDisplayResponse($file);
		}
		return new NotFoundResponse();
	}

	/**
	 * Close existing session when quiting the client gracefully
	 * This reduces some cleanup work if used by the client
	 *
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 */
	public function close($documentId, $sessionId, $token): DataResponse {
		// TODO: To implement
		return new DataResponse([]);
	}

	/**
	 * Client tries to commit a set of transactions to the document
	 *
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 */
	public function push($documentId, $sessionId, $token, $version, $steps): DataResponse {
		if ($this->sessionService->isValidSession($documentId, $sessionId, $token)) {
			try {
				$steps = $this->documentService->addStep($documentId, $sessionId, $steps, $version);
			} catch (\Exception $e) {
				return new DataResponse($e->getMessage(), 500);
			}
			return new DataResponse($steps);
		}
		return new DataResponse([], 500);
	}

	/**
	 * Eventsource based handler
	 *
	 * @NoCSRFRequired
	 * @NoAdminRequired
	 */
	public function sync($documentId, $version = 0): DataResponse {
		if ($version === $this->cache->get('document-version-'.$documentId)) {
			return new DataResponse(['steps' => []]);
		}
		return new DataResponse([
			'steps' => $this->documentService->getSteps($documentId, $version),
			'sessions' => $this->sessionService->getActiveSessions($documentId)
		]);
	}

}
