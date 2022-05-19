<!--
  - @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
  -
  - @author Vinicius Reis <vinicius@nextcloud.com>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<button v-tooltip="tooltip"
		class="entry-single-action entry-action"
		v-bind="state"
		:title="actionEntry.label"
		:data-action-entry="actionEntry._key"
		v-on="$listeners"
		@click="runAction">
		<component :is="icon" />
	</button>
</template>

<script>
import { BaseActionEntry } from './ActionEntry.mixin.js'

export default {
	name: 'ActionSingle',
	extends: BaseActionEntry,
	methods: {
		runAction() {
			const { actionEntry } = this
			if (actionEntry.click) {
				return actionEntry.click(this)
			}

			// Some actions run themselves.
			// others still need to have .run() called upon them.
			actionEntry.action(this.$editor.chain().focus())?.run()
		},
	},
}
</script>

<style scoped lang="scss" src="./ActionEntry.scss" />
