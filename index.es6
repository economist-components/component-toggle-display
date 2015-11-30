import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';

class ToggleDisplay extends Component {
  constructor() {
    super(...arguments);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.state = {
      active: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.active !== this.state.active;
  }

  open(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    this.setState({ active: true }, () => {
      if (this.props.onOpen) {
        this.props.onOpen();
      }
    });
  }

  close(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    this.setState({ active: false }, () => {
      if (this.props.onClose) {
        this.props.onClose();
      }
    });
  }

  handleClickOutside() {
    this.close();
  }

  handleContent() {
    const { children } = this.props;
    if (this.state.active) {
      return children;
    }

    return null;
  }

  handleButton() {
    const { openItem, closeItem } = this.props;
    if (this.state.active) {
      return closeItem;
    }
    return openItem;
  }

  render() {
    const clickFunction = (this.state.active) ? this.close : this.open;
    const display = (this.state.active) ? 'open' : 'close';
    return (
      <div className="toggle-display" data-display={display}>
        <button className="toggle-display__button" onClick={clickFunction} aria-label="Expand sharing links button">
          {this.handleButton()}
        </button>
        <div className="toggle-display__content" aria-expanded={this.state.active}>
          {this.handleContent()}
        </div>
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  ToggleDisplay.propTypes = {
    children: React.PropTypes.node.isRequired,
    openItem: React.PropTypes.element.isRequired,
    closeItem: React.PropTypes.element.isRequired,
    onOpen: React.PropTypes.func,
    onClose: React.PropTypes.func,
  };
}
export const TestableToggleDisplay = ToggleDisplay;
export default enhanceWithClickOutside(ToggleDisplay);
