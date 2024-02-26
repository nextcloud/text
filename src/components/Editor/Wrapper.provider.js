export const OUTLINE_STATE = Symbol('wrapper:outline-state')
export const OUTLINE_ACTIONS = Symbol('wrapper:outline-actions')
export const READ_ONLY_ACTIONS = Symbol('wrapper:read-only-actions')

export const useOutlineStateMixin = {
	inject: {
		$outlineState: {
			from: OUTLINE_STATE,
			default: {
				visible: false,
				enable: false,
			},
		},
	},
}

export const useOutlineActions = {
	inject: {
		$outlineActions: {
			from: OUTLINE_ACTIONS,
			default: {
				toggle: () => {},
			},
		},
	},
}

export const useReadOnlyActions = {
	inject: {
		$readOnlyActions: {
			from: READ_ONLY_ACTIONS,
			default: {
				toggle: () => {},
			},
		},
	},
}
