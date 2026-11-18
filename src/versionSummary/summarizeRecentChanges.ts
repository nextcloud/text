/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IFile, INode } from '@nextcloud/files'
import type { VersionEntry } from '../comparison/versionEnds.ts'

import { showError, showInfo } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import { getViewer } from '@nextcloud/viewer'
import { versionNode } from '../comparison/versionEnds.ts'
import { useFileVersions } from '../comparison/versions.ts'
import { logger } from '../helpers/logger.ts'

/** How much older than the current file the start of "recent" is */
const RECENT_SECONDS = 3600

/**
 * Where the recent changes start: the newest version at least an hour older
 * than the latest change, or else the oldest version kept. The latest change
 * is the newest version when restoring one set the current file's time back.
 *
 * @param versions The current file first, then its versions, newest first.
 */
export function recentChangesBase(versions: VersionEntry[]): VersionEntry | undefined {
	const [current, ...older] = versions
	if (!current || older.length === 0) {
		return undefined
	}
	const latest = Math.max(current.mtime, older[0]!.mtime)
	return older.find(({ mtime }) => mtime <= latest - RECENT_SECONDS) ?? older.at(-1)
}

/**
 * Compare the recent changes of a file in the list of changes, where the user
 * can summarize them. The versions are asked for now, so a save since the
 * sidebar opened counts; the comparison shows the last saved content.
 *
 * @param node The file.
 */
export async function summarizeRecentChanges(node: INode) {
	const fileId = node.fileid!
	// Fetched again, and kept for the pickers of the comparison
	const fileVersions = useFileVersions(fileId)
	await fileVersions.refresh()
	const versions = fileVersions.versions.value
	const path = fileVersions.path.value
	if (fileVersions.failed.value || !versions || path === undefined) {
		showError(t('text', 'Could not load the versions of this file.'))
		return
	}
	if (!fileVersions.available.value) {
		showInfo(t('text', 'Versions are not available on this Nextcloud.'))
		return
	}
	const base = recentChangesBase(versions)
	if (!base) {
		showInfo(t('text', 'This file has no earlier versions yet.'))
		return
	}
	try {
		await getViewer().compare(node as IFile, versionNode(base, fileId, path), { view: 'differences' })
	} catch (exception) {
		logger.error('Could not open the recent changes', { exception })
		showError(t('text', 'Could not open the recent changes of this file.'))
	}
}
