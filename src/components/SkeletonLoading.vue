<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="placeholder-main placeholder-main-text">
		<!-- Placeholder animation -->
		<template v-for="(suffix, gradientIndex) in ['-regular', '-reverse']">
			<svg :key="'gradient' + suffix" :class="'placeholder-gradient placeholder-gradient' + suffix">
				<defs>
					<linearGradient :id="'placeholder-gradient' + suffix">
						<stop offset="0%" :stop-color="(gradientIndex === 0) ? colorPlaceholderLight : colorPlaceholderDark" />
						<stop offset="100%" :stop-color="(gradientIndex === 0) ? colorPlaceholderDark : colorPlaceholderLight" />
					</linearGradient>
				</defs>
			</svg>

			<ul :key="'list' + suffix" :class="'placeholder-list placeholder-list' + suffix">
				<li v-for="index in count" :key="'placeholder' + suffix + index">
					<svg class="text-placeholder"
						xmlns="http://www.w3.org/2000/svg"
						:fill="'url(#placeholder-gradient' + suffix + ')'">
						<rect class="text-placeholder-line-one" :style="textPlaceholderData[0]" />
						<rect class="text-placeholder-line-two" :style="textPlaceholderData[1]" />
						<rect class="text-placeholder-line-three" :style="textPlaceholderData[2]" />
						<rect class="text-placeholder-line-four" :style="textPlaceholderData[3]" />
					</svg>
				</li>
			</ul>
		</template>
	</div>
</template>

<script>
const bodyStyles = window.getComputedStyle(document.body)
const colorPlaceholderDark = bodyStyles.getPropertyValue('--color-placeholder-dark')
const colorPlaceholderLight = bodyStyles.getPropertyValue('--color-placeholder-light')

export default {
	name: 'SkeletonLoading',

	props: {
		count: {
			type: Number,
			default: 5,
		},
	},

	setup() {
		return {
			colorPlaceholderDark,
			colorPlaceholderLight,
		}
	},

	computed: {
		textPlaceholderData() {
			const data = []
			for (let i = 0; i < 4; i++) {
				// generate random widths
				data.push('width: ' + (Math.floor(Math.random() * 50) + 60) + '%')
			}
			return data
		},
	},
}
</script>

<style lang="scss" scoped>
$margin: 8px;
$messages-list-max-width: 670px;

.placeholder-main {
	max-width: $messages-list-max-width;
	position: relative;
	margin-bottom: auto;
	z-index: 1;

	&-text {
		margin: 50px auto 0;
		width: 100%;
	}
}

#rich-workspace .placeholder-main-text {
	margin: 40px 0 0;
}

.placeholder-list {
	position: absolute;
	transform: translateZ(0);
}

.placeholder-list-regular {
	animation: pulse 2s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}

.placeholder-list-reverse {
	animation: pulse-reverse 2s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}

.placeholder-gradient {
	position: fixed;
	height: 0;
	width: 0;
	z-index: -1;
}

.text-placeholder {
	width: min($messages-list-max-width, 100vw);
	height: 6em;
	margin: $margin auto;
	padding: 4px 8px 0 14px;
	display: block;

	&-line-one,
	&-line-two,
	&-line-three,
	&-line-four {
		width: 670px;
		height: 1em;
	}

	&-line-one {
		y: 0.33em;
		width: 175px;
	}

	&-line-two {
		y: 1.66em;
	}

	&-line-three {
		y: 3em;
	}

	&-line-four {
		y: 4.33em;
	}
}

@keyframes pulse {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes pulse-reverse {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

</style>
