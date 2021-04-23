export default class Api {
    constructor() {
    }

    getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        else{
            Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-22/cards', {
            method: 'GET',
            headers: {
                authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871'
            }
        })
            .then(this.getResponse)
    }

    getUserInfoApi() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-22/users/me', {
            method: 'GET',
            headers: {
                authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871'
            },
        })
            .then(this.getResponse)
    }

    updateUserInfo(formData) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-22/users/me', {
            method: 'PATCH',
            headers: {
                authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                about: formData.info
            })
        })
            .then(this.getResponse)
    }

    addNewCard(formData) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-22/cards', {
            method: 'POST',
            headers: {
                authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.place,
                link: formData.image
            })
        })
            .then(this.getResponse)
    }

    deleteCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-22/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871',
            }
        })
            .then(this.getResponse)
    }

    changeLikeCardStatus(cardId,liked) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-22/cards/likes/${cardId}`, {
            method: liked ? 'PUT' : 'DELETE',
            headers: {
                authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871',
                'Content-Type': 'application/json'
            }
        })
            .then(this.getResponse)
    }

    updateUserAvatar(formData) {
        return fetch ('https://mesto.nomoreparties.co/v1/cohort-22/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar:formData.link})
        })
            .then(this.getResponse)
    }
}
