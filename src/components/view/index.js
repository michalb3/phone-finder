import React, { Component, Fragment } from 'react';
import { config, views } from '../../config.js';
import { LanguagesContext, CookiesContext } from '../../contexts';

class View extends Component {
  constructor(props) {
    super(props);

    this.className = 'view';
  }

  getViewName() {
    const cookies = this.props.getCookies();

    if (cookies.view) {
      return cookies.view;
    }

    return config.defaultView;
  }

  getView() {
    const { className, lang } = this.props;
    const viewName = this.getViewName();
    const classList = this.className.split();
    className && classList.push(className);

    if ('function' === typeof views[viewName]) {
      return React.createElement(
        views[viewName], {
          className: classList.join(' '),
          data: this.props.data,
          contentLoaded: this.props.contentLoaded,
          scrollToTop: this.props.scrollToTop,
          scrollbarRef: this.props.scrollbarRef,
        }
      );
    }

    return lang && lang.notFound;
  }

  render() {
    return (
      <Fragment>
        { this.getView() }
      </Fragment>
    );
  }
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <CookiesContext.Consumer>
        { cookies =>
          <View
            { ...props }
            { ...cookies }
            lang={ lang && lang.view }
          />
        }
      </CookiesContext.Consumer>
    }
  </LanguagesContext.Consumer>
);
