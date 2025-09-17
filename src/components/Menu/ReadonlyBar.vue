<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div
		data-text-el="readonly-bar"
		class="text-readonly-bar"
		:class="{
			'text-readonly-bar--ready': isReady,
			'text-readonly-bar--is-workspace': isRichWorkspace,
			'text-readonly-bar--hide': isHidden,
			'is-mobile': $isMobile,
		}">
		<div
			ref="menubar"
			role="toolbar"
			class="text-readonly-bar__entries"
			:aria-label="t('text', 'Editor actions')">
			<component
				:is="
					actionEntry.component
						? actionEntry.component
						: actionEntry.children
							? 'ActionList'
							: 'ActionSingle'
				"
				v-for="(actionEntry, index) in visibleEntries"
				ref="menuEntries"
				:key="actionEntry.key"
				:action-entry="actionEntry"
				:can-be-focussed="activeMenuEntry === index"
				@disabled="disableMenuEntry(actionEntry.key, $event)" />
		</div>
		<div class="text-readonly-bar__slot">
			<slot />
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import { OutlineEntries, ReadOnlyEditEntries } from './entries.js'

import { t } from '@nextcloud/l10n'
import { useEditorFlags } from '../../composables/useEditorFlags.ts'
import { useIsMobileMixin } from '../Editor.provider.ts'
import ActionList from './ActionList.vue'
import ActionSingle from './ActionSingle.vue'
import ToolBarLogic from './ToolBarLogic.js'

export default defineComponent({
	name: 'ReadonlyBar',

	components: {
		ActionList,
		ActionSingle,
	},

	extends: ToolBarLogic,

	mixins: [useIsMobileMixin],

	props: {
		isHidden: {
			type: Boolean,
			default: false,
		},
		openReadOnly: {
			type: Boolean,
			default: false,
		},
	},

	emits: ['update:loaded'],

	setup() {
		const { isRichWorkspace } = useEditorFlags()
		return {
			isRichWorkspace,
		}
	},

	data() {
		return {
			entries: this.openReadOnly
				? [...ReadOnlyEditEntries, ...OutlineEntries]
				: [...OutlineEntries],
			isReady: false,
		}
	},

	mounted() {
		this.$nextTick(() => {
			this.isReady = true
			this.$emit('update:loaded', true)
		})
	},

	methods: {
		t,
	},
})
</script>

<style scoped lang="scss">
.text-readonly-bar {
	--background-blur: blur(10px);
	position: sticky;
	top: 0;
	bottom: var(--default-grid-baseline);
	width: 100%;
	z-index: 10021; // above modal-header so menubar is always on top
	background-color: var(--color-main-background-translucent);
	backdrop-filter: var(--background-blur);
	max-height: var(
		--default-clickable-area
	); // important for mobile so that the buttons are always inside the container
	border-bottom: 1px solid var(--color-border);
	padding-block: var(--default-grid-baseline);

	visibility: hidden;

	display: flex;
	justify-content: flex-end;
	align-items: center;

	&.is-mobile {
		border-top: 1px solid var(--color-border);
		border-bottom: unset;
	}

	&.text-readonly-bar--ready:not(.text-readonly-bar--hide) {
		visibility: visible;
		animation-name: fadeInDown;
		animation-duration: 0.3s;
	}

	&.text-readonly-bar--hide {
		opacity: 0;
		transition:
			visibility 0.2s 0.4s,
			opacity 0.2s 0.4s;
	}
	.text-readonly-bar__entries {
		display: flex;
		flex-grow: 1;
		margin-left: max(0px, calc((100% - var(--text-editor-max-width)) / 2));
	}

	.text-readonly-bar__slot {
		justify-content: flex-end;
		display: flex;
		min-width: max(0px, min(100px, (100% - var(--text-editor-max-width)) / 2));
	}

	&.text-readonly-bar--is-workspace {
		.text-readonly-bar__entries {
			margin-left: 0;
		}
	}

	@media (max-width: 660px) {
		.text-readonly-bar__entries {
			margin-left: 0;
		}
	}
}
</style>
