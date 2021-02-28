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
const elementTemplate = document.querySelector('#element');

const inputPlace = popupAddForm.querySelector('.popup__input_value_place');
const inputPhoto = popupAddForm.querySelector('.popup__input_value_image');
const popupAddSubmitBtn = popupAdd.querySelector('.popup__submit_place_add');
/* Add popup */

/* photo popup */

const photoPopup = document.querySelector('.popup_area_photo');
const popupPhotoForm = photoPopup.querySelector('.popup__content');

const popupImage = popupPhotoForm.querySelector('.popup__photo');
const popupPlace = popupPhotoForm.querySelector('.popup__heading');
const popupPhotoClose = popupPhotoForm.querySelector('.popup__close_place_photo');

/* photo popup */

/* вносим значения в input (для фикса disabled кнопки при открытии editPopup,используется 1 раз в validate)*/
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
function togglePopup (popup) {
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
/*Поставить лайк карточке */
function likeCard(evt) {
    const targetElement = evt.target;
    targetElement.classList.toggle('element__like-btn_active');

}
/*Удалить карточку */
function deleteCard(evt) {
    const targetElement = evt.target;
    const targetCard = targetElement.closest('.element');
    targetCard.remove();
}
/*Открыть фотографию*/
function openPhotoPopup(card) {
    popupImage.src = card.link;
    popupImage.alt = card.name;

    popupPlace.textContent = card.name;

    togglePopup(photoPopup);
}

/*Функция создания карточки,принимает данные с изначального массива/при добавлении карточки в popupAddSubmit*/
function createElement(card) {
    const element = elementTemplate.content.cloneNode(true);
    const elementTitle = element.querySelector('.element__title');
    const elementPhoto = element.querySelector('.element__photo');
    const elementLike = element.querySelector('.element__like-btn');
    const elementDelete = element.querySelector('.element__delete-btn');

    elementTitle.textContent = card.name;
    elementPhoto.src = card.link;
    elementPhoto.alt = card.name;


    elementLike.addEventListener('click',likeCard);

    elementDelete.addEventListener('click',deleteCard);

    elementPhoto.addEventListener('click', () => openPhotoPopup({name:card.name,link:card.link}));

    return element;
}

/*Подтвердить добавление карточки */
function popupAddSubmit (evt) {
    evt.preventDefault();

    elements.prepend(createElement({name: inputPlace.value, link: inputPhoto.value}));

    togglePopup(popupAdd);

}

/* функция закрытия попап при клике на esc */
function escClose(evt) {
    if (evt.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_opened');
        togglePopup(currentPopup);
    }
}

/* рендер карточек из InitialCards */
function renderInitialCards() {
    const cards = initialCards.map(createElement);

    elements.append(...cards);
}

renderInitialCards();

popupEditForm.addEventListener('submit',popupEditSubmit);

profileEditButton.addEventListener('click',openEditPopup);

profileAddButton.addEventListener('click', openAddPopup);

popupEditClose.addEventListener('click', () => {togglePopup(popupEdit)});

popupAddClose.addEventListener('click', () => {togglePopup(popupAdd)});

popupAddForm.addEventListener('submit',popupAddSubmit);

popupPhotoClose.addEventListener('click', () => {togglePopup(photoPopup)});
















