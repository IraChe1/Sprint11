class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

/*REVIEW. +++ Нужно исправить. В статический метод reject класса Promise нужно передать аргумент res.status, чтобы этот метод знал, какая именно ошибка (с каким
       статусом) произошла и сформировал объект именно этой ошибки, которая затем будет обнаружена в методе catch, где Вы и сможете сообщить пользователю
       какая именно ошибка произошла.  О Promis API можно кратко прочитать здесь
       https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise.

       То есть должна быть инструкция:
       return Promise.reject(res.status);
       О методе  fetch можно прочитать здесь https://learn.javascript.ru/fetch), об обнаружении ошибок в цепочке промисов здесь:
        https://learn.javascript.ru/promise-error-handling.

*/
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
