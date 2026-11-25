/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IFile } from '@nextcloud/files'
import type { Ref, ShallowRef } from 'vue'
import type { ComparisonSession } from './session.ts'

import axios from '@nextcloud/axios'
import { nextTick, onScopeDispose, ref, shallowRef } from 'vue'
import { closingSaveOf } from '../helpers/closingSaves.ts'
import { logger } from '../helpers/logger.ts'
import { createComparisonSession } from './session.ts'
import { comparedEnds, endOf, isCurrent } from './versionEnds.ts'
import { useFileVersions } from './versions.ts'

/** A file as it was loaded */
interface LoadedText {
	text: string
	/** When the server last changed it, in seconds, if it said */
	modified?: number
}

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
	/** Path of the file, which links and images in it are relative to */
	path: Ref<string | undefined>
	error: Ref<boolean>
	/** Whether the error is that the editor it replaces could not save */
	unsaved: Ref<boolean>
	/** Etag of the newer file as loaded */
	etag?: string
}

const comparisons = new Map<string, SharedComparison>()

/**
 * An etag without its quotes, as headers and file attributes write it differently.
 *
 * @param value The etag.
 */
const etagOf = (value: unknown) => typeof value === 'string' && value !== '' ? value.replace(/^W\//, '').replaceAll('"', '') : undefined

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
	const etag = etagOf(file.attributes?.etag)
	let comparison = comparisons.get(key)
	// A newer state of the file than the one loaded, as after a restore, is another comparison
	if (etag !== undefined && comparison?.etag !== undefined && comparison.etag !== etag) {
		comparison = undefined
	}
	if (!comparison) {
		comparison = { users: 0, loads: 0, session: shallowRef(), texts: shallowRef(), path: ref(), error: ref(false), unsaved: ref(false) }
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
			if (shared.users === 0) {
				if (comparisons.get(key) === shared) {
					comparisons.delete(key)
				}
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
		shared.unsaved.value = false
		// Once the views showing it are gone
		nextTick(() => previous?.destroy())
		load(key, shared, base, file)
	}

	return { session: shared.session, texts: shared.texts, path: shared.path, error: shared.error, unsaved: shared.unsaved, reload }
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
	const thisLoad = ++comparison.loads
	// Nobody waits for it anymore, or a newer load replaced it
	const stale = () => comparisons.get(key) !== comparison || comparison.loads !== thisLoad
	try {
		// The editor this comparison replaces may still be saving the newer file,
		// unless that is an old version
		const newer = endOf(file)
		if (!newer || isCurrent(newer.id)) {
			await closingSaveOf(file.fileid).catch((error) => {
				comparison.unsaved.value = true
				throw error
			})
		}
		if (stale()) {
			return
		}
		// Files are served without caching rules, so browsers may reuse an old copy
		const options = { responseType: 'text', headers: { 'Cache-Control': 'no-cache' }, timeout: 120_000 } as const
		const [before, after, path] = await Promise.all([
			axios.get<string>(base.encodedSource, options),
			axios.get<string>(file.encodedSource, options),
			documentPath(base, file),
		])
		if (stale()) {
			return
		}
		const texts = { before: loaded(before), after: loaded(after) }
		comparison.path.value = path
		comparison.texts.value = texts
		comparison.etag = etagOf(after.headers.etag)
		comparison.session.value = createComparisonSession(texts.before.text, texts.after.text, { filePath: path })
	} catch (exception) {
		if (stale()) {
			return
		}
		logger.error('Failed to load versions for comparison', { exception })
		comparison.error.value = true
	}
}

function loaded(response: { data: string, headers: Record<string, unknown> }): LoadedText {
	const modified = Date.parse(String(response.headers['last-modified'] ?? ''))
	return { text: response.data, modified: Number.isNaN(modified) ? undefined : modified / 1000 }
}

/**
 * Path of the file compared, as the current file has it: the node of an old
 * version has only its revision for a path.
 *
 * @param base The older file.
 * @param file The newer file.
 */
async function documentPath(base: IFile, file: IFile): Promise<string> {
	const current = [file, base].find((node) => isCurrent(endOf(node)?.id))
	if (current) {
		return current.path
	}
	const ends = comparedEnds(base, file)
	if (ends) {
		const versions = useFileVersions(ends.fileId)
		await versions.load()
		if (versions.path.value) {
			return versions.path.value
		}
	}
	return file.path
}
