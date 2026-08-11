/*!
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: MIT
 */

/* global process */

import {
	configureNextcloud,
	startNextcloud,
	stopNextcloud,
	waitOnNextcloud,
} from '@nextcloud/e2e-test-server/docker'
import { readFileSync } from 'fs'
import { execSync } from 'node:child_process'

/**
 *
 */
async function isServerRunning() {
	try {
		const res = await fetch('http://127.0.0.1:8089/status.php')
		return res.ok
	} catch {
		return false
	}
}

/**
 *
 */
async function start() {
	const appinfo = readFileSync('appinfo/info.xml').toString()
	const maxVersion = appinfo.match(/<nextcloud min-version="\d+" max-version="(\d\d+)" \/>/)?.[1]

	let branch = 'stable34'

	return await startNextcloud(branch, true, {
		exposePort: 8089,
	})
}

/**
 *
 */
async function stop() {
	process.stderr.write('Stopping Nextcloud server…\n')
	await stopNextcloud()
	process.exit(0)
}

process.on('SIGTERM', stop)
process.on('SIGINT', stop)

// Start the Nextcloud docker container
if (await isServerRunning()) {
	// eslint-disable-next-line no-console
	console.log('└─ Nextcloud is now ready to use')
} else {
	const ip = await start()
	await waitOnNextcloud(ip)
	await configureNextcloud(['text'])
}

// Idle to wait for shutdown
while (true) {
	await new Promise((resolve) => setTimeout(resolve, 5000))
}
