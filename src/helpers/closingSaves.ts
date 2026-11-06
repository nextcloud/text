/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/** Saves of editors that are closing, by file id */
const saves = new Map<number, Promise<unknown>>()
/** How long a comparison waits for such a save before it shows its error */
const SAVE_WAIT_MS = 15_000

/**
 * Remember the save of a closing editor until it ends. A failed save is kept a
 * while longer, so the comparison opened instead shows its error.
 *
 * @param fileId The file the editor saves.
 * @param save The save.
 */
export function trackClosingSave(fileId: number, save: Promise<unknown>) {
	saves.set(fileId, save)
	const forget = () => {
		if (saves.get(fileId) === save) {
			saves.delete(fileId)
		}
	}
	save.then(forget, () => setTimeout(forget, SAVE_WAIT_MS))
}

/**
 * Wait until an editor closing on the file has saved it. Opening a view can
 * close the editor it replaces only after the view started, so the check
 * waits for that first. Rejects when the save fails or takes too long.
 *
 * @param fileId The file.
 */
export async function closingSaveOf(fileId: number | undefined) {
	await new Promise((resolve) => setTimeout(resolve))
	const save = fileId === undefined ? undefined : saves.get(fileId)
	if (!save) {
		return
	}
	let timer: ReturnType<typeof setTimeout> | undefined
	const late = new Promise<never>((resolve, reject) => {
		timer = setTimeout(() => reject(new Error('The closing editor did not save in time')), SAVE_WAIT_MS)
	})
	try {
		await Promise.race([save, late])
	} finally {
		clearTimeout(timer)
	}
}
