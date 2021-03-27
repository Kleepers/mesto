import {togglePopup} from './index.js';

const photoPopup = document.querySelector('.popup_area_photo');
const popupImage = document.querySelector('.popup__photo');
const popupPlace = document.querySelector('.popup__heading_place_photo');

export default class Card {
    constructor(data,cardSelector) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
    };

    _getTemplate(){
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    };

    _handleOpenPopup() {
        togglePopup(photoPopup);
        popupImage.src = this._image;
        popupImage.alt = this._title;
        popupPlace.textContent = this._title;
    };

    _handleLikeCard() {
        this._element.querySelector('.element__like-btn').classList.toggle('element__like-btn_active');
    };

    _handleDeleteCard() {
        this._element.remove();
    };

    _setEventListeners() {
        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._handleOpenPopup();
        });
        this._element.querySelector('.element__like-btn').addEventListener('click', () => {
            this._handleLikeCard();
        });
        this._element.querySelector('.element__delete-btn').addEventListener('click', () =>{
            this._handleDeleteCard();
        });
    };

    generateCard(){
        this._element = this._getTemplate();
        this._setEventListeners()

        this._element.querySelector('.element__photo').src = this._image;
        this._element.querySelector('.element__photo').alt = this._title;
        this._element.querySelector('.element__title').textContent = this._title;

        return this._element;
    };
}



