/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IFile } from '@nextcloud/files'

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, defineCustomElement, nextTick } from 'vue'

const saveWhenDirty = vi.hoisted(() => vi.fn(async () => {}))

// The editor itself is not what is tested here, only what it is handed
vi.mock('../../components/ViewerComponent.vue', () => ({
	default: defineComponent({
		name: 'ViewerComponent',
		props: ['filename', 'fileid', 'forceSource', 'mime', 'source', 'e2EeIsEncrypted', 'isEmbedded', 'active', 'onLoadedHandler'],
		methods: { saveWhenDirty },
		template: '<div />',
	}),
}))
vi.mock('../../components/ViewerVersionComparison.vue', () => ({
	default: defineComponent({
		name: 'ViewerVersionComparison',
		props: ['base', 'file', 'part'],
		template: '<div />',
	}),
}))

import TextViewerWrapper from '../../views/TextViewerWrapper.vue'

const currentSource = 'https://cloud.example.com/remote.php/dav/files/alice/notes.md'
const versionSource = 'https://cloud.example.com/remote.php/dav/versions/alice/versions/42/1691420501'

/**
 * A markdown file, or one of its older versions.
 *
 * @param root - Where the file lives
 * @param source - Its URL
 */
function makeFile(root = '/files/alice', source = currentSource, mime = 'text/markdown'): IFile {
	// Only what the wrapper reads: @nextcloud/files is mocked for all tests
	return { fileid: 42, source, encodedSource: source, root, path: '/notes.md', mime, attributes: {} } as unknown as IFile
}

/**
 * An older version of the markdown file.
 *
 * @param mime - Its mime type
 */
function makeVersion(mime = 'text/markdown'): IFile {
	return makeFile('/versions/alice/versions/42', versionSource, mime)
}

describe('the text viewer wrapper', () => {
	it('opens the file itself for editing', () => {
		const file = makeFile()
		const editor = mount(TextViewerWrapper, { props: { file } }).findComponent({ name: 'ViewerComponent' })

		expect(editor.props('forceSource')).toBe(false)
		expect(editor.props('fileid')).toBe(42)
		expect(editor.props('source')).toBe(file.encodedSource)
	})

	// Shown where it is mentioned, as the preview of a link to it: read, with
	// a button to edit it there
	it('shows the file read-only when embedded outside the viewer', () => {
		const editor = mount(TextViewerWrapper, { props: { file: makeFile(), embedded: true } }).findComponent({ name: 'ViewerComponent' })

		expect(editor.props('isEmbedded')).toBe(true)
	})

	it('is not embedded in the viewer', () => {
		const editor = mount(TextViewerWrapper, { props: { file: makeFile() } }).findComponent({ name: 'ViewerComponent' })

		expect(editor.props('isEmbedded')).toBe(false)
	})

	// A version carries the id of the file it belongs to. It is still read
	// from its source, but keeps the id to resolve its attachments
	it('opens an older version from its source, to read', () => {
		const version = makeVersion()
		const editor = mount(TextViewerWrapper, { props: { file: version } }).findComponent({ name: 'ViewerComponent' })

		expect(editor.props('forceSource')).toBe(true)
		expect(editor.props('fileid')).toBe(42)
		expect(editor.props('source')).toBe(version.encodedSource)
	})

	// A download from the viewer would otherwise get the last saved version
	it('saves edits not written yet before the viewer downloads the file', async () => {
		window.customElements.define('text-viewer-test', defineCustomElement(TextViewerWrapper, { shadowRoot: false }))
		const element = document.createElement('text-viewer-test') as HTMLElement & { file: IFile }
		element.file = makeFile()
		document.body.append(element)
		await nextTick()

		const pending: Promise<unknown>[] = []
		element.dispatchEvent(new CustomEvent('before-download', { detail: { file: element.file, waitUntil: (promise: Promise<unknown>) => pending.push(promise) } }))
		await Promise.all(pending)

		expect(saveWhenDirty).toHaveBeenCalledOnce()
		expect(pending).toHaveLength(1)
		element.remove()
	})

	it('stops the viewer from swiping, so text can be selected', () => {
		const wrapper = mount(TextViewerWrapper, { props: { file: makeFile() } })

		expect(wrapper.emitted('update:canSwipe')).toEqual([[false]])
	})

	it('lists the changes in the differences view', () => {
		const version = makeVersion()
		const file = makeFile()
		const wrapper = mount(TextViewerWrapper, { props: { file, files: [version, file], comparison: 'differences' } })
		const comparison = wrapper.findComponent({ name: 'ViewerVersionComparison' })

		expect(comparison.props('base')).toEqual(version)
		expect(comparison.props('file')).toEqual(file)
		expect(comparison.props('part')).toBe('changes')
		expect(wrapper.findComponent({ name: 'ViewerComponent' }).exists()).toBe(false)
	})

	it.each([
		['older', 'before'],
		['newer', 'after'],
	])('shows the %s Markdown document side by side', (which, part) => {
		const version = makeVersion()
		const file = makeFile()
		const shown = which === 'older' ? version : file
		const wrapper = mount(TextViewerWrapper, { props: { file: shown, files: [version, file], comparison: 'side-by-side' } })
		const comparison = wrapper.findComponent({ name: 'ViewerVersionComparison' })

		expect(comparison.props('base')).toEqual(version)
		expect(comparison.props('file')).toEqual(file)
		expect(comparison.props('part')).toBe(part)
	})

	it('reports a comparison loaded once it has', () => {
		const file = makeFile()
		const wrapper = mount(TextViewerWrapper, { props: { file, files: [makeVersion(), file], comparison: 'differences' } })

		wrapper.findComponent({ name: 'ViewerVersionComparison' }).vm.$emit('loaded')

		expect(wrapper.emitted('loaded')).toHaveLength(1)
	})

	it('shows plain text side by side, only read', () => {
		const version = makeVersion('text/plain')
		const file = makeFile(undefined, undefined, 'text/plain')
		const wrapper = mount(TextViewerWrapper, { props: { file, files: [version, file], comparison: 'side-by-side' } })
		const editor = wrapper.findComponent({ name: 'ViewerComponent' })

		expect(wrapper.findComponent({ name: 'ViewerVersionComparison' }).exists()).toBe(false)
		expect(editor.props('forceSource')).toBe(true)
		expect(editor.props('fileid')).toBe(42)
		expect(editor.props('source')).toBe(currentSource)
	})
})
