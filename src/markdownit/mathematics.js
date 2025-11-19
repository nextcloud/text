/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownitKatex from '@iktakahiro/markdown-it-katex'

export default (md) => {
	return md.use(markdownitKatex)
}
