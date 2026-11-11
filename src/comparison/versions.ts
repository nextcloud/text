/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Ref } from 'vue'
import type { VersionEntry } from './versionEnds.ts'

import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { getViewer } from '@nextcloud/viewer'
import { ref } from 'vue'
import { logger } from '../helpers/logger.ts'

export interface FileVersions {
	/** The current file first, then the retained versions, newest first */
	versions: Ref<VersionEntry[] | undefined>
	/** Path of the file in the user's files */
	path: Ref<string | undefined>
	failed: Ref<boolean>
	/** Fetch them, unless they are here; resolves once they are, or the fetch failed */
	load: () => Promise<void>
	/** Fetch them again, as they are now */
	refresh: () => Promise<void>
}

interface CachedVersions extends FileVersions {
	/** Forget what was fetched, and what is on its way */
	invalidate: () => void
}

const cache = new Map<number, CachedVersions>()
let watchingViewer = false

/**
 * The versions of a file, fetched the first time they are needed and kept
 * until the viewer closes, so changing the versions compared asks only once.
 *
 * @param fileId Id of the file.
 */
export function useFileVersions(fileId: number): FileVersions {
	if (!watchingViewer) {
		watchingViewer = true
		getViewer().addEventListener('close', () => cache.clear())
	}
	let entry = cache.get(fileId)
	if (!entry) {
		entry = createFileVersions(fileId)
		cache.set(fileId, entry)
	}
	return entry
}

/**
 * Forget the versions of a file, after it changed or a version went away;
 * the pickers showing them fetch them again when opened.
 *
 * @param fileId Id of the file.
 */
export function invalidateFileVersions(fileId: number) {
	cache.get(fileId)?.invalidate()
}

/**
 * @param fileId Id of the file.
 */
function createFileVersions(fileId: number): CachedVersions {
	const versions = ref<VersionEntry[]>()
	const path = ref<string>()
	const failed = ref(false)
	/** Counts invalidations: a fetch started before one is stale */
	let generation = 0
	/** The fetch on its way */
	let pending: Promise<void> | undefined

	function load() {
		if (versions.value) {
			return Promise.resolve()
		}
		pending ??= fetchVersions()
		return pending
	}

	async function fetchVersions() {
		const started = generation
		failed.value = false
		try {
			const { data } = await axios.get(generateOcsUrl('apps/text/versions/{fileId}', { fileId }), { timeout: 30_000 })
			if (started === generation) {
				versions.value = data.ocs.data.versions
				path.value = data.ocs.data.path
			}
		} catch (exception) {
			if (started === generation) {
				logger.error('Could not load the versions to compare', { exception })
				failed.value = true
			}
		} finally {
			if (started === generation) {
				pending = undefined
			}
		}
	}

	function invalidate() {
		generation++
		pending = undefined
		versions.value = undefined
		failed.value = false
	}

	function refresh() {
		invalidate()
		return load()
	}

	return { versions, path, failed, load, refresh, invalidate }
}
