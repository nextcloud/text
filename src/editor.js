/*
 * @copyright Copyright (c) 2023 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import Vue from 'vue'
import store from './store/index.js'
import { EDITOR_UPLOAD, HOOK_MENTION_SEARCH, HOOK_MENTION_INSERT, HOOK_LINK_CLICK, ATTACHMENT_RESOLVER } from './components/Editor.provider.js'
import { ACTION_ATTACHMENT_PROMPT } from './components/Editor/MediaHandler.provider.js'

__webpack_nonce__ = btoa(OC.requestToken) // eslint-disable-line
__webpack_public_path__ = OC.linkTo('text', 'js/') // eslint-disable-line

const apiVersion = '1.1'

Vue.prototype.t = window.t
Vue.prototype.n = window.n
Vue.prototype.OCA = window.OCA

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

	onOutlineToggle(onOutlineToggleCallback = () => {}) {
		this.#vm.$on('outline-toggled', (visible) => {
			onOutlineToggleCallback(visible)
		})
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

	async save() {
		return this.#getEditorComponent().save?.()
	}

	setShowOutline(value) {
		this.#vm.$set(this.#data, 'showOutlineOutside', value)
		return this
	}

	setReadOnly(value) {
		this.#vm.$set(this.#data, 'readOnly', value)
		return this
	}

	insertAtCursor(content) {
		this.#getEditorComponent().$editor.chain().insertContent(content).focus().run()
	}

	focus() {
		this.#getEditorComponent().$editor.commands.focus()
	}

	#registerDebug() {
		if (window?._oc_debug) {
			this.vm = this.#vm
			window.OCA.Text._debug = [
				...(window.OCA.Text._debug ?? []),
				this,
			]
		}
	}

}

window.OCA.Text.apiVersion = apiVersion
window.OCA.Text.createEditor = async function({
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
	onOutlineToggle = (visible) => {},
	onLinkClick = undefined,
	onFileInsert = undefined,
	onMentionSearch = undefined,
	onMentionInsert = undefined,
}) {
	const { default: MarkdownContentEditor } = await import(/* webpackChunkName: "editor" */'./components/Editor/MarkdownContentEditor.vue')
	const { default: Editor } = await import(/* webpackChunkName: "editor" */'./components/Editor.vue')

	const data = Vue.observable({
		showOutlineOutside: false,
		readOnly,
		content,
	})

	const sessionEditor = fileId && useSession

	const vm = new Vue({
		provide() {
			return {
				[HOOK_LINK_CLICK]: onLinkClick,
				[ACTION_ATTACHMENT_PROMPT]: onFileInsert,
				[EDITOR_UPLOAD]: !!sessionEditor,
				[HOOK_MENTION_SEARCH]: sessionEditor ? true : onMentionSearch,
				[HOOK_MENTION_INSERT]: sessionEditor ? true : onMentionInsert,
				[ATTACHMENT_RESOLVER]: {
					resolve(src, preferRaw) {
						return [{
							type: 'image',
							url: src,
						}]
					},
				},
			}
		},
		data() {
			return data
		},
		render: h => {
			const scopedSlots = readonlyBar?.component
				? {
					readonlyBar: () => {
						return h(readonlyBar.component, {
							props: readonlyBar.props,
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
						showOutlineOutside: data.showOutlineOutside,
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
						showOutlineOutside: data.showOutlineOutside,
					},
					scopedSlots,
				})
		},
		store,
	})
	return new TextEditorEmbed(vm, data)
		.onCreate(onCreate)
		.onLoaded(onLoaded)
		.onUpdate(onUpdate)
		.onOutlineToggle(onOutlineToggle)
		.render(el)
}
