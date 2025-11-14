/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load a fixture file from playwright/support/fixtures/files directory
 * @param filename Name of the file
 */
export function loadFixture(filename: string) {
	 return readFileSync(`${__dirname}/files/${filename}`, 'utf-8')
}
