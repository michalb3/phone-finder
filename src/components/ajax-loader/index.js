import React from 'react';
import { LanguagesContext } from '../../contexts';

function AjaxLoader(props) {
  const { imgSrc, lang, loading } = props;
  const className = 'ajax-loader';
  const classList = className.split();
  loading && classList.push(`${ className }--hidden`);
  props.className && classList.push(props.className);

  return (
    <figure className={ classList.join(' ') }>
      <img
        className={ `${ className }__img` }
        src={ imgSrc || '../img/ajax-loader.gif' }
        alt={ lang && lang.alt }
      />
    </figure>
  );
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <AjaxLoader
        { ...props }
        lang={ lang && lang.ajaxLoader }
      />
    }
  </LanguagesContext.Consumer>
);
