import markdownit from '../../markdownit'

describe('image figures extension', () => {

	it('renders images as figures', () => {
		expect(markdownit.render('[![moon](moon.jpg)](/uri)\n'))
		.toBe('<figure><a href=\"/uri\"><img src=\"moon.jpg\" alt=\"moon\" /></a></figure>\n')
	})

})
