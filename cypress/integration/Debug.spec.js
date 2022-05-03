import testData from '../fixtures/ListItem.md'

describe('Debug minimal test file', () => {

	it('can assert things', () => {
		expect(testData).to.include('\n')
	})

})
