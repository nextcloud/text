import container from 'markdown-it-container'

export const typesAvailable = ['info', 'warn', 'error', 'success']

const buildRender = type => (tokens, idx, options, env, slf) => {
	// add a class to the opening tag
	const tag = tokens[idx]

	if (tag.nesting === 1) {
		tag.attrSet('data-container', type)
		tag.attrJoin('class', `custom-container custom-container-${type}`)
	}

	return slf.renderToken(tokens, idx, options, env, slf)
}

export default (md) => {
	typesAvailable.forEach(type => {
		md.use(container, type, {
			render: buildRender(type),
		})
	})

	return md
}
