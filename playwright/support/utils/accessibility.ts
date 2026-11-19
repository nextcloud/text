/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// eslint-disable-next-line import/no-named-as-default
import AxeBuilder from '@axe-core/playwright'

type AxeResults = Awaited<ReturnType<AxeBuilder['analyze']>>

/**
 * Creates a fingerprint of accessibility violations for snapshot testing.
 * This extracts only the essential information (rule ID and CSS selectors)
 * to avoid fragile snapshots that break when implementation details change.
 *
 * @param accessibilityScanResults - Results from AxeBuilder.analyze()
 * @return JSON string with violation fingerprints
 */
export function violationFingerprints(accessibilityScanResults: AxeResults): string {
	const violationFingerprints = accessibilityScanResults.violations.map(
		(violation) => ({
			rule: violation.id,
			description: violation.description,
			// These are CSS selectors which uniquely identify each element with
			// a violation of the rule in question.
			targets: violation.nodes.map((node) => node.target),
			// Include impact level for prioritization
			impact: violation.impact,
		}),
	)

	return JSON.stringify(violationFingerprints, null, 2)
}

/**
 * Formats violation results for better readability in test output
 *
 * @param accessibilityScanResults - Results from AxeBuilder.analyze()
 * @return Formatted string describing all violations
 */
export function formatViolations(accessibilityScanResults: AxeResults): string {
	if (accessibilityScanResults.violations.length === 0) {
		return 'No accessibility violations found'
	}

	const violations = accessibilityScanResults.violations
		.map((violation) => {
			const targets = violation.nodes
				.map((node) => `  - ${node.target.join(' ')}`)
				.join('\n')
			return `
Rule: ${violation.id} (${violation.impact})
Description: ${violation.description}
Help: ${violation.help}
Help URL: ${violation.helpUrl}
Affected elements:
${targets}
`
		})
		.join('\n---\n')

	return `Found ${accessibilityScanResults.violations.length} accessibility violation(s):\n${violations}`
}

/**
 * Gets a summary of accessibility scan results including passes, violations, and incomplete checks
 *
 * @param accessibilityScanResults - Results from AxeBuilder.analyze()
 * @return Summary object
 */
export function getAccessibilitySummary(accessibilityScanResults: AxeResults) {
	return {
		violations: accessibilityScanResults.violations.length,
		passes: accessibilityScanResults.passes.length,
		incomplete: accessibilityScanResults.incomplete.length,
		inapplicable: accessibilityScanResults.inapplicable.length,
		url: accessibilityScanResults.url,
		timestamp: accessibilityScanResults.timestamp,
	}
}
