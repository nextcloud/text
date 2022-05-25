export const STATE_UPLOADING = Symbol('state:uploading-state')
export const ACTION_IMAGE_PROMPT = Symbol('editor:action:image-prompt')
export const ACTION_CHOOSE_LOCAL_IMAGE = Symbol('editor:action:upload-image')

export const useUploadingStateMixin = {
	inject: {
		$uploadingState: {
			from: STATE_UPLOADING,
			default: {
				x: true,
				isUploadingImages: false,
			},
		},
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
