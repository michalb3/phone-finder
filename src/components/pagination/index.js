import React, { Component, Fragment } from 'react';
import { LanguagesContext, QueryStringContext } from '../../contexts';
import Link from '../link';
import PageInfo from '../page-info';

class Pagination extends Component {
  constructor(props) {
    super(props);

    const { data } = props;

    this.state = {
      currentPage: data.currentPage,
      numberOfPages: data.numberOfPages,
    };

    this.className = 'pagination';
    this.queryString = Object.assign({}, props.getQueryString());
    this.handleClickPage = this.handleClickPage.bind(this);
    this.handleClickPrevious = this.handleClickPrevious.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    const queryString = this.props.getQueryString();

    if (JSON.stringify(queryString) !== JSON.stringify(this.queryString)) {
      this.props.setQueryString('page', 1);
      this.queryString = queryString;
    } else if (JSON.stringify(data) !== JSON.stringify(prevProps.data)) {
      this.setState({
        currentPage: data.currentPage,
        numberOfPages: data.numberOfPages,
      });
    }
  }

  handleClickPage(pageNumber) {
    const { currentPage } = this.state;

    if (!isNaN(pageNumber) &&
        currentPage !== pageNumber
    ) {
      this.props.scrollToTop();
      this.queryString.page = pageNumber.toString();
      this.props.setQueryString('page', pageNumber);
    }
  }

  handleClickPrevious(pageNumber) {
    if (0 < pageNumber) {
      this.handleClickPage(pageNumber);
    }
  }

  handleClickNext(pageNumber) {
    const { numberOfPages } = this.state;

    if (pageNumber <= numberOfPages) {
      this.handleClickPage(pageNumber);
    }
  }

  getPages() {
    const { currentPage, numberOfPages } = this.state;
    const { lang } = this.props;
    let pageList = [];

    for (let pageNumber = currentPage; pageNumber < currentPage + 3; pageNumber++) {
      if (pageNumber > numberOfPages) {
        const [firstPage] = pageList;

        if (firstPage - 1 > 0) {
          pageList.unshift(firstPage - 1);
          continue;
        }

        break;
      } else {
        pageList.push(pageNumber);
      }
    }

    return pageList.map(pageNumber => {
      const classList = [];
      classList.push(`${ this.className }__link`);

      if (pageNumber === currentPage) {
        classList.push(`${ classList[0] }--active`);
      }

      return (
        <Link
          key={ pageNumber }
          className={ classList.join(' ') }
          href={ `#${ lang && lang.page }-${ pageNumber }`.toLowerCase() }
          anchorText={ pageNumber }
          linkData={ pageNumber }
          onClick={ this.handleClickPage }
        />
      );
    });
  }

  getPrevious() {
    const { currentPage } = this.state;
    const { lang } = this.props;

    if (1 < currentPage) {
      const pageNumber = currentPage - 1;
      const classList = [];

      classList.push(`${ this.className }__link`);
      classList.push(`${ classList[0] }--prev`);

      return (
        <Link
          key={ pageNumber }
          className={ classList.join(' ') }
          href={ `#${ lang && lang.prev }`.toLowerCase() }
          anchorText={ lang && lang.prev }
          linkData={ pageNumber }
          onClick={ this.handleClickPrevious }
        />
      );
    }

    return '';
  }

  getNext() {
    const { currentPage, numberOfPages } = this.state;
    const { lang } = this.props;

    if (currentPage < numberOfPages) {
      const pageNumber = currentPage + 1;
      const classList = [];

      classList.push(`${ this.className }__link`);
      classList.push(`${ classList[0] }--next`);

      return (
        <Link
          key={ pageNumber }
          className={ classList.join(' ') }
          href={ `#${ lang && lang.next }`.toLowerCase() }
          anchorText={ lang && lang.next }
          linkData={ pageNumber }
          onClick={ this.handleClickNext }
        />
      );
    }

    return '';
  }

  render() {
    const { className } = this.props;
    const classList = this.className.split();
    className && classList.push(className);

    return (
      <Fragment>
        { this.props.data.sampleSize > 0 &&
          <nav className={ classList.join(' ') }>
            <PageInfo
              className={ `${ this.className }__page-info` }
              currentPage={ this.state.currentPage }
              numberOfPages={ this.state.numberOfPages }
            />
            <div className={ `${ this.className }__inner` }>
              { this.getPrevious() }
              { this.getPages() }
              { this.getNext() }
            </div>
          </nav>
        }
      </Fragment>
    );
  }
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <QueryStringContext.Consumer>
        { queryString =>
          <Pagination
            { ...props }
            { ...queryString }
            lang={ lang && lang.pagination }
          />
        }
      </QueryStringContext.Consumer>
    }
  </LanguagesContext.Consumer>
);
