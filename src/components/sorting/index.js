import React, { Component } from 'react';
import { LanguagesContext, QueryStringContext } from '../../contexts';

class Sorting extends Component {
  constructor(props) {
    super(props);

    this.className = 'sorting';
    this.handleChange = this.handleChange.bind(this);
  }

  getOptions() {
    const { lang } = this.props;
    const options = [];

    if (lang) {
      const { parameterNames, orderBy } = lang;

      for (let parameterName in parameterNames) {
        if (parameterNames.hasOwnProperty(parameterName)) {
          for (let order in orderBy) {
            const optionValue = `${ parameterName }-${ order }`;

            if (orderBy.hasOwnProperty(order)) {
              options.push(
                <option
                  key={ optionValue }
                  value={ optionValue }
                >
                  { parameterNames && parameterNames[parameterName] }
                  { `: ${ orderBy && orderBy[order].toLowerCase() }` }
                </option>
              );
            }
          }
        }
      }
    }

    return options;
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    event.preventDefault();
    const { value } = event.target;
    const [parameterName, order] = value.split('-');

    this.props.setQueryString(null, null, {
      orderBy: parameterName,
      order: order,
    });
  }

  render() {
    const { className, lang } = this.props;
    const { orderBy, order } = this.props.getQueryString();
    const classList = this.className.split();
    className && classList.push(className);
    let selectValue = '';

    if (orderBy && order) {
      selectValue = `${ orderBy }-${ order }`;
    } else {
      selectValue = 'name-asc';
    }

    return (
      <form
        className={ classList.join(' ') }
        onSubmit={ this.handleSubmit }
      >
        <label
          className={ `${ this.className }__label` }
          htmlFor={ `${ this.className }__select` }
        >
          { lang && lang.label && `${ lang.label }:` }
        </label>
        <select
          id={ `${ this.className }__select` }
          className={ `${ this.className }__select` }
          value={ selectValue }
          onChange={ this.handleChange }
        >
          { this.getOptions() }
        </select>
      </form>
    );
  }
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <QueryStringContext.Consumer>
        { queryString =>
          <Sorting
            { ...props }
            { ...queryString }
            lang={ lang &&
              Object.assign({},
                lang.sorting,
                { parameterNames: lang.parameterNames }
              )
            }
          />
        }
      </QueryStringContext.Consumer>
    }
  </LanguagesContext.Consumer>
);
