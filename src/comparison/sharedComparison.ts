/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IFile } from '@nextcloud/files'
import type { Ref, ShallowRef } from 'vue'
import type { ComparisonSession } from './session.ts'

import axios from '@nextcloud/axios'
import { onScopeDispose, ref, shallowRef } from 'vue'
import { closingSaveOf } from '../helpers/closingSaves.ts'
import { logger } from '../helpers/logger.ts'
import { createComparisonSession } from './session.ts'

interface SharedComparison {
	users: number
	session: ShallowRef<ComparisonSession | undefined>
	error: Ref<boolean>
}

const comparisons = new Map<string, SharedComparison>()

/**
 * The comparison of two files, loaded once for every element showing part of
 * it. The viewer shows a comparison as two elements side by side, or as one,
 * and replaces them when the view changes: the comparison, its current change
 * included, lasts until the last of them is gone.
 *
 * @param base The older file.
 * @param file The newer file.
 */
export function useSharedComparison(base: IFile, file: IFile) {
	const key = `${base.source}\n${file.source}`
	let comparison = comparisons.get(key)
	if (!comparison) {
		comparison = { users: 0, session: shallowRef(), error: ref(false) }
		comparisons.set(key, comparison)
		load(key, comparison, base, file)
	}
	comparison.users++

	const shared = comparison
	onScopeDispose(() => {
		shared.users--
		// The element of the next view takes over before this one is gone,
		// unless the viewer closed
		setTimeout(() => {
			if (shared.users === 0 && comparisons.get(key) === shared) {
				comparisons.delete(key)
				shared.session.value?.destroy()
			}
		})
	})

	return { session: shared.session, error: shared.error }
}

/**
 * Fetch both files and compare them.
 *
 * @param key Key of the comparison.
 * @param comparison The comparison to fill in.
 * @param base The older file.
 * @param file The newer file.
 */
async function load(key: string, comparison: SharedComparison, base: IFile, file: IFile) {
	// Nobody waits for it anymore
	const stale = () => comparisons.get(key) !== comparison
	try {
		// The editor this comparison replaces may still be saving the newer file
		await closingSaveOf(file.fileid)
		if (stale()) {
			return
		}
		// Files are served without caching rules, so browsers may reuse an old copy
		const options = { responseType: 'text', headers: { 'Cache-Control': 'no-cache' }, timeout: 30_000 } as const
		const [before, after] = await Promise.all([
			axios.get<string>(base.encodedSource, options),
			axios.get<string>(file.encodedSource, options),
		])
		if (stale()) {
			return
		}
		comparison.session.value = createComparisonSession(before.data, after.data, { filePath: file.path })
	} catch (exception) {
		if (stale()) {
			return
		}
		logger.error('Failed to load versions for comparison', { exception })
		comparison.error.value = true
	}
}
