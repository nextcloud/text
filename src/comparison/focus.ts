/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparedEnds } from './versionEnds.ts'

import { getViewer } from '@nextcloud/viewer'

type End = 'from' | 'to'

/**
 * What to restore once the viewer shows the pair a picker chose: the picker
 * that had the keyboard, and what to announce. The elements showing that
 * pair take each part once when they mount, however long it took to load.
 */
let handover: { pair: string, focus?: End, announcement?: string } | undefined
let watchingViewer = false

const pairOf = (ends: ComparedEnds) => `${ends.fileId}:${ends.from}:${ends.to}`

/**
 * Remember what to restore after changing the versions compared.
 *
 * @param ends The pair the viewer shows next.
 * @param end The end whose picker had the keyboard.
 * @param announcement What screen readers should hear.
 */
export function handOver(ends: ComparedEnds, end: End, announcement: string) {
	if (!watchingViewer) {
		watchingViewer = true
		getViewer().addEventListener('close', () => {
			handover = undefined
		})
	}
	handover = { pair: pairOf(ends), focus: end, announcement }
}

/**
 * Whether this picker takes the keyboard back, which it can do once.
 *
 * @param ends The pair the picker belongs to.
 * @param end The end of the picker.
 */
export function takeFocus(ends: ComparedEnds, end: End): boolean {
	if (handover?.pair !== pairOf(ends) || handover.focus !== end) {
		return false
	}
	handover.focus = undefined
	return true
}

/**
 * The announcement for this pair, which can be taken once.
 *
 * @param ends The pair shown.
 */
export function takeAnnouncement(ends: ComparedEnds): string | undefined {
	if (handover?.pair !== pairOf(ends)) {
		return undefined
	}
	const { announcement } = handover
	handover.announcement = undefined
	return announcement
}
