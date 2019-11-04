/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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
 *
 */
import axios from '@nextcloud/axios'

export default class PreviewPlugin {

	constructor() {
		this.initPromise = null
		this.vue = null
		this.ReadOnlyEditor = null
		this.view = null
	}

	init() {
		if (!this.initPromise) {
			this.initPromise = Promise.all([
				import(/* webpackChunkName: "preview" */'vue'),
				import(/* webpackChunkName: "preview" */'./../components/ReadOnlyEditor'),
			]).then((exports) => {
				this.Vue = exports[0].default
				this.ReadOnlyEditor = exports[1].default
			})
		}
		return this.initPromise
	}

	attach(manager) {
		manager.addPreviewHandler('text/markdown', this.handlePreview.bind(this))
	}

	handlePreview(model, $thumbnailDiv, $thumbnailContainer, fallback) {
		if (this.view !== null) {
			this.view.$destroy()
			this.view = null
		}

		const previewWidth = ($thumbnailContainer.parent().width())
		const previewHeight = previewWidth / (16 / 9)

		Promise.all([
			this.getFileContent(model.getFullPath()),
			this.init()
		]).then(([{ data }]) => {
			$thumbnailContainer.addClass('text')
			const textPreview = document.createElement('div')
			$thumbnailDiv.children('.stretcher').remove()
			$thumbnailDiv.append(textPreview)
			$thumbnailDiv.css('max-height', previewHeight)
			$thumbnailDiv.css('display', 'flex')
			$thumbnailDiv.removeClass('icon-loading icon-32')
			this.Vue.prototype.t = window.t
			this.Vue.prototype.n = window.n
			this.Vue.prototype.OCA = window.OCA
			this.view = new this.Vue({
				render: h => h(this.ReadOnlyEditor, {
					props: {
						content: data,
						isRichEditor: model.get('mimetype') === 'text/markdown'
					}
				})
			})
			this.view.$mount(textPreview)
		}).catch(() => {
			fallback()
		})
	}

	getFileContent(path) {
		const url = OC.linkToRemoteBase('files' + path)
		return axios.get(url)
	}

}
