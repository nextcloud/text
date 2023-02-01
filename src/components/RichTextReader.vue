<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
  -
  - @license AGPL-3.0-or-later
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<BaseReader :content="content" @click-link="(e, a) => $emit('click-link', e, a)" />
</template>

<script>
import BaseReader from './BaseReader.vue'
import RichText from './../extensions/RichText.js'
import markdownit from './../markdownit/index.js'

export default {
	name: 'RichTextReader',
	components: { BaseReader },

	provide: {
		renderHtml(content) {
			return markdownit.render(content)
		},
		extensions() {
			return [
				RichText.configure({
					editing: false,
					link: {
						onClick: (event, attrs) => {
							this.$emit('click-link', event, attrs)
							return true
						},
					},
				}),
			]
		},
	},

	props: {
		content: {
			type: String,
			required: true,
		},
	},

	mounted() {
		this.$el.addEventListener('click', this.preventOpeningLinks, true)
	},

	unmounted() {
		this.$el.removeEventListener('click', this.preventOpeningLinks, true)
	},

	methods: {
		preventOpeningLinks(event) {
			// We use custom onClick handler only for left clicks
			if (event.target.closest('a') && event.button === 0 && !event.ctrlKey) {
				event.preventDefault()
			}
		},
	},
}
</script>

<style lang="scss">
	@import './../../css/prosemirror';
	@import './../../css/print';

	@media print {
		// Hide Content behind modal, this also hides the sidebar if open
		#content {
			display: none;
		}
	}
</style>
