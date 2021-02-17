let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile');

let formElement = popup.querySelector('.popup__content');
let popupClose = popup.querySelector('.popup__close');

let nameInput = formElement.querySelector('.popup__input_value_name');
let jobInput = formElement.querySelector('.popup__input_value_job');

let popupToggle = profile.querySelector('.profile__editbutton');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

function closePopup () {
    popup.classList.remove("popup_opened")
}

function openPopup () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popup.classList.add("popup_opened")
}

function formSubmitHandler (evt) {

    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

popupClose.addEventListener("click", closePopup);

popupToggle.addEventListener("click", openPopup);




