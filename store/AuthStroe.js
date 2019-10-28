import {observable, computed, action, decorate} from 'mobx'
import {createContext} from "react"
import axios from 'axios'
import {Cookies} from "react-cookie"

const cookies = new Cookies()

class AuthStore{

    @observable
    baseURL = "http://localhost:5555"
    soalarm = ''

    authToken = cookies.get('authToken');

    @action
    setToken(token) {
        this.authToken = token
    }

    @action
    deleteToken() {
        console.log("logout클릭!")
        cookies.remove('authToken', { expires:'Thu, 01 Jan 1970 00:00:01 GMT' })
    }

    @computed
    get isLoggedIn() {
        return cookies.get('authToken') != null;
    }

    get refresh_token() {
        return cookies.get('refreshToken')
    }

    @action
    setSoalarm(date) {
        this.soalarm = date
    }
    
    @computed
    get getSoalarm() {
        return this.soalarm;
    }

}

export const AuthStoreContext = createContext(new AuthStore())