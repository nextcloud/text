export interface Document {
	id: number
	lastSavedVersion: number
	lastSavedVersionTime: number
	baseVersionEtag: string
	initialVersion: number
}
