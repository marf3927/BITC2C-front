import {observable, computed, action, decorate} from 'mobx'
import {createContext} from "react"
import {Cookies} from "react-cookie"
const cookies = new Cookies()

export default class AuthStore {

    baseURL = "http://localhost:5555"

    authToken = cookies.get('authToken')

    setToken(token) {
        this.authToken = token
    }

    deleteToken() {
        cookies.remove('authToken', {expires: 'Thu, 01 Jan 1970 00:00:01 GMT'})
    }

    get isLoggedIn() {
        return cookies.get('authToken') != null;
    }

    get refresh_token() {
        return cookies.get('refreshToken')
    }

    setSoalarm(){

    }

    get soalarm() {
        return  soalarm;
    }

}


decorate(AuthStore, {
    soalarm : observable,
    authToken : observable,
    setToken : action,
    deleteToken : action,
    isLoggedIn : computed,
    isExpired : observable
})

export const AuthStoreContext = createContext(new AuthStore())