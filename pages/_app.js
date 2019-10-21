import App, { Container } from 'next/app';
import React from 'react';
import {CookieProvide, CookiesProvider} from 'react-cookie';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
    );
  }
}