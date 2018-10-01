import React, { Component, Fragment } from 'react';
import Actions from '../actions';
import Sorting from '../sorting';
import ComparisonWidget from '../comparison-widget';
import Pagination from '../pagination';

function withBasisView(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.comparisonObject = this.getComparisonObject();
      this.comparisonWidgetRef = React.createRef();
      this.nativeScrollEventListener = this.nativeScrollEventListener.bind(this);
      this.scrollbarScrollEventListener = this.scrollbarScrollEventListener.bind(this);
      this.getComparisonObject = this.getComparisonObject.bind(this);
      this.deleteComparisonItem = this.deleteComparisonItem.bind(this);
      this.inComparisonObject = this.inComparisonObject.bind(this);
      this.handleClickCompare = this.handleClickCompare.bind(this);
    }

    componentDidMount() {
      this.initEventListener();
    }

    componentDidUpdate() {
      this.initEventListener();
    }

    componentWillUnmount() {
      document.removeEventListener('scroll', this.nativeScrollEventListener);
      this.client && this.client.removeEventListener('scroll', this.scrollbarScrollEventListener);
    }

    initEventListener() {
      const { scrollbarRef } = this.props;

      if (scrollbarRef &&
        scrollbarRef.current
      ) {
        this.client = scrollbarRef.current;
        document.removeEventListener('scroll', this.nativeScrollEventListener);
        this.client.addEventListener('scroll', this.scrollbarScrollEventListener);
      } else {
        this.client && this.client.removeEventListener('scroll', this.scrollbarScrollEventListener);
        document.addEventListener('scroll', this.nativeScrollEventListener);
      }
    }

    nativeScrollEventListener() {
      const scrollTop = window.pageYOffset || document.documentElement || document.body.scrollTop || 0;
      const comparisonWidget = this.comparisonWidgetRef.current;

      if (comparisonWidget) {
        const comparisonWidgetRect = comparisonWidget.getBoundingClientRect();

        if (0 >= comparisonWidgetRect.top) {
          if (!comparisonWidget.classList.contains('content__comparison-widget--fixed')) {
            this.scrollTop = scrollTop;
            comparisonWidget.classList.add('content__comparison-widget--fixed');
          }
        } else if (scrollTop <= this.scrollTop) {
          if (comparisonWidget.classList.contains('content__comparison-widget--fixed')) {
            comparisonWidget.classList.remove('content__comparison-widget--fixed');
          }
        }
      }
    }

    scrollbarScrollEventListener() {
      const { scrollTop } = this.client;
      const comparisonWidget = this.comparisonWidgetRef.current;

      if (comparisonWidget) {
        if (scrollTop >= comparisonWidget.offsetTop) {
          if (!comparisonWidget.classList.contains('content__comparison-widget--fixed')) {
            comparisonWidget.classList.add('content__comparison-widget--fixed');
          }
        } else if (comparisonWidget.classList.contains('content__comparison-widget--fixed')) {
          comparisonWidget.classList.remove('content__comparison-widget--fixed');
        }
      }
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

    addComparisonItem(item) {
      if (this.comparisonObjectLength() < 3) {
        this.comparisonObject[item.id] = item;
        this.props.setCookie('compare', JSON.stringify(this.comparisonObject));
      }
    }

    deleteComparisonItem(itemID) {
      delete this.comparisonObject[itemID];
      this.props.setCookie('compare', JSON.stringify(this.comparisonObject));
    }

    inComparisonObject(itemID) {
      return this.comparisonObject.hasOwnProperty(itemID);
    }

    comparisonObjectLength() {
      return Object.keys(this.comparisonObject).length;
    }

    handleClickCompare(event) {
      event.preventDefault();
      const changedItem = JSON.parse(event.target.value);

      if (this.inComparisonObject(changedItem.id)) {
        this.deleteComparisonItem(changedItem.id);
      } else {
        this.addComparisonItem(changedItem);
      }
    }

    render() {
      return (
        <Fragment>
          { this.props.data.sampleSize > 0 &&
            <Actions className="content__actions">
              <Sorting className="actions__sorting" />
            </Actions>
          }
          <ComparisonWidget
            className="content__comparison-widget"
            getComparisonObject={ this.getComparisonObject }
            deleteComparisonItem={ this.deleteComparisonItem }
            comparisonObjectLength={ this.comparisonObjectLength() }
            forwardRef={ this.comparisonWidgetRef }
          />
          <WrappedComponent
            isChecked={ this.inComparisonObject }
            comparisonObjectLength={ this.comparisonObjectLength() }
            onClick={ this.handleClickCompare }
            { ...this.props }
          />
          <Pagination
            className={ `content__pagination` }
            data={ this.props.data }
            scrollToTop={ this.props.scrollToTop }
          />
        </Fragment>
      );
    }
  }
}

export default withBasisView;
