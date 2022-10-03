import { URL_CONFIG } from "./constants.js";

class AuthApi {
    constructor(token) {
        this._URL_CONFIG = URL_CONFIG;
        this._token = token;
    }

    _checkResponse(res) {
        if (res.ok) {
            console.log("OK!");
            return res.json();
        }
        return Promise.reject(`Bug detected! ${res.status}: ${res.statusText}`);
    }

    register(data) {
        return fetch(this._URL_CONFIG.url + 'signup', {
            headers: this._URL_CONFIG.headers,
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(this._checkResponse);
    }

    authorize(data) {
        return fetch(this._URL_CONFIG.url + 'signin', {
            headers: this._URL_CONFIG.headers,
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(this._checkResponse);
    }

    authByToken(token) {
        return fetch(this._URL_CONFIG.url + 'users/me', {
            method: 'GET',
            headers: {
                ...this._headers,
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(this._checkResponse);
    }
    logout() {
        return fetch(this._URL_CONFIG.url + 'logout', {
            method: 'GET',
            credentials: "include"
        })
            .then(this._checkResponse);
    }
}

const authApi = new AuthApi();
export default authApi;