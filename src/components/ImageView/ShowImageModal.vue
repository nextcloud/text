<template>
	<NcModal v-if="show"
		size="large"
		:title="currentImage.basename"
		:out-transition="true"
		:has-next="true"
		:has-previous="true"
		:close-button-contained="false"
		dark="true"
		@next="showNextImage"
		@previous="showPreviousImage"
		@close="$emit('close')">
		<div class="modal__content">
			<img :src="currentImage.source">
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
			default() {
				return []
			},
			validator(imagesList) {
				return (imagesList.length === 0)
					? true
					: imagesList.findIndex(({ basename, source }) => !(basename && source)) !== -1
			},
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
		startIndex(val) {
			this.currentImageIndex = val
		},
	},
	methods: {
		showNextImage() {
			this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length
			this.currentImage = this.images[this.currentImageIndex]
		},
		showPreviousImage() {
			this.currentImageIndex = this.currentImageIndex <= 0
				? this.images.length - 1
				: this.currentImageIndex - 1
			this.currentImage = this.images[this.currentImageIndex]
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
