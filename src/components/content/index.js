import React, { Component } from 'react';
import Scrollbar from '../scrollbar';
import Navbar from '../navbar';
import View from '../view';
import ScrollPage from '../scroll-page';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollbarRef: {
        current: null,
      },
    };

    this.className = 'content';
    this.contentRef = React.createRef();
    this.setScrollbarRef = this.setScrollbarRef.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  setScrollbarRef(ref) {
    const { scrollbarRef } = this.state;

    if (scrollbarRef.current !== ref.current) {
      this.setState({
        scrollbarRef: Object.assign({}, ref),
      });
    }
  }

  scrollToTop() {
    const { scrollbarRef } = this.state;
    let top = 0, client = null;

    if (scrollbarRef &&
        scrollbarRef.current
    ) {
      client = scrollbarRef.current;
    } else {
      top = this.contentRef.current.offsetTop;
      client = window;
    }

    client && !isNaN(top) && client.scrollTo(0, top);
  }

  render() {
    const { className, data, contentLoaded } = this.props;
    const classList = this.className.split();
    className && classList.push(className);

    return (
      <div
        className={ classList.join(' ') }
        ref={ this.contentRef }
      >
        <div className={ `${ this.className }__outer` }>
          <Scrollbar
            autoHide
            className={ `${ this.className }__scrollbar` }
            scrollbarRef={ this.setScrollbarRef }
          >
            <div className={ `${ this.className }__inner` }>
              <Navbar
                className={ `${ this.className }__navbar` }
                sampleSize={ data.sampleSize }
                fullSize={ data.fullSize }
                contentLoaded={ contentLoaded }
              />
              <View
                className={ `${ this.className }__view` }
                data={ data }
                scrollToTop={ this.scrollToTop }
                contentLoaded={ contentLoaded }
                scrollbarRef={ this.state.scrollbarRef }
              />
              <ScrollPage
                className={ `${ this.className }__scroll-page` }
                anchor="#top"
                clientRef={ this.state.scrollbarRef }
              />
            </div>
          </Scrollbar>
        </div>
      </div>
    );
  }
}

export default Content;
