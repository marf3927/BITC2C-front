import App from 'next/app'
import React from 'react'
import {CookieProvide, CookiesProvider} from 'react-cookie'
import 'semantic-ui-css/semantic.min.css';
export default class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props
        return (
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>
        )
    }
}