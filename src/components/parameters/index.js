import React, { Component } from 'react';
import { LanguagesContext } from '../../contexts';

class Parameters extends Component {
  constructor(props) {
    super(props);

    this.className = 'parameters';
  }

  getParameters() {
    const { parameters, lang } = this.props;
    const parameterList = [];

    for (let parameterName in parameters) {
      if (parameters.hasOwnProperty(parameterName)) {
        let parameterValue = '';
        let className = '';

        if (parameters[parameterName]) {
          parameterValue = parameters[parameterName];

          if (lang && lang.units) {
            parameterValue += ` ${ lang.units[parameterName] }`
          }
        } else {
          parameterValue = lang && lang.empty;
          className = ' parameters__item--empty';
        }

        parameterList.push(
          <li
            key={ parameterName }
            className={ `parameters__item parameters__item--${ parameterName }${ className }` }
          >
            { parameterValue }
          </li>
        );
      }
    }

    return parameterList;
  }

  render() {
    const { className } = this.props;
    const classList = this.className.split();
    className && classList.push(className);

    return (
      <ul className={ classList.join(' ') }>
        { this.getParameters() }
      </ul>
    );
  }
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <Parameters
        { ...props }
        lang={ lang &&
          Object.assign({},
            lang.parameters,
            { units: lang.units }
          )
        }
      />
    }
  </LanguagesContext.Consumer>
);
