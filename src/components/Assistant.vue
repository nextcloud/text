<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div v-if="showAssistant" class="text-assistant">
		<FloatingMenu v-if="$editor"
			:editor="$editor"
			:tippy-options="floatingOptions()"
			:should-show="floatingShow"
			class="floating-menu"
			data-cy="assistantMenu">
			<NcActions :title="t('text', 'Nextcloud Assistant')" :type="'secondary'">
				<template #icon>
					<CreationIcon :size="20" class="icon" />
				</template>
				<NcActionButton v-for="type in taskTypes"
					:key="type.id"
					close-after-click
					@click="openAssistantForm(type.id)">
					<template #icon>
						<PencilIcon v-if="type.id == 'core:text2text'" :size="20" />
						<FormatHeader1 v-else-if="type.id == 'core:text2text:headline'" :size="20" />
						<Shuffle v-else-if="type.id == 'core:text2text:reformulation'" :size="20" />
						<TextShort v-else-if="type.id == 'core:text2text:summary'" :size="20" />
						<CreationIcon v-else />
					</template>
					{{ type.name }}
				</NcActionButton>
				<NcActionButton data-cy="open-translate" close-after-click @click="openTranslateDialog">
					<template #icon>
						<TranslateVariant :size="20" />
					</template>
					{{ t('text', 'Translate') }}
				</NcActionButton>
				<NcActionSeparator />
				<NcActionButton close-after-click @click="showTaskList=true">
					<template #icon>
						<CreationIcon :size="20" />
					</template>
					{{ t('text', 'Show assistant results') }}
				</NcActionButton>
			</NcActions>
			<component :is="badgeStateIcon"
				v-if="badgeStateIcon"
				:size="16"
				class="floating-menu--badge" />
		</FloatingMenu>

		<NcModal :show.sync="showTaskList" :name="t('text', 'Assistant results')">
			<div class="task-list">
				<h4 v-if="tasks.length > 0">
					<span class="assistant-bubble">
						<CreationIcon :size="16" class="icon" />
						<span>{{ t('text', 'Nextcloud Assistant') }}</span>
					</span>
				</h4>
				<ul v-if="tasks.length > 0">
					<NcListItem v-for="task in tasks"
						:key="task.id"
						:name="task.title"
						:bold="false"
						:force-display-actions="true"
						@click="() => openResult(task)">
						<template #subname>
							{{ task.input.input }}
						</template>
						<template #icon>
							<CheckCircleIcon v-if="task.status === STATUS_SUCCESSFUL" :size="20" class="icon-status--success" />
							<ErrorIcon v-else-if="task.status === STATUS_FAILED" :size="20" class="icon-status--failed" />
							<ClockOutline v-else :size="20" />
						</template>
						<template #indicator>
							<NcActions :inline="2">
								<NcActionButton v-if="task.status === STATUS_SUCCESSFUL" :title="task.output.output" @click.stop="() => copyResult(task)">
									<template #icon>
										<ClipboardTextOutlineIcon :size="20" />
									</template>
									{{ t('text', 'Insert result') }}
								</NcActionButton>
							</NcActions>
						</template>
						<template #actions>
							<NcActionButton v-if="task.status === STATUS_SUCCESSFUL" :title="task.output.output" @click.stop="() => openResult(task)">
								<template #icon>
									<CreationIcon :size="20" />
								</template>
								{{ t('text', 'Show result') }}
							</NcActionButton>
							<NcActionButton v-if="task.status === STATUS_SUCCESSFUL" :title="task.output.output" @click="() => insertResult(task)">
								<template #icon>
									<TextBoxPlusOutlineIcon :size="20" />
								</template>
								{{ t('text', 'Insert result') }}
							</NcActionButton>
							<NcActionButton @click="() => deleteTask(task)">
								<template #icon>
									<DeleteIcon :size="20" />
								</template>
								{{ t('text', 'Delete task') }}
							</NcActionButton>
						</template>
					</NcListItem>
				</ul>
			</div>
		</NcModal>
	</div>
</template>
<script>
import axios from '@nextcloud/axios'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { generateOcsUrl } from '@nextcloud/router'
import ErrorIcon from 'vue-material-design-icons/AlertCircle.vue'
import CreationIcon from 'vue-material-design-icons/Creation.vue'
import ClockOutline from 'vue-material-design-icons/ClockOutline.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import CheckCircleIcon from 'vue-material-design-icons/CheckCircle.vue'
import TextBoxPlusOutlineIcon from 'vue-material-design-icons/TextBoxPlusOutline.vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import TextShort from 'vue-material-design-icons/TextShort.vue'
import FormatHeader1 from 'vue-material-design-icons/FormatHeader1.vue'
import Shuffle from 'vue-material-design-icons/Shuffle.vue'
import TranslateVariant from 'vue-material-design-icons/TranslateVariant.vue'
import ClipboardTextOutlineIcon from 'vue-material-design-icons/ClipboardTextOutline.vue'
import { posToDOMRect } from '@tiptap/core'
import { loadState } from '@nextcloud/initial-state'
import { NcActions, NcActionButton, NcActionSeparator, NcListItem, NcModal } from '@nextcloud/vue'
import {
	useEditorMixin,
	useIsRichWorkspaceMixin,
	useFileMixin,
	useIsPublicMixin,
} from './Editor.provider.js'
import { FloatingMenu } from '@tiptap/vue-2'
import { emit, subscribe, unsubscribe } from '@nextcloud/event-bus'
import markdownit from '../markdownit/index.js'
import shouldInterpretAsMarkdown from '../markdownit/shouldInterpretAsMarkdown.js'

const limitInRange = (num, min, max) => {
	return Math.min(Math.max(parseInt(num), parseInt(min)), parseInt(max))
}

// https://github.com/nextcloud/server/blob/master/lib/public/TaskProcessing/Task.php#L366-L371
const STATUS_FAILED = 'STATUS_FAILED'
const STATUS_SUCCESSFUL = 'STATUS_SUCCESSFUL'
const STATUS_RUNNING = 'STATUS_RUNNING'
const STATUS_SCHEDULED = 'STATUS_SCHEDULED'
const STATUS_UNKNOWN = 'STATUS_UNKNOWN'

export default {
	name: 'Assistant',
	components: {
		FloatingMenu,
		ErrorIcon,
		CreationIcon,
		ClockOutline,
		CheckCircleIcon,
		DeleteIcon,
		TextBoxPlusOutlineIcon,
		PencilIcon,
		TextShort,
		FormatHeader1,
		Shuffle,
		TranslateVariant,
		ClipboardTextOutlineIcon,
		NcActions,
		NcActionButton,
		NcActionSeparator,
		NcListItem,
		NcModal,
	},
	mixins: [
		useEditorMixin,
		useIsPublicMixin,
		useIsRichWorkspaceMixin,
		useFileMixin,
	],
	data() {
		return {
			taskTypes: OCP.InitialState.loadState('text', 'taskprocessing'),
			selection: '',
			tasks: [],

			STATUS_FAILED,
			STATUS_RUNNING,
			STATUS_SCHEDULED,
			STATUS_SUCCESSFUL,
			STATUS_UNKNOWN,

			showTaskList: false,
			canTranslate: loadState('text', 'translation_languages', []).length > 0,
		}
	},
	computed: {
		showAssistant() {
			return !this.$isRichWorkspace && !this.$isPublic && window.OCA.Assistant?.openAssistantForm
		},
		identifier() {
			return 'text-file:' + this.$file.fileId
		},
		badgeStateIcon() {
			if (this.tasks.filter((t) => t.status === STATUS_SCHEDULED || t.status === STATUS_RUNNING).length > 0) {
				return ClockOutline
			}

			if (this.tasks.filter((t) => t.status === STATUS_FAILED).length > 0) {
				return ErrorIcon
			}

			if (this.tasks.filter((t) => t.status === STATUS_SUCCESSFUL).length > 0) {
				return CheckCircleIcon
			}

			return null
		},
		taskTypeIds() {
			return this.taskTypes.map((type) => type.id)
		},
	},
	beforeMount() {
		if (!this.showAssistant) {
			return
		}

		this.$editor.on('selectionUpdate', this.onSelection)
		this.fetchTasks()
		subscribe('notifications:notification:received', this.checkNotification)
	},
	beforeDestroy() {
		if (!this.showAssistant) {
			return
		}

		this.$editor.off('selectionUpdate', this.onSelection)
		unsubscribe('notifications:notification:received', this.checkNotification)
	},
	methods: {
		async fetchTasks() {
			const result = await axios.get(generateOcsUrl('/taskprocessing/tasks/app/text') + '?customId=' + this.identifier)

			const filteredTasks = result.data.ocs.data.tasks.filter(t => this.taskTypeIds.includes(t.type))
			this.tasks = filteredTasks.map((task) => {
				return {
					...task,
					title: this.taskTypes.find(t => t.id === task.type).name,
				}
			}).sort((a, b) => b.id - a.id)
		},
		async checkNotification(event) {
			if (event.notification.app !== 'assistant' || event.notification.actions[0].type !== 'WEB') {
				return
			}
			await this.fetchTasks()
		},
		onSelection() {
			const { state } = this.$editor
			const { from, to } = state.selection
			this.selection = state.doc.textBetween(from, to, ' ')
		},
		async openAssistantForm(taskType = null) {
			await window.OCA.Assistant.openAssistantForm(
				{
					appId: 'text',
					customId: this.identifier,
					taskType,
					inputs: {
						input: this.selection,
					},
					isInsideViewer: true,
					closeOnResult: false,
					actionButtons: [
						{
							type: 'primary',
							title: t('text', 'Insert result'),
							label: t('text', 'Insert result'),
							onClick: (lastTask) => {
								this.insertResult(lastTask)
							},
						},
					],
				}).finally(() => {
				this.fetchTasks()
			})
		},
		openTranslateDialog() {
			if (!this.selection.trim().length) {
				this.$editor.commands.selectAll()
			}
			emit('text:translate-modal:show', { content: this.selection || '' })
		},
		async openResult(task) {
			window.OCA.Assistant.openAssistantTask(task, {
				isInsideViewer: true,
				actionButtons: [
					{
						type: 'primary',
						title: t('text', 'Insert result'),
						label: t('text', 'Insert result'),
						onClick: (lastTask) => {
							this.insertResult(lastTask)
						},
					},
				],
			})
		},
		async insertResult(task) {
			const isMarkdown = shouldInterpretAsMarkdown(task.output.output)
			const content = isMarkdown ? markdownit.render(task.output.output) : task.output.output
			this.$editor.commands.insertContent(content)
			this.showTaskList = false
		},
		async copyResult(task) {
			try {
				await navigator.clipboard.writeText(task.output.output)
				showSuccess(t('text', 'Nextcloud Assistant result copied'))
				this.showTaskList = false
			} catch (error) {
				console.error(error)
				showError(t('text', 'Could not copy result to clipboard'))
			}
		},
		async deleteTask(task) {
			try {
				await axios.delete(generateOcsUrl(`/taskprocessing/task/${task.id}`))
			} catch (e) {
				console.error('Failed to delete task', e)
			}
			const taskIndex = this.tasks.findIndex(t => t.id === task.id)
			if (taskIndex > -1) {
				this.$delete(this.tasks, taskIndex)
			}
		},
		floatingOptions() {
			const buttonSize = 44
			const topSpacing = 110 + 22
			const bottomSpacing = 50 + 22
			return {
				placement: 'right',
				getReferenceClientRect: () => {
					const editorRect = this.$parent.$el.querySelector('.ProseMirror').getBoundingClientRect()
					const pos = posToDOMRect(this.$editor.view, this.$editor.state.selection.from, this.$editor.state.selection.to)
					let rightSpacing = 0
					let addTopSpacing = 0

					if (editorRect.width < 670) {
						rightSpacing = 20
					}

					if (editorRect.width < 425) {
						rightSpacing = 66
						addTopSpacing = 30
					}

					return {
						...pos,
						width: editorRect.width - rightSpacing,
						height: limitInRange(pos.height, buttonSize, window.innerHeight),
						top: limitInRange(pos.top, topSpacing, window.innerHeight - bottomSpacing) + addTopSpacing,
						left: editorRect.left,
						right: editorRect.right,
						bottom: limitInRange(pos.top + buttonSize, bottomSpacing, window.innerHeight - topSpacing) + 22,
					}
				},
			}
		},
		floatingShow() {
			return true
		},
	},
}
</script>

<style scoped lang="scss">
.text-assistant {
	position: fixed;
	top: calc(2 * var(--header-height));
	right: 0;
	margin: calc(var(--default-grid-baseline) * 3);
	overflow: auto;
	width: 250px;
	max-height: 200px;
}

.task-list {
	padding: 24px;
}

h4 {
	display: flex;
	align-items: center;
	justify-items: center;
	justify-content: space-between;
	margin-bottom: 12px;
}

.assistant-bubble {
	display: flex;
	gap: 8px;
	background-color: var(--color-primary-element-light);
	border-radius: var(--border-radius-rounded);
	padding: 2px 8px;

	.icon {
		color: var(--color-primary);
	}
}

ul {
	width: calc(100% - 16px);

	& :deep(.list-item) {
		padding-top: 0;
		padding-bottom: 0;
	}

	& :deep(.line-two__additional_elements) {
		margin-top: -22px;
	}
}

.floating-menu {
	position: relative;

	&--badge {
		position: absolute;
		bottom: -2px;
		right: -2px;
	}
}

.icon-status--success {
	color: var(--color-success);
}

.icon-status--failed {
	color: var(--color-error);
}
</style>
