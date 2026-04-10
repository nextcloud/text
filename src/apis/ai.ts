/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

/**
 * tag a file as containing AI-generated content.
 *
 * @param fileId id of the file to tag.
 */
export async function markFileAsAiGenerated(fileId: number): Promise<void> {
	try {
		await axios.post(generateUrl(`apps/text/ai/tag/${fileId}`))
	} catch (e) {
		console.warn('failed to tag file as AI-generated', e)
	}
}
