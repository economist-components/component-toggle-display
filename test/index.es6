import React from 'react';
import { openItem, closeItem, toggleItem } from './stubs';
import { TestableToggleDisplay } from '..';
import chai from 'chai';
import chaiSpies from 'chai-spies';
chai.use(chaiSpies).should();

describe('ToggleDisplay', () => {
  let toggleDisplay = null;
  beforeEach(() => {
    toggleDisplay = new TestableToggleDisplay({
      openItem: <openItem />,
      closeItem: <closeItem />,
      children: toggleItem,
    });
  });

  afterEach(() => {
    toggleDisplay = null;
  });

  it('is compatible with React.Component', () => {
    TestableToggleDisplay
      .should.be.a('function')
      .and.respondTo('render');
  });

  it('renders a React element', () => {
    React.isValidElement(
      <TestableToggleDisplay
        openItem={<openItem />}
        closeItem={<closeItem />}
      >
        <toggleItem />
      </TestableToggleDisplay>
    ).should.equal(true);
  });

  describe('handleContent', () => {
    it('returns children if state.active === true', () => {
      toggleDisplay.state = {
        active: true,
      };

      const result = toggleDisplay.handleContent();
      result.should.deep.equal(toggleItem);
    });

    it('returns null if state.active === false', () => {
      toggleDisplay.state = {
        active: false,
      };

      const result = toggleDisplay.handleContent();
      (result === null).should.equal(true);
    });
  });

  describe('handleButton', () => {
    it('returns closeItem if state.active === true', () => {
      toggleDisplay.state = {
        active: true,
      };

      const result = toggleDisplay.handleButton();
      result.should.deep.equal(
        <closeItem />
      );
    });

    it('returns openItem if state.active === false', () => {
      toggleDisplay.state = {
        active: false,
      };

      const result = toggleDisplay.handleButton();
      result.should.deep.equal(
        <openItem />
      );
    });
  });

  describe('Events', () => {
    beforeEach(() => {
      toggleDisplay.setState = chai.spy();
      toggleDisplay.props.onOpen = chai.spy();
      toggleDisplay.props.onClose = chai.spy();
    });

    describe('Open', () => {
      it('calls setState with active: true', () => {
        toggleDisplay.open();
        toggleDisplay.setState
          .should.have.been.called(1)
          .with({ active: true });
      });
    });

    describe('Close', () => {
      it('calls setState with active: false', () => {
        toggleDisplay.close();
        toggleDisplay.setState
          .should.have.been.called(1)
          .with({ active: false });
      });
    });
  });

  describe('Initial state', () => {
    it('renders closed by default', () => {
      toggleDisplay.state = {
        active: false,
      };
      toggleDisplay.render().should.deep.equal(
        <div className="toggle-display">
          <a href="/" className="toggle-display__link" onClick={toggleDisplay.open}>
            {<openItem />}
          </a>
          <div className="toggle-display__content">{null}</div>
        </div>
      );
    });

    it('renders open when state is active', () => {
      toggleDisplay.state = {
        active: true,
      };
      toggleDisplay.render().should.deep.equal(
        <div className="toggle-display">
          <a href="/" className="toggle-display__link" onClick={toggleDisplay.close}>
            {<closeItem />}
          </a>
          <div className="toggle-display__content">
            {toggleItem}
          </div>
        </div>
      );
    });
  });
});
