const popupProfile = document.querySelector('.popup_area_edit');
const popupCards = document.querySelector('.popup_area_add');
const popupAvatar = document.querySelector('.popup_area_avatar');
const formAvatar = popupAvatar.querySelector('.popup__content');
const formProfile = popupProfile.querySelector('.popup__content');
const formCards = popupCards.querySelector('.popup__content');
const inputName = formProfile.querySelector('.popup__input_value_name');
const inputInfo = formProfile.querySelector('.popup__input_value_info');
const openPopupProfile = document.querySelector('.profile__edit-btn');
const openPopupCards = document.querySelector('.profile__add-btn');
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

const popupCardsButton = popupCards.querySelector('.popup__submit');
const popupProfileButton = popupProfile.querySelector('.popup__submit');
const popupAvatarButton = popupAvatar.querySelector('.popup__submit');

const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
    headers: {
        authorization: 'f2168467-af30-4c44-aa31-04a8fed6c871',
        'Content-Type': 'application/json'
    }
}




export {apiConfig,popupCardsButton,popupProfileButton,popupAvatarButton,popupDeleteSelector,profileAvatarSelector,profileAvatar,popupAvatarSelector,formAvatar,cardPlaceSelector,popupCardsSelector,popupProfileSelector,inputName, inputInfo, openPopupCards,openPopupProfile,formProfile,formCards,popupPhotoSelector,profileNameSelector,profileDescSelector,cardSelector};