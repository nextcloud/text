/**
 * SPDX-FileCopyrightText: 2024 Ferdinand Thiessen <opensource@fthiessen.de>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { configureNextcloud } from '@nextcloud/e2e-test-server'
import { test as setup } from '@playwright/test'

/**
 * We use this to ensure Nextcloud is configured correctly before running our tests
 *
 * This can not be done in the webserver startup process,
 * as that only checks for the URL to be accessible which happens already before everything is configured.
 */
setup('Configure Nextcloud', async () => {
	const appsToInstall = ['text', 'viewer']
	await configureNextcloud(appsToInstall)
})
