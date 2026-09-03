/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import ImageView from '../../nodes/ImageView.vue'
import { ATTACHMENT_RESOLVER } from '../../components/Editor.provider.ts'

type ImageViewProps = InstanceType<typeof ImageView>['$props']

const attachment = {
	alt: 'Diagram',
	davPath: '/diagram.png',
	fullUrl: '/diagram.png',
	isImage: true,
	metadata: null,
	mimetype: 'image/png',
	name: 'diagram.png',
	previewUrl: '/preview.png',
	size: 100,
}

beforeEach(() => {
	vi.stubGlobal('ResizeObserver', class {
		observe() {}
		disconnect() {}
	})
	vi.stubGlobal('IntersectionObserver', class {
		observe() {}
		disconnect() {}
	})
})

afterEach(() => vi.unstubAllGlobals())

async function mountImage(isImage: boolean) {
	const editor = { isEditable: false, off: vi.fn(), on: vi.fn() }
	const wrapper = mount(ImageView, {
		props: {
			editor,
			node: { attrs: { alt: 'Diagram', src: 'diagram.png' } },
			decorations: [],
			selected: false,
			extension: { options: { noLazyImages: false } },
			getPos: () => 0,
			updateAttributes: vi.fn(),
			deleteNode: vi.fn(),
			view: {},
			innerDecorations: {},
			HTMLAttributes: {},
		} as unknown as ImageViewProps,
		global: {
			provide: {
				[ATTACHMENT_RESOLVER as symbol]: shallowRef({ resolve: vi.fn().mockResolvedValue({ ...attachment, isImage }) }),
			},
			stubs: {
				NodeViewWrapper: { template: '<div><slot /></div>' },
				ShowImageModal: true,
			},
		},
	})
	await wrapper.setData({ attachment: { ...attachment, isImage }, imageLoaded: true, loaded: true })
	return wrapper
}

describe('ImageView read-only actions', () => {
	it.each([
		[true, 'Open image Diagram'],
		[false, 'Open attachment Diagram'],
	] as const)('AUD-18 renders a named native button when isImage is %s', async (isImage, label) => {
		const wrapper = await mountImage(isImage)
		const action = wrapper.find<HTMLButtonElement>('.media-wrapper')

		expect(action.element.tagName).toBe('BUTTON')
		expect(action.attributes('type')).toBe('button')
		expect(action.attributes('aria-label')).toBe(label)
		expect(action.element.tabIndex).toBe(0)
	})

	it('AUD-18 routes image button activation through the real modal handler', async () => {
		const wrapper = await mountImage(true)
		const view = wrapper.vm as unknown as { embeddedImageList: Array<typeof attachment & { src: string }> }
		vi.spyOn(wrapper.vm, 'updateEmbeddedImageList').mockImplementation(async () => {
			view.embeddedImageList = [{ ...attachment, src: 'diagram.png' }]
		})

		await wrapper.find<HTMLButtonElement>('.media-wrapper').trigger('click')

		expect(wrapper.vm.imageIndex).toBe(0)
		expect(wrapper.vm.showImageModal).toBe(true)
	})

	it('AUD-18 routes attachment button activation through the real Viewer action', async () => {
		const open = vi.fn()
		vi.stubGlobal('OCA', { Viewer: { file: null, mimetypes: ['image/png'], open } })
		const wrapper = await mountImage(false)

		await wrapper.find<HTMLButtonElement>('.media-wrapper').trigger('click')

		expect(open).toHaveBeenCalledOnce()
		expect(open).toHaveBeenCalledWith({ path: attachment.davPath })
	})
})
