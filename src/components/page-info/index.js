import React, { Fragment } from 'react';

function PageInfo(props) {
  const { currentPage, numberOfPages } = props;
  const className = 'page-info';
  const classList = className.split();
  props.className && classList.push(props.className);

  return (
    <Fragment>
      { currentPage && numberOfPages >= currentPage &&
        <p className={ classList.join(' ') }>
          { `${ currentPage } - ${ numberOfPages }` }
        </p>
      }
    </Fragment>
  );
}

export default PageInfo;
