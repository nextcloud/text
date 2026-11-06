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
	loading: Ref<boolean>
	failed: Ref<boolean>
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
	const loading = ref(false)
	const failed = ref(false)
	/** Counts invalidations: a fetch started before one is stale */
	let generation = 0

	/** Fetch the versions, unless they are here or on their way */
	async function load() {
		if (versions.value || loading.value) {
			return
		}
		const started = generation
		loading.value = true
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
				loading.value = false
			}
		}
	}

	function invalidate() {
		generation++
		versions.value = undefined
		loading.value = false
		failed.value = false
	}

	function refresh() {
		invalidate()
		return load()
	}

	return { versions, path, loading, failed, load, refresh, invalidate }
}
