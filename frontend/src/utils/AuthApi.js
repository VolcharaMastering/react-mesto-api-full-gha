import { URL_CONFIG } from "./constants.js";

class AuthApi {
    constructor() {
        this._URL_CONFIG = URL_CONFIG;
    }

    _checkResponse(res) {
        if (res.ok) {
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

    // authByToken(token) {
    authByToken() {
        return fetch(this._URL_CONFIG.url, {
            method: 'GET',
            headers: {
                ...this._URL_CONFIG.headers,
                // "Authorization": `Bearer ${token}`,
            },
            credentials: "include",
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