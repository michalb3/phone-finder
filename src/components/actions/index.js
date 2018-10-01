import React from 'react';
import NavView from '../nav-view';

function Actions(props) {
  const className = 'actions';
  const classList = className.split();
  props.className && classList.push(props.className);

  return (
    <aside className={ classList.join(' ') }>
      <NavView className={ `${ className }__nav` } />
      { props.children }
    </aside>
  );
}

export default Actions;
