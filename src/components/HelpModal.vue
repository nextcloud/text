<template>
	<NcModal size="normal"
		data-text-el="formatting-help"
		:title="t('text', 'Formatting help')"
		@close="$emit('close')">
		<h2>{{ t('text', 'Formatting help') }}</h2>
		<p>{{ t('text', 'Speed up your writing with simple shortcuts.') }}</p>
		<p v-if="!isMobile">
			{{ t('text', 'Just type the Markdown syntax or use keyboard shortcuts from below.') }}
		</p>
		<p v-else>
			{{ t('text', 'Just type the Markdown syntax from below.') }}
		</p>

		<table>
			<thead>
				<tr>
					<th>{{ t('text', 'Style') }}</th>
					<th>{{ t('text', 'Syntax') }}</th>
					<th v-if="!isMobile">
						{{ t('text', 'Keyboard shortcuts') }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{ t('text', 'New paragraph') }}</td>
					<template v-if="!isMobile">
						<td />
						<td>
							<kbd>{{ t('text', 'Enter') }}</kbd>
						</td>
					</template>
					<td v-else>
						2x
						<kbd>{{ t('text', 'Enter') }}</kbd>
					</td>
				</tr>
				<tr>
					<td>{{ t('text', 'Hard line break') }}</td>
					<template v-if="!isMobile">
						<td />
						<td>
							<kbd>{{ t('text', 'Shift') }}</kbd>
							+
							<kbd>{{ t('text', 'Enter') }}</kbd>
						</td>
					</template>
					<td v-else>
						<kbd>{{ t('text', 'Enter') }}</kbd>
					</td>
				</tr>
				<tr>
					<td>{{ t('text', 'Bold') }}</td>
					<td><code>**{{ t('text', 'Bold text') }}**</code></td>
					<td v-if="!isMobile">
						<kbd>{{ t('text', 'Ctrl') }}</kbd>
						+
						<kbd>B</kbd>
					</td>
				</tr>
				<tr>
					<td>{{ t('text', 'Italic') }}</td>
					<td><code>*{{ t('text', 'Italicized text') }}*</code></td>
					<td v-if="!isMobile">
						<kbd>{{ t('text', 'Ctrl') }}</kbd>
						+
						<kbd>I</kbd>
					</td>
				</tr>
				<tr>
					<td>{{ t('text', 'Strikethrough') }}</td>
					<td><code>~~{{ t('text', 'Mistaken text') }}~~</code></td>
					<td v-if="!isMobile">
						<kbd>{{ t('text', 'Ctrl') }}</kbd>
						+
						<kbd>{{ t('text', 'Shift') }}</kbd>
						+
						<kbd>X</kbd>
					</td>
				</tr>
				<tr>
					<td>{{ t('text', 'Underline') }}</td>
					<td><code>__{{ t('text', 'Underlined text') }}__</code></td>
					<td v-if="!isMobile">
						<kbd>{{ t('text', 'Ctrl') }}</kbd>
						+
						<kbd>U</kbd>
					</td>
				</tr>
				<tr>
					<td class="ellipsis_top">
						{{ t('text', 'Heading 1') }}
					</td>
					<td class="ellipsis_top">
						<code># {{ t('text', 'Heading level 1') }}</code>
					</td>
					<td v-if="!isMobile" class="ellipsis_top">
						<kbd>{{ t('text', 'Ctrl') }}</kbd>
						+
						<kbd>{{ t('text', 'Shift') }}</kbd>
						+
						<kbd>1</kbd>
					</td>
				</tr>
				<tr>
					<td class="noborder ellipsis">
						…
					</td>
					<td class="noborder ellipsis">
						…
					</td>
					<td v-if="!isMobile" class="ellipsis noborder">
						…
					</td>
				</tr>
				<tr>
					<td class="noborder ellipsis_bottom">
						{{ t('text', 'Heading 6') }}
					</td>
					<td class="noborder ellipsis_bottom">
						<code>###### {{ t('text', 'Heading level 6') }}</code>
					</td>
					<td v-if="!isMobile" class="noborder ellipsis_bottom">
						<kbd>{{ t('text', 'Ctrl') }}</kbd>
						+
						<kbd>{{ t('text', 'Shift') }}</kbd>
						+
						<kbd>6</kbd>
					</td>
				</tr>
				<tr>
					<td>{{ t('text', 'Unordered list') }}</td>
					<td>
						<code>* {{ t('text', 'An item') }}</code>
					</td>
					<td v-if="!isMobile">
						<kbd>{{ t('text', 'Ctrl') }}</kbd>
						+
						<kbd>{{ t('text', 'Shift') }}</kbd>
						+
						<kbd>8</kbd>
					</td>
				</tr>
				<tr>
					<td>{{ t('text', 'Ordered list') }}</td>
					<td>
						<code>1. {{ t('text', 'First item') }}</code>
					</td>
					<td v-if="!isMobile">
						<kbd>{{ t('text', 'Ctrl') }}</kbd>
						+
						<kbd>{{ t('text', 'Shift') }}</kbd>
						+
						<kbd>7</kbd>
					</td>
				</tr>
				<tr>
					<td>{{ t('text', 'Checklist') }}</td>
					<td>
						<code>* [] {{ t('text', 'To-Do item') }}</code>
					</td>
					<td v-if="!isMobile" />
				</tr>
				<tr>
					<td>{{ t('text', 'Blockquote') }}</td>
					<td>
						<code>> {{ t('text', 'Quoted text') }}</code>
					</td>
					<td v-if="!isMobile">
						<kbd>{{ t('text', 'Ctrl') }}</kbd>
						+
						<kbd>></kbd>
					</td>
				</tr>
				<tr>
					<td>{{ t('text', 'Code block') }}</td>
					<td>
						<code>``` {{ t('text', 'Some code') }}</code>
					</td>
					<td v-if="!isMobile" />
				</tr>
			</tbody>
		</table>
	</NcModal>
</template>

<script>
import { NcModal, Tooltip } from '@nextcloud/vue'
import isMobile from './../mixins/isMobile.js'

export default {
	name: 'HelpModal',
	components: {
		NcModal,
	},
	directives: {
		Tooltip,
	},
	mixins: [
		isMobile,
	],
	data() {
		return {
			formatted: {
				bold: true,
				italic: true,
				strikethrough: true,
				heading1: true,
				heading6: true,
				unorderdList: true,
				orderedList: true,
				checkList: true,
				blockQuote: true,
				codeBlock: true,
			},
		}
	},
	computed: {
		isFormatted() {
			return (style) => this.formatted[style]
		},
	},
	methods: {
		toggleFormatted(style) {
			this.formatted[style] = !this.formatted[style]
		},
	},
}
</script>

<style lang="scss" scoped>
	:deep(.modal-wrapper) {
		.modal-container {
			padding: 30px 40px 20px;
			user-select: text;
		}

		// Remove padding-right on mobile, screen might not be wide enough
		@media only screen and (max-width: 512px) {
			.modal-container {
				padding: 30px 0px 20px 40px;
			}
		}
	}

	table {
		margin-top: 24px;
		border-collapse: collapse;

		tbody tr {
			&:hover, &:focus, &:active {
				background-color: transparent !important;
			}
		}

		thead tr {
			border: none;
		}

		th {
			font-weight: bold;
			padding: .75rem 1rem .75rem 0;
			border-bottom: 2px solid var(--color-background-darker);
		}

		td {
			padding: .75rem 1rem .75rem 0;
			border-top: 1px solid var(--color-background-dark);
			border-bottom: unset;

			&.noborder {
				border-top: unset;
			}

			&.ellipsis_top {
				padding-bottom: 0;
			}

			&.ellipsis {
				padding-top: 0;
				padding-bottom: 0;
			}

			&.ellipsis_bottom {
				padding-top: 0;
			}
		}

		kbd {
			font-size: smaller;
		}

		code {
			padding: .2em .4em;
			font-size: 90%;
			background-color: var(--color-background-dark);
			border-radius: 6px;
		}
	}

	@import '../../css/prosemirror';

	div.ProseMirror {
		display: inline;
		margin-top: unset;
		position: unset;
		padding: unset;
		line-height: unset;

		h1, h6 {
			display: inline;
			padding: 0;
			margin: 0;
		}
	}
</style>
