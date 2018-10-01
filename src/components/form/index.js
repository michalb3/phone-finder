import React, { Component } from 'react';
import { LanguagesContext } from '../../contexts';
import Scrollbar from '../scrollbar';
import Search from '../search';
import Sliders from '../sliders';
import CheckboxGroup from '../checkbox-group';

class Form extends Component {
  constructor(props) {
    super(props);

    this.className = 'form';
    this.formRef = React.createRef();
    this.switcherRef = React.createRef();
    this.resizeEventListener = this.resizeEventListener.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEventListener);
  }

  resizeEventListener() {
    const form = this.formRef.current;
    form.style.transition = 'none';
    form.style.marginLeft = `${ -form.offsetWidth }px`;

    setTimeout(() => {
      form.style.transition = '';
    }, 1);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleReset(event) {
    event.preventDefault();
    this.props.onReset();
  }

  handleSwitch(event) {
    event.preventDefault();
    const form = this.formRef.current;
    const switcher = this.switcherRef.current;
    const { marginLeft } = form.style;

    if (marginLeft) {
      form.style.marginLeft = '';
      form.classList.remove(`${ this.className }--hidden`);
      switcher.classList.remove(`${ this.className }__switcher--on`);

      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeEventListener);
        this.resizeListener = false;
      }
    } else {
      form.style.marginLeft = `${ -form.offsetWidth }px`;
      form.classList.add(`${ this.className }--hidden`);
      switcher.classList.add(`${ this.className }__switcher--on`);

      if (!this.resizeListener) {
        window.addEventListener('resize', this.resizeEventListener);
        this.resizeListener = true;
      }
    }
  }

  render() {
    const { className, init, lang } = this.props;
    const classList = this.className.split();
    className && classList.push(className);
    classList.push('col-md-5 col-lg-4 col-xl-3');

    return (
      <form
        className={ classList.join(' ') }
        onSubmit={ this.handleSubmit }
        ref={ this.formRef }
      >
        <div className={ `${ this.className }__outer` }>
          <Scrollbar
            autoHide
            className={ `${ this.className }__scrollbar` }
          >
            <div className={ `${ this.className }__inner` }>
              <div className={ `${ this.className }__group ${ this.className }__group--search` }>
                <Search
                  className={ this.className }
                  init={ init.search }
                />
              </div>
              <div className={ `${ this.className }__group` }>
                <Sliders
                  className={ this.className }
                  init={ init.sliders }
                />
              </div>
              <div className={ `${ this.className }__group` }>
                <CheckboxGroup
                  className={ `${ this.className }__checkbox-group` }
                  queryStringKey="os"
                  init={ init.os }
                  lang={ lang && lang.os }
                />
              </div>
              <div className={ `${ this.className }__group` }>
                <CheckboxGroup
                  className={ `${ this.className }__checkbox-group` }
                  queryStringKey="resolution"
                  init={ init.resolutions }
                  lang={ lang && lang.resolutions }
                />
              </div>
              <a
                className={ `link ${ this.className }__reset` }
                href="/"
                onClick={ this.handleReset }
              >
                { lang && lang.reset }
              </a>
            </div>
          </Scrollbar>
          <button
            type="button"
            className={ `${ this.className }__switcher` }
            onClick={ this.handleSwitch }
            ref={ this.switcherRef }
          />
        </div>
      </form>
    );
  }
}

export default props => (
  <LanguagesContext.Consumer>
    { lang =>
      <Form
        { ...props }
        lang={ lang &&
          Object.assign({},
            lang.form,
            { resolutions: lang.resolutions, os: lang.os }
          )
        }
      />
    }
  </LanguagesContext.Consumer>
);
