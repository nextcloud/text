/**
 * SPDX-FileCopyrightText: 2019-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
const stylelintConfig = require('@nextcloud/stylelint-config')

stylelintConfig.rules['no-invalid-position-at-import-rule'] = null

module.exports = stylelintConfig
