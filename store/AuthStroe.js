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
<<<<<<< HEAD

    setSoalarm(data){
        this.soalarm = data;
    }

    get getSoalarm() {
        return this.soalarm;
    }

}
decorate(AuthStore, {
    soalarm : observable,
    setSoalarm : action,
    getSoalarm : computed,
    authToken : observable,
    setToken : action,
    deleteToken : action,
    isLoggedIn : computed,
})
=======
}
>>>>>>> origin/master

export const AuthStoreContext = createContext(new AuthStore())