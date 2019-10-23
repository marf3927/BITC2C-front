import {observable, computed, action, decorate} from 'mobx'
import {createContext} from "react"
import axios from 'axios'
import {Cookies} from "react-cookie"

const cookies = new Cookies()

class AuthStore{

    baseURL = "http://localhost:5555"

    authToken = cookies.get('authToken');

    setToken(token) {
        this.authToken = token
    }

    deleteToken() {
        cookies.remove('authToken', { path: '/' })
    }

    get isLoggedIn() {
        return cookies.get('authToken') != null;
    }

    get refresh_token() {
        return cookies.get('refreshToken')
    }

}
decorate(AuthStore, {
    Token : observable,
    setToken : action,
    deleteToken : action,
    isLoggedIn : computed,
})

export const AuthStoreContext = createContext(new AuthStore())