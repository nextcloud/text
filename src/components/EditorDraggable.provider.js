export const IS_UPLOADING_IMAGES = Symbol('editor:is-uploading-images')
export const ACTION_IMAGE_PROMPT = Symbol('editor:action:image-prompt')
export const ACTION_CHOOSE_LOCAL_IMAGE = Symbol('editor:action:upload-image')

export const useIsUploadingImagesMixin = {
	inject: {
		$isUploadingImages: { from: IS_UPLOADING_IMAGES, default: false },
	},
}

export const useActionImagePromptMixin = {
	inject: {
		$callImagePrompt: { from: ACTION_IMAGE_PROMPT, default: () => {} },
	},
}

export const useActionChooseLocalImageMixin = {
	inject: {
		$callChooseLocalImage: { from: ACTION_CHOOSE_LOCAL_IMAGE, default: () => {} },
	},
}
