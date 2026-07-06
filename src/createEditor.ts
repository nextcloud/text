/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { EventHandler } from '@nextcloud/event-bus'
import type { App } from 'vue'
import type { TextEditorEmbed } from './TextEditorEmbed.ts'

import { createApp, reactive, shallowRef } from 'vue'
import {
	ATTACHMENT_RESOLVER,
	EDITOR_UPLOAD,
	HOOK_MENTION_INSERT,
	HOOK_MENTION_SEARCH,
	HOOK_MENUBAR_LINK_CUSTOM_ACTION,
} from './components/Editor.provider.ts'
import { ACTION_ATTACHMENT_PROMPT } from './components/Editor/MediaHandler.provider.js'
import { OPEN_LINK_HANDLER } from './composables/useOpenLinkHandler.ts'
import { openLink } from './helpers/links.js'
import { TextEditorEmbedBuilder } from './TextEditorEmbed.ts'

interface ReadonlyBar {
	component: string
	props: object
}

interface CollaborativeEditorOptions {
	/**
	 * Element to render the editor to
	 */
	el: HTMLElement
	fileId: number
	filePath?: string
	shareToken?: string
	content?: string
	readOnly?: boolean
	autofocus?: boolean
	readonlyBar?: ReadonlyBar
	menubarLinkCustomAction?: () => void
	onCreate?: ({ markdown }: { markdown: string }) => void
	onLoaded?: () => void
	onUpdate?: ({ markdown }: { markdown: string }) => void
	onTocToggle?: EventHandler<boolean>
	onOutlineToggle?: EventHandler<boolean> // deprecated, use `onTocToggle`
	onTocPin?: EventHandler<{ fileId: number, keep: boolean }>
	onFileInsert?: () => void
	onMentionSearch?: (query: string) => Promise<{ [id: string]: string }>
	onMentionInsert?: () => void
	openLinkHandler?: () => void
	onSearch?: () => void
	onAttachmentsUpdated?: (event: { attachmentSrcs: string[] }) => void
}

interface MarkdownContentEditorOptions {
	/**
	 * Element to render the editor to
	 */
	el: HTMLElement
	fileId?: number
	filePath?: string
	shareToken?: string
	content?: string
	readOnly?: boolean
	autofocus?: boolean
	readonlyBar?: ReadonlyBar
	menubarLinkCustomAction?: () => void
	onCreate?: ({ markdown }: { markdown: string }) => void
	onLoaded?: () => void
	onUpdate?: ({ markdown }: { markdown: string }) => void
	onTocToggle?: EventHandler<boolean>
	onOutlineToggle?: EventHandler<boolean> // deprecated, use `onTocToggle`
	onTocPin?: EventHandler<{ fileId: number, keep: boolean }>
	onFileInsert?: () => void
	onMentionSearch?: (query: string) => Promise<{ [id: string]: string }>
	onMentionInsert?: () => void
	openLinkHandler?: () => void
	onSearch?: () => void
	onAttachmentsUpdated?: (event: { attachmentSrcs: string[] }) => void
}

type EditorOptions = (CollaborativeEditorOptions & { useSession?: true })
	| (MarkdownContentEditorOptions & { useSession?: false })

/**
 * Type guard to choose which editor to create based on the options passed to createEditor
 *
 * @param options for the editor in question
 */
function optionsForCollaboration(options: EditorOptions): options is CollaborativeEditorOptions {
	return Boolean(options.fileId) && (options.useSession ?? true)
}

/**
 * Create and mount a text editor
 *
 * @param options for the editor
 * @deprecated Use `createCollaborativeEditor` or `createMarkdownContentEditor` instead.
 */
export async function createEditor(options: EditorOptions) {
	if (optionsForCollaboration(options)) {
		return createCollaborativeEditor(options)
	} else {
		return createMarkdownContentEditor(options)
	}
}

/**
 * Create and mount a collaborative text editor
 *
 * @param options for the editor
 */
export async function createCollaborativeEditor(options: CollaborativeEditorOptions) {
	const { default: CollaborativeEditorApp } = await import('./views/CollaborativeEditorApp.vue')
	const data = reactiveData(options)
	const app = createApp(
		CollaborativeEditorApp,
		{
			...data,
			active: true,
			fileId: options.fileId,
			mime: 'text/markdown',
			autofocus: options.autofocus ?? true,
			readonlyBarComponent: options.readonlyBar?.component,
			relativePath: options.filePath,
			shareToken: options.shareToken,
			onReady: options.onLoaded ?? (() => { }),
			'onCreate:content': options.onCreate ?? (() => { }),
			'onUpdate:content': options.onUpdate ?? (() => { }),
		},
	)
	app.provide(EDITOR_UPLOAD, true)
	provideHooks(app, options)
	return createTextEditorEmbed(app, data, options)
}

/**
 * Create and mount a text editor for markdown content
 *
 * @param options for the editor
 */
export async function createMarkdownContentEditor(options: MarkdownContentEditorOptions) {
	const { default: MarkdownContentEditorApp } = await import('./views/MarkdownContentEditorApp.vue')
	const data = reactiveData(options)
	const app = createApp(
		MarkdownContentEditorApp,
		{
			...data,
			fileId: options.fileId,
			readonlyBarComponent: options.readonlyBar?.component,
			relativePath: options.filePath,
			shareToken: options.shareToken,
			onReady: options.onLoaded ?? (() => { }),
			'onCreate:content': options.onCreate ?? (() => { }),
			'onUpdate:content': options.onUpdate ?? (() => { }),
		},
	)
	provideHooks(app, options)
	return createTextEditorEmbed(app, data, options)
}

/**
 * Reactive data for the editor.
 *
 * Will also be handed to and manipulated by the TextEditorEmbed instance.
 *
 * @param options the editor options
 */
function reactiveData(options: EditorOptions) {
	return reactive({
		readonlyBarProps: options.readonlyBar?.props,
		readOnly: options.readOnly ?? false,
		content: options.content ?? '',
	})
}

/**
 * Provide hooks on the app-level
 *
 * @param app the editor vue app
 * @param options the editor options
 */
function provideHooks(app: App, options: EditorOptions) {
	app.provide(ACTION_ATTACHMENT_PROMPT, options.onFileInsert)
	app.provide(HOOK_MENTION_SEARCH, options.onMentionSearch)
	app.provide(HOOK_MENTION_INSERT, options.onMentionInsert)
	app.provide(OPEN_LINK_HANDLER, {
		openLink: options.openLinkHandler || openLink,
	})
	app.provide(ATTACHMENT_RESOLVER, shallowRef({
		resolve(src: string) {
			return [
				{
					type: 'image',
					url: src,
				},
			]
		},
	}))
	app.provide(HOOK_MENUBAR_LINK_CUSTOM_ACTION, options.menubarLinkCustomAction)
}

/**
 * Create a `TextEditorEmbed` wrapper for the given app.
 *
 * @param app the editor vue app
 * @param data reactive data for the editor
 * @param options the editor options
 */
function createTextEditorEmbed(app: App, data: ReturnType<typeof reactiveData>, options: EditorOptions): TextEditorEmbed {
	return new TextEditorEmbedBuilder(app)
		.onSearch(options.onSearch)
		.onTocToggle(options.onOutlineToggle)
		.onTocToggle(options.onTocToggle)
		.onTocPin(options.onTocPin)
		.onAttachmentsUpdated(options.onAttachmentsUpdated)
		.render(options.el, data)
}
