/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import './commands.js'

import { mount } from 'cypress/vue2'

Cypress.Commands.add('mount', mount)
