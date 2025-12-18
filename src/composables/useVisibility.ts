/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {
	computed,
	inject,
	nextTick,
	onMounted,
	onUnmounted,
	provide,
	readonly,
	shallowRef,
	type InjectionKey,
	type Ref,
} from 'vue'
import { logger } from '../helpers/logger'
import { useEditor } from './useEditor'

export const intersectionObserverKey = Symbol(
	'text:intersection_observer',
) as InjectionKey<IntersectionObserver>
export const visibleIdsKey = Symbol('text:visibile_ids') as InjectionKey<
	Ref<Set<string>>
>

const intersectionObserverOptions = {
	root: null,
	rootMargin: '0px 0px -50% 0px',
	threshold: 0,
}

export const provideIntersectionObserver = () => {
	// Vue2 does not support reactive sets.
	// So the shallow ref needs to be explicitely written every time the set changes.
	const visibleIds = shallowRef<Set<string>>(new Set())
	const update: IntersectionObserverCallback = (entries) => {
		const ids = new Set(visibleIds.value)
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				ids.add(entry.target.id)
			} else {
				ids.delete(entry.target.id)
			}
		})
		visibleIds.value = ids
	}

	const intersectionObserver = new IntersectionObserver(
		update,
		intersectionObserverOptions,
	)

	onUnmounted(() => {
		intersectionObserver.disconnect()
	})
	provide(intersectionObserverKey, intersectionObserver)
	provide(visibleIdsKey, visibleIds)
}

export const useVisibility = (id: string) => {
	const { editor } = useEditor()
	const intersectionObserver = inject(intersectionObserverKey)!
	const visibleIds = inject(visibleIdsKey)!

	onMounted(() => {
		nextTick(() => {
			const el = editor.view.dom.querySelector(`#${id}`)
			if (el) {
				intersectionObserver.observe(el)
			} else {
				logger.warn(`Could not find element with id ${id}`)
			}
		})
	})

	onUnmounted(() => {
		visibleIds.value.delete(id)
		visibleIds.value = new Set(visibleIds.value) // trigger reactivity
		const el = editor.view.dom.querySelector(`#${id}`)
		if (el) {
			intersectionObserver.unobserve(el)
		}
	})
	const visible = computed(() => visibleIds.value.has(id))
	return { visible: readonly(visible) }
}
