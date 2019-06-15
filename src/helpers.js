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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Callback that should be executed after the document is ready
 * @param callback
 */
import axios from 'axios'
import { generateRemoteUrl } from 'nextcloud-server/dist/router'

const documentReady = function(callback) {
	const fn = () => setTimeout(callback, 0)
	if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
		fn()
	} else {
		document.addEventListener('DOMContentLoaded', fn)
	}
}

const _baseUrl = OC.generateUrl('/apps/text')
const endpointUrl = (endpoint, isPublic = false) => {
	if (isPublic) {
		return `${_baseUrl}/public/${endpoint}`
	}
	return `${_baseUrl}/${endpoint}`
}

const randomGuestNames = ['Artichoke', 'Arugula', 'Asparagus', 'Avocado', 'Bamboo Shoot', 'Bean Sprout', 'Bean', 'Beet', 'Belgian Endive', 'Bell Pepper', 'Bitter Melon', 'Bitter Gourd', 'Bok Choy', 'Broccoli', 'Brussels Sprout', 'Burdock Root', 'Cabbage', 'Calabash', 'Caper', 'Carrot', 'Cassava', 'Cauliflower', 'Celery', 'Celery Root', 'Celtuce', 'Chayote', 'Chinese Broccoli', 'Corn', 'Baby Corn', 'Cucumber', 'English Cucumber', 'Gherkin', 'Pickling Cucumber', 'Daikon Radish', 'Edamame', 'Eggplant', 'Elephant Garlic', 'Endive', 'Curly', 'Escarole', 'Fennel', 'Fiddlehead', 'Galangal', 'Garlic', 'Ginger', 'Grape Leave', 'Green Bean', 'Wax Bean', 'Green', 'Amaranth Leave', 'Beet Green', 'Collard Green', 'Dandelion Green', 'Kale', 'Kohlrabi Green', 'Mustard Green', 'Rapini', 'Spinach', 'Swiss Chard', 'Turnip Green', 'Hearts of Palm', 'Horseradish', 'Jerusalem Artichoke', 'Jícama', 'Kale', 'Curly', 'Lacinato', 'Ornamental', 'Kohlrabi', 'Leeks', 'Lemongrass', 'Lettuce', 'Butterhead', 'Iceberg', 'Leaf', 'Romaine', 'Lotus Root', 'Lotus Seed', 'Mushroom', 'Napa Cabbage', 'Nopales', 'Okra', 'Olive', 'Onion', 'Green Onion', 'Parsley', 'Parsley Root', 'Parsnip', 'Pepper', 'Plantain', 'Potato', 'Pumpkin', 'Purslane', 'Radicchio', 'Radish', 'Rutabaga', 'Shallots', 'Spinach', 'Squash', 'Sweet Potato', 'Swiss Chard', 'Taro', 'Tomatillo', 'Tomato', 'Turnip', 'Water Chestnut', 'Water Spinach', 'Watercress', 'Winter Melon', 'Yams', 'Zucchini']
const getRandomGuestName = () => {
	return randomGuestNames[Math.floor(Math.random() * randomGuestNames.length)]
}

const fetchFileInfo = async function(user, path) {
	const response = await axios({
		method: 'PROPFIND',
		url: generateRemoteUrl(`dav/files/${user}${path}`),
		headers: {
			requesttoken: OC.requestToken,
			'content-Type': 'text/xml'
		},
		data: `<?xml version="1.0"?>
<d:propfind  xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns" xmlns:nc="http://nextcloud.org/ns" xmlns:ocs="http://open-collaboration-services.org/ns">
  <d:prop>
    <d:getlastmodified />
    <d:getetag />
    <d:getcontenttype />
    <d:resourcetype />
    <oc:fileid />
    <oc:permissions />
    <oc:size />
    <d:getcontentlength />
    <nc:has-preview />
    <nc:mount-type />
    <nc:is-encrypted />
    <ocs:share-permissions />
    <oc:tags />
    <oc:favorite />
    <oc:comments-unread />
    <oc:owner-id />
    <oc:owner-display-name />
    <oc:share-types />
  </d:prop>
</d:propfind>`
	})

	const files = OCA.Files.App.fileList.filesClient._client.parseMultiStatus(response.data)
	return files.map(file => {
		const fileInfo = OCA.Files.App.fileList.filesClient._parseFileInfo(file)
		fileInfo.href = file.href
		return fileInfo
	})
}

export {
	documentReady,
	endpointUrl,
	getRandomGuestName,
	fetchFileInfo
}
