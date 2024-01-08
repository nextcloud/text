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
	<NodeViewWrapper class="vue-component"
		as="a"
		:href="node.attrs.href"
		contenteditable="false">
		<NodeViewContent as="span" />
		<span v-if="node.attrs.updateTitle" class="icon-loading-small" />
	</NodeViewWrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-2'
import debounce from 'debounce'
import { resolveLink } from '../helpers/links.js'

export default {
	name: 'Link',
	components: {
		NodeViewWrapper,
		NodeViewContent,
	},
	props: nodeViewProps,
	created() {
		if (this.node.attrs.updateTitle) {
			resolveLink(this.node.textContent).then((result) => {
				const openGraphObject = result?.openGraphObject
				const text = openGraphObject?.name
				if (!text) {
					return
				}
				const { schema } = this.editor

				const pos = this.getPos()

				this.editor
					.chain()
					.setNodeSelection(pos)
					.command(({ tr }) => {
						const newNode = schema.nodes.link.create({ href: this.node.attrs.href, updateTitle: false }, [
							schema.text(text),
						])
						tr.replaceSelectionWith(newNode)
						return true
					})
					.run()
			})
		}
	},
}
</script>
<style lang="scss" scoped>
.icon-loading-small {
	margin-left: 10px;
}
</style>
