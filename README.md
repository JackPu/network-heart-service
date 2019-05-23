# Network heart service

[![CircleCI](https://circleci.com/gh/JackPu/daycaca.svg?style=shield)](https://circleci.com/gh/JackPu/daycaca)
[![npm](https://img.shields.io/npm/v/daycaca.svg?maxAge=2592000)]()


A Service to handle network change.


## How to use

### Npm

``` bash
$  npm install network-heart-service -save
```


``` es6
// es6
import NetworkHeartService from 'daycaca';
// src specify an image src (url or base64)
this.nhs = new NetworkHeartService({
  heartMode: 'auto',
  reconnect() {
    console.log('TODO ...')
  }
})
this.nhs.start()
```


## Contributions

Your contributions and suggestions are welcome 😄😄🌺🌺🎆🎆

## MIT License




