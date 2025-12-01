/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { readonly, shallowRef, watch } from 'vue'

type Heading = any

let headingsSingleton: Heading[] = []

export const useEditorHeadings = () => {
	const headings = shallowRef(headingsSingleton)
	console.debug('useEditorHeadings initialization')

	const updateHeadings = (newHeadings: Heading[]) => {
		headings.value = newHeadings
	}

	watch(headings, (newHeadings) => { console.debug('useEditorHeadings watch headings', newHeadings) })

	return { headings: readonly(headings), updateHeadings }
}
