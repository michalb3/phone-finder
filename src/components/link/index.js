import React, { Component, Fragment } from 'react';

class Link extends Component {
  constructor(props) {
    super(props);

    this.className = 'link';
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onClick(this.props.linkData);
  }

  render() {
    const { className } = this.props;
    const classList = this.className.split();
    className && classList.push(className);

    return (
      <Fragment>
        { this.props.linkData &&
          <a
            className={ classList.join(' ') }
            href={ this.props.href }
            onClick={ this.handleClick }
          >
            { this.props.anchorText }
          </a>
        }
      </Fragment>
    );
  }
}

export default Link;
