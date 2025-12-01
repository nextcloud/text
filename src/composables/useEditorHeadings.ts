/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { readonly, shallowRef } from 'vue'

type Heading = {
	id: string,
	level: number,
	offset: number,
	text: string,
}

const headings = shallowRef<Heading[]>([])

export const useEditorHeadings = () => {
	const updateHeadings = (newHeadings: Heading[]) => {
		headings.value = newHeadings
	}

	return { headings: readonly(headings), updateHeadings }
}
