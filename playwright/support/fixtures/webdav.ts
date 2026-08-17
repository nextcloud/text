/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { User } from './User.ts'

import { JSDOM } from 'jsdom'

/** A parsed set of WebDAV properties for a single resource. Includes `d:href` for path-based lookup. */
export type PropfindResult = Record<string, string>

export const PROPERTY_WORKSPACE = 'nc:rich-workspace'
export const PROPERTY_WORKSPACE_FILE = 'nc:rich-workspace-file'
export const PROPERTY_WORKSPACE_FLAT = 'nc:rich-workspace-flat'
export const PROPERTY_WORKSPACE_FILE_FLAT = 'nc:rich-workspace-file-flat'

const DAV_NS = 'DAV:'
const NC_NS = 'http://nextcloud.org/ns'
const OC_NS = 'http://owncloud.org/ns'

/**
 * Delete a WebDAV resource (file or folder). Silently ignores 404.
 *
 * @param user The user to do the request
 * @param path The WebDAV path to the file or folder
 */
export async function deleteWebDAVResource(user: User, path: string): Promise<void> {
	await user.request.delete(`/remote.php/webdav${path}`, { failOnStatusCode: false })
}

/**
 * Send a PROPFIND request and return one parsed result per d:response.
 *
 * The first entry is always the requested resource itself; subsequent entries
 * are its children (depth > 0). Each entry contains a `d:href` key so callers
 * can locate a specific resource by path without relying on response ordering:
 *
 *   const folder = results.find(r => r['d:href']?.endsWith('/my-folder/'))
 *
 * Only properties from `200 OK` propstats are included; `404 Not Found` propstats
 * are silently skipped.
 *
 * @param user The user to do the request
 * @param path The WebDAV path to query; use '/' for the user root
 * @param depth The Depth header value (0 or 1)
 * @param properties DAV properties to request, e.g. ['nc:rich-workspace-flat']. Defaults to nc:rich-workspace and nc:rich-workspace-file.
 */
export async function propfindFolder(
	user: User,
	path: string,
	depth: number,
	properties: string[] | null = null,
): Promise<PropfindResult[]> {
	const defaultProperties = [PROPERTY_WORKSPACE, PROPERTY_WORKSPACE_FILE]
	const props = properties ?? defaultProperties
	const propsXml = props.map((p) => `<${p} />`).join('\n\t\t')

	const requestPath = `/remote.php/webdav${path}`
	const response = await user.request.fetch(requestPath, {
		method: 'PROPFIND',
		headers: {
			Depth: String(depth),
			'Content-Type': 'application/xml',
		},
		data: `<?xml version="1.0"?>
<d:propfind xmlns:d="DAV:"
    xmlns:oc="http://owncloud.org/ns"
    xmlns:nc="http://nextcloud.org/ns">
  <d:prop>
    ${propsXml}
  </d:prop>
</d:propfind>`,
		failOnStatusCode: false,
	})

	const body = await response.text()
	const xmlDoc = new JSDOM(body, { contentType: 'text/xml' }).window.document
	const responses = xmlDoc.getElementsByTagNameNS(DAV_NS, 'response')

	return Array.from(responses).map((resp) => {
		const entry: PropfindResult = {}
		entry['d:href'] = resp.getElementsByTagNameNS(DAV_NS, 'href')[0]?.textContent ?? ''

		Array.from(resp.getElementsByTagNameNS(DAV_NS, 'propstat')).forEach((propStat) => {
			const status = propStat.getElementsByTagNameNS(DAV_NS, 'status')[0]?.textContent
			if (status?.includes('404')) {
				return
			}

			const prop = propStat.getElementsByTagNameNS(DAV_NS, 'prop')[0]
			Array.from(prop?.children ?? []).forEach((child) => {
				const ns = child.namespaceURI
				const local = child.localName
				const key = ns === NC_NS
					? `nc:${local}`
					: ns === OC_NS
						? `oc:${local}`
						: local
				entry[key] = child.textContent || ''
			})
		})
		return entry
	})
}
