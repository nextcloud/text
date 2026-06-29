import type { EventHandler } from '@nextcloud/event-bus'
import type { Editor } from '@tiptap/core'
import type { Node } from '@tiptap/pm/model'
import type { App, ComponentInstance, h, Reactive } from 'vue'
import type CollaborativeEditorApp from './views/CollaborativeEditorApp.vue'
import type MarkdownContentEditorApp from './views/MarkdownContentEditorApp.vue'

import { emit, subscribe } from '@nextcloud/event-bus'
import { encodeAttachmentFilename } from './helpers/attachmentFilename.ts'

interface EditorComponent {
	editor: Editor
	debugYjsData?: () => void
	setContent: (content: string, options?: { addToHistory: boolean | undefined }) => void
	save?: () => void
}

type DataType = Reactive<{
	content: string
	readOnly: boolean
	readonlyBarProps?: Parameters<typeof h>[1]
}>

type MountedType = ComponentInstance<typeof CollaborativeEditorApp>
	| ComponentInstance<typeof MarkdownContentEditorApp>

export class TextEditorEmbed {
	app: App | undefined
	#app: App
	#data: DataType
	#editorComponent: EditorComponent
	#mounted: MountedType
	constructor(app: App, data: DataType, mounted: MountedType) {
		this.#app = app
		this.#data = data
		this.#mounted = mounted
		const component = this.#mounted.editorContainer
		if (!component) {
			throw ('Could not connect to editor. Aborting')
		}
		this.#editorComponent = component
		this.#registerDebug()
	}

	destroy() {
		this.#app.unmount()
	}

	setContent(content: string) {
		// Update reactive prop for MarkdownContentEditor
		this.#data.content = content
		// Call setContent for file based Editor
		this.#editorComponent.setContent?.(content)
		return this
	}

	getHTML() {
		const editor = this.#editorComponent.editor
		return editor?.getHTML()
	}

	setSearchQuery(query: string, matchAll: boolean) {
		const editor = this.#editorComponent.editor
		editor?.commands.setSearchQuery(query, matchAll)
	}

	searchNext() {
		const editor = this.#editorComponent.editor
		editor?.commands.nextMatch()
	}

	searchPrevious() {
		const editor = this.#editorComponent.editor
		editor?.commands.previousMatch()
	}

	async save() {
		return this.#editorComponent.save?.()
	}

	setShowOutline(value: boolean) {
		emit('text:toc:toggle', { visible: value })
		return this
	}

	setReadOnly(value: boolean) {
		this.#data.readOnly = value
		return this
	}

	updateReadonlyBarProps(value: object) {
		this.#data.readonlyBarProps = value
		return this
	}

	insertAtCursor(content: string) {
		this.#editorComponent
			.editor?.chain()
			.insertContent(content)
			.focus()
			.run()
	}

	replaceAttachmentFilename(pageId: number, oldName: string, newName: string) {
		const oldSrc = '.attachments.' + pageId + '/' + encodeAttachmentFilename(oldName)
		const newSrc = '.attachments.' + pageId + '/' + encodeAttachmentFilename(newName)
		const { view, state } = this.#editorComponent.editor as Editor
		const { doc, schema, tr } = state
		let modified = false

		doc.descendants((node: Node, pos: number) => {
			if (node.type !== schema.nodes.image || node.attrs.src !== oldSrc) {
				return
			}

			tr.setNodeMarkup(pos, undefined, {
				...node.attrs,
				src: newSrc,
				alt: node.attrs.alt.replace(oldName, newName),
			})
			modified = true
		})

		if (modified) {
			view.dispatch(tr)
			this.save()
		}
	}

	removeAttachmentReferences(pageId: number, name: string) {
		const src = '.attachments.' + pageId + '/' + encodeAttachmentFilename(name)
		const { view, state } = this.#editorComponent.editor
		const { doc, schema, tr } = state
		let modified = false

		doc.descendants((node: Node, pos: number) => {
			if (node.type !== schema.nodes.image || node.attrs.src !== src) {
				return
			}

			tr.delete(pos, pos + node.nodeSize)
			modified = true
		})

		if (modified) {
			view.dispatch(tr)
			this.save()
		}
	}

	focus() {
		this.#editorComponent.editor?.commands.focus()
	}

	debugYjs() {
		const yjsData = this.#editorComponent.debugYjsData?.()
		if (!yjsData) {
			return
		}
		const intro = 'Editor Yjs debug data. Copy the object below that starts with "clientId".'
		const introChrome = '- In Chrome, select "Copy" at the end of the line.'
		const introFirefox = '- In Firefox, right-click on the object and select "Copy object".'
		const styleBold = 'font-weight: bold;'
		const styleItalic = 'font-weight: normal; font-style: italic;'
		// eslint-disable-next-line no-console
		console.warn(JSON.stringify(yjsData, null, ' '))
		// eslint-disable-next-line no-console
		console.warn(
			'%c%s\n%c%s\n%s',
			styleBold,
			intro,
			styleItalic,
			introChrome,
			introFirefox,
		)
	}

	#registerDebug() {
		if (window?._oc_debug) {
			this.app = this.#app
			window.OCA.Text._debug = [...(window.OCA.Text._debug ?? []), this]
		}
	}
}

export class TextEditorEmbedBuilder {
	#app: App
	constructor(app: App) {
		this.#app = app
	}

	onSearch(onSearchCallback: EventHandler<{ totalMatches: number, matchIndex: number }> = () => { }) {
		subscribe('text:editor:search-results', onSearchCallback)
		return this
	}

	onTocToggle(onTocToggleCallback: EventHandler<boolean> = () => { }) {
		subscribe('text:toc:toggled', onTocToggleCallback)
		return this
	}

	onTocPin(onTocPinCallback: EventHandler<{ fileId: number, keep: boolean }> = () => { }) {
		subscribe('text:toc:pin', onTocPinCallback)
		return this
	}

	onAttachmentsUpdated(onAttachmentsUpdatedCallback: EventHandler<{ attachmentSrcs: string[] }> = () => { }) {
		subscribe('text:editor:attachments:updated', onAttachmentsUpdatedCallback)
		return this
	}

	render(el: HTMLElement, data: DataType) {
		el.innerHTML = ''
		const element = document.createElement('div')
		element.style.display = 'contents'
		el.appendChild(element)
		const mounted = this.#app.mount(element) as MountedType
		return new TextEditorEmbed(this.#app, data, mounted)
	}
}
