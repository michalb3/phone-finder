import React, { Component, Fragment } from 'react';
import Link from '../link';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.className = 'nav';
  }

  getLinks() {
    const { activeLink, linkList } = this.props;

    return linkList.map((link, key) => {
      const classList = [];

      classList.push(`${ this.className }__link`);
      classList.push(`${ classList[0] }--${ link.linkData }`);

      if (activeLink === link.linkData) {
        classList.push(`${ classList[0] }--active`);
      }

      return (
        <Link
          key={ key }
          className={ classList.join(' ') }
          onClick={ this.props.onClick }
          { ...link }
        />
      );
    });
  }

  render() {
    const { className } = this.props;
    const classList = this.className.split();
    className && classList.push(className);

    return (
      <Fragment>
        { this.props.linkList &&
          <nav className={ classList.join(' ') }>
            { this.getLinks() }
          </nav>
        }
      </Fragment>
    );
  }
}

export default Nav;
