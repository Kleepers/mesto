/* Edit popup */
const popupEdit = document.querySelector('.popup_area_edit');
const popupEditForm = popupEdit.querySelector('.popup__content');
const profile = document.querySelector('.profile');

const profileEditButton = profile.querySelector('.profile__edit-btn');
const popupEditClose = popupEditForm.querySelector('.popup__close_place_edit');

const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const inputName = popupEditForm.querySelector('.popup__input_value_name');
const inputJob = popupEditForm.querySelector('.popup__input_value_job');
/* Edit popup */

/* Add popup */
const popupAdd = document.querySelector('.popup_area_add');
const popupAddForm = popupAdd.querySelector('.popup__content');
const elements = document.querySelector('.elements');

const profileAddButton = profile.querySelector('.profile__add-btn');
const popupAddClose = popupAdd.querySelector('.popup__close_place_add');
const elementTemplate = document.querySelector('#element');

const inputPlace = popupAddForm.querySelector('.popup__input_value_place');
const inputPhoto = popupAddForm.querySelector('.popup__input_value_image');
/* Add popup */

/* photo popup */

const photoPopup = document.querySelector('.popup_area_photo');
const popupPhotoForm = photoPopup.querySelector('.popup__content');

const popupImage = popupPhotoForm.querySelector('.popup__photo');
const popupPlace = popupPhotoForm.querySelector('.popup__heading');
const popupPhotoClose = popupPhotoForm.querySelector('.popup__close_place_photo');

/* photo popup */

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


function togglePopup (popup) {
    popup.classList.toggle('popup_opened');
}

function openEditPopup () {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    togglePopup(popupEdit);
}


function popupEditSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;

    togglePopup(popupEdit);
}

function popupAddSubmit (evt) {
    evt.preventDefault();

    elements.prepend(createElement({name: inputPlace.value, link: inputPhoto.value}));


    togglePopup(popupAdd);
}

function likeCard(evt) {
    const targetElement = evt.target;
    targetElement.classList.toggle('element__like-btn_active');

}

function deleteCard(evt) {
    const targetElement = evt.target;
    const targetCard = targetElement.closest('.element');
    targetCard.remove();
}

function openPhotoPopup(evt) {
    const targetElement = evt.target;
    const targetTitle = targetElement.nextElementSibling;

    popupImage.src = targetElement.src;

    popupPlace.textContent = targetTitle.textContent;

    togglePopup(photoPopup);

}

function createElement(card) {
    const element = elementTemplate.content.cloneNode(true);
    const elementTitle = element.querySelector('.element__title');
    const elementPhoto = element.querySelector('.element__photo');
    const elementLike = element.querySelector('.element__like-btn');
    const elementDelete = element.querySelector('.element__delete-btn');

    elementTitle.textContent = card.name;
    elementPhoto.src = card.link;

    elementLike.addEventListener('click',likeCard);

    elementDelete.addEventListener('click',deleteCard);

    elementPhoto.addEventListener('click', openPhotoPopup);

    return element;
}

function renderInitialCards() {
    const cards = initialCards.map(createElement);

    elements.append(...cards);
}

renderInitialCards();


popupEditForm.addEventListener('submit',popupEditSubmit);

profileEditButton.addEventListener('click',openEditPopup);

profileAddButton.addEventListener('click', () => {togglePopup(popupAdd)});

popupEditClose.addEventListener('click', () => {togglePopup(popupEdit)});

popupAddClose.addEventListener('click', () => {togglePopup(popupAdd)});

popupAddForm.addEventListener('submit',popupAddSubmit);

popupPhotoClose.addEventListener('click', () => {togglePopup(photoPopup)});















