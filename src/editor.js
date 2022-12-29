/*
 * @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
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
import Editor from './components/Editor.vue'
import MarkdownContentEditor from './components/Editor/MarkdownContentEditor.vue'
import store from './store/index.js'

__webpack_nonce__ = btoa(OC.requestToken) // eslint-disable-line
__webpack_public_path__ = OC.linkTo('text', 'js/') // eslint-disable-line

window.OCA.Text = {}

Vue.prototype.t = window.t
Vue.prototype.n = window.n
Vue.prototype.OCA = window.OCA

// TODO: Add jsdoc once stable
window.OCA.Text.createEditor = function({
	// Element to render the editor to
	el,

	// File mode is enabled by setting the fileId, otherwise content needs to be provided
	fileId = undefined,
	filePath = undefined,

	content = '',

	readOnly = false,
	// Update callback that emits the content
	onUpdate = ({ markdown }) => {},

	// Callbacks to have custom implementations for certain context related actions
	onFileLink = () => {},
	onFileInsert = () => {},
	onFileUpload = () => {},

	onLinkClick = () => {},
	onImageDisplay = () => {},

	// FIXME: Mentioning only works with the file editor for now as otherwise we need to provide hooks (e.g. to list options and to trigger on insert)
	// FIXME: Need to check about why collectives needed to render the TOC outside and how we can wrap that into this API
	// TODO: Implement AttachmentResolver logic
}) {

	const provide = {
		'editor:hook:onFileLink': onFileLink,
		'editor:hook:onFileInsert': onFileInsert,
		'editor:hook:onFileUpload': onFileUpload,
		'editor:hook:onLinkClick': onLinkClick,
		'editor:hook:onImageDisplay': onImageDisplay,
	}

	// File mode
	if (fileId) {
		// Provide does not play well if we use Vue.extend with the Editor.vue component
		const vm = new Vue({
			provide() {
				return provide
			},
			render: h => h(Editor, {
				props: {
					fileId,
					mime: 'text/markdown',
					active: true,
					relativePath: filePath,
				},
			}),
			store,
		})
		vm.$on('update:content', (content) => {
			onUpdate(content)
		})
		vm.$mount(el)
		return {
			vm,
			destroy() {
				vm.$destroy()
			},
			setContent(content) {
				vm.$children[0].setContent(content)
			},
		}
	}

	// We need a reactive content as we cannot mutate the content prop otherwise
	const data = Vue.observable({ content })

	const vm = new Vue({
		provide() {
			return provide
		},
		data() {
			return data
		},
		methods: {
			setContent: (content) => {
				vm.$set(data, 'content', content)
			},
			destroy() {
				vm.$destroy()
			},
		},
		render: h => h(MarkdownContentEditor, {
			props: {
				content: data.content,
				readOnly,
			},
		}),
	})
	vm.$on('update:content', (content) => {
		onUpdate(content)
	})
	vm.$mount(el)
	return vm
}
