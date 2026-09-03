/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

const visibleControlNames: Readonly<Record<string, string>> = {
	'\t': 'TAB',
	'\u00AD': 'SHY',
	'\u061C': 'ALM',
	'\u0085': 'NEL',
	'\u200B': 'ZWSP',
	'\u200C': 'ZWNJ',
	'\u200D': 'ZWJ',
	'\u200E': 'LRM',
	'\u200F': 'RLM',
	'\u2060': 'WORD JOINER',
	'\uFEFF': 'BOM',
	'\u2028': 'LS',
	'\u2029': 'PS',
	'\u202A': 'LRE',
	'\u202B': 'RLE',
	'\u202C': 'PDF',
	'\u202D': 'LRO',
	'\u202E': 'RLO',
	'\u2066': 'LRI',
	'\u2067': 'RLI',
	'\u2068': 'FSI',
	'\u2069': 'PDI',
}

export const COMPLETE_SOURCE_DISPLAY_LIMITS = Object.freeze({
	maximumInputCharactersPerSide: 1_000_000,
	maximumVisibleCharactersPerSide: 1_000_000,
	maximumVisibleCharactersPerLine: 20_000,
})
const LIMITS = COMPLETE_SOURCE_DISPLAY_LIMITS

function sourcePrefix(value: string, maximumCharacters: number) {
	let prefix = value.slice(0, Math.max(0, maximumCharacters))
	const finalCodeUnit = prefix.charCodeAt(prefix.length - 1)
	const nextCodeUnit = value.charCodeAt(prefix.length)
	if (finalCodeUnit >= 0xD800 && finalCodeUnit <= 0xDBFF
		&& nextCodeUnit >= 0xDC00 && nextCodeUnit <= 0xDFFF) {
		prefix = prefix.slice(0, -1)
	}
	return prefix
}

function renderMarkdownSource(source: string, maximumCharacters: number, maximumLineCharacters = Number.POSITIVE_INFINITY) {
	let visible = ''
	let lineCharacters = 0
	for (const character of source) {
		const named = visibleControlNames[character]
		const code = character.codePointAt(0)!
		let rendered = character
		if (named) {
			rendered = `⟦${named}⟧`
		} else if (character.length === 1 && code >= 0xD800 && code <= 0xDFFF) {
			rendered = `⟦U+${code.toString(16).toUpperCase()}⟧`
		} else if ((code < 0x20 && character !== '\n' && character !== '\r') || code === 0x7F) {
			rendered = `⟦U+${code.toString(16).toUpperCase().padStart(4, '0')}⟧`
		}
		if (rendered.length > maximumCharacters - visible.length
			|| (character !== '\n' && character !== '\r'
				&& rendered.length > maximumLineCharacters - lineCharacters)) {
			return { text: visible, complete: false }
		}
		visible += rendered
		lineCharacters = character === '\n' || character === '\r'
			? 0
			: lineCharacters + rendered.length
	}
	return { text: visible, complete: true }
}

export function displayMarkdownSource(source: string, maximumCharacters = Number.POSITIVE_INFINITY) {
	return renderMarkdownSource(source, maximumCharacters).text
}

export function displayBoundedMarkdownSource(source: string) {
	const input = sourcePrefix(source, LIMITS.maximumInputCharactersPerSide)
	const visible = renderMarkdownSource(
		input,
		LIMITS.maximumVisibleCharactersPerSide,
		LIMITS.maximumVisibleCharactersPerLine,
	)
	return {
		text: visible.text,
		truncated: input.length < source.length || !visible.complete,
	}
}
