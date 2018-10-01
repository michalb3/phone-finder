import React, { Component } from 'react';
import { LanguagesContext } from '../../contexts';

class ResultInfo extends Component {
  constructor(props) {
    super(props);

    this.className = 'result-info';
  }

  getResultInfo() {
    const { lang } = this.props;

    if (lang &&
        lang.getResult instanceof Function
    ) {
      if (0 === this.props.sampleSize) {
        return lang.getResult(0)
      } else {
        return lang.getResult(this.props.fullSize);
      }
    }

    return '';
  }

  render() {
    const { className } = this.props;
    const classList = this.className.split();
    className && classList.push(className);

    return (
      <p className={ classList.join(' ') }>
        { this.getResultInfo() }
      </p>
    );
  }
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <ResultInfo
        { ...props }
        lang={ lang && lang.resultInfo }
      />
    }
  </LanguagesContext.Consumer>
);
