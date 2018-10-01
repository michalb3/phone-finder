import React, { Component } from 'react';
import { config } from '../../config.js';
import { LanguagesContext, CookiesContext } from '../../contexts';
import withBasisView from '../view-default';
import Parameters from '../parameters';
import Checkbox from '../checkbox';
import Tooltip from '../tooltip';

class ViewList extends Component {
  constructor(props) {
    super(props);

    this.className = 'view--list';
  }

  getItems() {
    const { lang, data: { items } } = this.props;

    return items.map(item => {
      const checked = this.props.isChecked(item.id);
      const disabled = this.props.comparisonObjectLength === 3;
      const classList = ['view__checkbox'];

      if (checked) {
        classList.push('view__checkbox--checked');
      } else if (disabled) {
        classList.push('view__checkbox--disabled');
      }

      return (
        <section
          key={ item.id }
          className="view__item"
        >
          <figure className="view__figure">
            <img
              className="view__img"
              src={ `${ config.imgUrl }${ item.imgUrl }` }
              alt={ item.name }
            />
          </figure>
          <div className="view__inner">
            <header className="view__header">
              <h3 className="view__name">
                { item.name }
              </h3>
            </header>
            <Parameters
              className="view__list"
              parameters={ item.parameters }
            />
          </div>
          <aside className="view__compare">
            <Checkbox
              className={ classList.join(' ') }
              htmlFor={ `compare-${ item.id }` }
              text={ lang && lang.compare[checked] }
              value={ JSON.stringify(item) }
              onClick={ this.props.onClick }
            />
            <Tooltip
              className="view__tooltip"
              text={ lang && lang.tooltip }
              visible={ disabled }
            />
          </aside>
        </section>
      );
    });
  }

  render() {
    const { className, contentLoaded } = this.props;
    const classList = this.className.split();
    !contentLoaded && classList.unshift('view__loading');
    className && classList.unshift(className);

    return (
      <main className={ classList.join(' ') }>
        { this.getItems() }
      </main>
    );
  }
}

const ViewListWithBase = withBasisView(ViewList);

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <CookiesContext.Consumer>
        { cookies =>
          <ViewListWithBase
            { ...props }
            { ...cookies }
            lang={ lang && lang.view }
          />
        }
      </CookiesContext.Consumer>
    }
  </LanguagesContext.Consumer>
);
