/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

const openMimetypesMarkdown = [
	'text/markdown',
]

const openMimetypesPlainText = [
	'text/plain',
	'application/cmd',
	'application/x-empty',
	'application/x-msdos-program',
	'application/javascript',
	'application/json',
	'application/x-perl',
	'application/x-php',
	'application/x-tex',
	'application/xml',
	'application/yaml',
	'text/asciidoc',
	'text/css',
	'text/html',
	'text/org',
	'text/x-c',
	'text/x-c++src',
	'text/x-h',
	'text/x-java-source',
	'text/x-ldif',
	'text/x-python',
	'text/x-shellscript',
]

if (!OC.appswebroots?.richdocuments && !OC.appswebroots?.onlyoffice) {
	openMimetypesPlainText.push('text/csv')
}

const openMimetypes = [...openMimetypesMarkdown, ...openMimetypesPlainText]

export {
	openMimetypes,
	openMimetypesMarkdown,
	openMimetypesPlainText,
}
