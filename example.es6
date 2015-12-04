/* eslint-disable no-console */
import React, { Component } from 'react';
import ToggleDisplay from '.';
import Icon from '@economist/component-icon';

function onOpen() {
  console.log('toggle display open');
}

function onClose() {
  console.log('toggle display closed');
}

class Sharebar extends Component {
  render() {
    return (
      <div className="sharebar">
        <div className="sharebar__icons">
          <div className="sharebar__icon">
            <Icon size="49px" icon="facebook" />
          </div>
          <div className="sharebar__icon">
            <Icon size="49px" icon="twitter" />
          </div>
          <div className="sharebar__icon">
            <Icon size="49px" icon="googleplus" />
          </div>
        </div>
      </div>
    );
  }
}

export default (
  <ToggleDisplay
    openItem={<Icon size="49px" icon="share" />}
    closeItem={<Icon size="49px" icon="close" />}
    onClose={onClose}
    onOpen={onOpen}
  >
    <Sharebar />
  </ToggleDisplay>
);
