import React from 'react';
import { config, views } from '../../config.js';
import NavCookie from '../nav-cookie';

function NavView(props) {
  let className = 'nav--view';

  if (props.className) {
    className += ` ${ props.className }`;
  }

  return (
    <NavCookie
      className={ className }
      cookieName="view"
      activeLink={ config.defaultView }
      navSource={ views }
    />
  );
}

export default NavView;
