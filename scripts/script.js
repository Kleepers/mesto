let popup = document.querySelector('.popup');
let popupToggle = document.querySelector('.profile__editbutton');
let popupclose = document.querySelector('.popup__close');

popupToggle.onclick = function () {
    popup.classList.add('popup_opened');
};

popupclose.onclick = function () {
    popup.classList.remove('popup_opened');
};

let formElement = document.querySelector('.popup__content');

let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');



function formSubmitHandler (evt) {

    evt.preventDefault();

    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job');

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    nameInput.placeholder = nameInput.value;
    jobInput.placeholder = jobInput.value;

    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);




