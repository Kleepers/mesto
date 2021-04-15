const popupProfile = document.querySelector('.popup_area_edit');
const popupCards = document.querySelector('.popup_area_add');
const formProfile = popupProfile.querySelector('.popup__content');
const formCards = popupCards.querySelector('.popup__content');
const inputName = formProfile.querySelector('.popup__input_value_name');
const inputInfo = formProfile.querySelector('.popup__input_value_info');
const openPopupProfile = document.querySelector('.profile__edit-btn');
const openPopupCards = document.querySelector('.profile__add-btn');
const cardPlace = document.querySelector('.elements');

export {inputName, inputInfo, openPopupCards,openPopupProfile,cardPlace,formProfile,formCards};