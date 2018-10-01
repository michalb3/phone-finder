import React, { Component, Fragment } from 'react';
import Slider from '../slider';

class Sliders extends Component {
  getSliders() {
    const { init } = this.props;
    const slidersList = [];

    for (let sliderName in init) {
      if (init.hasOwnProperty(sliderName)) {
        slidersList.push(
          <Slider
            key={ sliderName }
            className={ this.props.className }
            sliderName={ sliderName }
            init={ init[sliderName] }
          />
        );
      }
    }

    return slidersList;
  }

  render() {
    return (
      <Fragment>
        { this.getSliders() }
      </Fragment>
    );
  }
}

export default Sliders;
