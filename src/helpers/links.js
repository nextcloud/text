/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { loadState } from '@nextcloud/initial-state'
import { generateUrl } from '@nextcloud/router'

const domHref = function(node, relativePath) {
	const ref = node.attrs.href
	if (!ref) {
		return ref
	}
	if (!window.OCA?.Viewer) {
		return ref
	}
	if (ref.match(/^[a-zA-Z]*:/)) {
		return ref
	}
	if (ref.startsWith('#')) {
		return ref
	}
	// Don't rewrite links in collectives app context
	if (loadState('core', 'active-app', '') === 'collectives') {
		return ref
	}
	// Don't rewrite links to the collectives app
	if (ref.includes('/apps/collectives/')) {
		return ref
	}

	// Rewrite links with old format from file picker to `/f/<fileId>`
	const match = ref.match(/^([^?]*)\?fileId=(\d+)/)
	if (match) {
		const [, , id] = match
		return (new URL(generateUrl(`/f/${id}`), window.origin)).href
	}
	return ref
}

const parseHref = function(dom) {
	const ref = dom.getAttribute('href')
	if (!ref) {
		return ref
	}
	const match = ref.match(/\?dir=([^&]*)&openfile=([^&]*)#relPath=([^&]*)/)
	if (match) {
		const [, , id] = match
		return (new URL(generateUrl(`/f/${id}`), window.origin)).href
	}
	return ref
}

const isLinkToSelfWithHash = function(href) {
	const locationNoHash = window.location.origin + window.location.pathname + window.location.search
	return href?.startsWith('#') || href?.startsWith(locationNoHash + '#')
}

export {
	domHref,
	parseHref,
	isLinkToSelfWithHash,
}
