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
	<div class="image" :class="{'icon-loading': !loaded}">
		<div v-if="imageLoaded">
			<transition name="fade">
				<img v-show="loaded" :src="src"
					class="image__main" @load="onLoaded">
			</transition>
			<transition name="fade">
				<div v-show="loaded" class="image__caption">
					<input ref="altInput" type="text" :value="alt"
						@keyup.enter="updateAlt()">
				</div>
			</transition>
		</div>
		<div v-else class="image__placeholder">
			<transition name="fade">
				<div v-show="loaded" class="image__main">
					<div class="icon-image" />
					<p>{{ t('text', 'Insufficient permissions to view image') }}</p>
				</div>
			</transition>
			<transition name="fade">
				<div v-show="loaded" class="image__caption">
					<input ref="altInput" type="text" :value="alt"
						@keyup.enter="updateAlt()">
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ImageView',
	props: ['node', 'updateAttrs', 'view'], // eslint-disable-line
	data() {
		return {
			imageLoaded: false,
			loaded: false,
			failed: false
		}
	},
	computed: {
		src: {
			get() {
				return this.node.attrs.src
			},
			set(src) {
				this.updateAttrs({
					src
				})
			}
		},
		alt: {
			get() {
				return this.node.attrs.alt ? this.node.attrs.alt : ''
			},
			set(alt) {
				this.updateAttrs({
					alt
				})
			}
		},
		t() {
			return (a, s) => window.t(a, s)
		}
	},
	beforeMount() {
		var img = new Image()
		img.src = this.node.attrs.src
		img.onload = () => {
			this.imageLoaded = true
		}
		img.onerror = () => {
			this.failed = true
			this.imageLoaded = false
			this.loaded = true
		}
	},
	methods: {
		updateAlt() {
			this.alt = this.$refs.altInput.value
		},
		onLoaded() {
			this.loaded = true
		}
	}
}
</script>

<style scoped lang="scss">
	.image {
		border: 1px solid transparent !important;
		&:hover {
			border: 1px solid var(--color-background-darker) !important;
		}
	}
	.image__caption {
		text-align: center;
		color: var(--color-text-lighter);
		input[type="text"] {
			width: 100%;
			border: none;
			text-align: center;
		}
	}
	.icon-image {
		margin-top: 10px;
		height: 32px;
		padding: 20px;
	}
	.image__loading {
		height: 100px;
	}
	.image__placeholder .image__main {
		background-color: var(--color-background-dark);
		text-align: center;
		padding: 20px;
		.icon-image {
			opacity: 0.7;
		}
	}

	.fade-enter-active {
		transition: opacity .3s ease-in-out;
	}

	.fade-enter-to {
		opacity: 1;
	}

	.fade-enter {
		opacity: 0;
	}
</style>
