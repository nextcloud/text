/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type Vue from 'vue'

import FormatListBulleted from '@mdi/svg/svg/format-list-bulleted.svg?raw'
import { t } from '@nextcloud/l10n'
import { shallowRef } from 'vue'
import OutlineSidebarTab from '../views/OutlineSidebarTab.vue'

export interface FileInfo {
	mimetype: string,
}

// TODO: change default to false
let openInViewer = true

/*
type OutlineSidebarTabInstance = Vue & {
	update(headings: Array<Object>): Promise<void>
}
 */

let textOutlineTabInstance: InstanceType<typeof OutlineSidebarTab> | null = null
/*
export const updateOutline = (newHeadings: Array<Object>) => {
	textOutlineTabInstance?.update(outlineHeadings.value)
}
 */

export const registerTextOutlineSidebarTab = async () => {
	if (window.OCA.Files?.Sidebar) {
		const { default: Vue } = await import('vue')

		window.OCA.Files.Sidebar.registerTab(new window.OCA.Files.Sidebar.Tab({
			id: 'text_outline',
			name: t('text', 'Outline'),
			iconSvg: FormatListBulleted,

			async mount(el: HTMLElement, fileInfo: FileInfo, context: any) {
				const View = Vue.extend(OutlineSidebarTab)
				// destroy previous instance if available
				if (textOutlineTabInstance) {
					textOutlineTabInstance.$destroy()
				}
				textOutlineTabInstance = new View({
					parent: context,
				})
				// textOutlineTabInstance.update(outlineHeadings.value)
				textOutlineTabInstance.$mount(el)
			},
			update() {
				// textOutlineTabInstance?.update(outlineHeadings.value)
			},
			destroy() {
				textOutlineTabInstance?.$destroy()
				textOutlineTabInstance = null
			},
			enabled(fileInfo: FileInfo) {
				const isMarkdown = (fileInfo?.mimetype ?? '') === 'text/markdown'
				return openInViewer && isMarkdown
			},
		}))
	}
}
