/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IFile } from '@nextcloud/files'
import type { Ref, ShallowRef } from 'vue'
import type { LoadedText } from './decode.ts'
import type { ComparisonSession } from './session.ts'

import axios from '@nextcloud/axios'
import { nextTick, onScopeDispose, ref, shallowRef } from 'vue'
import { closingSaveOf } from '../helpers/closingSaves.ts'
import { logger } from '../helpers/logger.ts'
import { loadText } from './decode.ts'
import { createComparisonSession } from './session.ts'

/** Both texts compared, as they were loaded */
export interface ComparedTexts {
	before: LoadedText
	after: LoadedText
}

interface SharedComparison {
	users: number
	/** Counts loads: only the latest one fills in the comparison */
	loads: number
	session: ShallowRef<ComparisonSession | undefined>
	texts: ShallowRef<ComparedTexts | undefined>
	error: Ref<boolean>
	/** Height of the summary in one pane, which the other pane leaves free so both documents start level */
	summaryHeight: Ref<number>
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
		comparison = { users: 0, loads: 0, session: shallowRef(), texts: shallowRef(), error: ref(false), summaryHeight: ref(0) }
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

	/**
	 * Load both files again, as they are now, in place of what is shown.
	 */
	function reload() {
		const previous = shared.session.value
		shared.session.value = undefined
		shared.texts.value = undefined
		shared.error.value = false
		// Once the views showing it are gone
		nextTick(() => previous?.destroy())
		load(key, shared, base, file)
	}

	return { session: shared.session, texts: shared.texts, error: shared.error, summaryHeight: shared.summaryHeight, reload }
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
	const load = ++comparison.loads
	// Nobody waits for it anymore, or a newer load replaced it
	const stale = () => comparisons.get(key) !== comparison || comparison.loads !== load
	try {
		// The editor this comparison replaces may still be saving the newer file
		await closingSaveOf(file.fileid)
		if (stale()) {
			return
		}
		// Files are served without caching rules, so browsers may reuse an old copy
		const options = { responseType: 'arraybuffer', headers: { 'Cache-Control': 'no-cache' }, timeout: 30_000 } as const
		const [before, after] = await Promise.all([
			axios.get<ArrayBuffer>(base.encodedSource, options),
			axios.get<ArrayBuffer>(file.encodedSource, options),
		])
		if (stale()) {
			return
		}
		const texts = {
			before: loadText(before.data, before.headers),
			after: loadText(after.data, after.headers),
		}
		comparison.texts.value = texts
		comparison.session.value = createComparisonSession(texts.before.text, texts.after.text, { filePath: file.path })
	} catch (exception) {
		if (stale()) {
			return
		}
		logger.error('Failed to load versions for comparison', { exception })
		comparison.error.value = true
	}
}
