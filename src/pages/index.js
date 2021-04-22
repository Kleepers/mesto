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
    profileName,
    profileDesc,
    popupDeleteSelector,
    popupProfileButton,
    popupAvatarButton,
    popupCardsButton
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

let user = {};

    api.getUserInfoApi()
        .then((result) => {
            user = result;
        })

function handleCardDelete(id) {
        api.deleteCard(id)
            .then(res => {
                if (res.ok) {
                    this._element.remove();
                }
            })
            .catch((err) => {
                console.log(err);
            })
}


function handleCardClick(link, text) {
    popupWithImage.open(link, text);
}

function cardLikeSet (id) {
    api.cardLikeSet(id)
        .then((result) => {
            this._likeCount.textContent = result.likes.length;
        })
}
function cardLikeDelete (id) {
    api.cardLikeDelete(id)
        .then((result) => {
            this._likeCount.textContent = result.likes.length;
        })
}


/* вносим значения в input */

function setProfileInputs() {
    const user = userInfo.getUserInfo();
    inputName.value = user.userName;
    inputInfo.value = user.userInfo;
}

function getUserinfo () {
    api.getUserInfoApi()
        .then((res) => {
            profileName.textContent = res.name;
            profileDesc.textContent = res.about;
            profileAvatar.style.backgroundImage = `url(${res.avatar})`
        })
}

function getCards () {
    api.getInitialCards()
        .then((result) => {
                const cards = new Section({
                    items: result,
                    renderer: (item) => {
                        const cardElement = createCard(item);
                        cards.addItem(cardElement);
                    }
                }, cardPlaceSelector)
                cards.renderItems();
            }
        );
}

function createCard (item) {
    const card = new Card(item, cardSelector, handleCardClick,handleCardDelete,cardLikeSet,cardLikeDelete,user);
    return card.generateCard();
}

const popupWithFormProfile = new PopupWithForm({
    popupSelector: popupProfileSelector,
    handleFormSubmit: (formData) => {
        popupProfileButton.textContent = 'Сохранение..';
        api.updateUserInfo(formData)
            .then((res) => {
                if (res.ok) {
                    setTimeout(() => {
                        userInfo.setUserInfo({userName: formData.name, userInfo: formData.info});
                    })
                    popupWithFormProfile.close();
                    popupProfileButton.textContent = 'Сохранить';
                }
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
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
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

const popupWithFormDelete = new PopupWithForm({
    popupSelector: popupDeleteSelector,
    handleFormSubmit: () => {
        popupWithFormDelete.close();
    }
})

const popupWithFormAvatar = new PopupWithForm({
    popupSelector: popupAvatarSelector,
    handleFormSubmit: (formData) => {
        popupAvatarButton.textContent = 'Сохранение'
        api.updateUserAvatar({link: formData.avatar})
            .then(res => {
                if (res.ok) {
                    setTimeout(() => {
                        userInfo.setUserAvatar(formData);
                    })
                    popupWithFormAvatar.close();
                    popupAvatarButton.textContent = 'Сохранить..'
                }
            })
            .catch((err) => {
                console.log(err);
            })
}
})

getUserinfo();
getCards();

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
























