/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

const getSharingToken = () => document.getElementById('sharingToken')
	? document.getElementById('sharingToken').value
	: null

export { getSharingToken }
