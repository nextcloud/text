/* eslint-disable camelcase */
/*
 * @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
 *
 * @author Vinicius Reis <vinicius@nextcloud.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import MDI_Loading from 'vue-material-design-icons/Loading'

import MDI_Lock from 'vue-material-design-icons/Lock'
import MDI_Delete from 'vue-material-design-icons/Delete'
import MDI_Undo from 'vue-material-design-icons/ArrowULeftTop'
import MDI_Redo from 'vue-material-design-icons/ArrowURightTop'
import MDI_Info from 'vue-material-design-icons/Information'
import MDI_Positive from 'vue-material-design-icons/CheckboxMarkedCircle'
import MDI_Warn from 'vue-material-design-icons/AlertCircle'
import MDI_Danger from 'vue-material-design-icons/AlertDecagram'
import MDI_CodeTags from 'vue-material-design-icons/CodeTags'
import MDI_Table from 'vue-material-design-icons/Table'
import MDI_Emoticon from 'vue-material-design-icons/EmoticonOutline'
import MDI_Images from 'vue-material-design-icons/ImageMultipleOutline'
import MDI_Help from 'vue-material-design-icons/HelpCircle'
import MDI_Upload from 'vue-material-design-icons/Upload'
import MDI_Folder from 'vue-material-design-icons/Folder'
import MDI_DotsHorizontal from 'vue-material-design-icons/DotsHorizontal'
import MDI_FormatBold from 'vue-material-design-icons/FormatBold'
import MDI_FormatItalic from 'vue-material-design-icons/FormatItalic'
import MDI_FormatUnderline from 'vue-material-design-icons/FormatUnderline'
import MDI_FormatStrikethrough from 'vue-material-design-icons/FormatStrikethrough'
import MDI_FormatHeader1 from 'vue-material-design-icons/FormatHeader1'
import MDI_FormatHeader2 from 'vue-material-design-icons/FormatHeader2'
import MDI_FormatHeader3 from 'vue-material-design-icons/FormatHeader3'
import MDI_FormatHeader4 from 'vue-material-design-icons/FormatHeader4'
import MDI_FormatHeader5 from 'vue-material-design-icons/FormatHeader5'
import MDI_FormatHeader6 from 'vue-material-design-icons/FormatHeader6'
import MDI_FormatListNumbered from 'vue-material-design-icons/FormatListNumbered'
import MDI_FormatListBulleted from 'vue-material-design-icons/FormatListBulleted'
import MDI_FormatListCheckbox from 'vue-material-design-icons/FormatListCheckbox'
import MDI_FormatQuote from 'vue-material-design-icons/FormatQuoteClose'
import MDI_TableSettings from 'vue-material-design-icons/TableCog'
import MDI_TableAddRowAfter from 'vue-material-design-icons/TableRowPlusAfter'
import MDI_TableAddRowBefore from 'vue-material-design-icons/TableRowPlusBefore'
import MDI_TableAddColumnAfter from 'vue-material-design-icons/TableColumnPlusAfter'
import MDI_TableAddColumnBefore from 'vue-material-design-icons/TableColumnPlusBefore'

const DEFAULT_ICON_SIZE = 20

const makeIcon = (original) => ({
	functional: true,
	render(h, { data, props }) {
		return h(original, {
			data,
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

export const Lock = makeIcon(MDI_Lock)
export const Delete = makeIcon(MDI_Delete)
export const Undo = makeIcon(MDI_Undo)
export const Redo = makeIcon(MDI_Redo)
export const Info = makeIcon(MDI_Info)
export const Positive = makeIcon(MDI_Positive)
export const Warn = makeIcon(MDI_Warn)
export const Danger = makeIcon(MDI_Danger)
export const CodeTags = makeIcon(MDI_CodeTags)
export const Table = makeIcon(MDI_Table)
export const Emoticon = makeIcon(MDI_Emoticon)
export const Images = makeIcon(MDI_Images)
export const Help = makeIcon(MDI_Help)
export const Upload = makeIcon(MDI_Upload)
export const Folder = makeIcon(MDI_Folder)
export const DotsHorizontal = makeIcon(MDI_DotsHorizontal)
export const FormatBold = makeIcon(MDI_FormatBold)
export const FormatItalic = makeIcon(MDI_FormatItalic)
export const FormatUnderline = makeIcon(MDI_FormatUnderline)
export const FormatStrikethrough = makeIcon(MDI_FormatStrikethrough)
export const FormatHeader1 = makeIcon(MDI_FormatHeader1)
export const FormatHeader2 = makeIcon(MDI_FormatHeader2)
export const FormatHeader3 = makeIcon(MDI_FormatHeader3)
export const FormatHeader4 = makeIcon(MDI_FormatHeader4)
export const FormatHeader5 = makeIcon(MDI_FormatHeader5)
export const FormatHeader6 = makeIcon(MDI_FormatHeader6)
export const FormatListNumbered = makeIcon(MDI_FormatListNumbered)
export const FormatListBulleted = makeIcon(MDI_FormatListBulleted)
export const FormatListCheckbox = makeIcon(MDI_FormatListCheckbox)
export const FormatQuote = makeIcon(MDI_FormatQuote)
export const TableSettings = makeIcon(MDI_TableSettings)
export const TableAddRowAfter = makeIcon(MDI_TableAddRowAfter)
export const TableAddRowBefore = makeIcon(MDI_TableAddRowBefore)
export const TableAddColumnAfter = makeIcon(MDI_TableAddColumnAfter)
export const TableAddColumnBefore = makeIcon(MDI_TableAddColumnBefore)
