<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div class="assistant-action">
		<NcActions
			class="entry-action entry-action__assistant"
			:title="actionEntry.label"
			:aria-label="actionEntry.label"
			:container="menuIDSelector"
			:data-text-action-entry="actionEntry.key"
			:name="actionEntry.label"
			:open="menuOpen"
			force-menu
			@update:open="
				(open) => {
					menuOpen = menuOpen || open
				}
			">
			<template #icon>
				<NcAssistantIcon :size="20" class="assistant-icon" />
			</template>
			<NcActionButton
				v-for="type in taskTypes"
				:key="type.id"
				close-after-click
				@click="openAssistantForm(type.id)">
				<template #icon>
					<PencilOutlineIcon
						v-if="type.id == 'core:text2text'"
						:size="20" />
					<FormatHeader1
						v-else-if="type.id == 'core:text2text:headline'"
						:size="20" />
					<Shuffle
						v-else-if="type.id == 'core:text2text:reformulation'"
						:size="20" />
					<TextShort
						v-else-if="type.id == 'core:text2text:summary'"
						:size="20" />
					<NcAssistantIcon v-else />
				</template>
				{{ type.name }}
			</NcActionButton>
			<NcActionButton
				v-if="canTranslate"
				data-cy="open-translate"
				close-after-click
				@click="openTranslateDialog">
				<template #icon>
					<TranslateVariant :size="20" />
				</template>
				{{ t('text', 'Translate') }}
			</NcActionButton>
			<NcActionSeparator />
			<NcActionButton
				:disabled="tasks.length < 1"
				close-after-click
				@click="showTaskList = true">
				<template #icon>
					<NcLoadingIcon v-if="loading" :size="20" />
					<NcAssistantIcon v-else :size="20" class="assistant-icon" />
				</template>
				{{ t('text', 'Show assistant results') }}
			</NcActionButton>
		</NcActions>
		<component
			:is="badgeStateIcon"
			v-if="badgeStateIcon"
			fill-color="var(--color-text-maxcontrast)"
			:size="16"
			class="assistant-action--badge" />

		<NcModal :show.sync="showTaskList" :name="t('text', 'Assistant results')">
			<div class="task-list">
				<h4 v-if="tasks.length > 0">
					<span class="assistant-bubble">
						<NcAssistantIcon :size="20" class="assistant-icon" />
						<span>{{ t('text', 'Nextcloud Assistant') }}</span>
					</span>
				</h4>
				<ul v-if="tasks.length > 0">
					<NcListItem
						v-for="task in tasks"
						:key="task.id"
						:name="task.title"
						:bold="false"
						:force-display-actions="true"
						@click="() => openResult(task)">
						<template #subname>
							{{ task.input.input }}
						</template>
						<template #icon>
							<CheckCircleOutlineIcon
								v-if="task.status === STATUS_SUCCESSFUL"
								:size="20"
								class="icon-status--success" />
							<ErrorOutlineIcon
								v-else-if="task.status === STATUS_FAILED"
								:size="20"
								class="icon-status--failed" />
							<ClockOutline v-else :size="20" />
						</template>
						<template #indicator>
							<NcActions :inline="2">
								<NcActionButton
									v-if="task.status === STATUS_SUCCESSFUL"
									:title="task.output.output"
									@click.stop="() => copyResult(task)">
									<template #icon>
										<ClipboardTextOutlineIcon :size="20" />
									</template>
									{{ t('text', 'Insert result') }}
								</NcActionButton>
							</NcActions>
						</template>
						<template #actions>
							<NcActionButton
								v-if="task.status === STATUS_SUCCESSFUL"
								:title="task.output.output"
								@click.stop="() => openResult(task)">
								<template #icon>
									<NcAssistantIcon
										:size="20"
										class="assistant-icon" />
								</template>
								{{ t('text', 'Show result') }}
							</NcActionButton>
							<NcActionButton
								v-if="task.status === STATUS_SUCCESSFUL"
								:title="task.output.output"
								@click="() => insertResult(task)">
								<template #icon>
									<TextBoxPlusOutlineIcon :size="20" />
								</template>
								{{ t('text', 'Insert result') }}
							</NcActionButton>
							<NcActionButton @click="() => deleteTask(task)">
								<template #icon>
									<DeleteOutlineIcon :size="20" />
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
import { showError, showSuccess } from '@nextcloud/dialogs'
import { emit, subscribe, unsubscribe } from '@nextcloud/event-bus'
import { loadState } from '@nextcloud/initial-state'
import { t } from '@nextcloud/l10n'
import { generateOcsUrl } from '@nextcloud/router'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionSeparator from '@nextcloud/vue/components/NcActionSeparator'
import NcAssistantIcon from '@nextcloud/vue/components/NcAssistantIcon'
import NcListItem from '@nextcloud/vue/components/NcListItem'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import NcModal from '@nextcloud/vue/components/NcModal'
import ErrorOutlineIcon from 'vue-material-design-icons/AlertCircleOutline.vue'
import CheckCircleOutlineIcon from 'vue-material-design-icons/CheckCircleOutline.vue'
import ClipboardTextOutlineIcon from 'vue-material-design-icons/ClipboardTextOutline.vue'
import ClockOutline from 'vue-material-design-icons/ClockOutline.vue'
import FormatHeader1 from 'vue-material-design-icons/FormatHeader1.vue'
import PencilOutlineIcon from 'vue-material-design-icons/PencilOutline.vue'
import Shuffle from 'vue-material-design-icons/Shuffle.vue'
import TextBoxPlusOutlineIcon from 'vue-material-design-icons/TextBoxPlusOutline.vue'
import TextShort from 'vue-material-design-icons/TextShort.vue'
import TranslateVariant from 'vue-material-design-icons/Translate.vue'
import DeleteOutlineIcon from 'vue-material-design-icons/TrashCanOutline.vue'
import { useEditor } from '../../composables/useEditor.ts'
import markdownit from '../../markdownit/index.js'
import shouldInterpretAsMarkdown from '../../markdownit/shouldInterpretAsMarkdown.js'
import { useFileMixin } from '../Editor.provider.ts'
import { BaseActionEntry } from './BaseActionEntry.js'
import { useMenuIDMixin } from './MenuBar.provider.js'

// https://github.com/nextcloud/server/blob/master/lib/public/TaskProcessing/Task.php#L366-L371
const STATUS_FAILED = 'STATUS_FAILED'
const STATUS_SUCCESSFUL = 'STATUS_SUCCESSFUL'
const STATUS_RUNNING = 'STATUS_RUNNING'
const STATUS_SCHEDULED = 'STATUS_SCHEDULED'
const STATUS_UNKNOWN = 'STATUS_UNKNOWN'

export default {
	name: 'AssistantAction',
	components: {
		ErrorOutlineIcon,
		NcAssistantIcon,
		ClockOutline,
		CheckCircleOutlineIcon,
		DeleteOutlineIcon,
		TextBoxPlusOutlineIcon,
		PencilOutlineIcon,
		TextShort,
		FormatHeader1,
		Shuffle,
		TranslateVariant,
		ClipboardTextOutlineIcon,
		NcActions,
		NcActionButton,
		NcActionSeparator,
		NcListItem,
		NcLoadingIcon,
		NcModal,
	},
	extends: BaseActionEntry,
	mixins: [useFileMixin, useMenuIDMixin],
	setup() {
		const { editor } = useEditor()
		return { editor }
	},
	data() {
		return {
			menuOpen: false,
			taskTypes: loadState('text', 'taskprocessing', []),
			selection: '',
			tasks: [],
			loading: false,

			STATUS_FAILED,
			STATUS_RUNNING,
			STATUS_SCHEDULED,
			STATUS_SUCCESSFUL,
			STATUS_UNKNOWN,

			showTaskList: false,
			canTranslate:
				loadState('text', 'translation_languages', []).from?.length > 0,
		}
	},
	computed: {
		identifier() {
			return 'text-file:' + this.$file.fileId
		},
		badgeStateIcon() {
			if (
				this.tasks.filter(
					(t) =>
						t.status === STATUS_SCHEDULED || t.status === STATUS_RUNNING,
				).length > 0
			) {
				return ClockOutline
			}

			if (this.tasks.filter((t) => t.status === STATUS_FAILED).length > 0) {
				return ErrorOutlineIcon
			}

			if (
				this.tasks.filter((t) => t.status === STATUS_SUCCESSFUL).length > 0
			) {
				return CheckCircleOutlineIcon
			}

			return null
		},
		taskTypeIds() {
			return this.taskTypes.map((type) => type.id)
		},
	},
	watch: {
		async menuOpen(isOpen) {
			if (isOpen && this.tasks.length === 0) {
				this.loading = true
				await this.fetchTasks()
				this.loading = false
			}
		},
	},
	beforeMount() {
		this.editor.on('selectionUpdate', this.onSelection)
		subscribe('notifications:notification:received', this.checkNotification)
	},
	beforeDestroy() {
		this.editor.off('selectionUpdate', this.onSelection)
		unsubscribe('notifications:notification:received', this.checkNotification)
	},
	methods: {
		async fetchTasks() {
			const result = await axios.get(
				generateOcsUrl('/taskprocessing/tasks/app/text')
					+ '?customId='
					+ this.identifier,
			)

			const filteredTasks = result.data.ocs.data.tasks.filter((t) =>
				this.taskTypeIds.includes(t.type),
			)
			this.tasks = filteredTasks
				.map((task) => {
					return {
						...task,
						title: this.taskTypes.find((t) => t.id === task.type).name,
					}
				})
				.sort((a, b) => b.id - a.id)
		},
		async checkNotification(event) {
			if (
				event.notification.app !== 'assistant'
				|| event.notification.actions[0].type !== 'WEB'
			) {
				return
			}
			await this.fetchTasks()
		},
		onSelection() {
			const { selection, doc } = this.editor.state
			this.selection = doc.textBetween(selection.from, selection.to, ' ')
		},
		async openAssistantForm(taskType = null) {
			await window.OCA.Assistant.openAssistantForm({
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
						variant: 'primary',
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
			let selectAll = false
			if (!this.selection.trim().length) {
				this.editor.commands.selectAll()
				selectAll = true
			}
			emit('text:translate-modal:show', { content: this.selection || '' })
			if (selectAll) {
				this.editor.commands.setTextSelection(0)
			}
		},
		async openResult(task) {
			window.OCA.Assistant.openAssistantTask(task, {
				isInsideViewer: true,
				actionButtons: [
					{
						variant: 'primary',
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
			const content = isMarkdown
				? markdownit.render(task.output.output)
				: task.output.output
			this.editor.commands.insertContent(content)
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
			const taskIndex = this.tasks.findIndex((t) => t.id === task.id)
			if (taskIndex > -1) {
				this.$delete(this.tasks, taskIndex)
			}
		},
		t,
	},
}
</script>

<style scoped lang="scss">
.assistant-action {
	position: relative;
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
	padding: 2px 8px;
	background: var(--color-main-text);
	background-image: var(--color-element-assistant-icon);
	color: transparent;
	background-clip: text;
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

.assistant-action--badge {
	position: absolute;
	bottom: -2px;
	right: -2px;
}

:deep(.assistant-icon) {
	svg {
		// Temporary fix for icon size inconsistency
		max-width: 20px;
	}
}

.icon-status--success {
	color: var(--color-element-success);
}

.icon-status--failed {
	color: var(--color-element-error);
}
</style>
