import { initUserAndFiles, randHash } from '../utils/index.js'
import 'cypress-file-upload'

const randUser = randHash()
const randUser1 = randHash()
const currentUser = randUser

const fileName = 'empty.md'

const refresh = () => {
	cy.get('.files-controls .crumb:not(.hidden) a')
		.last()
		.click({ force: true })
}

const createFileWithMention = (target, userToMention) => {
	const content = `Hello @[${userToMention}](mention://user/${userToMention})`
	cy.createFile(target, content)
		.then(refresh)
}

describe('Test mentioning users', () => {
	before(() => {
		initUserAndFiles(randUser, 'test.md')
		cy.nextcloudCreateUser(randUser1, 'password')
	})

	beforeEach(() => {
		cy.login(currentUser, 'password')
	})

	it('Type @ and see the user list', () => {
		const requestAlias = 'fetchUsersList'
		cy.intercept({ method: 'POST', url: '**/users' }).as(requestAlias)

		cy.isolateTest({
			sourceFile: fileName,
			onBeforeLoad(win) {
				cy.stub(win, 'open')
					.as('winOpen')
			},
		})

		cy.openFile(fileName, { force: true })

		cy.getContent()
			.type(`@${randUser1.substring(0, 3)}`)

		return cy.wait(`@${requestAlias}`)
			.then(() => {
				cy.get('.tippy-box .items').children().should(($children) => {
					const users = $children.map((i, el) => el.innerText).get()
					expect(users.length).to.be.greaterThan(0)
					expect(randUser1).to.be.oneOf(users)
				})
			})
	})

	it('Select a user will insert the mention', () => {
		const autocompleteReauestAlias = 'fetchUsersList'
		cy.intercept({ method: 'POST', url: '**/users' }).as(autocompleteReauestAlias)

		cy.isolateTest({
			sourceFile: fileName,
			onBeforeLoad(win) {
				cy.stub(win, 'open')
					.as('winOpen')
			},
		})

		cy.openFile(fileName, { force: true })

		cy.get('.text-editor__content div[contenteditable="true"]')
			.clear()
			.type(`@${randUser1.substring(0, 3)}`)

		return cy.wait(`@${autocompleteReauestAlias}`)
			.then(() => {
				cy.get('.tippy-box .items').contains(randUser1).click()
				cy.get('span.mention').contains(randUser1).should('be.visible')
			})
	})

	it(' Open a document with an existing mention and properly see the user bubble rendered', () => {
		const mentionFilename = 'mention.md'
		createFileWithMention(mentionFilename, randUser1)
		cy.openFile(mentionFilename)
		cy.get('.text-editor__content div[contenteditable="true"] span.mention')
			.contains(randUser1)
			.should('be.visible')
	})
})
