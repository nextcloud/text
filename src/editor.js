/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { emit, subscribe } from '@nextcloud/event-bus'
import Vue from 'vue'
import {
	ATTACHMENT_RESOLVER,
	EDITOR_UPLOAD,
	HOOK_MENTION_INSERT,
	HOOK_MENTION_SEARCH,
	OPEN_LINK_HANDLER,
} from './components/Editor.provider.ts'
import { ACTION_ATTACHMENT_PROMPT } from './components/Editor/MediaHandler.provider.js'
import { openLink } from './helpers/links.js'
// eslint-disable-next-line import/no-unresolved, n/no-missing-import
import 'vite/modulepreload-polyfill'

const apiVersion = '1.3'

window.OCA.Text = {
	...window.OCA.Text,
}

class TextEditorEmbed {
	#vm
	#data
	constructor(vm, data) {
		this.#vm = vm
		this.#data = data
		this.#registerDebug()
		return this
	}

	#getEditorComponent() {
		return this.#vm.$children[0]
	}

	onCreate(onCreateCallback = () => {}) {
		this.#vm.$on('create:content', (content) => {
			onCreateCallback(content)
		})
		return this
	}

	onLoaded(onLoadedCallback = () => {}) {
		this.#vm.$on('ready', () => {
			onLoadedCallback()
		})
		return this
	}

	onUpdate(onUpdateCallback = () => {}) {
		this.#vm.$on('update:content', (content) => {
			onUpdateCallback(content)
		})
		return this
	}

	onSearch(onSearchCallback = () => {}) {
		subscribe('text:editor:search-results', onSearchCallback)
		return this
	}

	onTocToggle(onTocToggleCallback = () => {}) {
		subscribe('text:toc:toggled', onTocToggleCallback)
		return this
	}

	onTocPin(onTocPinCallback = () => {}) {
		subscribe('text:toc:pin', onTocPinCallback)
		return this
	}

	render(el) {
		el.innerHTML = ''
		const element = document.createElement('div')
		el.appendChild(element)
		this.#vm.$mount(element)
		return this
	}

	destroy() {
		this.#vm.$destroy()
		this.#vm.$el.innerHTML = ''
	}

	setContent(content) {
		// Update reactive prop for MarkdownContentEditor
		this.#vm.$set(this.#data, 'content', content)
		// Call setContent for file based Editor
		this.#getEditorComponent()?.setContent?.(content)
		return this
	}

	getHTML() {
		const editor = this.#getEditorComponent()?.editor
		return editor?.getHTML()
	}

	setSearchQuery(query, matchAll) {
		const editor = this.#getEditorComponent()?.editor
		editor?.commands.setSearchQuery(query, matchAll)
	}

	searchNext() {
		const editor = this.#getEditorComponent()?.editor
		editor?.commands.nextMatch()
	}

	searchPrevious() {
		const editor = this.#getEditorComponent()?.editor
		editor?.commands.previousMatch()
	}

	async save() {
		return this.#getEditorComponent().save?.()
	}

	setShowOutline(value) {
		emit('text:toc:toggle', { visible: value })
		return this
	}

	setReadOnly(value) {
		this.#vm.$set(this.#data, 'readOnly', value)
		return this
	}

	updateReadonlyBarProps(value) {
		this.#vm.$set(this.#data, 'readonlyBarProps', value)
		return this
	}

	insertAtCursor(content) {
		this.#getEditorComponent()
			.editor?.chain()
			.insertContent(content)
			.focus()
			.run()
	}

	focus() {
		this.#getEditorComponent().editor?.commands.focus()
	}

	debugYjs() {
		const yjsData = this.#getEditorComponent().debugYjsData()

		const intro =
			'Editor Yjs debug data. Copy the object below that starts with "clientId".'
		const introChrome = '- In Chrome, select "Copy" at the end of the line.'
		const introFirefox =
			'- In Firefox, right-click on the object and select "Copy object".'
		const styleBold = 'font-weight: bold;'
		const styleItalic = 'font-weight: normal; font-style: italic;'
		console.warn(JSON.stringify(yjsData, null, ' '))
		console.warn(
			'%c%s\n%c%s\n%s',
			styleBold,
			intro,
			styleItalic,
			introChrome,
			introFirefox,
		)
	}

	#registerDebug() {
		if (window?._oc_debug) {
			this.vm = this.#vm
			window.OCA.Text._debug = [...(window.OCA.Text._debug ?? []), this]
		}
	}
}

window.OCA.Text.apiVersion = apiVersion
window.OCA.Text.createEditor = async function ({
	// Element to render the editor to
	el,

	// Session editor with file mode is enabled by setting the fileId and useSession.
	// Otherwise, content needs to be provided.
	fileId = undefined,
	useSession = true,
	filePath = undefined,
	shareToken = null,

	content = '',

	readOnly = false,
	autofocus = true,
	readonlyBar = {
		component: null,
		props: null,
	},

	onCreate = ({ markdown }) => {},
	onLoaded = () => {},
	onUpdate = ({ markdown }) => {},
	onTocToggle = (visible) => {},
	onOutlineToggle = (visible) => {}, // deprecated, use `onTocToggle`
	onTocPin = (fileId, keep) => {},
	onFileInsert = undefined,
	onMentionSearch = undefined,
	onMentionInsert = undefined,
	openLinkHandler = undefined,
	onSearch = undefined,
}) {
	const { default: MarkdownContentEditor } = await import(
		'./components/Editor/MarkdownContentEditor.vue'
	)
	const { default: Editor } = await import('./components/Editor.vue')

	const data = Vue.observable({
		readonlyBarProps: readonlyBar.props,
		readOnly,
		content,
	})

	const sessionEditor = fileId && useSession

	const vm = new Vue({
		provide() {
			return {
				[ACTION_ATTACHMENT_PROMPT]: onFileInsert,
				[EDITOR_UPLOAD]: !!sessionEditor,
				[HOOK_MENTION_SEARCH]: sessionEditor ? true : onMentionSearch,
				[HOOK_MENTION_INSERT]: sessionEditor ? true : onMentionInsert,
				[OPEN_LINK_HANDLER]: {
					openLink: openLinkHandler || openLink,
				},
				[ATTACHMENT_RESOLVER]: {
					resolve(src, preferRaw) {
						return [
							{
								type: 'image',
								url: src,
							},
						]
					},
				},
			}
		},
		data() {
			return data
		},
		render: (h) => {
			const scopedSlots = readonlyBar?.component
				? {
						readonlyBar: () => {
							return h(readonlyBar.component, {
								props: data.readonlyBarProps,
							})
						},
					}
				: {}

			return sessionEditor
				? h(Editor, {
						props: {
							fileId,
							relativePath: filePath,
							shareToken,
							mime: 'text/markdown',
							active: true,
							autofocus,
						},
						scopedSlots,
					})
				: h(MarkdownContentEditor, {
						props: {
							fileId,
							content: data.content,
							relativePath: filePath,
							shareToken,
							readOnly: data.readOnly,
						},
						scopedSlots,
					})
		},
	})

	return new TextEditorEmbed(vm, data)
		.onCreate(onCreate)
		.onLoaded(onLoaded)
		.onUpdate(onUpdate)
		.onSearch(onSearch)
		.onTocToggle(onOutlineToggle)
		.onTocToggle(onTocToggle)
		.onTocPin(onTocPin)
		.render(el)
}

window.OCA.Text.createTable = async function ({
	// Element to render the editor to
	el,

	content = '',

	readOnly = false,
	autofocus = true,

	onCreate = ({ markdown }) => {},
	onLoaded = () => {},
	onUpdate = ({ markdown }) => {},
}) {
	const { default: PlainTableContentEditor } = await import(
		'./components/Editor/PlainTableContentEditor.vue'
	)

	const data = Vue.observable({
		readOnly,
		content,
	})

	const vm = new Vue({
		data() {
			return data
		},
		render: (h) => {
			return h(PlainTableContentEditor, {
				props: {
					content: data.content,
					readOnly: data.readOnly,
				},
			})
		},
	})

	return new TextEditorEmbed(vm, data)
		.onCreate(onCreate)
		.onLoaded(onLoaded)
		.onUpdate(onUpdate)
		.render(el)
}
