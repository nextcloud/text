# Sync Service work flow

## Establishign an initial connection

`Editor.vue#mounted` -> `initSession`
Event: `update:loaded`

`initSession` -> 
  `$syncService = new SyncService`
  `syncServiceProvider = createSyncServiceProvider($ydoc, $syncService)
  `this.$providers.push(syncServiceProvider)`





## Reconnect from Editor.vue

If the network is down for a while -> Reconnect button
Click the reconnect button...
- clears local session
- calls `initSession` again.

* What happens with the last provider?
* How does the transition to the new provider work?
* Are all listeners cleared etc?


## Issues

### Reconnecting with blocked screen

* click reconnect without network
* loading screen
* network comes back before loaded
* loading screen stays.


### Lot's of close requests when network is down

* y-websocket.js calls close repeatedly.
* ws polyfill happily keeps sending the close requests


### Ongoing push requests when network is down

* reconnect button already showing but still pushing pushing pushing...






