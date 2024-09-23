/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/* eslint-disable camelcase */

import MDI_AlphabeticalVariant from 'vue-material-design-icons/AlphabeticalVariant.vue'
import MDI_Close from 'vue-material-design-icons/Close.vue'
import MDI_Check from 'vue-material-design-icons/Check.vue'
import MDI_CircleMedium from 'vue-material-design-icons/CircleMedium.vue'
import MDI_CodeTags from 'vue-material-design-icons/CodeTags.vue'
import MDI_Danger from 'vue-material-design-icons/AlertDecagram.vue'
import MDI_Delete from 'vue-material-design-icons/Delete.vue'
import MDI_Document from 'vue-material-design-icons/FileDocument.vue'
import MDI_DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue'
import MDI_Emoticon from 'vue-material-design-icons/EmoticonOutline.vue'
import MDI_Folder from 'vue-material-design-icons/Folder.vue'
import MDI_FormatBold from 'vue-material-design-icons/FormatBold.vue'
import MDI_AlignHorizontalCenter from 'vue-material-design-icons/AlignHorizontalCenter.vue'
import MDI_AlignHorizontalLeft from 'vue-material-design-icons/AlignHorizontalLeft.vue'
import MDI_AlignHorizontalRight from 'vue-material-design-icons/AlignHorizontalRight.vue'
import MDI_FormatHeader1 from 'vue-material-design-icons/FormatHeader1.vue'
import MDI_FormatHeader2 from 'vue-material-design-icons/FormatHeader2.vue'
import MDI_FormatHeader3 from 'vue-material-design-icons/FormatHeader3.vue'
import MDI_FormatHeader4 from 'vue-material-design-icons/FormatHeader4.vue'
import MDI_FormatHeader5 from 'vue-material-design-icons/FormatHeader5.vue'
import MDI_FormatHeader6 from 'vue-material-design-icons/FormatHeader6.vue'
import MDI_FormatIndentDecrease from 'vue-material-design-icons/FormatIndentDecrease.vue'
import MDI_FormatIndentIncrease from 'vue-material-design-icons/FormatIndentIncrease.vue'
import MDI_FormatItalic from 'vue-material-design-icons/FormatItalic.vue'
import MDI_FormatListBulleted from 'vue-material-design-icons/FormatListBulleted.vue'
import MDI_FormatListCheckbox from 'vue-material-design-icons/FormatListCheckbox.vue'
import MDI_FormatListNumbered from 'vue-material-design-icons/FormatListNumbered.vue'
import MDI_FormatQuote from 'vue-material-design-icons/FormatQuoteClose.vue'
import MDI_FormatStrikethrough from 'vue-material-design-icons/FormatStrikethrough.vue'
import MDI_FormatUnderline from 'vue-material-design-icons/FormatUnderline.vue'
import MDI_Help from 'vue-material-design-icons/HelpCircle.vue'
import MDI_Image from 'vue-material-design-icons/ImageOutline.vue'
import MDI_Info from 'vue-material-design-icons/Information.vue'
import MDI_Link from 'vue-material-design-icons/Link.vue'
import MDI_LinkOff from 'vue-material-design-icons/LinkOff.vue'
import MDI_LinkVariantPlus from 'vue-material-design-icons/LinkVariantPlus.vue'
import MDI_Loading from 'vue-material-design-icons/Loading.vue'
import MDI_Lock from 'vue-material-design-icons/Lock.vue'
import MDI_Paperclip from 'vue-material-design-icons/Paperclip.vue'
import MDI_Positive from 'vue-material-design-icons/CheckboxMarkedCircle.vue'
import MDI_Redo from 'vue-material-design-icons/ArrowURightTop.vue'
import MDI_Shape from 'vue-material-design-icons/Shape.vue'
import MDI_Table from 'vue-material-design-icons/Table.vue'
import MDI_TableAddColumnAfter from 'vue-material-design-icons/TableColumnPlusAfter.vue'
import MDI_TableAddColumnBefore from 'vue-material-design-icons/TableColumnPlusBefore.vue'
import MDI_TableAddRowAfter from 'vue-material-design-icons/TableRowPlusAfter.vue'
import MDI_TableAddRowBefore from 'vue-material-design-icons/TableRowPlusBefore.vue'
import MDI_TableSettings from 'vue-material-design-icons/TableCog.vue'
import MDI_TrashCan from 'vue-material-design-icons/TrashCan.vue'
import MDI_Undo from 'vue-material-design-icons/ArrowULeftTop.vue'
import MDI_Upload from 'vue-material-design-icons/Upload.vue'
import MDI_Warn from 'vue-material-design-icons/Alert.vue'
import MDI_Web from 'vue-material-design-icons/Web.vue'
import MDI_TranslateVariant from 'vue-material-design-icons/TranslateVariant.vue'

const DEFAULT_ICON_SIZE = 20

const makeIcon = (original) => ({
	functional: true,
	render(h, { data, props }) {
		return h(original, {
			data,
			key: data.key,
			staticClass: data.staticClass,
			props: { size: DEFAULT_ICON_SIZE, ...props },
		})
	},
})

export const Loading = {
	functional: true,
	render(h, { data, props }) {
		return h(MDI_Loading, {
			data,
			staticClass: 'animation-rotate',
			props: { size: DEFAULT_ICON_SIZE, ...props },
		})
	},
}

export const AlphabeticalVariant = makeIcon(MDI_AlphabeticalVariant)
export const AlignHorizontalCenter = makeIcon(MDI_AlignHorizontalCenter)
export const AlignHorizontalLeft = makeIcon(MDI_AlignHorizontalLeft)
export const AlignHorizontalRight = makeIcon(MDI_AlignHorizontalRight)
export const Close = makeIcon(MDI_Close)
export const Check = makeIcon(MDI_Check)
export const CodeTags = makeIcon(MDI_CodeTags)
export const CircleMedium = makeIcon(MDI_CircleMedium)
export const Danger = makeIcon(MDI_Danger)
export const Delete = makeIcon(MDI_Delete)
export const Document = makeIcon(MDI_Document)
export const DotsHorizontal = makeIcon(MDI_DotsHorizontal)
export const Emoticon = makeIcon(MDI_Emoticon)
export const Folder = makeIcon(MDI_Folder)
export const FormatBold = makeIcon(MDI_FormatBold)
export const FormatHeader1 = makeIcon(MDI_FormatHeader1)
export const FormatHeader2 = makeIcon(MDI_FormatHeader2)
export const FormatHeader3 = makeIcon(MDI_FormatHeader3)
export const FormatHeader4 = makeIcon(MDI_FormatHeader4)
export const FormatHeader5 = makeIcon(MDI_FormatHeader5)
export const FormatHeader6 = makeIcon(MDI_FormatHeader6)
export const FormatIndentDecrease = makeIcon(MDI_FormatIndentDecrease)
export const FormatIndentIncrease = makeIcon(MDI_FormatIndentIncrease)
export const FormatItalic = makeIcon(MDI_FormatItalic)
export const FormatListBulleted = makeIcon(MDI_FormatListBulleted)
export const FormatListCheckbox = makeIcon(MDI_FormatListCheckbox)
export const FormatListNumbered = makeIcon(MDI_FormatListNumbered)
export const FormatQuote = makeIcon(MDI_FormatQuote)
export const FormatStrikethrough = makeIcon(MDI_FormatStrikethrough)
export const FormatUnderline = makeIcon(MDI_FormatUnderline)
export const Help = makeIcon(MDI_Help)
export const Image = makeIcon(MDI_Image)
export const Info = makeIcon(MDI_Info)
export const LinkIcon = makeIcon(MDI_Link)
export const LinkOff = makeIcon(MDI_LinkOff)
export const LinkVariantPlus = makeIcon(MDI_LinkVariantPlus)
export const Lock = makeIcon(MDI_Lock)
export const Paperclip = makeIcon(MDI_Paperclip)
export const Positive = makeIcon(MDI_Positive)
export const Redo = makeIcon(MDI_Redo)
export const Shape = makeIcon(MDI_Shape)
export const Table = makeIcon(MDI_Table)
export const TableAddColumnAfter = makeIcon(MDI_TableAddColumnAfter)
export const TableAddColumnBefore = makeIcon(MDI_TableAddColumnBefore)
export const TableAddRowAfter = makeIcon(MDI_TableAddRowAfter)
export const TableAddRowBefore = makeIcon(MDI_TableAddRowBefore)
export const TableSettings = makeIcon(MDI_TableSettings)
export const TrashCan = makeIcon(MDI_TrashCan)
export const TranslateVariant = makeIcon(MDI_TranslateVariant)
export const Undo = makeIcon(MDI_Undo)
export const Upload = makeIcon(MDI_Upload)
export const Warn = makeIcon(MDI_Warn)
export const Web = makeIcon(MDI_Web)
