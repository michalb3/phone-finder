import React, { Component, Fragment } from 'react';
import { config } from '../../config.js';
import Link from '../link'
import NavCookie from '../nav-cookie';
import ViewComparison from '../view-comparison';

class ComparisonWidget extends Component {
  constructor(props) {
    super(props);

    this.className = 'comparison-widget';
  }

  getLinkList() {
    const comparisonObject = this.props.getComparisonObject();
    const links = [];

    for (let itemID in comparisonObject) {
      if (comparisonObject.hasOwnProperty(itemID)) {
        const { id, name, imgUrl } = comparisonObject[itemID];

        links.push(
          <Link
            key={ id }
            className={ `${ this.className }__link` }
            href={ `#comparison-${ id }` }
            anchorText={
              <img
                className={ `${ this.className }__img` }
                src={ `${ config.imgUrl }${ imgUrl }` }
                alt={ name }
              />
            }
            linkData={ id }
            onClick={ this.props.deleteComparisonItem }
          />
        );
      }
    }

    return links;
  }

  render() {
    const { className, comparisonObjectLength, forwardRef } = this.props;
    const classList = this.className.split();
    className && classList.push(className);

    return (
      <Fragment>
        { comparisonObjectLength > 0 &&
          <aside
            className={ classList.join(' ') }
            ref={ forwardRef }
          >
            { comparisonObjectLength > 1 &&
              <NavCookie
                className={ `${ this.className }__nav` }
                cookieName="view"
                navSource={ { comparison: ViewComparison } }
              />
            }
            <nav className={ `${ this.className }__links` }>
              { this.getLinkList() }
            </nav>
          </aside>
        }
      </Fragment>
    );
  }
}

export default ComparisonWidget;
