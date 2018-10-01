import React, { Component, Fragment } from 'react';
import { LanguagesContext, QueryStringContext } from '../../contexts';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.minLength = 3;
    this.maxLength = 50;
    this.itemsNumber = 25;
    this.autocompleteRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const { className, init } = this.props;
    const queryString = this.props.getQueryString();

    this.setInitValues();

    if (queryString.hasOwnProperty('name') &&
        '' !== queryString.name
    ) {
      this.setState({
        value: queryString.name,
      });
    }

    this.$widgetNode = window.$(this.autocompleteRef.current);
    this.$widgetNode.autocomplete({
      minLength: this.minLength,
      classes: { 'ui-autocomplete': `${ className }__autocomplete` },
      source: (request, response) => {
        const result = window.$.ui.autocomplete.filter(init.source, request.term);
        response(result.splice(0, this.itemsNumber));
      },
      select: (event, ui) => {
        this.setState(prevState => {
          if (ui.item.value !== prevState.value) {
            return {
              value: ui.item.value,
            };
          }
        });
      },
    });

    this.widgetList = this.$widgetNode.autocomplete('widget');
    this.$widgetNode.after(this.widgetList);
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state;

    if (prevState.value &&
        value !== prevState.value
    ) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.props.setQueryString('name', value);
      }, 400);
    }
  }

  componentWillUnmount() {
    this.$widgetNode.autocomplete('destroy');
  }

  setInitValues() {
    const { minLength, maxLength, itemsNumber } = this.props;

    if (!isNaN(minLength)) {
      this.minLength = parseInt(minLength, 10);
    }

    if (!isNaN(maxLength)) {
      this.maxLength = parseInt(maxLength, 10);
    }

    if (!isNaN(itemsNumber)) {
      this.itemsNumber = parseInt(itemsNumber, 10);
    }
  }

  handleChange(event) {
    const { value } = event.target;

    if (this.maxLength >= value.length) {
      this.setState({
        value: value,
      });
    }
  }

  handleKeyDown(event) {
    if (13 === event.keyCode) {
      if (this.widgetList &&
          0 < this.widgetList.length
      ) {
        this.widgetList[0].style.display = 'none';
      }
    }
  }

  render() {
    const { className, lang } = this.props;

    return (
      <Fragment>
        <label
          className={ `${ className }__label` }
          htmlFor={ `${ className }__search` }
        >
          { lang && lang.label }
        </label>
        <input
          type="search"
          id={ `${ className }__search` }
          className={ `${ className }__search` }
          value={ this.state.value }
          placeholder={ lang && lang.placeholder }
          onChange={ this.handleChange }
          onKeyDown={ this.handleKeyDown }
          ref={ this.autocompleteRef }
        />
      </Fragment>
    );
  }
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <QueryStringContext.Consumer>
        { queryString =>
          <Search
            { ...props }
            { ...queryString }
            lang={ lang && lang.search }
          />
        }
      </QueryStringContext.Consumer>
    }
  </LanguagesContext.Consumer>
);
