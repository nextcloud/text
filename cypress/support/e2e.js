// This file is loaded before all e2e tests

import './commands.js'
import './sessions.js'
import chaiExtension from './chai.js'

before(() => {
	chai.use(chaiExtension)
})
