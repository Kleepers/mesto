import './index.css';
import {initialCards} from '../scripts/utils/InitialCards.js';
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
    popupProfileSelector, popupCardsSelector
} from "../scripts/utils/constants.js";
// классы

import Card from '../scripts/components/Card.js';
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";

// классы Popup
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";

const userInfo = new UserInfo({userName: profileNameSelector,userInfo: profileDescSelector});
const popupWithImage = new PopupWithImage(popupPhotoSelector);
const formValidatorProfile = new FormValidator(validationSettings, formProfile);
const formValidatorCards = new FormValidator(validationSettings, formCards);

function handleCardClick(link, text) {
    popupWithImage.open(link, text);
}

/* вносим значения в input */

function setProfileInputs() {
    const user = userInfo.getUserInfo();
    inputName.value = user.userName;
    inputInfo.value = user.userInfo;
}

function createCard (item) {
    const card = new Card(item, cardSelector, handleCardClick);
    return card.generateCard();
}

const cards = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        cards.addItem(cardElement);
    }
}, cardPlaceSelector);

const popupWithFormProfile = new PopupWithForm({
    popupSelector: popupProfileSelector,
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo({userName: formData.name, userInfo: formData.info});
    }
})

const popupWithFormCards = new PopupWithForm({
    popupSelector: popupCardsSelector,
    handleFormSubmit: (formData) => {
        const cardElement = createCard({name: formData.place, link: formData.image});
        cardPlace.prepend(cardElement);
    }
})
popupWithFormCards.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithImage.setEventListeners();
cards.renderItems();

formValidatorProfile.enableValidation();
formValidatorCards.enableValidation();

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


















