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

const xssFuzzVectors = '>"><script>alert("XSS")</script>&\n' +
	'"><STYLE>@import"javascript:alert(\'XSS\')";</STYLE>\n' +
	'>"\'><img%20src%3D%26%23x6a;%26%23x61;%26%23x76;%26%23x61;%26%23x73;%26%23x63;%26%23x72;%26%23x69;%26%23x70;%26%23x74;%26%23x3a;\n' +
	' alert(%26quot;%26%23x20;XSS%26%23x20;Test%26%23x20;Successful%26quot;)>\n' +
	'\n' +
	'>%22%27><img%20src%3d%22javascript:alert(%27%20XSS%27)%22>\n' +
	'\'%uff1cscript%uff1ealert(\'XSS\')%uff1c/script%uff1e\'\n' +
	'">\n' +
	'>"\n' +
	'\'\';!--"<XSS>=&{()}\n' +
	'<IMG SRC="javascript:alert(\'XSS\');">\n' +
	'<IMG SRC=javascript:alert(\'XSS\')>\n' +
	'<IMG SRC=JaVaScRiPt:alert(\'XSS\')> \n' +
	'<IMG SRC=JaVaScRiPt:alert(&quot;XSS<WBR>&quot;)>\n' +
	'<IMGSRC=&#106;&#97;&#118;&#97;&<WBR>#115;&#99;&#114;&#105;&#112;&<WBR>#116;&#58;&#97;\n' +
	' &#108;&#101;&<WBR>#114;&#116;&#40;&#39;&#88;&#83<WBR>;&#83;&#39;&#41>\n' +
	'<IMGSRC=&#0000106&#0000097&<WBR>#0000118&#0000097&#0000115&<WBR>#0000099&#0000114&#0000105&<WBR>#0000112&#0000116&#0000058\n' +
	' &<WBR>#0000097&#0000108&#0000101&<WBR>#0000114&#0000116&#0000040&<WBR>#0000039&#0000088&#0000083&<WBR>#0000083&#0000039&#0000041>\n' +
	'           \n' +
	'<IMGSRC=&#x6A&#x61&#x76&#x61&#x73&<WBR>#x63&#x72&#x69&#x70&#x74&#x3A&<WBR>#x61&#x6C&#x65&#x72&#x74&#x28\n' +
	' &<WBR>#x27&#x58&#x53&#x53&#x27&#x29>\n' +
	'\n' +
	'<IMG SRC="jav&#x09;ascript:alert(<WBR>\'XSS\');">\n' +
	'<IMG SRC="jav&#x0A;ascript:alert(<WBR>\'XSS\');">\n' +
	'<IMG SRC="jav&#x0D;ascript:alert(<WBR>\'XSS\');">';

export default xssFuzzVectors
