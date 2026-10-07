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

import TextViewerWrapper from '../../views/TextViewerWrapper.vue'

/**
 * A markdown file, or one of its older versions.
 *
 * @param root - Where the file lives
 * @param source - Its URL
 */
function makeFile(root = '/files/alice', source = 'https://cloud.example.com/remote.php/dav/files/alice/notes.md'): IFile {
	// Only what the wrapper reads: @nextcloud/files is mocked for all tests
	return { fileid: 42, source, encodedSource: source, root, path: '/notes.md', mime: 'text/markdown', attributes: {} } as unknown as IFile
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
		const version = makeFile('/versions/alice/versions/42', 'https://cloud.example.com/remote.php/dav/versions/alice/versions/42/1691420501')
		const editor = mount(TextViewerWrapper, { props: { file: version } }).findComponent({ name: 'ViewerComponent' })

		expect(editor.props('fileid')).toBeNull()
		expect(editor.props('source')).toBe(version.encodedSource)
	})

	it('stops the viewer from swiping, so text can be selected', () => {
		const wrapper = mount(TextViewerWrapper, { props: { file: makeFile() } })

		expect(wrapper.emitted('update:canSwipe')).toEqual([[false]])
	})
})
