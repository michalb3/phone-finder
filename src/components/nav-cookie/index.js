import React, { Component } from 'react';
import { LanguagesContext, CookiesContext } from '../../contexts';
import Nav from '../nav';

class NavCookie extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  getLinkList() {
    const { cookieName, navSource, lang } = this.props;
    const viewLang = lang && lang[cookieName];
    const linkList = [];

    for (let sourceKey in navSource) {
      if (navSource.hasOwnProperty(sourceKey)) {
        linkList.push({
          href: `#${ sourceKey.toLowerCase() }`,
          anchorText: viewLang && viewLang[sourceKey],
          linkData: sourceKey,
        });
      }
    }

    return linkList;
  }

  handleClick(dataLink) {
    const { cookieName, navSource } = this.props;

    if (navSource.hasOwnProperty(dataLink)) {
      this.props.setCookie(cookieName, dataLink);
    }
  }

  render() {
    const { cookieName, activeLink } = this.props;
    const cookies = this.props.getCookies();

    return (
      <Nav
        className={ this.props.className }
        activeLink={ cookies[cookieName] || activeLink }
        linkList={ this.getLinkList() }
        onClick={ this.handleClick }
      />
    );
  }
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <CookiesContext.Consumer>
        { cookies =>
          <NavCookie
            { ...props }
            { ...cookies }
            lang={ lang && lang.nav }
          />
        }
      </CookiesContext.Consumer>
    }
  </LanguagesContext.Consumer>
);
