import { generateUrl } from '@nextcloud/router'
import { Plugin } from 'prosemirror-state'
import markdownit from './../markdownit/index.js'

const clickHandler = ({ editor }) => {
	return new Plugin({
		props: {
			handleClick: (view, pos, event) => {
				const linkElement = event.target.parentElement instanceof HTMLAnchorElement
					? event.target.parentElement
					: event.target

				const isLink = linkElement && linkElement instanceof HTMLAnchorElement

				const htmlHref = linkElement?.href

				// is handleable link
				if (htmlHref && isLink) {
					event.stopPropagation()

					if (event.button === 0 && !event.ctrlKey && htmlHref.startsWith(window.location.origin)) {
						const query = OC.parseQueryString(htmlHref)
						const fragment = OC.parseQueryString(htmlHref.split('#').pop())
						if (query.dir && fragment.relPath) {
							const filename = fragment.relPath.split('/').pop()
							const path = `${query.dir}/${filename}`
							document.title = `${filename} - ${OC.theme.title}`
							if (window.location.pathname.match(/apps\/files\/$/)) {
								// The files app still lacks a popState handler
								// to allow for using the back button
								// OC.Util.History.pushState('', htmlHref)
							}
							OCA.Viewer.open({ path })
							return
						}
						if (query.fileId) {
							// open the direct file link
							window.open(generateUrl(`/f/${query.fileId}`))
							return
						}
					}

					if (!markdownit.validateLink(htmlHref)) {
						console.error('Invalid link', htmlHref)
						return
					}

					window.open(htmlHref)
				}
			},
		},
	})
}

export { clickHandler }
