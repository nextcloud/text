import { getLoggerBuilder } from '@nextcloud/logger'

const logger = getLoggerBuilder()
	.setApp('text')
	.detectUser()
	.build()

export {
	logger,
}
