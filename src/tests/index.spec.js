global.OC = {
  requestToken: 'abc'
};
jest.mock('nextcloud-axios');

import { mount } from '@vue/test-utils'
import SyncService from './../services/SyncService'

/*describe('Editor', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Editor, {
      props: {
        content: "test"
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})*/


describe('SyncService', () => {
  test('test', () => {
    const backendMock = jest.mock('./../services/PollingBackend')
    const syncService = new SyncService
    syncService.
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
