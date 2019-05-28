/**
 * A Service to handle network change
*/
const DEFAULT_CONFIG = {
  // 心跳模式，如果为数字，强制多少毫秒进行监测
  heartMode: 'auto',

  // 低网速模式回调
  lowSpeedNetwork() {},

  // 网络恢复重连后回调
  reconnect() {},

  // 断网回调
  offline() {}

};
const pingUrl = 'https://ipv4.icanhazip.com';
const MIN_HEART_TIME = 5000;
const MAX_HEART_TIME = 30000;
const STEP_TIME = 1000;
const MIN_NETWORK_SPEED = 43700;
const MAX_LOWNETWORK_CHECK_NUM = 3;
const STATUS = {
  UNKNOWN: 'unknown',
  ONLINE: 'online',
  LOW_NETWORK: 'low_network',
  OFFLINE: 'offline'
};

class NetworkHeartService {
  static isOnline() {
    let status = true;

    if (typeof navigator.onLine == 'undefined') {
      status = navigator.onLine;
      return Promise.resolve(status);
    } else {
      const _fetch = fetch(pingUrl);

      return Promise.all([_fetch, _fetch]).then(() => {
        return Promise.resolve(true);
      }).catch(err => {
        if (err.message.indexOf('Failed to fetch') !== -1) {
          return Promise.resolve(false);
        }
      });
    }
  }

  constructor(config) {
    this.config = Object.assign(DEFAULT_CONFIG, config);
    this.status = STATUS.UNKNOWN;
    this._heartTime = MIN_HEART_TIME;
    this.lowNetworkCheck = 0;
  }

  start() {
    if (this.config.heartMode === 'auto') {
      this._check();

      this._heartTime = Math.min(this._heartTime + STEP_TIME, MAX_HEART_TIME);
    } else if (typeof this.config.heartMode === 'number') {
      this._heartTime = Math.min(MIN_HEART_TIME, this.config.heartMode);

      this._check();
    }
  }

  _check() {
    this._timeoutID = setTimeout(() => {
      this._ping();

      this.start();
    }, this._heartTime);
  }

  stop() {
    clearTimeout(this._timeoutID);
    this._heartTime = MIN_HEART_TIME;
  }

  setOffline() {
    this.status = STATUS.OFFLINE;
    this.config.offline();
  }

  setOnline() {
    this.status = STATUS.ONLINE;
    this.stop();
    this.config.reconnect();
  }

  setLowNetwork() {
    this.status = STATUS.LOW_NETWORK;
    this._heartTime = MIN_HEART_TIME;
    this.config.lowSpeedNetwork();
    this.lowNetworkCheck++;

    if (this.lowNetworkCheck > MAX_LOWNETWORK_CHECK_NUM) {
      this.setOnline();
      this.lowNetworkCheck = 0;
    }
  }

  _setStatus(status) {
    this.status = status;
  }

  _getBandWidth(size, t) {
    return size / t;
  }

  _setNetworkType(bw) {
    let networkStatus = 'online';

    try {
      networkStatus = navigator.connection.effectiveType;
    } catch (e) {
      console.error(e);
    }

    if (networkStatus === '2g' || networkStatus === '3g') {
      return this.setLowNetwork();
    } else if (networkStatus === '4g' || networkStatus === '5g') {
      return this.setOnline();
    }

    if (bw < MIN_NETWORK_SPEED) {
      return this.setLowNetwork();
    }

    this.setOnline();
  }

  _ping() {
    const size = 400;

    const _t1 = Date.now();

    fetch(`${pingUrl}?_t=` + parseInt(Math.random() * 10000)).then(result => {
      // console.log(result);
      const _t2 = Date.now();

      if (result.status == 200) {
        const bw = this._getBandWidth(size, (_t2 - _t1) / 1000);

        this._setNetworkType(bw);
      }
    }).catch(err => {
      // console.log(err);
      if (err.message.indexOf('Failed to fetch') !== -1 && this.status !== STATUS.OFFLINE) {
        this.setOffline();
      }
    });
  }

}

export default NetworkHeartService;