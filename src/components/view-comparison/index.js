import React, { Component, Fragment } from 'react';
import { config } from '../../config.js';
import { LanguagesContext, CookiesContext } from '../../contexts';
import Actions from '../actions';
import Parameters from '../parameters';

class ViewComparison extends Component {
  constructor(props) {
    super(props);

    this.state = {
      differences: false,
    };

    this.className = 'view--comparison';
    this.comparisonObject = this.getComparisonObject();
    this.handleShowDifferences = this.handleShowDifferences.bind(this);
  }

  getComparisonObject() {
    const cookies = Object.assign({}, this.props.getCookies());
    let comparisonObject = null;

    try {
      comparisonObject = JSON.parse(cookies.compare);
    } catch (e) {
      comparisonObject = {};
    }

    return comparisonObject;
  }

  getItems() {
    const items = [];

    for (let itemID in this.comparisonObject) {
      const { name, imgUrl, parameters } = this.comparisonObject[itemID];

      items.push(
        <section
          key={ itemID }
          className="view__item"
        >
          <div className="view__inner">
            <header className="view__header">
              <h3 className="view__name">{ name }</h3>
            </header>
            <figure className="view__figure">
              <img
                className="view__img"
                src={ `${ config.imgUrl }${ imgUrl }` }
                alt={ name }
              />
            </figure>
          </div>
          <Parameters
            className="view__list"
            parameters={ parameters }
          />
      </section>
      );
    }

    return items;
  }

  handleShowDifferences(event) {
    event.preventDefault();

    if (!this.checkedDifferences) {
      const items = document.getElementsByClassName('parameters__item');
      const uniqueValues = {};

      for (let itemID in items) {
        if ('object' === typeof items[itemID]) {
          const { classList, innerHTML } = items[itemID];
          const className = classList[1];

          if (!uniqueValues.hasOwnProperty(className)) {
            uniqueValues[className] = [];
          }

          if (-1 === uniqueValues[className].indexOf(innerHTML)) {
            uniqueValues[className].push(innerHTML);
          }
        }
      }

      for (let className in uniqueValues) {
        if (1 < uniqueValues[className].length) {
          const items = document.getElementsByClassName(className);

          for (let itemID in items) {
            if (!isNaN(itemID)) {
              items[itemID].classList.add('parameters__item--difference');
            }
          }
        }
      }

      this.checkedDifferences = true;
    }

    this.setState(prevState => {
      return {
        differences: !prevState.differences,
      };
    });
  }

  render() {
    const { differences } = this.state;
    const { className, lang } = this.props;
    const classList = this.className.split();
    differences && classList.unshift('view--difference');
    className && classList.unshift(className);

    return (
      <Fragment>
        <Actions className="content__actions">
          <a
            className="link actions__difference"
            href="#difference"
            onClick={ this.handleShowDifferences }
          >
            { lang &&
              lang.difference &&
              lang.difference[differences]
            }
          </a>
        </Actions>
        <main className={ classList.join(' ') }>
          <div className="view__outer">
            { this.getItems() }
          </div>
        </main>
      </Fragment>
    );
  }
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <CookiesContext.Consumer>
        { cookies =>
          <ViewComparison
            { ...props }
            { ...cookies }
            lang={ lang &&
              Object.assign({},
                lang.viewComparison,
                { units: lang.units, parameterNames: lang.parameterNames }
              )
            }
          />
        }
      </CookiesContext.Consumer>
    }
  </LanguagesContext.Consumer>
);
