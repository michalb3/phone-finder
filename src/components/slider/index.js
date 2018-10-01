import React, { Component } from 'react';
import { LanguagesContext, QueryStringContext } from '../../contexts';

class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideValues: [],
      changeValues: [],
    };

    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    const init = Object.assign({}, this.props.init);
    const values = this.getInitValues();

    // Fix max calculation, when step is a float number
    if (0 <= init.step.toString().indexOf('.')) {
      // 23-24: jQuery UI calculates max like this
      var aboveMin = Math.round((init.max - init.min) / init.step) * init.step;
      var max = aboveMin + init.min;

      if (max !== init.max) {
        // It fix the problem of floating point arithmetic
        init.max += init.step;
      }
    }

    if (values.length) {
      this.setState({
        slideValues: values,
        changeValues: values,
      });
    }

    const sliderOptions = Object.assign({
      range: true,
      values: values,
      slide: (event, ui) => {
        this.setState({
          slideValues: ui.values,
        });
      },
      change: (event, ui) => {
        this.setState({
          changeValues: ui.values,
        });
      },
    }, init);

    this.$node = window.$(this.sliderRef.current);
    this.$node.slider(sliderOptions);
  }

  componentDidUpdate(prevProps, prevState) {
    const { changeValues } = this.state;

    if (prevState.changeValues.length &&
        changeValues !== prevState.changeValues
    ) {
      this.props.setQueryString(
        this.props.sliderName,
        changeValues.join(',')
      );
    }
  }

  componentWillUnmount() {
    this.$node.slider('destroy');
  }

  getInitValues() {
    const values = [];
    const queryString = this.props.getQueryString();
    const { sliderName, init } = this.props;

    if (queryString.hasOwnProperty(sliderName)) {
      const [min, max] = queryString[sliderName].split(',');

      if (!isNaN(min) &&
          !isNaN(max)
      ) {
        values.push(parseFloat(min));
        values.push(parseFloat(max));
      }
    }

    if (!values.length) {
      const { min, max } = init;

      values.push(min);
      values.push(max);
    }

    return values;
  }

  getResult() {
    const resultList = [];
    const { slideValues } = this.state;
    const { sliderName, lang } = this.props;

    slideValues.forEach(slideValue => {
      let result = slideValue;

      if (lang && lang.units) {
        result += ` ${ lang.units[sliderName] }`;
      }

      resultList.push(result);
    });

    return resultList.join(' - ');
  }

  render() {
    const { className, sliderName, lang } = this.props;

    return (
      <div className={ `${ className }__slider` }>
        <label className={ `${ className }__label` }>
          { lang && lang[sliderName] && lang[sliderName].label }
        </label>
        <div
          className={ `${ className }__ui-slider` }
          ref={ this.sliderRef }
        />
        <span className={ `${ className }__result` }>
          { this.getResult() }
        </span>
      </div>
    );
  }
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <QueryStringContext.Consumer>
        { queryString =>
          <Slider
            { ...props }
            { ...queryString }
            lang={ lang &&
              Object.assign({},
                lang.slider,
                { units: lang.units }
              )
            }
          />
        }
      </QueryStringContext.Consumer>
    }
  </LanguagesContext.Consumer>
);
