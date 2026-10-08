/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IFile } from '@nextcloud/files'

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'

// The editor itself is not what is tested here, only what it is handed
vi.mock('../../components/ViewerComponent.vue', () => ({
	default: defineComponent({
		name: 'ViewerComponent',
		props: ['filename', 'fileid', 'mime', 'source', 'e2EeIsEncrypted', 'active', 'onLoadedHandler'],
		template: '<div />',
	}),
}))
vi.mock('../../components/ViewerVersionComparison.vue', () => ({
	default: defineComponent({
		name: 'ViewerVersionComparison',
		props: ['source', 'currentSource', 'fileId', 'filePath'],
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
function makeFile(root = '/files/alice', source = currentSource): IFile {
	// Only what the wrapper reads: @nextcloud/files is mocked for all tests
	return { fileid: 42, source, encodedSource: source, root, path: '/notes.md', mime: 'text/markdown', attributes: {} } as unknown as IFile
}

/**
 * An older version of the markdown file.
 */
function makeVersion(): IFile {
	return makeFile('/versions/alice/versions/42', versionSource)
}

describe('the text viewer wrapper', () => {
	it('opens the file itself for editing', () => {
		const file = makeFile()
		const editor = mount(TextViewerWrapper, { props: { file } }).findComponent({ name: 'ViewerComponent' })

		expect(editor.props('fileid')).toBe(42)
		expect(editor.props('source')).toBe(file.encodedSource)
	})

	// A version carries the id of the file it belongs to: handed that, the
	// editor opened the current document instead of the version
	it('opens an older version from its source, to read', () => {
		const version = makeVersion()
		const editor = mount(TextViewerWrapper, { props: { file: version } }).findComponent({ name: 'ViewerComponent' })

		expect(editor.props('fileid')).toBeUndefined()
		expect(editor.props('source')).toBe(version.encodedSource)
	})

	it('stops the viewer from swiping, so text can be selected', () => {
		const wrapper = mount(TextViewerWrapper, { props: { file: makeFile() } })

		expect(wrapper.emitted('update:canSwipe')).toEqual([[false]])
	})

	it('shows what changed from the first file compared to the second', () => {
		const version = makeVersion()
		const file = makeFile()
		const wrapper = mount(TextViewerWrapper, { props: { file, files: [version, file], comparison: 'differences' } })
		const comparison = wrapper.findComponent({ name: 'ViewerVersionComparison' })

		expect(comparison.props('source')).toBe(versionSource)
		expect(comparison.props('currentSource')).toBe(currentSource)
		expect(comparison.props('fileId')).toBe(42)
		expect(comparison.props('filePath')).toBe('/notes.md')
		expect(wrapper.findComponent({ name: 'ViewerComponent' }).exists()).toBe(false)
	})

	it('reports the differences view loaded once the comparison has', () => {
		const file = makeFile()
		const wrapper = mount(TextViewerWrapper, { props: { file, files: [makeVersion(), file], comparison: 'differences' } })

		wrapper.findComponent({ name: 'ViewerVersionComparison' }).vm.$emit('loaded')

		expect(wrapper.emitted('loaded')).toHaveLength(1)
	})

	it('shows its own file side by side', () => {
		const version = makeVersion()
		const file = makeFile()
		const wrapper = mount(TextViewerWrapper, { props: { file: version, files: [version, file], comparison: 'side-by-side' } })

		expect(wrapper.findComponent({ name: 'ViewerComponent' }).props('source')).toBe(versionSource)
		expect(wrapper.findComponent({ name: 'ViewerVersionComparison' }).exists()).toBe(false)
	})

	it('opens current file read-only in side by side comparison', () => {
		const file = makeFile()
		const wrapper = mount(TextViewerWrapper, { props: { file, files: [makeVersion(), file], comparison: 'side-by-side' } })
		const editor = wrapper.findComponent({ name: 'ViewerComponent' })

		expect(editor.props('fileid')).toBeUndefined()
		expect(editor.props('source')).toBe(currentSource)
	})
})
