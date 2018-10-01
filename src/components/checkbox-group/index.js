import React, { Component, Fragment } from 'react';
import { LanguagesContext, QueryStringContext } from '../../contexts';
import Checkbox from '../checkbox';

class CheckboxGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedCheckboxes: null,
      expanded: false,
    };

    this.className = 'checkbox-group';
    this.checkboxGroupRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  componentDidMount() {
    const { queryStringKey } = this.props;
    const queryString = this.props.getQueryString();
    let checkedCheckboxes = [];

    if (queryString.hasOwnProperty(queryStringKey)) {
      checkedCheckboxes = queryString[queryStringKey].split(',');
    }

    this.setState({
      checkedCheckboxes: checkedCheckboxes,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { checkedCheckboxes } = this.state;
    const { queryStringKey } = this.props;

    if (prevState.checkedCheckboxes &&
        checkedCheckboxes !== prevState.checkedCheckboxes
    ) {
      this.props.setQueryString(
        queryStringKey,
        checkedCheckboxes.join(',')
      );
    }
  }

  isChecked(checkboxValue) {
    const { checkedCheckboxes } = this.state;

    if (checkedCheckboxes) {
      return checkedCheckboxes.includes(checkboxValue);
    }

    return false;
  }

  getCheckboxes() {
    const { queryStringKey } = this.props;
    const checkboxesValues = this.props.init.slice();

    return checkboxesValues.map((checkboxValue, key) => {
      return (
        <Checkbox
          key={ key }
          className={ `${ this.className }__checkbox` }
          htmlFor={ `${ queryStringKey }-${ key }` }
          value={ checkboxValue }
          text={ checkboxValue }
          checked={ this.isChecked(checkboxValue) }
          onChange={ this.handleChange }
        />
      );
    });
  }

  handleChange(event) {
    const { value } = event.target;
    const checkedCheckboxes = this.state.checkedCheckboxes.slice();
    const checkedIndex = checkedCheckboxes.indexOf(value);

    if (0 <= checkedIndex) {
      checkedCheckboxes.splice(checkedIndex, 1);
    } else {
      checkedCheckboxes.push(value);
    }

    this.setState({
      checkedCheckboxes: checkedCheckboxes,
    });
  }

  handleSwitch(event) {
    event.preventDefault();
    const className = `${ this.className }--expanded`;
    const checkboxesGroup = this.checkboxGroupRef.current;

    if (this.state.expanded) {
      checkboxesGroup.classList.remove(className);
    } else {
      checkboxesGroup.classList.add(className);
    }

    this.setState(prevState => {
      return {
        expanded: !prevState.expanded,
      };
    });
  }

  render() {
    const { className, queryStringKey, lang } = this.props;
    const classList = this.className.split();
    className && classList.push(className);
    let switcherLabel = '';

    if (lang && lang.switcher) {
      switcherLabel = lang.switcher[this.state.expanded];
    }

    return (
      <Fragment>
        <label className="form__label">
          { lang && lang[queryStringKey] && lang[queryStringKey].label }
        </label>
        <div
          className={ classList.join(' ') }
          ref={ this.checkboxGroupRef }
        >
          <div className={ `${ this.className }__inner` }>
            { this.getCheckboxes() }
          </div>
          <a
            className={ `link ${ this.className }__switcher` }
            href={ `#${ switcherLabel.toLowerCase() }` }
            onClick={ this.handleSwitch }
          >
            { switcherLabel }
          </a>
        </div>
      </Fragment>
    );
  }
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <QueryStringContext.Consumer>
        { queryString =>
          <CheckboxGroup
            { ...props }
            { ...queryString }
            lang={ lang && lang.checkboxGroup }
          />
        }
      </QueryStringContext.Consumer>
    }
  </LanguagesContext.Consumer>
);
