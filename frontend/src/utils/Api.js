import { config } from "./constants.js";

class Api {
    constructor(token) {
        this._config = config;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Bug detected! ${res.status}: ${res.statusText}`);
    }

    getData(forUrl) {
        return fetch(this._config.url + forUrl, {
            headers: this._config.headers
        })
            .then(this._checkResponse);
    }

    changeLike(cardId, state) {
        const likeMethod = state ? 'PUT' : 'DELETE'
        return fetch(this._config.url + 'cards/' + cardId + '/likes', {
            headers: this._config.headers,
            method: likeMethod
        })
            .then(this._checkResponse);
    }

    setCard(settings) {
        return fetch(this._config.url + 'cards', {
            headers: this._config.headers,
            method: 'POST',
            body: JSON.stringify(settings),
        })
            .then(this._checkResponse);
    }

    delCard(cardId) {
        return fetch(this._config.url + 'cards/' + cardId, {
            headers: this._config.headers,
            method: 'DELETE'
        })
            .then(this._checkResponse);
    }

    setProfile(data) {
        return fetch(this._config.url + 'users/me', {
            headers: this._config.headers,
            method: 'PATCH',
            body: JSON.stringify(data),
        })
            .then(this._checkResponse);
    }

    setAvatar(data) {
        return fetch(this._config.url + 'users/me/avatar', {
            headers: this._config.headers,
            method: 'PATCH',
            body: JSON.stringify(data),
        })
            .then(this._checkResponse);
    }
}

const api = new Api();
export default api;