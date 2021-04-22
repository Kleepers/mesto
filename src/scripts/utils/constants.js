const popupProfile = document.querySelector('.popup_area_edit');
const popupCards = document.querySelector('.popup_area_add');
const popupAvatar = document.querySelector('.popup_area_avatar');
const popupDelete = document.querySelector('.popup_area_delete');
const formAvatar = popupAvatar.querySelector('.popup__content');
const formProfile = popupProfile.querySelector('.popup__content');
const formCards = popupCards.querySelector('.popup__content');
const formDelete = popupDelete.querySelector('.popup__content')
const inputName = formProfile.querySelector('.popup__input_value_name');
const inputInfo = formProfile.querySelector('.popup__input_value_info');
const openPopupProfile = document.querySelector('.profile__edit-btn');
const openPopupCards = document.querySelector('.profile__add-btn');
const cardPlace = document.querySelector('.elements');
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarSelector = '.profile__avatar';
const popupPhotoSelector = '.popup_area_photo';
const profileNameSelector = '.profile__name';
const profileDescSelector = '.profile__description';
const cardSelector = '.card';
const popupProfileSelector = '.popup_area_edit';
const popupCardsSelector = '.popup_area_add';
const popupDeleteSelector = '.popup_area_delete'
const cardPlaceSelector = '.elements';
const popupAvatarSelector = '.popup_area_avatar';

const profileName = document.querySelector(profileNameSelector);
const profileDesc = document.querySelector(profileDescSelector);
const userId = "e3c680abf4dc4407bc8365d5";

const popupCardsButton = popupCards.querySelector('.popup__submit');
const popupProfileButton = popupProfile.querySelector('.popup__submit');
const popupAvatarButton = popupAvatar.querySelector('.popup__submit');




export {popupCardsButton,popupProfileButton,popupAvatarButton,userId,popupDeleteSelector,popupDelete,formDelete,profileDesc,profileName,profileAvatarSelector,profileAvatar,popupAvatarSelector,formAvatar,cardPlaceSelector,popupCardsSelector,popupProfileSelector,inputName, inputInfo, openPopupCards,openPopupProfile,cardPlace,formProfile,formCards,popupPhotoSelector,profileNameSelector,profileDescSelector,cardSelector};