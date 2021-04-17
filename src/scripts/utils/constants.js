const popupProfile = document.querySelector('.popup_area_edit');
const popupCards = document.querySelector('.popup_area_add');
const formProfile = popupProfile.querySelector('.popup__content');
const formCards = popupCards.querySelector('.popup__content');
const inputName = formProfile.querySelector('.popup__input_value_name');
const inputInfo = formProfile.querySelector('.popup__input_value_info');
const openPopupProfile = document.querySelector('.profile__edit-btn');
const openPopupCards = document.querySelector('.profile__add-btn');
const cardPlace = document.querySelector('.elements');
const popupPhotoSelector = '.popup_area_photo';
const profileNameSelector = '.profile__name';
const profileDescSelector = '.profile__description';
const cardSelector = '.card';
const popupProfileSelector = '.popup_area_edit';
const popupCardsSelector = '.popup_area_add';
const cardPlaceSelector = '.elements';


export {cardPlaceSelector,popupCardsSelector,popupProfileSelector,inputName, inputInfo, openPopupCards,openPopupProfile,cardPlace,formProfile,formCards,popupPhotoSelector,profileNameSelector,profileDescSelector,cardSelector};