import {initialCards} from './InitialCards.js';
import Card from './Card.js';
import {ValidationSettings} from "./ValidationSettings.js";
import FormValidator from "./FormValidator.js";

/* Edit popup */
const popupEdit = document.querySelector('.popup_area_edit');
const popupEditForm = popupEdit.querySelector('.popup__content');
const profile = document.querySelector('.profile');

const profileEditButton = profile.querySelector('.profile__edit-btn');
const popupEditClose = popupEditForm.querySelector('.popup__close_place_edit');

const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__description');

const inputName = popupEditForm.querySelector('.popup__input_value_name');
const inputInfo = popupEditForm.querySelector('.popup__input_value_info');
const popupEditSubmitBtn = popupEditForm.querySelector('.popup__submit_place_edit');
/* Edit popup */

/* Add popup */
const popupAdd = document.querySelector('.popup_area_add');
const popupAddForm = popupAdd.querySelector('.popup__content');
const elements = document.querySelector('.elements');

const profileAddButton = profile.querySelector('.profile__add-btn');
const popupAddClose = popupAdd.querySelector('.popup__close_place_add');
const elementTemplate = '.card';

const inputPlace = popupAddForm.querySelector('.popup__input_value_place');
const inputPhoto = popupAddForm.querySelector('.popup__input_value_image');
const popupAddSubmitBtn = popupAdd.querySelector('.popup__submit_place_add');
/* Add popup */

/* photo popup */

const photoPopup = document.querySelector('.popup_area_photo');
const popupPhotoForm = photoPopup.querySelector('.popup__content');

const popupPhotoClose = popupPhotoForm.querySelector('.popup__close_place_photo');

/* photo popup */

const formValidatorAdd = new FormValidator(ValidationSettings,popupAddForm);

const formValidatorEdit = new FormValidator(ValidationSettings,popupEditForm);

/* вносим значения в input */

function setProfileInputs() {
    inputName.value = profileName.textContent;
    inputInfo.value = profileJob.textContent;
}

const popups = document.querySelectorAll('.popup')

/* функция добавляющая слушатели на клик по оверлею */
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            togglePopup(popup);
        }
    })
})

/* Общее открытие попап */
export function togglePopup (popup) {
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')) {
        document.addEventListener('keyup', escClose);
    } else {
        document.removeEventListener('keyup',escClose);
    }
}

/*Открыть редактор профиля */
function openEditPopup () {
    setProfileInputs();
    popupEditSubmitBtn.removeAttribute('disabled');
    popupEditSubmitBtn.classList.remove('popup__submit_disabled');
    togglePopup(popupEdit);
}

function openAddPopup () {
    inputPlace.value = '';
    inputPhoto.value = '';

    popupAddSubmitBtn.setAttribute('disabled', 'disabled');
    popupAddSubmitBtn.classList.add('popup__submit_disabled');

    togglePopup(popupAdd);
}

/*Подтвердить изменения профиля */
function popupEditSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileJob.textContent = inputInfo.value;

    togglePopup(popupEdit);
}

/*Подтвердить добавление карточки */
function  popupAddSubmit (evt) {
    evt.preventDefault();

    addNewCard();

    togglePopup(popupAdd);

}

function addNewCard () {
    const newCard = new Card({name: inputPlace.value, link: inputPhoto.value},elementTemplate);
    const cardElement = newCard.generateCard();

    elements.prepend(cardElement);
}

/* функция закрытия попап при клике на esc */
function escClose(evt) {
    if (evt.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_opened');
        togglePopup(currentPopup);
    }
}

/*Функция создания карточки,принимает данные с изначального массива/при добавлении карточки в popupAddSubmit*/

initialCards.forEach((item) => {
    const card = new Card(item, elementTemplate);
    const cardElement = card.generateCard();

    elements.append(cardElement);
});

formValidatorAdd.enableValidation();
formValidatorEdit.enableValidation();

popupEditForm.addEventListener('submit',popupEditSubmit);

profileEditButton.addEventListener('click',openEditPopup);

profileAddButton.addEventListener('click', openAddPopup);

popupEditClose.addEventListener('click', () => {togglePopup(popupEdit)});

popupAddClose.addEventListener('click', () => {togglePopup(popupAdd)});

popupAddForm.addEventListener('submit',popupAddSubmit);

popupPhotoClose.addEventListener('click', () => {togglePopup(photoPopup)});
















