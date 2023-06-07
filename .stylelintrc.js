const stylelintConfig = require('@nextcloud/stylelint-config')

stylelintConfig.rules['no-invalid-position-at-import-rule'] = null

module.exports = stylelintConfig
