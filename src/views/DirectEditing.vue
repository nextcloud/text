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
	<div id="editor-wrapper">
		<EditorWrapper :initial-session="initialSession" :active="true" mime="text/markdown">
			<template #header>
				<button class="icon-share" @click="share" />
				<button class="icon-close" @click="close" />
			</template>
		</EditorWrapper>
		<!--<hr>
		<h3>Debug output</h3>
		<pre>{{ initialSession }}</pre>
		<pre>Last request time: {{ log.mtime }}</pre>
		<pre>{{ messages }}</pre>-->
	</div>
</template>

<script>
import Vue from 'vue'
import EditorWrapper from '../components/EditorWrapper'

const log = Vue.observable({
	messages: [],
	mtime: 0,
})

window.OCP.DirectEditing = {
	close() {
		log.messages.push('OCP.DirectEditing.close got called')
	},
}

window.addEventListener('message', function(message) {
	log.messages.push(message.data)
})
export default {
	name: 'DirectEditing',
	components: { EditorWrapper },
	data() {
		return {
			initial: OCP.InitialState.loadState('text', 'file'),
			messages: log.messages,
			log: log,
		}
	},
	computed: {
		initialSession() {
			return JSON.parse(this.initial.session) || null
		},
	},
	methods: {
		close() {
			window.postMessage('close')
		},
		share() {
			window.postMessage('share')
		},
	},
}
</script>

<style scoped lang="scss">
	pre {
		width: 100%;
		max-width: 700px;
		margin: auto;
		background-color: var(--color-background-dark);
	}

	button {
		width: 44px;
		height: 44px;
		margin: 0;
		background-size: 16px;
		border: 0;
		background-color: transparent;
		opacity: .5;
		color: var(--color-main-text);
		background-position: center center;
		vertical-align: top;
		&:hover, &:focus, &:active {
			background-color: var(--color-background-dark);
		}
		&.is-active,
		&:hover,
		&:focus {
			opacity: 1;
		}

		&.icon-undo, &.icon-redo {
			opacity: .4;
		}
	}
</style>
