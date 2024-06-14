<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="autocomplete-result">
		<!-- Avatar or icon -->
		<div :class="[icon, `autocomplete-result__icon--${avatarUrl ? 'with-avatar' : ''}`]"
			:style="avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : null "
			class="autocomplete-result__icon">
			<div v-if="haveStatus"
				:class="[`autocomplete-result__status--${status && status.icon ? 'icon' : status.status}`]"
				class="autocomplete-result__status">
				{{ status && status.icon || '' }}
			</div>
		</div>

		<!-- Title and subtitle -->
		<span class="autocomplete-result__content">
			<span class="autocomplete-result__title">
				{{ label }}
			</span>
			<span v-if="subline" class="autocomplete-result__subline">
				{{ subline }}
			</span>
		</span>
	</div>
</template>

<script>
import { generateUrl } from '@nextcloud/router'

export default {
	name: 'AutoCompleteResult',

	props: {
		label: {
			type: String,
			required: true,
		},
		subline: {
			type: String,
			default: null,
		},
		id: {
			type: String,
			default: null,
		},
		icon: {
			type: String,
			required: true,
		},
		source: {
			type: String,
			required: true,
		},
		status: {
			type: [Object, Array],
			default: () => ({}),
		},
	},
	computed: {
		avatarUrl() {
			return this.id && this.source === 'users'
				? this.getAvatarUrl(this.id, 44)
				: null
		},
		haveStatus() {
			return this.status?.icon || this.status?.status
		},
	},

	methods: {
		getAvatarUrl(user, size) {
			return generateUrl('/avatar/{user}/{size}', {
				user,
				size,
			})
		},
	},
}
</script>

<style lang="scss" scoped>
$clickable-area: 30px;
$autocomplete-padding: 10px;

.autocomplete-result {
	display: flex;
	height: $clickable-area;
	padding: $autocomplete-padding;

	.highlight & {
		color: var(--color-main-text);
		background: var(--color-primary-element-light);
		&, * {
			cursor: pointer;
		}
	}

	&__icon {
		position: relative;
		flex: 0 0 $clickable-area;
		width: $clickable-area;
		min-width: $clickable-area;
		height: $clickable-area;
		border-radius: $clickable-area;
		background-color: var(--color-background-darker);
		background-repeat: no-repeat;
		background-position: center;
		background-size: $clickable-area - 2 * $autocomplete-padding;
		&--with-avatar {
			color: inherit;
			background-size: cover;
		}
	}

	&__status {
		position: absolute;
		right: -4px;
		bottom: -4px;
		box-sizing: border-box;
		width: 18px;
		height: 18px;
		border: 2px solid var(--color-main-background);
		border-radius: 50%;
		background-color: var(--color-main-background);
		font-size: var(--default-font-size);
		line-height: 15px;
		background-repeat: no-repeat;
		background-size: 16px;
		background-position: center;

		&--online{
			background-image: url('../../../assets/status-icons/user-status-online.svg');
		}
		&--dnd{
			background-image: url('../../../assets/status-icons/user-status-dnd.svg');
			background-color: #ffffff;
		}
		&--away{
			background-image: url('../../../assets/status-icons/user-status-away.svg');
		}
		&--icon {
			border: none;
			background-color: transparent;
		}
	}

	&__content {
		display: flex;
		flex: 1 1 100%;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
		padding-left: $autocomplete-padding;
	}

	&__title,
	&__subline {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__subline {
		color: var(--color-text-lighter);
	}
}

</style>
