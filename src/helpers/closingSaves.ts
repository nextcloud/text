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
 * @param closing The save: whether the file holds what the editor showed.
 */
export function trackClosingSave(fileId: number, closing: Promise<boolean>) {
	const own = closing.then((saved) => {
		if (!saved) {
			throw new Error('The closing editor could not save the file')
		}
	})
	// Another editor on the file may still be saving too
	const earlier = saves.get(fileId)
	const save = earlier ? Promise.all([earlier, own]) : own
	saves.set(fileId, save)
	save.then(() => forget(fileId, save), () => setTimeout(() => forget(fileId, save), SAVE_WAIT_MS))
}

/**
 * Forget a save, unless a newer one replaced it.
 *
 * @param fileId The file.
 * @param save The save.
 */
function forget(fileId: number, save: Promise<unknown>) {
	if (saves.get(fileId) === save) {
		saves.delete(fileId)
	}
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
	const late = new Promise<never>((_, reject) => {
		timer = setTimeout(() => reject(new Error('The closing editor did not save in time')), SAVE_WAIT_MS)
	})
	try {
		await Promise.race([save, late])
	} catch (error) {
		// Shown once, by every view opened together: loading again compares the file as the server has it
		setTimeout(() => forget(fileId!, save))
		throw error
	} finally {
		clearTimeout(timer)
	}
}
