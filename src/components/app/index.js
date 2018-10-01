import React, { Component } from 'react';
import { config, languages } from '../../config.js';
import { LanguagesContext, CookiesContext, QueryStringContext } from '../../contexts';
import AjaxLoader from '../ajax-loader';
import Form from '../form';
import Content from '../content';
import CookieInfo from '../cookie-info';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      init: {},
      data: {},
      lang: languages[config.defaultLang],
      search: window.location.search,
      cookie: document.cookie,
      error: null,
      appLoaded: false,
      contentLoaded: true,
    };

    this.className = 'app';
    this.itemsCache = {};
    this.getCookies = this.getCookies.bind(this);
    this.setCookie = this.setCookie.bind(this);
    this.getQueryString = this.getQueryString.bind(this);
    this.setQueryString = this.setQueryString.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    const { search } = this.state;
    const { lang } = this.getCookies();

    if (languages.hasOwnProperty(lang) &&
        lang !== config.defaultLang
    ) {
      this.setState({
        lang: languages[lang],
      });
    }

    this.setLang();

    fetch(`${ config.api }/init/${ search }`)
      .then(res => res.json())
      .then(
        (result) => {
          const { init, data } = result

          this.setState({
            init: init,
            data: data,
            appLoaded: true,
          });

          this.setCache(search, data);
        },
        (error) => {
          this.setState({
            error,
            appLoaded: true,
          });
        },
      );
  }

  componentDidUpdate(prevProps, prevState) {
    const { lang, search, cookie, contentLoaded } = this.state;

    if (lang &&
        lang.code !== prevState.lang.code
    ) {
      this.setLang();
    }

    if (search !== prevState.search) {
      this.setState({
        contentLoaded: false,
      });

      if (this.inCache(search)) {
        setTimeout(() => {
          this.setState({
            data: this.getCache(search),
            contentLoaded: true,
          }, this.setUrl());
        }, 100);
      } else {
        fetch(`${ config.api }/data/${ search }`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                data: result,
                contentLoaded: true,
              });

              this.setCache(search, result);
            },
            (error) => {
              this.setState({
                error,
                contentLoaded: true,
              });
            },
          );
      }
    }

    if (cookie !== prevState.cookie) {
      const { lang } = this.getCookies();

      if (languages.hasOwnProperty(lang) &&
          lang !== prevState.lang.code
      ) {
        this.setState({
          lang: languages[lang],
        });
      }
    }

    if (contentLoaded &&
        contentLoaded !== prevState.contentLoaded
    ) {
      this.setUrl();
    }
  }

  setLang() {
    const { lang } = this.state;

    if (lang) {
      document.title = lang.title;
      document.documentElement.setAttribute('lang', lang.code);
    }
  }

  setUrl() {
    window.history.pushState(null, null, `/${ this.state.search }`);
  }

  inCache(cacheKey) {
    return this.itemsCache.hasOwnProperty(cacheKey);
  }

  getCache(cacheKey) {
    if (this.inCache(cacheKey)) {
      return this.itemsCache[cacheKey];
    } else {
      return null;
    }
  }

  setCache(cacheKey, cacheData) {
    const cacheKeys = Object.keys(this.itemsCache);

    if (cacheKeys.length >= 100) {
      for (let i = 0, cacheLength = cacheKey.length; i < cacheLength; i++) {
        if (this.itemsCache.hasOwnProperty(cacheKeys[i])) {
          delete this.itemsCache[cacheKeys[i]];
          break;
        }
      }
    }

    this.itemsCache[cacheKey] = cacheData;
  }

  getCookies() {
    const cookieObject = {};
    const cookies = this.state.cookie.split('; ');

    cookies.forEach(cookie => {
      const [key, value] = cookie.split('=');

      if (key) {
        cookieObject[key] = value;
      }
    });

    return cookieObject;
  }

  setCookie(key, value, days = 36500, path='/') {
    if (key) {
      const cookie = [];
      const date = new Date();

      date.setDate(days);

      cookie.push(`${ key }=${ value }`);
      cookie.push(`expires=${ date }`);
      cookie.push(`path=${ path }`);

      document.cookie = `${ cookie.join('; ') };`;

      this.setState({
        cookie: document.cookie,
      });
    }
  }

  getQueryString() {
    const queryString = {};
    const search = this.state.search.slice(1).split('&');

    search.forEach(query => {
      const [key, value] = query.split('=');

      if (key) {
        queryString[key] = decodeURI(value);
      }
    });

    return queryString;
  }

  setQueryString(key, value, queryString = {}) {
    let search = [];
    queryString = Object.assign({}, this.getQueryString(), queryString);
    queryString[key] = value;

    for (let key in queryString) {
      if (queryString.hasOwnProperty(key)) {
        if (key && queryString[key]) {
          search.push(`${ key }=${ queryString[key] }`);
        }
      }
    }

    this.setState(prevState => {
      search = `?${ encodeURI(search.join('&')) }`;

      if (search !== prevState.serach) {
        return {
          search: 1 < search.length ? search : '',
        };
      }
    });
  }

  handleReset() {
    window.location.search = '';
  }

  render() {
    const { appLoaded, error, lang } = this.state;

    if (appLoaded) {
      if (error) {
        return (
          <p className={ `${ this.className }__error` }>{ lang && lang.error }</p>
        );
      }

      return (
        <LanguagesContext.Provider value={ lang }>
          <CookiesContext.Provider value={ {
              getCookies: this.getCookies,
              setCookie: this.setCookie,
            } }
          >
            <QueryStringContext.Provider value={ {
                getQueryString: this.getQueryString,
                setQueryString: this.setQueryString,
              } }
            >
              <div className="container-fluid">
                <div className={ `row ${ this.className }__inner` }>
                  <Form
                    className={ `${ this.className }__form` }
                    init={ this.state.init }
                    onReset={ this.handleReset }
                  />
                  <Content
                    className={ `${ this.className }__content` }
                    init={ this.state.init }
                    data={ this.state.data }
                    contentLoaded={ this.state.contentLoaded }
                  />
                  <CookieInfo className={ `${ this.className }__cookie-info` } />
                </div>
              </div>
            </QueryStringContext.Provider>
          </CookiesContext.Provider>
        </LanguagesContext.Provider>
      )
    } else if (lang) {
      return (
        <LanguagesContext.Provider value={ lang }>
          <AjaxLoader
            className={ `${ this.className }__ajax-loader` }
            imgSrc="../img/init-loader.gif"
            loading={ appLoaded }
          />
        </LanguagesContext.Provider>
      );
    }

    return '';
  }
}

export default App;
