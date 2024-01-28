import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import HttpTransport from './http.ts';
import sinon, { type SinonStub } from 'sinon';

use(sinonChai);

describe('HttpTransport', () => {
  let http: HttpTransport;
  let stub: SinonStub<any>;

  describe('Base setters', () => {
    const spy = sinon.spy();

    beforeEach(() => {
      http = new HttpTransport();
    });

    afterEach(() => {
      spy.resetHistory();
    });

    it('should set base URL', () => {
      spy(http);

      http.setBaseURL('https://base-url');

      sinon.assert.calledWith(
        spy,
        sinon.match({ _baseURL: 'https://base-url/' })
      );
    });

    it('should set base header', () => {
      spy(http);

      http.setHeader({ 'Content-type': 'application/json' });

      sinon.assert.calledWith(
        spy,
        sinon.match({ _header: { 'Content-type': 'application/json' } })
      );
    });

    it('should set custom base timeout', () => {
      spy(http);

      http.setTimeout(5000);

      sinon.assert.calledWith(spy, sinon.match({ _timeout: 5000 }));
    });
  });

  describe('Request arguments', () => {
    beforeEach(() => {
      http = new HttpTransport();
      stub = sinon
        .stub(http, '_request' as keyof HttpTransport)
        .callsFake(async () => {
          return await (Promise.resolve() as unknown as Promise<XMLHttpRequest>);
        });
    });

    afterEach(() => {
      stub.restore();
    });

    it('should GET', () => {
      void http.get('/');
      expect(stub).to.have.been.calledWith('GET', '/', '');
    });

    it('should GET with serialized body', () => {
      void http.get('/', { name: 'john', value: '1234=56' });
      expect(stub).to.have.been.calledWith(
        'GET',
        '/',
        '?name=john&value=1234%3D56'
      );
    });

    it('should POST', () => {
      void http.post('/', 'body');
      expect(stub).to.have.been.calledWith('POST', '/', 'body');
    });

    it('should PUT', () => {
      void http.put('/', 'body');
      expect(stub).to.have.been.calledWith('PUT', '/', 'body');
    });

    it('should DELETE', () => {
      void http.delete('/', 'body');
      expect(stub).to.have.been.calledWith('DELETE', '/', 'body');
    });
  });
});
