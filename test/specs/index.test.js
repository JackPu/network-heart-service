/*eslint-disable*/
import { default as chai, expect } from 'chai';
import spies from 'chai-spies';
import "@babel/polyfill";
import NetworkHeartService from '../../src/index';

chai.use(spies);

describe('NetworkHeartService tests', () => {

    let networkService;
    const spy = chai.spy();
    const foo = {
      reconnect: spy,
    };
    beforeEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      networkService = new NetworkHeartService(foo);
    })

    it('#isOnline()', async() => {
        const isonline = await NetworkHeartService.isOnline();
        expect(isonline).to.equal(true);
    });

    it('#_check()', (done) => {
      networkService.start();
      setTimeout(() => {
        expect(spy).to.have.been.called();
        done();
      }, 8000)
    });

});

