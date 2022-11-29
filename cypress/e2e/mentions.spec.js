import { User } from '@nextcloud/cypress'
import { initUserAndFiles, randHash } from '../utils/index.js'
import 'cypress-file-upload'

const randUser = new User(randHash(), 'password')
const randUser1 = new User(randHash(), 'password')
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
		cy.createUser(randUser1)
	})

	beforeEach(() => {
		cy.login(currentUser)
		cy.visit('/apps/files')
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
			.type(`@${randUser1.userId.substring(0, 3)}`)

		return cy.wait(`@${requestAlias}`)
			.then(() => {
				cy.get('.tippy-box .items').children().should(($children) => {
					const users = $children.map((i, el) => el.innerText).get()
					expect(users.length).to.be.greaterThan(0)
					expect(randUser1.userId).to.be.oneOf(users)
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
			.type(`@${randUser1.userId.substring(0, 3)}`)

		return cy.wait(`@${autocompleteReauestAlias}`)
			.then(() => {
				cy.get('.tippy-box .items').contains(randUser1.userId).click()
				cy.get('span.mention').contains(randUser1.userId).should('be.visible')
			})
	})

	it('Open a document with an existing mention and properly see the user bubble rendered', () => {
		const mentionFilename = 'mention.md'
		createFileWithMention(mentionFilename, randUser1.userId)
		cy.openFile(mentionFilename, { force: true })
		cy.get('.text-editor__content div[contenteditable="true"] span.mention')
			.contains(randUser1.userId)
			.should('be.visible')
	})
})
