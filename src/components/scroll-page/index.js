import React, { Component } from 'react';

class ScrollPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleScrollPage: false,
    };

    this.className = 'scroll-page';
    this.nativeScrollEventListener = this.nativeScrollEventListener.bind(this);
    this.scrollbarScrollEventListener = this.scrollbarScrollEventListener.bind(this);
    this.handleClickScroll = this.handleClickScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.nativeScrollEventListener);
  }

  componentDidUpdate() {
    const { clientRef } = this.props;

    if (clientRef &&
        clientRef.current
    ) {
      this.client = clientRef.current;
      document.removeEventListener('scroll', this.nativeScrollEventListener);
      this.client.addEventListener('scroll', this.scrollbarScrollEventListener);
    } else {
      this.client && this.client.removeEventListener('scroll', this.scrollbarScrollEventListener);
      document.addEventListener('scroll', this.nativeScrollEventListener);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.nativeScrollEventListener);
    this.client && this.client.removeEventListener('scroll', this.scrollbarScrollEventListener);
  }

  scrollEventListener(client) {
    const { visibleScrollPage } = this.state;
    const { scrollHeight, clientHeight } = client;
    const scrollTop = client.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
    const scrollTopMax = scrollHeight - clientHeight;
    const scrollPercentage = scrollTop / scrollTopMax;

    if (!visibleScrollPage &&
        0.15 < scrollPercentage
    ) {
      this.setState({
        visibleScrollPage: true,
      });
    } else if (visibleScrollPage &&
        0.15 >= scrollPercentage
    ) {
      this.setState({
        visibleScrollPage: false,
      });
    }
  }

  nativeScrollEventListener() {
    this.scrollEventListener(document.documentElement);
  }

  scrollbarScrollEventListener() {
    const { clientRef } = this.props;

    if (clientRef &&
        clientRef.current
    ) {
      this.scrollEventListener(clientRef.current);
    }
  }

  handleClickScroll(event) {
    event.preventDefault();
    const { clientRef } = this.props;
    let client = null;

    if (clientRef &&
        clientRef.current
    ) {
      client = clientRef.current;
    } else {
      client = 'html, body';
    }

    window.$(client).animate({
      scrollTop: 0,
    }, 500);
  }

  render() {
    const { visibleScrollPage } = this.state;
    const { className, anchor } = this.props;
    const classList = this.className.split();
    className && classList.push(className);

    if (visibleScrollPage) {
      return (
        <a
          className={ classList.join(' ') }
          href={ anchor }
          onClick={ this.handleClickScroll }
        >
          <span className={ `${ this.className }__arrow` } />
        </a>
      );
    } else {
      return '';
    }
  }
}

export default ScrollPage;
