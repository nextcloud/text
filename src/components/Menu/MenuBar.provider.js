export const MENU_ID = Symbol('menu::id')

export const useMenuIDMixin = {
	inject: {
		$menuID: { from: MENU_ID, default: null },
	},
	computed: {
		menuIDSelector() {
			return `#${this.$menuID}`
		},
	},
}
