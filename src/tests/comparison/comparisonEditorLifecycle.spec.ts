/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { EditorState, Plugin } from '@tiptap/pm/state'

import { EditorView } from '@tiptap/pm/view'
import { Editor } from '@tiptap/vue-3'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { consumeStateOnlyComparisonEditor } from '../../comparison/comparisonEditorLifecycle.ts'
import { createComparisonEditor } from '../../comparison/createComparisonEditor.ts'
import { ATTACHMENT_RESOLVER, EDITOR_UPLOAD } from '../../components/Editor.provider.ts'
import { OPEN_LINK_HANDLER } from '../../composables/useOpenLinkHandler.ts'
import { createMarkdownContentComparison } from '../../createMarkdownContentComparison.ts'
import EditableTable from '../../nodes/EditableTable.js'
import Table from '../../nodes/Table.js'

vi.mock('@nextcloud/axios', () => ({
	default: {
		get: vi.fn().mockResolvedValue({ data: { ocs: { data: { references: {} } } } }),
		post: vi.fn().mockResolvedValue({ data: { ocs: { data: { references: {} } } } }),
	},
}))

vi.mock('@nextcloud/browser-storage', () => ({
	getBuilder() {
		const values = new Map<string, string>()
		return {
			build() {
				return {
					clear: () => values.clear(),
					getItem: (key: string) => values.get(key) ?? null,
					removeItem: (key: string) => values.delete(key),
					setItem: (key: string, value: string) => values.set(key, value),
				}
			},
			clearOnLogout() {
				return this
			},
			persist() {
				return this
			},
		}
	},
}))

interface MountSnapshot {
	editor: Editor
	element: Parameters<Editor['mount']>[0]
	contentComponent: Editor['contentComponent']
	appContext: Editor['appContext']
	pluginsAfterMount: readonly Plugin[]
	docBeforeMount: EditorState['doc']
	dom: HTMLElement
	callout: Element | null
}

afterEach(() => {
	vi.restoreAllMocks()
	vi.unstubAllGlobals()
})

describe('comparison editor lifecycle', () => {
	it('claims only registered state-only comparison editors once', () => {
		const comparisonEditor = createComparisonEditor('State only')
		try {
			expect(() => consumeStateOnlyComparisonEditor(comparisonEditor)).not.toThrow()
			expect(() => consumeStateOnlyComparisonEditor(comparisonEditor))
				.toThrow('Comparison editor plugin initialization failed')
		} finally {
			comparisonEditor.destroy()
		}
	})

	it('parses the complete read-only document without creating a detached view', () => {
		const mount = vi.spyOn(Editor.prototype, 'mount')
		const editor = createComparisonEditor('Before\n\n| A |\n| --- |\n| one |')
		try {
			expect(mount).not.toHaveBeenCalled()
			expect(editor.options.element).toBeNull()
			expect(editor.state.doc.textContent).toBe('BeforeAone')
			expect(editor.state.plugins).toEqual([])
			expect(editor.isDestroyed).toBe(true)
			expect(() => editor.view.dom).toThrow('editor view is not available')
			expect(editor.extensionManager.nodeViews.callout).toBeTypeOf('function')
			const table = editor.extensionManager.extensions.find(({ name }) => name === 'table')
			expect(table).toBe(Table)
			expect(table).not.toBe(EditableTable)
		} finally {
			editor.destroy()
		}
	})

	it('infers text direction while parsing an immutable comparison document', () => {
		const editor = createComparisonEditor('English\n\nالعربية')
		try {
			const directions: Array<string | null> = []
			editor.state.doc.descendants((node) => {
				if (node.type.name === 'paragraph') {
					directions.push(node.attrs.dir as string | null)
				}
				return true
			})

			expect(directions.slice(0, 2)).toEqual(['ltr', 'rtl'])
			expect(editor.state.plugins).toEqual([])
		} finally {
			editor.destroy()
		}
	})

	it('mounts each original complete document once with providers, decorations, and Vue node views ready', async () => {
		const snapshots: MountSnapshot[] = []
		const originalMount = Editor.prototype.mount
		const mount = vi.spyOn(Editor.prototype, 'mount').mockImplementation(function(this: Editor, element) {
			const contentComponent = this.contentComponent
			const appContext = this.appContext
			const docBeforeMount = this.state.doc
			originalMount.call(this, element)
			snapshots.push({
				appContext,
				callout: this.view.dom.querySelector('[data-node-view-wrapper][data-text-el="callout"]'),
				contentComponent,
				docBeforeMount,
				dom: this.view.dom,
				editor: this,
				element,
				pluginsAfterMount: this.view.state.plugins,
			})
		})
		const createNodeViews = vi.spyOn(Editor.prototype, 'createNodeViews')
		const setProps = vi.spyOn(EditorView.prototype, 'setProps')
		const destroy = vi.spyOn(Editor.prototype, 'destroy')
		const el = document.createElement('div')
		const onLoaded = vi.fn(() => {
			expect(snapshots).toHaveLength(2)
			expect(el.querySelectorAll('.ProseMirror')).toHaveLength(2)
			expect(el.querySelectorAll('.text-comparison-change')).not.toHaveLength(0)
			expect(el.querySelector('.text-comparison__document--before .text-comparison-change--current')).not.toBeNull()
			expect(el.querySelector('.text-comparison__document--after .text-comparison-change--current')).not.toBeNull()
			for (const snapshot of snapshots) {
				expect(snapshot.editor.state).toBe(snapshot.editor.view.state)
				expect(snapshot.editor.view.dom).toBe(snapshot.dom)
				expect(snapshot.callout).not.toBeNull()
				expect(snapshot.editor.view.dom.querySelector('[data-text-el="callout"]')).toBe(snapshot.callout)
			}
		})

		const comparison = await createMarkdownContentComparison({
			afterContent: '::: warn\nAfter\n:::\n\nUnchanged middle\n\nAfter tail',
			beforeContent: '::: info\nBefore\n:::\n\nUnchanged middle\n\nBefore tail',
			el,
			onLoaded,
		})

		expect(onLoaded).toHaveBeenCalledOnce()
		expect(mount).toHaveBeenCalledTimes(2)
		expect(snapshots[0]!.editor.schema).toBe(snapshots[1]!.editor.schema)
		expect(snapshots[0]!.docBeforeMount.type.schema).toBe(snapshots[1]!.docBeforeMount.type.schema)
		expect(snapshots.map(({ editor }) => editor.extensionManager.schema))
			.toEqual([snapshots[0]!.editor.schema, snapshots[0]!.editor.schema])
		expect(snapshots.map(({ docBeforeMount }) => docBeforeMount.firstChild?.attrs.type))
			.toEqual(['info', 'warn'])
		expect(createNodeViews).not.toHaveBeenCalled()
		expect(setProps).not.toHaveBeenCalled()
		for (const snapshot of snapshots) {
			expect(snapshot.element).toBeInstanceOf(HTMLElement)
			expect(el.contains(snapshot.element as Node)).toBe(true)
			expect(snapshot.contentComponent).not.toBeNull()
			expect((snapshot.contentComponent?.ctx as unknown as { _: unknown })._).toBe(snapshot.contentComponent)
			expect(snapshot.appContext).not.toBeNull()
			const providers = snapshot.appContext!.provides
			expect(Object.hasOwn(providers, ATTACHMENT_RESOLVER)).toBe(true)
			expect(Object.hasOwn(providers, EDITOR_UPLOAD)).toBe(true)
			expect(Reflect.has(providers, OPEN_LINK_HANDLER)).toBe(true)
			expect(snapshot.docBeforeMount.textContent).toContain(snapshot === snapshots[0] ? 'Before tail' : 'After tail')
			expect(snapshot.docBeforeMount.textContent).toContain('Unchanged middle')

			const finalPlugins = snapshot.editor.view.state.plugins
			expect(snapshot.pluginsAfterMount.every((plugin) => finalPlugins.includes(plugin))).toBe(true)
			const comparisonPlugins = finalPlugins.filter((plugin) => !snapshot.pluginsAfterMount.includes(plugin))
			expect(comparisonPlugins).toHaveLength(1)
			snapshot.editor.view.dispatch(snapshot.editor.view.state.tr.setMeta('comparison-lifecycle-test', true))
			expect(snapshot.editor.state).toBe(snapshot.editor.view.state)
		}

		comparison.destroy()
		comparison.destroy()
		expect(destroy).toHaveBeenCalledTimes(2)
		expect(snapshots.every(({ editor }) => editor.isDestroyed)).toBe(true)
		expect(snapshots.every(({ editor }) => editor.contentComponent === null && editor.appContext === null)).toBe(true)
		expect(el.childElementCount).toBe(0)
	})

	it('keeps immutable original documents mounted while switching views', async () => {
		const beforeContent = 'Before one\n\nSame two\n\nSame three\n\nSame four\n\nBefore five'
		const afterContent = 'After one\n\nSame two\n\nSame three\n\nSame four\n\nAfter five'
		const expectedBefore = createComparisonEditor(beforeContent)
		const expectedAfter = createComparisonEditor(afterContent)
		const editors: Editor[] = []
		const originalMount = Editor.prototype.mount
		vi.spyOn(Editor.prototype, 'mount').mockImplementation(function(this: Editor, element) {
			editors.push(this)
			originalMount.call(this, element)
		})
		const el = document.createElement('div')
		try {
			const comparison = await createMarkdownContentComparison({ afterContent, beforeContent, el })
			try {
				expect(editors).toHaveLength(2)
				expect(editors[0]!.state.doc.toJSON()).toEqual(expectedBefore.state.doc.toJSON())
				expect(editors[1]!.state.doc.toJSON()).toEqual(expectedAfter.state.doc.toJSON())

				const full = [...el.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
					.find((button) => button.textContent?.includes('Full documents'))!
				const changes = [...el.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
					.find((button) => button.textContent?.trim() === 'Changes')!

				full.click()
				await vi.waitFor(() => expect(full.getAttribute('aria-selected')).toBe('true'))
				expect(editors[0]!.state.doc.toJSON()).toEqual(expectedBefore.state.doc.toJSON())
				expect(editors[1]!.state.doc.toJSON()).toEqual(expectedAfter.state.doc.toJSON())

				changes.click()
				await vi.waitFor(() => expect(changes.getAttribute('aria-selected')).toBe('true'))
				full.click()
				await vi.waitFor(() => expect(full.getAttribute('aria-selected')).toBe('true'))
				expect(editors[0]!.state.doc.toJSON()).toEqual(expectedBefore.state.doc.toJSON())
				expect(editors[1]!.state.doc.toJSON()).toEqual(expectedAfter.state.doc.toJSON())
			} finally {
				comparison.destroy()
			}
		} finally {
			expectedBefore.destroy()
			expectedAfter.destroy()
		}
	})

	it('renders the read-only node-view and provider fidelity inventory', async () => {
		class ResizeObserverMock {
			observe() {}
			disconnect() {}
			unobserve() {}
		}
		vi.stubGlobal('ResizeObserver', ResizeObserverMock)
		const content = `::: info
Callout
:::

<details>
<summary>Details</summary>
Content
</details>

| Column |
| --- |
| Cell |

![Image](image.png)

@[Jane](mention://user/jane) and $1 + 1 = 2$.

[Preview](https://preview.test (preview))

[Open link](https://links.test)

\`\`\`js
const ready = true
\`\`\``
		const openLink = vi.fn()
		const el = document.createElement('div')
		document.body.append(el)
		const comparison = await createMarkdownContentComparison({
			afterContent: content,
			beforeContent: content,
			el,
			noLazyImages: true,
			openLinkHandler: openLink,
		})
		try {
			for (const editor of el.querySelectorAll('.ProseMirror')) {
				expect(editor.querySelector('[data-node-view-wrapper][data-text-el="callout"] .callout__icon')).not.toBeNull()
				expect(editor.querySelector('[data-node-view-wrapper][data-text-el="details"]')).not.toBeNull()
				expect(editor.querySelector('[data-node-view-wrapper][data-text-el="preview"]')).not.toBeNull()
				expect(editor.querySelector('[data-node-view-wrapper].mention .mention-user-bubble')).not.toBeNull()
				expect(editor.querySelector('[data-node-view-wrapper][data-type="inline-math"] .katex-html')).not.toBeNull()
				expect(editor.querySelector('[data-node-view-wrapper] > figure[data-component="image-view"]')).not.toBeNull()
				expect(editor.querySelector('[data-node-view-wrapper].code-block')).not.toBeNull()
				expect(editor.querySelector('table')).not.toBeNull()
				expect(editor.querySelector('[data-text-el="table-view"]')).toBeNull()
			}
			await vi.waitFor(() => {
				expect(el.querySelectorAll('figure[data-component="image-view"][data-attachment-type="image"]')).toHaveLength(2)
			})
			const link = el.querySelector<HTMLAnchorElement>('a[data-text-el="text-only-link"][href="https://links.test"]')!
			link.dispatchEvent(new MouseEvent('click', { bubbles: true, button: 0, cancelable: true, ctrlKey: true }))
			expect(openLink).toHaveBeenCalledOnce()
			expect(openLink).toHaveBeenCalledWith('https://links.test/')
		} finally {
			comparison.destroy()
			el.remove()
		}
	})

	it('destroys every editor across repeated same-pair reopen', async () => {
		const mountedEditors: Editor[] = []
		const originalMount = Editor.prototype.mount
		const mount = vi.spyOn(Editor.prototype, 'mount').mockImplementation(function(this: Editor, element) {
			mountedEditors.push(this)
			originalMount.call(this, element)
		})
		const destroy = vi.spyOn(Editor.prototype, 'destroy')
		const el = document.createElement('div')

		for (let index = 0; index < 2; index++) {
			const comparison = await createMarkdownContentComparison({
				afterContent: 'After',
				beforeContent: 'Before',
				el,
			})
			comparison.destroy()
			comparison.destroy()
			expect(el.childElementCount).toBe(0)
		}

		expect(mount).toHaveBeenCalledTimes(4)
		expect(destroy).toHaveBeenCalledTimes(4)
		expect(new Set(mountedEditors).size).toBe(4)
		expect(mountedEditors.every((editor) => (
			editor.isDestroyed
			&& editor.contentComponent === null
			&& editor.appContext === null
		))).toBe(true)
	})

	it('rejects atomically when the second visible mount fails', async () => {
		const editors: Editor[] = []
		const originalMount = Editor.prototype.mount
		vi.spyOn(Editor.prototype, 'mount').mockImplementation(function(this: Editor, element) {
			editors.push(this)
			if (editors.length === 2) {
				throw new Error('second comparison mount failed')
			}
			originalMount.call(this, element)
		})
		const destroy = vi.spyOn(Editor.prototype, 'destroy')
		const el = document.createElement('div')

		await expect(createMarkdownContentComparison({
			afterContent: 'After',
			beforeContent: 'Before',
			el,
		})).rejects.toThrow('second comparison mount failed')

		expect(editors).toHaveLength(2)
		expect(destroy).toHaveBeenCalledTimes(2)
		expect(editors.every((editor) => editor.isDestroyed)).toBe(true)
		expect(el.childElementCount).toBe(0)
	})

	it('fails loudly and cleans up when live plugin state cannot be established', async () => {
		const editors: Editor[] = []
		const originalMount = Editor.prototype.mount
		vi.spyOn(Editor.prototype, 'mount').mockImplementation(function(this: Editor, element) {
			editors.push(this)
			originalMount.call(this, element)
		})
		const originalRegisterPlugin = Editor.prototype.registerPlugin
		vi.spyOn(Editor.prototype, 'registerPlugin').mockImplementation(function(this: Editor, plugin, handlePlugins) {
			const nextState = originalRegisterPlugin.call(this, plugin, handlePlugins)
			return nextState.reconfigure({ plugins: nextState.plugins })
		})
		const el = document.createElement('div')

		await expect(createMarkdownContentComparison({
			afterContent: 'After',
			beforeContent: 'Before',
			el,
		})).rejects.toThrow('Comparison editor plugin initialization failed')

		expect(editors).toHaveLength(2)
		expect(editors.every((editor) => editor.isDestroyed)).toBe(true)
		expect(el.childElementCount).toBe(0)
	})
})
