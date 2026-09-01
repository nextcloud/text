/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { afterEach, describe, expect, it, vi } from 'vitest'

const originalComparisonBaseURL = process.env.TEXT_COMPARISON_BASE_URL
const originalComparisonE2E = process.env.TEXT_COMPARISON_E2E
const originalBaseURL = process.env.baseURL

afterEach(() => {
	setEnvironment('TEXT_COMPARISON_BASE_URL', originalComparisonBaseURL)
	setEnvironment('TEXT_COMPARISON_E2E', originalComparisonE2E)
	setEnvironment('baseURL', originalBaseURL)
})

function setEnvironment(name: string, value: string | undefined) {
	if (value === undefined) {
		delete process.env[name]
	} else {
		process.env[name] = value
	}
}

async function loadConfig(comparisonBaseURL: string | undefined, baseURL: string | undefined, comparisonE2E?: string) {
	setEnvironment('TEXT_COMPARISON_BASE_URL', comparisonBaseURL)
	setEnvironment('TEXT_COMPARISON_E2E', comparisonE2E)
	setEnvironment('baseURL', baseURL)
	vi.resetModules()
	return (await import('../../playwright.config.ts')).default
}

describe('Playwright comparison server selection', () => {
	it.each([
		{ name: 'unset values', comparisonBaseURL: undefined, baseURL: undefined, expected: 'http://localhost:8089/index.php/', managed: true },
		{ name: 'empty values', comparisonBaseURL: '', baseURL: '', expected: 'http://localhost:8089/index.php/', managed: true },
		{ name: 'generic external URL', comparisonBaseURL: '', baseURL: 'https://generic.example/index.php/', expected: 'https://generic.example/index.php/', managed: false },
		{ name: 'dedicated external URL', comparisonBaseURL: 'https://text.example/index.php/', baseURL: '', expected: 'https://text.example/index.php/', managed: false },
		{ name: 'dedicated precedence', comparisonBaseURL: 'https://text.example/index.php/', baseURL: 'https://generic.example/index.php/', expected: 'https://text.example/index.php/', managed: false },
	])('uses the selected URL for $name', async ({ comparisonBaseURL, baseURL, expected, managed }) => {
		const config = await loadConfig(comparisonBaseURL, baseURL)

		expect(config.use?.baseURL).toBe(expected)
		expect(config.webServer === undefined).toBe(!managed)
	})

	it('routes comparison and memory tests to their dedicated projects', async () => {
		const config = await loadConfig(undefined, undefined, '1')
		const projects = config.projects ?? []
		const byName = new Map(projects.map((project) => [project.name, project]))
		const comparisonNames = [
			'comparison-chromium',
			'comparison-webkit',
			'comparison-chromium-memory',
		]

		expect(projects.map(({ name }) => name)).toEqual(['chromium', ...comparisonNames])
		for (const name of comparisonNames) {
			const match = byName.get(name)?.testMatch
			expect(match).toBeInstanceOf(RegExp)
			expect((match as RegExp).test('playwright/comparison/comparison.spec.ts')).toBe(true)
			expect((match as RegExp).test('playwright/example.spec.ts')).toBe(false)
		}
		for (const name of comparisonNames.slice(0, 2)) {
			expect(byName.get(name)?.grepInvert).toEqual(/@memory/)
			expect(byName.get(name)?.grep).toBeUndefined()
		}
		expect(byName.get('comparison-chromium-memory')?.grep).toEqual(/@memory/)
		expect(byName.get('comparison-chromium-memory')?.grepInvert).toBeUndefined()
		const ordinaryIgnore = byName.get('chromium')?.testIgnore
		expect(ordinaryIgnore).toBeInstanceOf(RegExp)
		expect((ordinaryIgnore as RegExp).test('playwright/comparison/comparison.spec.ts')).toBe(true)
		expect((ordinaryIgnore as RegExp).test('playwright/example.spec.ts')).toBe(false)
	})
})
