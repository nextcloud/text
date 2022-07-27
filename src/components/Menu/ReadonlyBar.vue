<template>
	<div data-text-el="readonly-bar" class="text-readonly-bar">
		<div ref="menubar"
			role="group"
			class="text-readonly-bar__entries"
			:aria-label="t('text', 'Editor actions')">
			<ActionEntry v-for="actionEntry of visibleEntries"
				v-bind="{ actionEntry }"
				:key="`text-action--${actionEntry.key}`" />
		</div>
		<div class="text-menubar__slot">
			<slot />
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import { ReadonlyEntries as entries } from './entries.js'
import ActionEntry from './ActionEntry.js'

export default defineComponent({
	name: 'ReadonlyBar',
	components: { ActionEntry },
	setup() {
		return {
			visibleEntries: entries,
		}
	},
})
</script>

<style scoped>
.text-readonly-bar {
	display: flex;
}
.text-readonly-bar__entries {
	display: flex;
	flex-grow: 1;
}
</style>
