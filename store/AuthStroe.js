import {observable, computed, action, decorate} from 'mobx'
import {createContext} from "react"
import {Cookies} from "react-cookie"
const cookies = new Cookies()

export default class AuthStore {

    @observable
    baseURL = "http://localhost:5555"

    authToken = cookies.get('authToken')

    @action
    setToken(token) {
        this.authToken = token
    }

    @action
    deleteToken() {
        cookies.remove('authToken', {expires: 'Thu, 01 Jan 1970 00:00:01 GMT'})
    }

    @computed
    get isLoggedIn() {
        return cookies.get('authToken') != null;
    }

    get refresh_token() {
        return cookies.get('refreshToken')
    }
}

export const AuthStoreContext = createContext(new AuthStore())