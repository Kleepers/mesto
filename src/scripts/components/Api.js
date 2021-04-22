export default class Api {
    constructor() {
    }


    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-22/cards', {
            method: 'GET',
            headers: {
                authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871'
            }
        })
            .then((res) => {
                return res.json();
            })
    }

    getUserInfoApi() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-22/users/me', {
            method: 'GET',
            headers: {
                authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871'
            },
        })
            .then((res) => {
                return res.json();
            })
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
    }

    deleteCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-22/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871',
            }
        })
    }

    cardLikeSet(id) {
        return fetch (`https://mesto.nomoreparties.co/v1/cohort-22/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871'
            }
        })
            .then((res) => {
                return res.json();
            })
    }

    cardLikeDelete(id) {
        return fetch (`https://mesto.nomoreparties.co/v1/cohort-22/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871'
            }
        })
            .then((res) => {
                return res.json();
            })
    }

    updateUserAvatar(formData) {
        console.log(formData.link);
        return fetch ('https://mesto.nomoreparties.co/v1/cohort-22/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar:formData.link})
        })
    }
}
