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
import type { Change, ChangeOperation } from '../comparison/compare.ts'

import { t } from '@nextcloud/l10n'
import { computed } from 'vue'

const props = defineProps<{
	changes: readonly Change[]
	currentId: string | null
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

// Whole sentences, so each language can phrase them as its grammar needs
const textLabels: Record<ChangeOperation, string> = {
	insert: t('text', 'Text added'),
	delete: t('text', 'Text removed'),
	replace: t('text', 'Text changed'),
}

const tableCellLabels: Record<ChangeOperation, string> = {
	insert: t('text', 'Table cell added'),
	delete: t('text', 'Table cell removed'),
	replace: t('text', 'Table cell changed'),
}

const blockLabels: Record<string, Record<ChangeOperation, string>> = {
	paragraph: {
		insert: t('text', 'Paragraph added'),
		delete: t('text', 'Paragraph removed'),
		replace: t('text', 'Paragraph changed'),
	},
	heading: {
		insert: t('text', 'Heading added'),
		delete: t('text', 'Heading removed'),
		replace: t('text', 'Heading changed'),
	},
	listItem: {
		insert: t('text', 'List item added'),
		delete: t('text', 'List item removed'),
		replace: t('text', 'List item changed'),
	},
	taskItem: {
		insert: t('text', 'Task added'),
		delete: t('text', 'Task removed'),
		replace: t('text', 'Task changed'),
	},
	table: {
		insert: t('text', 'Table added'),
		delete: t('text', 'Table removed'),
		replace: t('text', 'Table changed'),
	},
	tableRow: {
		insert: t('text', 'Table row added'),
		delete: t('text', 'Table row removed'),
		replace: t('text', 'Table row changed'),
	},
	tableCell: tableCellLabels,
	tableHeader: tableCellLabels,
	codeBlock: {
		insert: t('text', 'Code block added'),
		delete: t('text', 'Code block removed'),
		replace: t('text', 'Code block changed'),
	},
	blockquote: {
		insert: t('text', 'Quote added'),
		delete: t('text', 'Quote removed'),
		replace: t('text', 'Quote changed'),
	},
	callout: {
		insert: t('text', 'Callout added'),
		delete: t('text', 'Callout removed'),
		replace: t('text', 'Callout changed'),
	},
	details: {
		insert: t('text', 'Details added'),
		delete: t('text', 'Details removed'),
		replace: t('text', 'Details changed'),
	},
	image: {
		insert: t('text', 'Image added'),
		delete: t('text', 'Image removed'),
		replace: t('text', 'Image changed'),
	},
	frontMatter: {
		insert: t('text', 'Front matter added'),
		delete: t('text', 'Front matter removed'),
		replace: t('text', 'Front matter changed'),
	},
}

const otherBlockLabels: Record<ChangeOperation, string> = {
	insert: t('text', 'Block added'),
	delete: t('text', 'Block removed'),
	replace: t('text', 'Block changed'),
}

const headings = computed(() => {
	const result: Array<{ from: number, text: string }> = []
	props.afterDocument.forEach((node, from) => {
		if (node.type.name === 'heading') {
			result.push({ from, text: node.textContent })
		}
	})
	return result
})

// Changes under the heading they follow in the newer document. Removed blocks count where
// they were removed, so the changes, ordered by that position, form one section per heading.
// That position is the end of the block before, which a heading right after it does not cover.
const sections = computed(() => {
	const result: Array<{ id: string, from: number, title: string, changes: Change[] }> = []
	for (const change of props.changes) {
		const heading = headings.value.findLast(({ from }) => change.operation === 'delete'
			? from < change.after.from
			: from <= change.after.from)
		const from = heading?.from ?? -1
		const current = result.at(-1)
		if (current?.from === from) {
			current.changes.push(change)
		} else {
			result.push({ id: change.id, from, title: heading?.text ?? '', changes: [change] })
		}
	}
	return result
})

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
	const labels = change.block ? (blockLabels[change.context] ?? otherBlockLabels) : textLabels
	return labels[change.operation]
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
