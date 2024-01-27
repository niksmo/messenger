import sinon from 'sinon';
import { AppRouter } from './router.ts';
import { expect, use } from 'chai';
import chaiSinon from 'sinon-chai';

use(chaiSinon);

describe('Router', () => {
  const mockHistoryDirections = (): void => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  globalThis.window.history.back = mockHistoryDirections;

  globalThis.window.history.forward = mockHistoryDirections;

  const router = new AppRouter();

  const fakeGetContent = sinon.fake.returns(document.createElement('div'));
  const fakeDispatchDidMount = sinon.fake();
  const fakeDispatchWillUnmount = sinon.fake();

  class FakeBlock {
    getContent = fakeGetContent;
    dispatchDidMount = fakeDispatchDidMount;
    dispatchWillUnmount = fakeDispatchWillUnmount;
  }

  const nextFakeDispatchDidMount = sinon.fake();

  class NextFakeBlock {
    getContent = (): HTMLElement => document.createElement('div');
    dispatchDidMount = nextFakeDispatchDidMount;
    dispatchWillUnmount = (): void => {};
  }

  const noMatchFakeGetContent = sinon.fake.returns(
    document.createElement('div')
  );

  class NoMatchFakeBlock {
    getContent = noMatchFakeGetContent;
    dispatchDidMount = (): void => {};
    dispatchWillUnmount = (): void => {};
  }

  beforeEach(() => {
    router.root(document.createElement('main'));
    router.use('/', FakeBlock);
    router.use('/next', NextFakeBlock);
    router.use('/not-found', NoMatchFakeBlock);
    router.noMatch('/not-found');
    router.start();
  });

  afterEach(() => {
    globalThis.window.history.replaceState({}, '', '/');
    router.reset();
    fakeGetContent.resetHistory();
    fakeDispatchDidMount.resetHistory();
    fakeDispatchWillUnmount.resetHistory();
    nextFakeDispatchDidMount.resetHistory();
    noMatchFakeGetContent.resetHistory();
  });

  it('should render page on start', () => {
    expect(fakeGetContent.callCount).to.equal(1);
  });

  it('should dispatch did mount on render', () => {
    expect(fakeDispatchDidMount.callCount).to.equal(1);
  });

  it('should dispatch will unmount for current view on go', () => {
    router.go('/next');
    expect(fakeDispatchWillUnmount.callCount).to.equal(1);
  });

  it('should render on "back"', () => {
    router.go('/next');
    router.back();
    expect(nextFakeDispatchDidMount.callCount).to.equal(2);
  });

  it('should render on "forward"', () => {
    router.go('/next');
    router.back();
    router.forward();
    expect(nextFakeDispatchDidMount.callCount).to.equal(3);
  });

  it('should go and replace history state', () => {
    const { length: prevLength } = globalThis.window.history;
    router.go('/next', true);
    expect(globalThis.window.history.length).to.equal(prevLength);
  });

  it('should render not found page', () => {
    router.go('/not-exist-path');

    expect(noMatchFakeGetContent.callCount).to.equal(1);
  });
});
