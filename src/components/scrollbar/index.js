import React, { Component, Fragment } from 'react';

class Scrollbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleScrollbar: false,
    };

    this.className = 'scrollbar';
    this.desktopScreenWidth = props.desktopScreenWidth || 768;
    this.scrollbarInnerRef = React.createRef();
    this.scrollbarYRef = React.createRef();
    this.initResizeListener = this.initResizeListener.bind(this);
    this.resizeListener = this.resizeListener.bind(this);
    this.scrollListener = this.scrollListener.bind(this);
    this.handleSliderClick = this.handleSliderClick.bind(this);
    this.handleScrollbarYClick = this.handleScrollbarYClick.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth >= this.desktopScreenWidth) {
      this.setState({
        visibleScrollbar: true,
      });
    }

    window.addEventListener('resize', this.initResizeListener);
  }

  componentDidUpdate(prevProps, prevState) {
    const { visibleScrollbar } = this.state;

    setTimeout(() => {
      this.resizeListener();

      if (visibleScrollbar !== prevState.visibleScrollbar) {
        if (visibleScrollbar) {
          this.scrollbarInner.addEventListener('scroll', this.scrollListener);
          window.addEventListener('resize', this.resizeListener);
          window.$(this.scrollbarY).draggable({
            axis: 'y',
            drag: (event, ui) => {
              const topMax = this.clientHeight - this.scrollbarHeight;

              if (0 > ui.position.top) {
                ui.position.top = 0;
              } else if (topMax < ui.position.top) {
                ui.position.top = topMax;
              }

              this.scrollbarInner.scrollTop = (ui.position.top / topMax) * this.scrollTopMax;
            },
          });
        } else {
          this.scrollbarInner && this.scrollbarInner.removeEventListener('scroll', this.scrollListener);
          window.removeEventListener('resize', this.resizeListener);
          this.scrollbarY && window.$(this.scrollbarY).draggable('destroy');
        }

        // Passing of "scrollbarRef" to the parent component
        if (typeof this.props.scrollbarRef === 'function') {
          this.props.scrollbarRef(this.scrollbarInnerRef);
        }
      }
    }, 600);
  }

  componentWillUnmount() {
    this.scrollbarInner && this.scrollbarInner.removeEventListener('scroll', this.scrollListener);
    window.removeEventListener('resize', this.initResizeListener);
    window.removeEventListener('resize', this.resizeListener);
    this.scrollbarY && window.$(this.scrollbarY).draggable('destroy');
  }

  // Toggling of the scrollbar visibility
  initResizeListener() {
    const { visibleScrollbar } = this.state;

    if (window.innerWidth >= this.desktopScreenWidth) {
      if (!visibleScrollbar) {
        this.setState({
          visibleScrollbar: true,
        });
      }
    } else if (visibleScrollbar) {
      this.setState({
        visibleScrollbar: false,
      });
    }
  }

  resizeListener() {
    this.scrollbarInner = this.scrollbarInnerRef.current;
    this.scrollbarY = this.scrollbarYRef.current;

    if (this.scrollbarInner &&
        this.scrollbarY
    ) {
      this.clientHeight = this.scrollbarInner.clientHeight;
      this.scrollHeight = this.scrollbarInner.scrollHeight;
      this.scrollbarHeight = (this.clientHeight / this.scrollHeight) * this.clientHeight;

      if (this.clientHeight === this.scrollbarHeight) {
        // If the content isn't scrollable, hide the scrollbar
        this.scrollbarInner.classList.add(`${ this.className }__inner--hidden`);
      } else {
        const { scrollTop } = this.scrollbarInner;
        this.scrollTopMax = this.scrollHeight - this.clientHeight;
        const top = (scrollTop / this.scrollTopMax) * (this.clientHeight - this.scrollbarHeight);

        // Setting of the scrollbar height and position
        this.scrollbarY.style.top = `${ top }px`;
        this.scrollbarY.style.height = `${ this.scrollbarHeight }px`;
        this.scrollbarInner.classList.remove(`${ this.className }__inner--hidden`);
      }
    }
  }

  // Change of the scrollbar position after scroll of the content
  scrollListener() {
    const { scrollTop } = this.scrollbarInner;
    const top = (scrollTop / this.scrollTopMax) * (this.clientHeight - this.scrollbarHeight);

    this.scrollbarY.style.top = `${ top }px`;
  }

  // Scrolling of the content by mouse click
  handleSliderClick(event) {
    const { target, pageY } = event;
    const targetRect = target.getBoundingClientRect();

    this.scrollbarInner.scrollTop = ((pageY - targetRect.top) / (this.clientHeight - this.scrollbarHeight)) * this.scrollTopMax;
  }

  handleScrollbarYClick(event) {
    event.stopPropagation();
  }

  render() {
    const { visibleScrollbar } = this.state;
    const { className, autoHide } = this.props;
    const classList = this.className.split();
    autoHide && classList.push(`${ this.className }--auto-hide`);
    className && classList.push(className);

    if (visibleScrollbar) {
      return (
        <div className={ classList.join(' ') }>
          <div
            className={ `${ this.className }__inner` }
            ref={ this.scrollbarInnerRef }
          >
            { this.props.children }
            <div
              className={ `${ this.className }__slider` }
              onClick={ this.handleSliderClick }
            >
              <div
                className={ `${ this.className }__vertical` }
                onClick={ this.handleScrollbarYClick }
                ref={ this.scrollbarYRef }
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Fragment>
          { this.props.children }
        </Fragment>
      );
    }
  }
}

export default Scrollbar;
