<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<NodeViewWrapper class="vue-component" as="p">
		<NodeViewContent class="paragraph-content" />
		<NcReferenceList v-if="text"
			:text="text"
			:limit="1"
			contenteditable="false" />
	</NodeViewWrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-2'
import { NcReferenceList } from '@nextcloud/vue/dist/Components/NcRichText.js'
import debounce from 'debounce'

export default {
	name: 'ParagraphView',
	components: {
		NodeViewWrapper,
		NodeViewContent,
		NcReferenceList,
	},
	props: nodeViewProps,
	data() {
		return {
			text: null,
		}
	},
	watch: {
		node: {
			handler(newNode) {
				if (!newNode?.textContent) {
					this.text = ''
					return
				}
				this.debouncedUpdateText(newNode)
			},
		},
	},
	beforeCreate() {
		this.debouncedUpdateText = debounce((newNode) => {
			this.text = this.getTextReference(this.node)
		}, 500)
	},
	created() {
		this.text = this.getTextReference(this.node)
	},
	beforeUnmount() {
		this.debouncedUpdateText?.cancel()
	},
	methods: {
		getTextReference(node) {
			if (!node?.childCount) {
				return null
			}

			// Only regard paragraphs with exactly one text node (ignoring whitespace-only nodes)
			let textNode
			for (let i = 0; i < node.childCount; i++) {
				const childNode = node.child(i)

				// Disregard paragraphs with non-text nodes
				if (childNode.type.name !== 'text') {
					return null
				}

				// Ignore children with empty text
				if (!childNode.textContent.trim()) {
					continue
				}

				// Disregard paragraphs with more than one text nodes
				if (textNode) {
					return null
				}

				textNode = childNode
			}

			// Check if the text node is a link
			const linkMark = textNode?.marks.find((m) => m.type.name === 'link')
			const href = linkMark?.attrs?.href

			const PATTERN = /(^)(https?:\/\/)((?:[-A-Z0-9+_]+\.)+[-A-Z]+(?:\/[-A-Z0-9+&@#%?=~_|!:,.;()]*)*)($)/ig
			if ((new RegExp(PATTERN)).test(href)) {
				return href
			}

			return null
		},
	},
}
</script>
<style lang="scss" scoped>
:deep(div.widgets--list a.widget-default) {
	color: var(--color-main-text);
	padding: 0;
	text-decoration: none;
}

:deep(.widget-default--details) {
	overflow:hidden;
	p {
		margin-bottom: 4px !important;
	}
}
</style>
