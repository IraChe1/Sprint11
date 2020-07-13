export class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    getCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) return res.json()
                return Promise.reject(`Что-то пошло не так: ${res.status}`)
            });
    }

    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) return res.json()
                return Promise.reject(`Что-то пошло не так: ${res.status}`)
            });
    }

    updUserInfo(newName, newAbout) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,

            body: JSON.stringify({
                name: newName,
                about: newAbout
            })
        })
            .then(res => {
                if (res.ok) return res.json()
                return Promise.reject(`Что-то пошло не так: ${res.status}`)
            })
    }

    createCard(cardName, imgLink) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,

            body: JSON.stringify({
                name: cardName,
                link: imgLink
            })
        })
            .then(res => {
                if (res.ok) return res.json()
                return Promise.reject(`Что-то пошло не так: ${res.status}`)
            });
    }
}
