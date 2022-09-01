// This file is loaded before all e2e tests

import './commands.js'
import chaiExtension from './chai.js'

before(() => {
	chai.use(chaiExtension)
})
