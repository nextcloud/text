/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { INode, ISidebarContext } from '@nextcloud/files'

import CreationSvg from '@mdi/svg/svg/creation.svg?raw'
import { FileType, Permission, registerSidebarAction } from '@nextcloud/files'
import { loadState } from '@nextcloud/initial-state'
import { t } from '@nextcloud/l10n'
import { isPublicShare } from '@nextcloud/sharing/public'
import { openMimetypesMarkdown } from '../helpers/mime.js'

/**
 * Whether the Files sidebar offers to summarize the recent changes of a node.
 *
 * @param context What the sidebar shows.
 * @param context.node The node it shows.
 */
export function canSummarize({ node }: ISidebarContext): boolean {
	return loadState('text', 'version_summaries', false)
		&& !isPublicShare()
		&& node.type === FileType.File
		&& openMimetypesMarkdown.includes(node.mime ?? '')
		&& (node.permissions & Permission.READ) !== 0
		&& !node.attributes?.['e2ee-is-encrypted']
		&& !node.attributes?.['is-encrypted']
		&& isDownloadable(node)
}

/**
 * Whether the content may leave the server, as the Files app decides it: a
 * summary sends it to the AI provider, which a share without downloads forbids.
 *
 * @param node The node.
 */
function isDownloadable(node: INode): boolean {
	const hideDownload = node.attributes?.['hide-download']
	if (hideDownload === true || hideDownload === 'true') {
		return false
	}
	return shareAttributes(node).find(({ scope, key }) => scope === 'permissions' && key === 'download')?.value !== false
}

/**
 * The share attributes of a node, as text or already read; none when they
 * cannot be read, as the server checks downloads again.
 *
 * @param node The node.
 */
function shareAttributes(node: INode): { scope: string, key: string, value: unknown }[] {
	const raw = node.attributes?.['share-attributes']
	if (Array.isArray(raw)) {
		return raw
	}
	try {
		const parsed = JSON.parse(typeof raw === 'string' && raw !== '' ? raw : '[]')
		return Array.isArray(parsed) ? parsed : []
	} catch {
		return []
	}
}

/**
 * Offer "Summarize recent changes" in the actions of the Files sidebar.
 */
export function registerSummarizeRecentChanges() {
	registerSidebarAction({
		id: 'text-summarize-changes',
		order: 50,
		displayName: () => t('text', 'Summarize recent changes'),
		iconSvgInline: () => CreationSvg,
		enabled: canSummarize,
		onClick: async ({ node }) => {
			const { summarizeRecentChanges } = await import('./summarizeRecentChanges.ts')
			await summarizeRecentChanges(node)
		},
	})
}
