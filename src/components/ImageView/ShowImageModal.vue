<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcModal v-if="show"
		size="large"
		:name="currentImage.name"
		:out-transition="true"
		:has-next="true"
		:has-previous="true"
		:close-button-contained="false"
		:dark="true"
		@next="showNextImage"
		@previous="showPreviousImage"
		@close="$emit('close')">
		<div class="modal__content">
			<img :src="currentImage.previewUrl">
		</div>
	</NcModal>
</template>

<script>
import { NcModal } from '@nextcloud/vue'

export default {
	name: 'ShowImageModal',
	components: {
		NcModal,
	},
	props: {
		images: {
			type: Array,
			required: true,
		},
		startIndex: {
			type: Number,
			default: 0,
		},
		show: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			currentImageIndex: 0,
		}
	},
	computed: {
		currentImage() {
			return this.images[this.currentImageIndex]
		},
	},
	watch: {
		'startIndex'(val) {
			this.currentImageIndex = val
		},
	},
	methods: {
		showNextImage() {
			this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length
		},
		showPreviousImage() {
			this.currentImageIndex = this.currentImageIndex <= 0
				? this.images.length - 1
				: this.currentImageIndex - 1
		},
	},
}
</script>

<style scoped lang="scss">
.modal__content {
	height: 80vh;
	padding: 0 50px;
	display: flex;
	justify-content: center;
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}
</style>
