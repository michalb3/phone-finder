import React from 'react';
import { config, languages } from '../../config.js';
import { LanguagesContext } from '../../contexts';
import ResultInfo from '../result-info';
import AjaxLoader from '../ajax-loader';
import NavCookie from '../nav-cookie';

function Navbar(props) {
  const { lang } = props;
  const className = 'navbar';
  const classList = className.split();
  props.className && classList.push(props.className);

  return (
    <div className={ `${ classList.join(' ') }` }>
      <ResultInfo
        className={ `${ className }__result-info` }
        lang={ lang && lang.resultInfo }
        fullSize={ props.fullSize }
        sampleSize={ props.sampleSize }
      />
      <AjaxLoader
        className={ `${ className }__ajax-loader` }
        loading={ props.contentLoaded }
      />
      <NavCookie
        className={ `nav--lang ${ className }__nav` }
        cookieName="lang"
        lang={ lang && lang.nav && lang.nav.lang }
        activeLink={ config.defaultLang }
        navSource={ languages }
      />
    </div>
  );
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <Navbar
        { ...props }
        lang={ lang && lang.nav }
      />
    }
  </LanguagesContext.Consumer>
);
