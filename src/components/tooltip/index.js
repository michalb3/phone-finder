import React from 'react';

function Tooltip(props) {
  const { position, visible } = props;
  const className = 'tooltip';
  const classList = className.split();
  position && classList.push(`${ className }--${ position }`);
  visible && classList.push(`${ className }--visible`);
  props.className && classList.push(props.className);

  return (
    <span className={ classList.join(' ') }>
      { props.text }
    </span>
  );
}

export default Tooltip;
