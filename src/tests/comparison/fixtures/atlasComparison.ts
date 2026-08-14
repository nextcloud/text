/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

const ATLAS_ROLLBACK_SECTION = `## Rollback ownership

Maya owns rollback approval.

Escalate checkout regressions to the release commander.`

const ATLAS_EVIDENCE_SECTION = `## Audit archive

Each decision receives a durable timestamp.

Signed records remain with the project history.`

const ATLAS_READINESS_SECTION = `## Regional readiness

All checkout regions use the same health gate.

Regional owners confirm capacity before launch.`

export const ATLAS_INITIAL_CONTENT = `---
release: atlas-2.4
status: draft
owner: Maya Chen
---

# Atlas 2.4 release plan

> Draft rollout window: Thursday, 18 July.

## Objective

Ship **Atlas 2.4** to a 10% pilot cohort while protecting checkout availability.

Release owner: Maya Chen.

Status cadence: every 15 minutes.

All named owners have acknowledged the window.

Status dashboard is available to the release team.

The dashboard is reviewed before each traffic increase.

Keep the [incident channel](https://chat.example.test/atlas) staffed during rollout.

The incident commander acknowledges every escalation.

Follow the [operator runbook](https://docs.example.test/atlas/draft).

The release commander validates every operator handoff.

Customer update is ready for review.

Checkout remains available throughout the launch.

${ATLAS_ROLLBACK_SECTION}

${ATLAS_EVIDENCE_SECTION}

${ATLAS_READINESS_SECTION}

## Decision protocol

The release commander records every traffic decision.

## Rollout checklist

- [x] Freeze schema changes
- [ ] Confirm support coverage
- [ ] Enable the pilot cohort

## Schedule

| Stage | Owner | Traffic |
| --- | --- | --- |
| Pilot | Maya | 10% |
| General availability | Lee | Pending |

Checkout remains available throughout the launch.

::: info
The checkout health gate must remain green for fifteen minutes.
:::

Health checks are sampled from every checkout region.

<details>
<summary>Escalation contacts</summary>
Maya leads release decisions; Noor leads rollback execution.
</details>

## Guardrail

\`\`\`js
const rolloutPercent = 10
const rollbackThreshold = 0.02
\`\`\`

Rollback if error rate exceeds \`2%\`.

The rollout decision is recorded in the release evidence.[^atlas-draft]

Visual evidence follows the signed release decision.

![Atlas rollout dashboard](/core/img/logo/logo.svg)

The image checksum is recorded separately.

[^atlas-draft]: Draft approval requires checkout error rate below two percent.
`

export const ATLAS_SYNTAX_ONLY_CONTENT = ATLAS_INITIAL_CONTENT
	.replace('# Atlas 2.4 release plan', '# Atlas 2.4 release plan #')
	.replace('Status dashboard is available to the release team.', 'Status dashboard is available to the release team. ')
	.replaceAll('\n', '\r\n')
	.replace(/\r\n$/, '')

export const ATLAS_CURRENT_CONTENT = `---
release: atlas-2.4
status: launch-ready
owner: Maya Chen and Noor Patel
---

# Atlas 2.4 launch plan

> Approved rollout window: Friday, 19 July.

## Objective

Ship **Atlas 2.4** through a 25% progressive rollout while protecting checkout availability.

Release owner: **Maya Chen**.

Status cadence: *every 15 minutes*.

All named owners have acknowledged the window.

[Status dashboard](https://status.example.test/atlas) is available to the release team.

The dashboard is reviewed before each traffic increase.

Keep the incident channel staffed during rollout.

The incident commander acknowledges every escalation.

Follow the [operator runbook](https://docs.example.test/atlas/2.4).

The release commander validates every operator handoff.

Customer **launch update** is ready for publication.

Checkout remains available throughout the launch.

${ATLAS_EVIDENCE_SECTION}

${ATLAS_READINESS_SECTION}

${ATLAS_ROLLBACK_SECTION}

## Decision protocol

The release commander records every traffic decision.

## Rollout checklist

- [x] Freeze schema changes
- [x] Confirm support coverage
- [x] Enable the pilot cohort
- [ ] Publish the customer update

## Schedule

| Stage | Owner | Traffic |
| --- | --- | --- |
| Canary | Maya | 25% |
| General availability | Lee | 100% |
| Rollback rehearsal | Noor | Complete |

Checkout remains available throughout the launch.

::: warn
The checkout health gate must remain green for fifteen minutes.
:::

Health checks are sampled from every checkout region.

<details>
<summary>Escalation contacts</summary>
Maya leads release decisions; Noor executes rollback and Lee owns customer communication.
</details>

## Guardrail

\`\`\`js
const rolloutPercent = 25
const rollbackThreshold = 0.015
\`\`\`

Rollback if error rate exceeds \`1.5%\` for five minutes.

The rollout decision is recorded in the release evidence.[^atlas-launch]

Visual evidence follows the signed release decision.

![Atlas launch control room](/core/img/logo/logo.svg)

The image checksum is recorded separately.

[^atlas-launch]: Launch approval requires checkout error rate below one and a half percent for five minutes.
`
