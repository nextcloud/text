/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { InjectionKey, Ref } from 'vue'

import { inject, provide, ref } from 'vue'
import { logger } from '../helpers/logger.ts'

export interface RawEditingApi {
	/** Whether the current user is editing the raw Markdown source. */
	rawEditing: Ref<boolean>
	/** Whether the raw editing toggle is available in this context. */
	canRawEdit: Ref<boolean>
	/** Markdown handed to the raw editor when it is opened. */
	rawInitialMarkdown: Ref<string>
	/** Current content of the raw editor, kept in sync via its `change` event. */
	rawMarkdown: Ref<string>
	/**
	 * Raw Markdown that could not be applied automatically because the live
	 * document drifted while it was being edited. Empty unless a conflict is
	 * pending resolution via CollisionResolveDialog.
	 */
	rawConflict: Ref<string>
	enterRawEditing: () => void
	exitRawEditing: (options?: { discard?: boolean }) => Promise<void>
	/** Clear a pending raw conflict (once resolved). */
	resolveRawConflict: () => void
	toggle: () => void
}

interface Dependencies {
	/** Serialize the live (rich) document to Markdown. */
	serialize: () => string
	/** Replace the live document content from a Markdown string. */
	setContent: (content: string) => void
	/** Toggle whether the live (rich) editor accepts input. */
	setEditable: (editable: boolean) => void
	/** Persist the document. */
	save: () => Promise<unknown>
	/** Whether raw editing is allowed at all (markdown, not a workspace, …). */
	canRawEdit: Ref<boolean>
}

export const rawEditingKey = Symbol('editor:raw-editing') as InjectionKey<RawEditingApi>

/**
 * Create the raw Markdown editing state machine and provide it to descendants.
 *
 * Raw editing runs the current user on a *detached* plain-text editor while the
 * collaborative rich editor stays mounted and connected in the background. This
 * keeps other collaborators unaffected (they never see the plain schema) at the
 * cost of reconciling the raw buffer against the live document on return.
 *
 * @param deps dependencies from the collaborative editor
 */
export function provideRawEditing(deps: Dependencies): RawEditingApi {
	const rawEditing = ref(false)
	const rawInitialMarkdown = ref('')
	const rawMarkdown = ref('')
	const rawConflict = ref('')
	// Markdown at the moment raw editing started, used to detect whether the
	// live document drifted (concurrent edits) while it was being edited raw.
	const forkSnapshot = ref('')

	const enterRawEditing = () => {
		if (!deps.canRawEdit.value || rawEditing.value) {
			return
		}
		const markdown = deps.serialize()
		forkSnapshot.value = markdown
		rawInitialMarkdown.value = markdown
		rawMarkdown.value = markdown
		// Freeze the background rich editor so it only absorbs remote changes.
		deps.setEditable(false)
		rawEditing.value = true
		logger.debug('Entered raw Markdown editing')
	}

	const exitRawEditing = async ({ discard = false } = {}) => {
		if (!rawEditing.value) {
			return
		}
		const mine = rawMarkdown.value
		const base = forkSnapshot.value
		// Re-enable and reveal the live rich editor before reconciling.
		deps.setEditable(true)
		rawEditing.value = false

		if (discard || mine === base) {
			// Nothing to apply: the user either cancelled or never changed the
			// source. Keep whatever the live document currently holds.
			logger.debug('Left raw Markdown editing without changes', { discard })
			return
		}

		const live = deps.serialize()
		if (live === base) {
			// No concurrent edits arrived while editing raw: apply directly.
			deps.setContent(mine)
			try {
				await deps.save()
			} catch (error) {
				logger.error('Failed to save raw Markdown changes', { error })
			}
			logger.debug('Applied raw Markdown changes')
		} else {
			// The live document drifted (other collaborators edited it) while we
			// were detached. Hand both versions to CollisionResolveDialog and let
			// the user pick, instead of silently clobbering their work.
			rawConflict.value = mine
			logger.debug('Raw Markdown editing conflicts with concurrent changes')
		}
	}

	const resolveRawConflict = () => {
		rawConflict.value = ''
	}

	const toggle = () => {
		if (rawEditing.value) {
			exitRawEditing()
		} else {
			enterRawEditing()
		}
	}

	const api: RawEditingApi = {
		rawEditing,
		canRawEdit: deps.canRawEdit,
		rawInitialMarkdown,
		rawMarkdown,
		rawConflict,
		enterRawEditing,
		exitRawEditing,
		resolveRawConflict,
		toggle,
	}
	provide(rawEditingKey, api)
	return api
}

/**
 *
 */
function noopApi(): RawEditingApi {
	return {
		rawEditing: ref(false),
		canRawEdit: ref(false),
		rawInitialMarkdown: ref(''),
		rawMarkdown: ref(''),
		rawConflict: ref(''),
		enterRawEditing: () => {},
		exitRawEditing: async () => {},
		resolveRawConflict: () => {},
		toggle: () => {},
	}
}

/**
 * Inject the raw editing API.
 *
 * Falls back to an inert API when used outside of a collaborative editor (e.g.
 * the plain editor or standalone readers) so consumers can be rendered anywhere.
 */
export function useRawEditing(): RawEditingApi {
	return inject(rawEditingKey, undefined) ?? noopApi()
}
