/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare module '@nextcloud/event-bus' {
	interface NextcloudEvents {
		'text:editor:attachments:updated': { attachmentSrcs: sting[] }
		'text:editor:full-width': { value: boolean }
		'text:editor:search-results': { totalMatches: number, matchIndex: number }
		'text:toc:toggle': { visible: boolean } | void
		'text:toc:toggled': boolean
		'text:toc:pin': { fileId: number, keep: boolean }
	}
}

export {}
