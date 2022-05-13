import MdiLoading from 'vue-material-design-icons/Loading'

export { default as Lock } from 'vue-material-design-icons/Lock'
export { default as Undo } from 'vue-material-design-icons/ArrowULeftTop'
export { default as Redo } from 'vue-material-design-icons/ArrowURightTop'
export { default as Info } from 'vue-material-design-icons/Information'
export { default as Positive } from 'vue-material-design-icons/CheckboxMarkedCircle'
export { default as Warn } from 'vue-material-design-icons/AlertCircle'
export { default as Danger } from 'vue-material-design-icons/AlertDecagram'
export { default as CodeTags } from 'vue-material-design-icons/CodeTags'
export { default as Table } from 'vue-material-design-icons/Table'
export { default as Emoticon } from 'vue-material-design-icons/EmoticonOutline'
export { default as Images } from 'vue-material-design-icons/ImageMultipleOutline'
export { default as Help } from 'vue-material-design-icons/HelpCircle'
export { default as Upload } from 'vue-material-design-icons/Upload'
export { default as Folder } from 'vue-material-design-icons/Folder'
export { default as FormatBold } from 'vue-material-design-icons/FormatBold'
export { default as FormatItalic } from 'vue-material-design-icons/FormatItalic'
export { default as FormatUnderline } from 'vue-material-design-icons/FormatUnderline'
export { default as FormatStrikethrough } from 'vue-material-design-icons/FormatStrikethrough'
export { default as FormatHeader1 } from 'vue-material-design-icons/FormatHeader1'
export { default as FormatHeader2 } from 'vue-material-design-icons/FormatHeader2'
export { default as FormatHeader3 } from 'vue-material-design-icons/FormatHeader3'
export { default as FormatHeader4 } from 'vue-material-design-icons/FormatHeader4'
export { default as FormatHeader5 } from 'vue-material-design-icons/FormatHeader5'
export { default as FormatHeader6 } from 'vue-material-design-icons/FormatHeader6'
export { default as FormatListNumbered } from 'vue-material-design-icons/FormatListNumbered'
export { default as FormatListBulleted } from 'vue-material-design-icons/FormatListBulleted'
export { default as FormatListCheckbox } from 'vue-material-design-icons/FormatListCheckbox'
export { default as FormatQuote } from 'vue-material-design-icons/FormatQuoteClose'

export const Loading = {
	functional: true,
	render(h) {
		return h(MdiLoading, { staticClass: 'animation-rotate' })
	},
}
