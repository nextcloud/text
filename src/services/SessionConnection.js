/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export class SessionConnection {
	#content
	closed
	#documentState
	#document
	#session
	#readOnly
	#hasOwner
	connection

	constructor(data, connection) {
		const { document, session, readOnly, content, documentState, hasOwner } =
			data
		this.#document = document
		this.#session = session
		this.#readOnly = readOnly
		this.#content = content
		this.#documentState = documentState
		this.#hasOwner = hasOwner
		this.connection = connection
		this.isPublic = !!connection.shareToken
		this.closed = false
	}

	get session() {
		return this.#session
	}

	get document() {
		return this.#document
	}

	get docStateVersion() {
		return this.#documentState ? this.#document.lastSavedVersion : 0
	}

	get state() {
		return {
			document: { ...this.#document, readOnly: this.#readOnly },
			session: this.#session,
			documentSource: this.#content || '',
			documentState: this.#documentState,
		}
	}

	get isClosed() {
		return this.closed
	}

	get hasOwner() {
		return this.#hasOwner
	}

	close() {
		this.closed = true
	}

	// To be used in Cypress tests only
	setBaseVersionEtag(baseVersionEtag) {
		this.#document.baseVersionEtag = baseVersionEtag
	}
}
