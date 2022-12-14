import { URL_CONFIG } from "./constants.js";

class Api {
    constructor(token) {
        this._URL_CONFIG = URL_CONFIG;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Bug detected! ${res.status}: ${res.statusText}`);
    }

    getData(forUrl) {
        return fetch(this._URL_CONFIG.url + forUrl, {
            headers: this._URL_CONFIG.headers,
        })
            .then(this._checkResponse);
    }

    changeLike(cardId, state) {
        const likeMethod = state ? 'PUT' : 'DELETE'
        return fetch(this._URL_CONFIG.url + 'cards/' + cardId + '/likes', {
            headers: this._URL_CONFIG.headers,
            method: likeMethod
        })
            .then(this._checkResponse);
    }

    setCard(settings) {
        return fetch(this._URL_CONFIG.url + 'cards', {
            headers: this._URL_CONFIG.headers,
            method: 'POST',
            body: JSON.stringify(settings),
        })
            .then(this._checkResponse);
    }

    delCard(cardId) {
        return fetch(this._URL_CONFIG.url + 'cards/' + cardId, {
            headers: this._URL_CONFIG.headers,
            method: 'DELETE'
        })
            .then(this._checkResponse);
    }

    setProfile(data) {
        return fetch(this._URL_CONFIG.url + 'users/me', {
            headers: this._URL_CONFIG.headers,
            method: 'PATCH',
            body: JSON.stringify(data),
        })
            .then(this._checkResponse);
    }

    setAvatar(data) {
        return fetch(this._URL_CONFIG.url + 'users/me/avatar', {
            headers: this._URL_CONFIG.headers,
            method: 'PATCH',
            body: JSON.stringify(data),
        })
            .then(this._checkResponse);
    }
}

const api = new Api();
export default api;