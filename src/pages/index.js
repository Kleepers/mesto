import './index.css';
import {initialCards} from '../scripts/utils/InitialCards.js';
import {ValidationSettings} from "../scripts/utils/ValidationSettings.js";
import {formCards,formProfile, inputInfo,inputName,openPopupCards,openPopupProfile,cardPlace} from "../scripts/utils/constants.js";
// классы

import Card from '../scripts/components/Card.js';
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";

// классы Popup
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";

const userInfo = new UserInfo({userName: '.profile__name',userInfo: '.profile__description'});
const popupWithImage = new PopupWithImage('.popup_area_photo');
const formValidatorProfile = new FormValidator(ValidationSettings, formProfile);
const formValidatorCards = new FormValidator(ValidationSettings, formCards);

function handleCardClick(link, text) {
    popupWithImage.open(link, text);
}

/* вносим значения в input */

function setProfileInputs() {
    const user = userInfo.getUserInfo();
    inputName.value = user.userName;
    inputInfo.value = user.userInfo;
}

const cards = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '.card', handleCardClick);
        const cardElement = card.generateCard();
        cards.addItem(cardElement);
    }
}, '.elements');

const popupWithFormProfile = new PopupWithForm({
    popupSelector: '.popup_area_edit',
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo({userName: formData.name, userInfo: formData.info});
    }
})

const popupWithFormCards = new PopupWithForm({
    popupSelector: '.popup_area_add',
    handleFormSubmit: (formData) => {
        const additionalCard = new Card ({name: formData.place, link: formData.image}, '.card',handleCardClick);
        const cardElement = additionalCard.generateCard();
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


















