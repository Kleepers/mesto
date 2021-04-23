import './index.css';
import {validationSettings} from "../scripts/utils/validationSettings.js";
import {
    cardPlaceSelector,
    formCards,
    formProfile,
    inputInfo,
    inputName,
    openPopupCards,
    openPopupProfile,
    cardPlace,
    popupPhotoSelector,
    profileDescSelector,
    profileNameSelector,
    cardSelector,
    popupProfileSelector,
    popupCardsSelector,
    formAvatar,
    popupAvatarSelector,
    profileAvatar,
    profileAvatarSelector,
    popupDeleteSelector,
    popupProfileButton,
    popupAvatarButton,
    popupCardsButton,
} from "../scripts/utils/constants.js";
// классы

import Card from '../scripts/components/Card.js';
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

// классы Popup
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";

const userInfo = new UserInfo({userName: profileNameSelector,userInfo: profileDescSelector,userAvatar: profileAvatarSelector});
const popupWithImage = new PopupWithImage(popupPhotoSelector);
const formValidatorProfile = new FormValidator(validationSettings, formProfile);
const formValidatorCards = new FormValidator(validationSettings, formCards);
const formValidatorAvatar = new FormValidator(validationSettings,formAvatar);
const api = new Api();

let userId = null;

function handleCardClick(link, text) {
    popupWithImage.open(link, text);
}

function handleLikeClick (card) {
    api.changeLikeCardStatus(card.id(),!card.isLiked())
        .then(data => {
            card.setLikesInfo(data);
        })
        .catch(err => console.log(`Ошибка изменения статуса лайка: ${err}`))
}


/* вносим значения в input */

function setProfileInputs() {
    const user = userInfo.getUserInfo();
    inputName.value = user.userName;
    inputInfo.value = user.userInfo;
}

function createCard (item) {
    const card = new Card(item, cardSelector, handleCardClick,handleDeleteIconClick,handleLikeClick,userId);
    return card.generateCard();
}

const popupWithFormProfile = new PopupWithForm({
    popupSelector: popupProfileSelector,
    handleFormSubmit: (formData) => {
        popupProfileButton.textContent = 'Сохранение..';
        api.updateUserInfo(formData)
            .then((info) => {
                setTimeout(() => {
                    userInfo.setUserInfo({userName: info.name, userInfo: info.about});
                })
                popupWithFormProfile.close();
                popupProfileButton.textContent = 'Сохранить';
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
)

const popupWithFormCards = new PopupWithForm({
    popupSelector: popupCardsSelector,
    handleFormSubmit: (formData) => {
        popupCardsButton.textContent = 'Создание..';
        api.addNewCard(formData)
            .then((result) => {
                setTimeout(() => {
                    const cardElement = createCard({
                        name: formData.place,
                        link: formData.image,
                        likes: result.likes,
                        owner: result.owner,
                        _id: result._id
                    });
                    cardPlace.prepend(cardElement);
                })
                popupWithFormCards.close();
                popupCardsButton.textContent = 'Создать';
            })
            .catch((err) => {
                console.log(err);
            })
    }
})

function handleDeleteIconClick (card) {
    popupWithFormDelete.handleFormSubmit = () => {
        api.deleteCard(card._id)
            .then(() => {
                this._element.remove();
                this._element = null;
                popupWithFormDelete.close();
            })
            .catch(err => console.log(`При удалении карточки ${err}`))
    }
    popupWithFormDelete.open();
}


const popupWithFormDelete = new PopupWithForm({
    popupSelector: popupDeleteSelector,
    handleFormSubmit: () => {

    }
});

const popupWithFormAvatar = new PopupWithForm({
    popupSelector: popupAvatarSelector,
    handleFormSubmit: (formData) => {
        popupAvatarButton.textContent = 'Сохранение'
        api.updateUserAvatar({link: formData.avatar})
            .then(res => {
                setTimeout(() => {
                userInfo.setUserAvatar({userAvatar: res.avatar});
                })
                popupWithFormAvatar.close();
                popupAvatarButton.textContent = 'Сохранить..'
            })
            .catch(err => console.log(err))
}
})

Promise.all([api.getInitialCards(),api.getUserInfoApi()])
    .then(([cards,userData]) => {
        userId = userData._id;
        userInfo.setUserInfo({
            userName: userData.name,
            userInfo: userData.about,
        })
        userInfo.setUserAvatar({
            userAvatar: userData.avatar
        });
        const elements = new Section({
            items: cards,
            renderer: (item) => {
                const cardElement = createCard(item);
                elements.addItem(cardElement);
            }
        }, cardPlaceSelector)
        elements.renderItems();
    })
    .catch(err => console.log(`Ошибка загрузки данных: ${err}`))

popupWithFormCards.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormDelete.setEventListeners();

formValidatorProfile.enableValidation();
formValidatorCards.enableValidation();
formValidatorAvatar.enableValidation();

profileAvatar.addEventListener('click', () => {
    popupWithFormAvatar.open();
})

openPopupProfile.addEventListener('click', () => {
    setProfileInputs();
    formValidatorProfile.clearErrors();
    popupWithFormProfile.open();
})

openPopupCards.addEventListener('click', () => {
    popupWithFormCards.open();
    formValidatorCards.clearErrors();
    formValidatorCards._toggleButtonState();
})

























