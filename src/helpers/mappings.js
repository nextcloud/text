/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

const extensionHighlight = {
	py: 'python',
	gyp: 'python',
	wsgi: 'python',
	htm: 'html',
	xhtml: 'html',
	erl: 'erlang',
	jsp: 'java',
	pl: 'perl',
	rss: 'xml',
	atom: 'xml',
	xsl: 'xml',
	plist: 'xml',
	rb: 'ruby',
	builder: 'ruby',
	gemspec: 'ruby',
	podspec: 'ruby',
	thor: 'ruby',
	diff: 'patch',
	hs: 'haskell',
	icl: 'haskell',
	php3: 'php',
	php4: 'php',
	php5: 'php',
	php6: 'php',
	sh: 'bash',
	zsh: 'bash',
	st: 'smalltalk',
	as: 'actionscript',
	apacheconf: 'apache',
	osacript: 'applescript',
	b: 'brainfuck',
	bf: 'brainfuck',
	clj: 'clojure',
	'cmake.in': 'cmake',
	coffee: 'coffeescript',
	cson: 'coffescript',
	iced: 'coffescript',
	c: 'cpp',
	h: 'cpp',
	'c++': 'cpp',
	'h++': 'cpp',
	hh: 'cpp',
	jinja: 'django',
	bat: 'dos',
	cmd: 'dos',
	fs: 'fsharp',
	hbs: 'handlebars',
	'html.hbs': 'handlebars',
	'html.handlebars': 'handlebars',
	sublime_metrics: 'json',
	sublime_session: 'json',
	'sublime-keymap': 'json',
	'sublime-mousemap': 'json',
	'sublime-project': 'json',
	'sublime-settings': 'json',
	'sublime-workspace': 'json',
	js: 'javascript',
	mk: 'makefile',
	mak: 'makefile',
	md: 'markdown',
	mkdown: 'markdown',
	mkd: 'markdown',
	nginxconf: 'nginx',
	m: 'objectivec',
	mm: 'objectivec',
	ml: 'ocaml',
	rs: 'rust',
	sci: 'scilab',
	txt: 'plaintext',
	vb: 'vbnet',
	vbs: 'vbscript',
}

export default extensionHighlight
export {
	extensionHighlight,
}
