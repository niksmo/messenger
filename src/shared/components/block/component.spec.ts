import sinon from 'sinon';
import { expect, use } from 'chai';
import chaiSinon from 'sinon-chai';
import { Block } from './block.ts';
import componentTemplateSpec from './component.template.hbs';
import childTemplateSpec from './child.template.hbs';

use(chaiSinon);

describe('Component', () => {
  const ELEMENT_ID = {
    COMPONENT: '#component-container',
    COUNTER: '#counter',
    COMPONENT_CHILD: '#component__child',
    CHILD: '#child-container',
  };

  const sandbox = sinon.createSandbox();

  const componentOnDidMount = sandbox.fake();
  const componentOnDidUpdate = sandbox.fake();
  const componentOnWillUnmount = sandbox.fake();

  const childOnDidMount = sandbox.fake();
  const childOnDidUpdate = sandbox.fake();
  const childOnWillUnmount = sandbox.fake();

  class Component extends Block {
    protected getTemplateHook(): TemplateSpecification {
      return componentTemplateSpec;
    }

    public didMount = (): void => componentOnDidMount();
    public didUpdate = (): void => componentOnDidUpdate();
    public willUnmount = (): void => componentOnWillUnmount();
  }

  class Child extends Block {
    protected getTemplateHook(): TemplateSpecification {
      return childTemplateSpec;
    }

    public didMount = (): void => childOnDidMount();
    public didUpdate = (): void => childOnDidUpdate();
    public willUnmount = (): void => childOnWillUnmount();
  }

  const fakeHandleOnClick = sinon.fake();

  let component: Block;
  let child: Block;

  beforeEach(() => {
    child = new Child();
    component = new Component({ count: 0, child, onClick: fakeHandleOnClick });
  });

  afterEach(() => {
    sandbox.resetHistory();
  });

  it('should return component content with child', () => {
    const content = component.getContent();
    const { length: elements } = Object.values(ELEMENT_ID)
      .map((id) => content.querySelector(id))
      .filter((elementOrNull) => elementOrNull !== null);

    expect(elements).to.equal(3);
  });

  it('should handle "on click" event', () => {
    component.getContent().click();
    expect(fakeHandleOnClick.callCount).to.equal(1);
  });

  it('should set new props', () => {
    component.setProps({ count: 1 });
    const renderedCount = component
      .getContent()
      .querySelector(ELEMENT_ID.COUNTER)?.textContent;

    expect(renderedCount).to.equal('1');
  });

  it('should handle "did mount" hook in component on dispatch did mount', () => {
    component.dispatchDidMount();
    expect(componentOnDidMount.callCount).to.equal(1);
  });

  it('should handle "did mount" hook in child when parent component dispatch did mount', () => {
    component.dispatchDidMount();
    expect(childOnDidMount.callCount).to.equal(1);
  });

  it('should handle "did update" hook in component on props updated', () => {
    component.setProps({ count: 2 });
    expect(componentOnDidUpdate.callCount).to.equal(1);
  });

  it('should handle "did update" hook in child when parent component update self props', () => {
    component.setProps({ count: 2 });
    expect(childOnDidUpdate.callCount).to.equal(1);
  });

  it('should handle "will unmount" hook in component on dispatch will unmount', () => {
    component.dispatchWillUnmount();
    expect(componentOnWillUnmount.callCount).to.equal(1);
  });

  it('should handle "will unmount" hook in child when parent component dispatch will unmount', () => {
    component.dispatchWillUnmount();
    expect(childOnWillUnmount.callCount).to.equal(1);
  });
});
