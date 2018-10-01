import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.className = 'checkbox';
  }

  render() {
    const { className, htmlFor, text, ...inputData } = this.props;
    const classList = this.className.split();
    className && classList.push(className);

    return (
      <div className={ classList.join(' ') }>
        <input
          type="checkbox"
          id={ htmlFor }
          className={ `${ this.className }__input` }
          { ...inputData }
        />
        <label
          className={ `${ this.className }__label` }
          htmlFor={ htmlFor }
        >
          { text }
        </label>
      </div>
    );
  }
}

export default Checkbox;
