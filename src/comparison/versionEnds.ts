/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IFile } from '@nextcloud/files'

import { getCurrentUser } from '@nextcloud/auth'
import { File, Permission } from '@nextcloud/files'
import { getCanonicalLocale } from '@nextcloud/l10n'
import { generateRemoteUrl } from '@nextcloud/router'
import { isPublicShare } from '@nextcloud/sharing/public'

/** One end of a comparison: the older or the newer */
export type End = 'from' | 'to'

/** Two versions of one file, compared from the older to the newer: 'current' or the revision of a retained version */
export interface ComparedEnds {
	fileId: number
	from: string
	to: string
}

/** Two versions of one file compared, with the node and the time of each end */
export interface ComparedPair extends ComparedEnds {
	/** The node the viewer shows at each end */
	nodes: Record<End, IFile>
	/**
	 * When each end was saved, in seconds: for the current file as the server
	 * sent the text compared, once loaded, as it may have been saved after its
	 * node was made; otherwise its node's time, which for a version is the version's
	 */
	saved: Record<End, number>
}

/** A version as the versions endpoint lists it */
export interface VersionEntry {
	id: string
	/** Seconds since the epoch */
	mtime: number
	size: number
	label: string
	author: { id: string, displayName: string } | null
}

const VERSION_PATH = /\/remote\.php\/dav\/versions\/[^/]+\/versions\/(\d+)\/([^/]+)$/
/** The id of the current file among its versions, as the server names it too */
const CURRENT = 'current'

/**
 * Whether an end is the current file.
 *
 * @param id The id of the end.
 */
export function isCurrent(id: string | undefined): boolean {
	return id === CURRENT
}

/**
 * Which end of which file a node of the viewer is, read from its source as
 * Files and Collectives build them: a version under the versions endpoint, the
 * current file under the files endpoint.
 *
 * @param node A node the viewer compares.
 */
export function endOf(node: IFile): { fileId: number, id: string } | undefined {
	let path: string
	try {
		path = new URL(node.source).pathname
	} catch {
		return undefined
	}
	const version = path.match(VERSION_PATH)
	if (version) {
		return { fileId: Number(version[1]), id: decodeURIComponent(version[2]!) }
	}
	if (path.includes('/remote.php/dav/files/') && node.fileid !== undefined) {
		return { fileId: node.fileid, id: CURRENT }
	}
	return undefined
}

/**
 * The ends of a comparison of two versions of one file, or nothing for a
 * comparison of anything else, or where the versions cannot be listed: a
 * public share, or nobody signed in.
 *
 * @param base The older file.
 * @param file The newer file.
 */
export function comparedEnds(base: IFile, file: IFile): ComparedEnds | undefined {
	if (getCurrentUser() === null || isPublicShare()) {
		return undefined
	}
	const from = endOf(base)
	const to = endOf(file)
	if (!from || !to || from.fileId !== to.fileId || from.id === to.id) {
		return undefined
	}
	return { fileId: from.fileId, from: from.id, to: to.id }
}

/**
 * The pair a comparison shows: nothing wherever comparedEnds() gives nothing.
 *
 * @param base The older file.
 * @param file The newer file.
 * @param loaded The texts compared, once loaded.
 * @param loaded.before The older text.
 * @param loaded.before.modified When the server last changed it, in seconds.
 * @param loaded.after The newer text.
 * @param loaded.after.modified When the server last changed it, in seconds.
 */
export function comparedPair(base: IFile, file: IFile, loaded?: { before: { modified?: number }, after: { modified?: number } }): ComparedPair | undefined {
	const ends = comparedEnds(base, file)
	if (!ends) {
		return undefined
	}
	const saved = (id: string, node: IFile, modified?: number) => isCurrent(id) && modified !== undefined
		? modified
		: Math.floor((node.mtime?.getTime() ?? 0) / 1000)
	return {
		...ends,
		nodes: { from: base, to: file },
		saved: { from: saved(ends.from, base, loaded?.before.modified), to: saved(ends.to, file, loaded?.after.modified) },
	}
}

/**
 * Whether one end is older than the other: the current file is the newest
 * whatever its time, which restoring a version sets back to that version's.
 *
 * @param end An end.
 * @param end.id Its id.
 * @param end.mtime When it was saved, in seconds.
 * @param other The other end.
 * @param other.id Its id.
 * @param other.mtime When it was saved, in seconds.
 */
export function isOlder(end: { id: string, mtime: number }, other: { id: string, mtime: number }): boolean {
	if (isCurrent(end.id)) {
		return false
	}
	return isCurrent(other.id) || end.mtime < other.mtime
}

/**
 * A node of a version, or of the current file, for the viewer to compare.
 *
 * @param entry The version.
 * @param fileId Id of the file.
 * @param path Path of the file in the user's files.
 */
export function versionNode(entry: VersionEntry, fileId: number, path: string): File {
	const uid = getCurrentUser()!.uid
	const common = {
		id: fileId,
		mime: 'text/markdown',
		size: entry.size,
		mtime: new Date(entry.mtime * 1000),
		owner: uid,
		permissions: Permission.READ,
	}
	if (isCurrent(entry.id)) {
		return new File({
			...common,
			source: generateRemoteUrl(`dav/files/${uid}`) + path,
			root: `/files/${uid}`,
		})
	}
	// Named after its date, as Files names a version
	return new File({
		...common,
		source: generateRemoteUrl(`dav/versions/${uid}/versions/${fileId}/${entry.id}`),
		root: `/versions/${uid}/versions/${fileId}`,
		displayname: formatDate(entry.mtime, 'long'),
		attributes: { hasPreview: false },
	})
}

/**
 * Dates shown together, in the user's language: to the minute and without
 * this year's number, with seconds where another of them falls in the same minute.
 *
 * @param seconds Seconds since the epoch of each.
 */
export function formatDates(seconds: readonly number[]): string[] {
	const minutes = seconds.map((time) => formatDate(time))
	return seconds.map((time, index) => minutes.indexOf(minutes[index]!) === minutes.lastIndexOf(minutes[index]!) ? minutes[index]! : formatDate(time, 'seconds'))
}

/**
 * A date and time in the user's language: short, to the minute and without
 * this year's number; with seconds; or long, as Files names versions.
 *
 * @param seconds Seconds since the epoch.
 * @param style How much to show.
 */
export function formatDate(seconds: number, style: 'short' | 'seconds' | 'long' = 'short'): string {
	const locale = getCanonicalLocale()
	const locales = [locale, locale.split('-')[0]!]
	const date = new Date(seconds * 1000)
	if (style === 'long') {
		return date.toLocaleString(locales, { dateStyle: 'medium', timeStyle: 'long' })
	}
	return date.toLocaleString(locales, {
		year: date.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		second: style === 'seconds' ? '2-digit' : undefined,
	})
}
