import React, { Component } from 'react';
import { LanguagesContext, CookiesContext } from '../../contexts';

class CookieInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.className = 'cookie-info';
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { cookieInfo } = this.props.getCookies();

    if (!cookieInfo ||
        cookieInfo !== 'closed'
    ) {
      this.setState({
        visible: true,
      });
    }
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ visible: false });
    this.props.setCookie('cookieInfo', 'closed');
  }

  render() {
    const { className, lang } = this.props;
    const { visible } = this.state;
    const classList = this.className.split();
    className && classList.push(className);

    if (visible) {
      return (
        <div className={ classList.join(' ') }>
          <p className={ `${ this.className }__text` }>
            { lang && lang.text }
          </p>
          <a
            href="#close"
            className={ `link ${ this.className }__close` }
            onClick={ this.handleClick }
          >
            { lang && lang.close }
          </a>
        </div>
      );
    } else {
      return '';
    }
  }
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <CookiesContext.Consumer>
        { cookies =>
          <CookieInfo
            { ...props }
            { ...cookies }
            lang={ lang && lang.cookieInfo }
          />
        }
      </CookiesContext.Consumer>
    }
  </LanguagesContext.Consumer>
);
