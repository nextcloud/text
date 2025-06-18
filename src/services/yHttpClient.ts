import type { YHttpClient } from '@nextcloud/y-http'
import { close, openConnection, push, type Connection } from './ApiAdapter.js'


export interface Props {
	fileId?: number
	filePath: string
	token?: string
}

export const yHttpClient: (props: Props) => YHttpClient<Connection>
	= (props: Props) => ({
	open: async (prev?: Connection) => openConnection({
		...props,
		baseVersionEtag: prev?.baseVersionEtag,
	}),
	sync: push,
	close,
})
