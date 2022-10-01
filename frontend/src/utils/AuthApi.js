import { BASE_URL, headers } from "./constants.js";

class AuthApi {
    constructor() {
        this._BASE_URL = BASE_URL;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Bug detected! ${res.status}: ${res.statusText}`);
    }

    register(data) {
        return fetch(BASE_URL + '/signup', {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(this._checkResponse);
    }

    authorize(data) {
        return fetch(BASE_URL + '/signin', {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data),
        })
            // .then(res => res.json()); 
            .then(this._checkResponse);
    }

    authByToken(token) {
        return fetch(BASE_URL + '/users/me', {
            method: 'GET',
            headers: {
                ...this._headers,
                "Authorization": `Bearer ${token}`,
            },
        })
            // .then(res => res.json());
            .then(this._checkResponse);
    }
}

const authApi = new AuthApi();
export default authApi;