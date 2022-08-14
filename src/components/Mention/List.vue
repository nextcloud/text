<template>
	<div class="items">
		<template v-if="items.length">
			<div v-for="({ id, label }, index) in items"
				:key="index"
				:class="id === selectedIndex ? 'highlight' : null">
				<AutoCompleteResult :id="id"
					:label="label"
					icon="icon-user"
					source="users"
					@mouseover.native="selectedIndex = id"
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
  border-radius: 0.5rem;
  background: #FFF;
  color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  font-size: 0.9rem;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0px 10px 20px rgba(0, 0, 0, 0.1),
  ;
}

.item {
  display: block;
  margin: 0;
  width: 100%;
  text-align: left;
  background: transparent;
  border-radius: 0.4rem;
  border: 1px solid transparent;
  padding: 0.2rem 0.4rem;

  &.is-selected {
    border-color: #000;
  }
}
</style>
