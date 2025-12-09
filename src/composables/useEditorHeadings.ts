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
	previous?: number,
}

const headings = shallowRef<Heading[]>([])
const displayToc = shallowRef<boolean>(false)

export const useEditorHeadings = () => {
	const updateHeadings = (newHeadings: Heading[]) => {
		headings.value = newHeadings
	}

	const setDisplayToc = (display: boolean) => {
		displayToc.value = display
	}

	return {
		displayToc: readonly(displayToc),
		headings: readonly(headings),
		setDisplayToc,
		updateHeadings,
	}
}
