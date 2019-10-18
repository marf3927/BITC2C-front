import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import {CookieProvide, CookiesProvider} from 'react-cookie';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <CookiesProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        </CookiesProvider>
    );
  }
}