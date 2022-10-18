<template>
	<div class="items">
		<template v-if="items.length">
			<div v-for="({ id, label }, index) in items"
				:key="index"
				:class="index === selectedIndex ? 'highlight' : null">
				<AutoCompleteResult :id="id"
					:label="label"
					icon="icon-user"
					source="users"
					:class="id === selectedIndex ? 'highlight' : null"
					@mouseover.native="selectedIndex = index"
					@click.native="selectItem(index)" />
			</div>
		</template>
		<div v-else class="item">
			No result
		</div>
	</div>
</template>

<script>
import AutoCompleteResult from './AutoCompleteResult.vue'
export default {
	components: {
		AutoCompleteResult,
	},
	props: {
		items: {
			type: Array,
			required: true,
		},

		command: {
			type: Function,
			required: true,
		},
	},

	data() {
		return {
			selectedIndex: 0,
		}
	},

	watch: {
		items() {
			this.selectedIndex = 0
		},
	},

	methods: {
		onKeyDown({ event }) {
			// Ignore any key modifier combinations
			if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
				return false
			}

			if (event.key === 'ArrowUp') {
				this.upHandler()
				return true
			}

			if (event.key === 'ArrowDown') {
				this.downHandler()
				return true
			}

			if (event.key === 'Enter') {
				this.enterHandler()
				return true
			}

			return false
		},

		upHandler() {
			this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
		},

		downHandler() {
			this.selectedIndex = (this.selectedIndex + 1) % this.items.length
		},

		enterHandler() {
			this.selectItem(this.selectedIndex)
		},

		selectItem(index) {
			const item = this.items[index]

			if (item) {
				this.command(item)
			}
		},
	},
}
</script>

<style lang="scss">
.items {
  position: relative;
  border-radius: var(--border-radius);
  background: var(--color-main-background);
  overflow: hidden;
  font-size: 0.9rem;
  box-shadow: 0 1px 5px var(--color-box-shadow);
}
</style>
