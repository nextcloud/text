<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<ol class="text-comparison__sections">
		<li v-for="section in sections" :key="section.id">
			<h3 class="text-comparison__section-title">
				{{ section.title || t('text', 'Document start') }}
			</h3>
			<ul class="text-comparison__changes-list">
				<li v-for="change in section.changes" :key="change.id">
					<button
						type="button"
						class="text-comparison__change"
						:aria-current="change.id === currentId ? 'true' : undefined"
						:data-comparison-select="change.id"
						@click="emit('select', change.id)">
						<span class="text-comparison__change-symbol" aria-hidden="true">
							{{ symbols[change.operation] }}
						</span>
						<span class="text-comparison__change-body">
							<strong>{{ label(change) }}</strong>
							<span class="text-comparison__change-preview" dir="auto">
								<template v-if="change.preview.before === change.preview.after">
									{{ change.preview.after }}
								</template>
								<template v-else>
									<del v-if="change.preview.before">{{ change.preview.before }}</del>
									<ins v-if="change.preview.after">{{ change.preview.after }}</ins>
								</template>
							</span>
						</span>
					</button>
				</li>
			</ul>
		</li>
	</ol>
</template>

<script setup lang="ts">
import type { Node } from '@tiptap/pm/model'
import type { Change } from '../comparison/compare.ts'

import { t } from '@nextcloud/l10n'
import { computed } from 'vue'

const props = defineProps<{
	changes: readonly Change[]
	currentId: string | null
	beforeDocument: Node
	afterDocument: Node
}>()
const emit = defineEmits<{ select: [id: string] }>()

const symbols = { insert: '+', delete: '−', replace: '±' }

const attributeLabels: Record<NonNullable<Change['attribute']>, string> = {
	'heading-level': t('text', 'Heading level changed'),
	'task-state': t('text', 'Task state changed'),
	link: t('text', 'Link target changed'),
	image: t('text', 'Image changed'),
	'code-language': t('text', 'Code language changed'),
	'list-start': t('text', 'List start changed'),
	other: t('text', 'Attribute changed'),
}

const contextLabels: Record<string, string> = {
	paragraph: t('text', 'Paragraph'),
	heading: t('text', 'Heading'),
	listItem: t('text', 'List item'),
	taskItem: t('text', 'Task'),
	table: t('text', 'Table'),
	tableRow: t('text', 'Table row'),
	tableCell: t('text', 'Table cell'),
	tableHeader: t('text', 'Table cell'),
	codeBlock: t('text', 'Code block'),
	blockquote: t('text', 'Quote'),
	callout: t('text', 'Callout'),
	details: t('text', 'Details'),
	image: t('text', 'Image'),
	frontMatter: t('text', 'Front matter'),
}

const beforeHeadings = computed(() => headings(props.beforeDocument))
const afterHeadings = computed(() => headings(props.afterDocument))

const sections = computed(() => {
	const result: Array<{ id: string, title: string, changes: Change[] }> = []
	for (const change of props.changes) {
		const title = change.operation === 'delete'
			? headingBefore(beforeHeadings.value, change.before.from)
			: headingBefore(afterHeadings.value, change.after.from)
		const current = result.at(-1)
		if (current && current.title === title) {
			current.changes.push(change)
		} else {
			result.push({ id: change.id, title, changes: [change] })
		}
	}
	return result
})

function headings(doc: Node) {
	const result: Array<{ from: number, text: string }> = []
	doc.forEach((node, from) => {
		if (node.type.name === 'heading') {
			result.push({ from, text: node.textContent })
		}
	})
	return result
}

function headingBefore(list: ReadonlyArray<{ from: number, text: string }>, position: number) {
	return list.findLast((heading) => heading.from <= position)?.text ?? ''
}

function label(change: Change) {
	if (change.category === 'attribute') {
		return attributeLabels[change.attribute ?? 'other']
	}
	if (change.category === 'formatting') {
		return t('text', 'Formatting changed')
	}
	if (change.category === 'structure') {
		return t('text', 'Structure changed')
	}
	const context = change.block ? (contextLabels[change.context] ?? t('text', 'Block')) : t('text', 'Text')
	if (change.operation === 'insert') {
		return t('text', '{context} added', { context })
	}
	if (change.operation === 'delete') {
		return t('text', '{context} removed', { context })
	}
	return t('text', '{context} changed', { context })
}
</script>

<style scoped lang="scss">
.text-comparison__sections,
.text-comparison__changes-list {
	margin: 0;
	padding: 0;
	list-style: none;
}

.text-comparison__section-title {
	position: sticky;
	top: 0;
	margin: 0;
	padding: calc(2 * var(--default-grid-baseline));
	border-block-end: 1px solid var(--color-border);
	background: var(--color-main-background);
	font-size: var(--default-font-size);
}

.text-comparison__change {
	display: flex;
	align-items: center;
	gap: calc(2 * var(--default-grid-baseline));
	inline-size: 100%;
	margin: 0;
	padding: calc(2 * var(--default-grid-baseline));
	border: 0;
	border-block-end: 1px solid var(--color-border);
	border-radius: 0;
	background: transparent;
	text-align: start;

	&[aria-current='true'] {
		background: var(--color-primary-element-light);
	}

	&:focus-visible {
		outline: 2px solid var(--color-primary-element);
		outline-offset: -2px;
	}
}

.text-comparison__change-symbol {
	flex: none;
	inline-size: calc(4 * var(--default-grid-baseline));
	text-align: center;
}

.text-comparison__change-body {
	display: flex;
	flex-direction: column;
	gap: var(--default-grid-baseline);
	min-inline-size: 0;
}

.text-comparison__change-preview {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	del,
	ins {
		padding-inline: calc(0.5 * var(--default-grid-baseline));
		text-decoration: none;
	}

	del {
		background: var(--color-error-hover);
		text-decoration: line-through;
	}

	ins {
		background: var(--color-success-hover);
	}
}
</style>
