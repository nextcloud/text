/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { showError, showSuccess } from '@nextcloud/dialogs'

export default {
	data() {
		return {
			copied: false,
			copyLoading: false,
			copySuccess: false,
		}
	},

	methods: {
		async copyToClipboard(content) {
			// change to loading status
			this.copyLoading = true

			// copy link to clipboard
			try {
				await navigator.clipboard.writeText(content)
				this.copySuccess = true
				this.copied = true

				// Notify success
				showSuccess(t('text', 'Copied to the clipboard'))
			} catch (error) {
				this.copySuccess = false
				this.copied = true
				showError(
					`<div>${t('text', 'Could not copy to the clipboard')}</div>`,
					{ isHTML: true })
			} finally {
				this.copyLoading = false
				setTimeout(() => {
					// stop loading status regardless of outcome
					this.copySuccess = false
					this.copied = false
				}, 4000)
			}
		},
	},
}
