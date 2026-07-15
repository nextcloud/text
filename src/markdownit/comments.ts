/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type MarkdownIt from 'markdown-it'
import type StateCore from 'markdown-it/lib/rules_core/state_core.mjs'
import type Token from 'markdown-it/lib/token.mjs'

import { escapeHtml } from 'markdown-it/lib/common/utils.mjs'

const COMMENT_REF_PREFIX = 'comment-'

/**
 * Return the reference label.
 *
 * @param token markdown-it token
 */
function labelOf(token: Token): string {
	return token.meta?.label || String(token.meta?.id ?? '')
}

/**
 * Check whether token belongs to a comment
 *
 * @param token markdown-it token
 */
function isCommentToken(token: Token): boolean {
	return labelOf(token).startsWith(COMMENT_REF_PREFIX)
}

/**
 * Split the footnote block into a preceding comment block and the
 * remaining footnote block. Iterate right-to-left so we can splice
 * in place without invalidating indices.
 *
 * @param state markdown-it state
 */
function splitComments(state: StateCore): void {
	// Rename inline `footnote_ref` to `comment_ref` for comment labels.
	for (const token of state.tokens) {
		if (token.type !== 'inline' || !token.children) {
			continue
		}
		for (const child of token.children) {
			if (child.type === 'footnote_ref' && isCommentToken(child)) {
				child.type = 'comment_ref'
			}
		}
	}

	// Split blocks
	for (let i = state.tokens.length - 1; i >= 0; i--) {
		if (state.tokens[i].type !== 'footnote_block_open') {
			continue
		}
		const blockOpenIdx = i
		let blockCloseIdx = -1
		for (let j = blockOpenIdx + 1; j < state.tokens.length; j++) {
			if (state.tokens[j].type === 'footnote_block_close') {
				blockCloseIdx = j
				break
			}
		}
		if (blockCloseIdx < 0) {
			continue
		}

		const inner = state.tokens.slice(blockOpenIdx + 1, blockCloseIdx)
		const commentTokens: Token[] = []
		const footnoteTokens: Token[] = []

		// Group inner tokens into footnote_open..footnote_close units
		// and push each unit into the appropriate bucket.
		let unitStart = -1
		for (let k = 0; k < inner.length; k++) {
			const token = inner[k]
			if (token.type === 'footnote_open') {
				unitStart = k
			} else if (token.type === 'footnote_close' && unitStart >= 0) {
				const unit = inner.slice(unitStart, k + 1)
				if (isCommentToken(unit[0])) {
					unit[0].type = 'comment_open'
					unit[unit.length - 1].type = 'comment_close'
					commentTokens.push(...unit)
				} else {
					footnoteTokens.push(...unit)
				}
				unitStart = -1
			}
		}

		// Build the replacement token list.
		const replacement: Token[] = []
		if (commentTokens.length > 0) {
			const commentOpen = new state.Token('comment_block_open', '', 1)
			commentOpen.block = true
			const commentClose = new state.Token('comment_block_close', '', -1)
			commentClose.block = true
			replacement.push(commentOpen, ...commentTokens, commentClose)
		}
		if (footnoteTokens.length > 0) {
			replacement.push(state.tokens[blockOpenIdx], ...footnoteTokens, state.tokens[blockCloseIdx])
		}

		state.tokens.splice(blockOpenIdx, blockCloseIdx - blockOpenIdx + 1, ...replacement)
	}
}

/**
 * Extract author/timestamp metadata from comment definitions and rewrite
 * `list_item_open/close` inside comments to `comment_item_open/close`,
 * dropping the surrounding `bullet_list_open/close`
 *
 * @param state markdown-it core state
 */
function extractCommentMetadata(state: StateCore): void {
	for (let i = 0; i < state.tokens.length; i++) {
		if (state.tokens[i].type !== 'comment_open') {
			continue
		}
		let closeIdx = findMatching(state.tokens, i, 'comment_open', 'comment_close')
		if (closeIdx < 0) {
			continue
		}
		closeIdx = processCommentBody(state, i, closeIdx)
		i = closeIdx
	}
}

/**
 * Process a comment body. If the body is exactly one bullet list,
 * transform its items to comment items; otherwise wrap the body in a
 * single comment item to account for broken syntax.
 * Returns the (possibly updated) close index.
 *
 * @param state markdown-it core state
 * @param openIdx index of the comment_open token
 * @param closeIdx index of the matching comment_close token
 */
function processCommentBody(state: StateCore, openIdx: number, closeIdx: number): number {
	const removals: number[] = []
	let hasItems = false
	let listDepth = 0

	for (let i = openIdx + 1; i < closeIdx; i++) {
		const token = state.tokens[i]
		if (token.type === 'bullet_list_open') {
			listDepth++
			if (listDepth === 1) {
				removals.push(i)
			}
			continue
		}
		if (token.type === 'bullet_list_close') {
			if (listDepth === 1) {
				removals.push(i)
			}
			listDepth--
			continue
		}

		// Only rewrite tokens that live directly inside the outer bullet list.
		// Nested lists (listDepth > 1) are left alone so their items stay.
		if (listDepth !== 1) {
			continue
		}

		if (token.type === 'list_item_open') {
			token.type = 'comment_item_open'
			const inline = findFirstInline(state.tokens, i + 1, closeIdx)
			const meta = inline ? extractMetadata(inline) : emptyMeta()
			token.attrSet('data-author', meta.author)
			token.attrSet('data-author-label', meta.authorLabel)
			token.attrSet('data-timestamp', meta.timestamp)
			hasItems = true
		} else if (token.type === 'list_item_close') {
			token.type = 'comment_item_close'
		} else if (token.type === 'paragraph_open' || token.type === 'paragraph_close') {
			// Un-hide so tight-list items still emit <p> around body content.
			token.hidden = false
		}
	}

	if (!hasItems) {
		return wrapAsSingleItem(state, openIdx, closeIdx)
	}

	// Apply removals right-to-left so earlier indices remain valid.
	for (const idx of removals.reverse()) {
		state.tokens.splice(idx, 1)
	}
	return closeIdx - removals.length
}

/**
 * Wrap the entire body between comment_open and comment_close in a single
 * comment_item pair with empty metadata attributes.
 *
 * @param state markdown-it core state
 * @param openIdx index of comment_open
 * @param closeIdx index of comment_close
 */
function wrapAsSingleItem(state: StateCore, openIdx: number, closeIdx: number): number {
	const wrapOpen = new state.Token('comment_item_open', '', 1)
	wrapOpen.block = true
	wrapOpen.attrSet('data-author', '')
	wrapOpen.attrSet('data-author-label', '')
	wrapOpen.attrSet('data-timestamp', '')

	const wrapClose = new state.Token('comment_item_close', '', -1)
	wrapClose.block = true

	state.tokens.splice(closeIdx, 0, wrapClose)
	state.tokens.splice(openIdx + 1, 0, wrapOpen)
	return closeIdx + 2
}

/**
 * Find matching close token for an open token, respecting nesting.
 *
 * @param tokens token stream
 * @param openIdx index of the open token
 * @param openType open token type
 * @param closeType close token type
 */
function findMatching(tokens: Token[], openIdx: number, openType: string, closeType: string): number {
	let depth = 1
	for (let i = openIdx + 1; i < tokens.length; i++) {
		if (tokens[i].type === openType) {
			depth++
		} else if (tokens[i].type === closeType) {
			depth--
			if (depth === 0) {
				return i
			}
		}
	}
	return -1
}

/**
 * Find the first `inline` token within a scope. Used to get comments metadata string.
 * Stops at the first item close or the scope end.
 *
 * @param tokens token stream
 * @param startIdx inclusive start
 * @param endIdx exclusive end
 */
function findFirstInline(tokens: Token[], startIdx: number, endIdx: number): Token | null {
	for (let i = startIdx; i < endIdx; i++) {
		const token = tokens[i]
		if (token.type === 'inline') {
			return token
		}
		if (token.type === 'list_item_close' || token.type === 'comment_item_close') {
			return null
		}
	}
	return null
}

interface Metadata {
	author: string
	authorLabel: string
	timestamp: string
}

/**
 * Empty metadata object
 */
function emptyMeta(): Metadata {
	return { author: '', authorLabel: '', timestamp: '' }
}

/**
 * Extract leading `@mention *(timestamp)*` metadata from an inline token,
 * mutating its `children` array to remove the extracted tokens and any
 * whitespace between the metadata and the body content.
 *
 * @param inline the `inline` token whose children will be inspected
 */
function extractMetadata(inline: Token): Metadata {
	const children = inline.children
	if (!children) {
		return emptyMeta()
	}

	let author = ''
	let authorLabel = ''
	let timestamp = ''

	// Skip leading empty text tokens (mention plugin leaves one after stripping `@`)
	while (children.length > 0 && children[0].type === 'text' && /^\s*$/.test(children[0].content)) {
		children.shift()
	}

	const first = children[0]
	if (first?.type === 'mention') {
		const mention = (first as Token & { mention: { id: string, label: string, type: string } }).mention
		if (!mention) {
			return emptyMeta()
		}
		author = decodeURIComponent(mention.id || '')
		authorLabel = mention.label || ''
		children.shift()
	} else if (first?.type === 'text') {
		// Guest mention
		const match = first.content.match(/^@([^\s*]+)/)
		if (match) {
			authorLabel = match[1]
			first.content = first.content.slice(match[0].length)
			if (!first.content) {
				children.shift()
			}
		}
	}

	// Strip whitespaces between mention and timestamp
	while (children.length > 0 && children[0].type === 'text' && /^\s*$/.test(children[0].content)) {
		children.shift()
	}

	if (children.length >= 3 && children[0].type === 'em_open' && children[1].type === 'text' && children[2].type === 'em_close') {
		const tsMatch = children[1].content.match(/^\(([^)]+)\)$/)
		if (tsMatch) {
			timestamp = tsMatch[1]
			children.splice(0, 3)
		}
	}

	while (children.length > 0) {
		const child = children[0]
		if (child.type === 'softbreak' || child.type === 'hardbreak') {
			children.shift()
		} else if (child.type === 'text' && /^\s*$/.test(child.content)) {
			children.shift()
		} else if (child.type === 'text') {
			child.content = child.content.replace(/^\s+/, '')
			break
		} else {
			break
		}
	}

	return { author, authorLabel, timestamp }
}

/**
 * Register the comments markdown-it plugin.
 * - splits footnote block into comment and footnote sections
 * - extracts author/timestamp metadata and adds renderer rules
 *
 * @param md  markdown-it Markdown object
 */
export default function comments(md: MarkdownIt): void {
	md.core.ruler.after('footnote_tail', 'split_comments', splitComments)
	md.core.ruler.after('split_comments', 'extract_comment_metadata', extractCommentMetadata)

	md.renderer.rules.comment_ref = (tokens, idx) => {
		const label = labelOf(tokens[idx])
		return `<sup data-type="comment-reference" data-reference-id="${escapeHtml(label)}"></sup>`
	}
	md.renderer.rules.comment_block_open = () => '<section data-type="comments">\n'
	md.renderer.rules.comment_block_close = () => '</section>\n'
	md.renderer.rules.comment_open = (tokens, idx) => {
		const label = labelOf(tokens[idx])
		return `<div data-type="comment" data-reference-id="${escapeHtml(label)}">\n`
	}
	md.renderer.rules.comment_close = () => '</div>\n'
	md.renderer.rules.comment_item_open = (tokens, idx) => {
		const token = tokens[idx]
		const author = token.attrGet('data-author') || ''
		const authorLabel = token.attrGet('data-author-label') || ''
		const timestamp = token.attrGet('data-timestamp') || ''
		return `<div data-type="comment-item" data-author="${escapeHtml(author)}" data-author-label="${escapeHtml(authorLabel)}" data-timestamp="${escapeHtml(timestamp)}">\n`
	}
	md.renderer.rules.comment_item_close = () => '</div>\n'
}
