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
	<EditorMenuBubble v-slot="{ commands, isActive, getMarkAttrs, menu }"
		class="menububble"
		:editor="editor"
		@hide="hideLinkMenu">
		<div class="menububble" :class="{ 'is-active': menu.isActive }" :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">
			<form v-if="linkMenuIsActive" class="menububble__form" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
				<input ref="linkInput"
					v-model="linkUrl"
					class="menububble__input"
					type="text"
					placeholder="https://"
					@keydown.esc="hideLinkMenu">
				<button class="menububble__button icon-confirm"
					type="button"
					tabindex="0"
					@click="setLinkUrl(commands.link, linkUrl)" />
			</form>

			<template v-else>
				<button
					class="menububble__button"
					:class="{ 'is-active': isActive.link() }"
					@click="showLinkMenu(getMarkAttrs('link'))">
					<span v-tooltip="t('text', isActive.link() ? 'Update Link' : 'Add Link')" class="icon-link" />
					<span class="menububble__buttontext">
						{{ t('text', isActive.link() ? 'Update Link' : 'Add Link') }}
					</span>
				</button>
				<button
					class="menububble__button"
					:class="{ 'is-active': isActive.link() }"
					@click="selectFile(commands.link)">
					<span v-tooltip="t('text', 'Link file')" class="icon-file" />
					<span class="menububble__buttontext">{{ t('text', 'Link file') }}</span>
				</button>
			</template>
		</div>
	</EditorMenuBubble>
</template>

<script>
import { EditorMenuBubble } from 'tiptap'
import Tooltip from '@nextcloud/vue/dist/Directives/Tooltip'
import { optimalPath } from './../helpers/files'

export default {
	name: 'MenuBubble',
	components: {
		EditorMenuBubble,
	},
	directives: {
		tooltip: Tooltip,
	},
	props: {
		editor: {
			type: Object,
			required: false,
			default: null,
		},
		filePath: {
			type: String,
			required: false,
			default: '',
		},
	},
	data: () => {
		return {
			linkUrl: null,
			linkMenuIsActive: false,
		}
	},
	methods: {
		showLinkMenu(attrs) {
			this.linkUrl = attrs.href
			this.linkMenuIsActive = true
			this.$nextTick(() => {
				this.$refs.linkInput.focus()
			})
		},
		hideLinkMenu() {
			this.linkUrl = null
			this.linkMenuIsActive = false
		},
		selectFile(command) {
			const currentUser = OC.getCurrentUser()
			if (!currentUser) {
				return
			}
			const startPath = this.filePath.split('/').slice(0, -1).join('/')
			OC.dialogs.filepicker(t('text', 'Select file to link to'), (file) => {
				const client = OC.Files.getClient()
				client.getFileInfo(file).then((_status, fileInfo) => {
					const path = optimalPath(this.filePath, `${fileInfo.path}/${fileInfo.name}`)
					const encodedPath = path.split('/').map(encodeURIComponent).join('/')
					command({ href: `${encodedPath}?fileId=${fileInfo.id}` })
					this.hideLinkMenu()
				})
			}, false, [], true, undefined, startPath)
		},
		setLinkUrl(command, url) {
			// Heuristics for determining if we need a https:// prefix.
			const noPrefixes = [
				/^[a-zA-Z]+:/, // url with protocol ("mailTo:email@domain.tld")
				/^\//, // absolute path
				/\?fileId=/, // relative link with fileId
				/^\.\.?\//, // relative link starting with ./ or ../
				/^[^.]*[/$]/, // no dots before first '/' - not a domain name
				/^#/, // url fragment
			]
			if (url && !noPrefixes.find(regex => url.match(regex))) {
				url = 'https://' + url
			}
			command({ href: url })
			this.hideLinkMenu()
		},
	},
}
</script>

<style scoped lang="scss">
	.menububble {
		position: absolute;
		display: flex;
		z-index: 10020;
		background: var(--color-main-background-translucent);
		box-shadow: 0 1px 5px var(--color-box-shadow);
		border-radius: var(--border-radius);
		padding: 0;
		margin-bottom: 0.4rem;
		visibility: hidden;
		opacity: 0;
		transform: translateX(-50%);
		transition: opacity 0.2s, visibility 0.2s;

		&.is-active {
			opacity: 1;
			visibility: visible;
		}

		&__button {
			display: block;
			border: 0;
			padding: 0.3rem 0.7rem;
			margin: 0;
			margin-right: 0.2rem;
			border-radius: var(--border-radius);
			cursor: pointer;

			&:last-child {
				margin-right: 0;
			}
		}

		&__buttontext {
			padding: 0.4rem;
			padding-right: 0;
		}

		&__form {
			display: flex;
			align-items: center;
		}

		&__input {
			font: inherit;
			border: none;
			background: transparent;
			min-width: 150px;
		}
	}
</style>
