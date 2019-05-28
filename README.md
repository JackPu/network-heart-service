# Network heart service

[![CircleCI](https://circleci.com/gh/JackPu/daycaca.svg?style=shield)](https://circleci.com/gh/JackPu/daycaca)
[![npm](https://img.shields.io/npm/v/network-heart-service.svg?maxAge=2592000)]()


A Service to check and handle network change.


## How to use

### Npm

``` bash
$  npm install network-heart-service -save
```


``` es6
// es6
import NetworkHeartService from 'network-heart-service';
this.networkHeartService = new NetworkHeartService({
  heartMode: 'auto',
  reconnect() {
    console.log('TODO ...')
  }
});
this.networkHeartService.start();
```

### config

+ `heartMode` { number } 2000
  if it is undefined , it means use `auto` mode. It will check the network in an incerasing timeout.
  But is is set with a number, it will check the network in speciy time.

+ `lowSpeedNetwork` { function }

  A function will be fire when your network could work but in low network bandwidth

+ `reconnect` { function }

  A function will be fire when your network could work.

+ `offline` { function }

  A function will be fire when your network go to offline

### API

#### `isOnline`

Check if your network could work.

``` js
const isOnline = await NetworkHeartService.isOnline();
```

### `start()` and `stop()`

Start or Stop the network check service.

``` js
this.networkHeartService = new NetworkHeartService({
  heartMode: 'auto',
  reconnect() {
    console.log('TODO ...')
  }
});
this.networkHeartService.start();

// this.networkHeartService.stop();
```


## Contributions

Your contributions and suggestions are welcome 😄😄🌺🌺🎆🎆

## MIT License

