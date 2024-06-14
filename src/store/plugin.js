/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import debounce from 'debounce'
import { SET_VIEW_WIDTH } from './mutation-types.js'

const getClientWidth = () => document.documentElement.clientWidth

const plugin = ({ commit }) => {
	const onResize = debounce(() => {
		commit(`text/${SET_VIEW_WIDTH}`, getClientWidth())
	}, 100)

	window.addEventListener('resize', onResize)
}

export { getClientWidth }

export default plugin
