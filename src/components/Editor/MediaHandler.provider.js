/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export const STATE_UPLOADING = Symbol('state:uploading-state')
export const ACTION_ATTACHMENT_PROMPT = Symbol('editor:action:attachment-prompt')
export const ACTION_CHOOSE_LOCAL_ATTACHMENT = Symbol('editor:action:upload-attachment')

export const useUploadingStateMixin = {
	inject: {
		$uploadingState: {
			from: STATE_UPLOADING,
			default: {
				isUploadingAttachments: false,
			},
		},
	},
}

export const useActionAttachmentPromptMixin = {
	inject: {
		$callAttachmentPrompt: { from: ACTION_ATTACHMENT_PROMPT, default: () => {} },
	},
}

export const useActionChooseLocalAttachmentMixin = {
	inject: {
		$callChooseLocalAttachment: { from: ACTION_CHOOSE_LOCAL_ATTACHMENT, default: () => {} },
	},
}
