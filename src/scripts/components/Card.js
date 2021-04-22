import {popupDelete,userId} from "../utils/constants";
export default class Card {
    constructor({name,link,likes,owner,_id}, cardSelector, handleCardClick,deleteCard,cardLikeSet,cardLikeDelete,user) {
        this._title = name;
        this._image = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likes = likes;
        this._owner = owner;
        this._id = _id;
        this._deleteCard = deleteCard;
        this._cardLikeSet = cardLikeSet;
        this._cardLikeDelete = cardLikeDelete;
        this._user = user;
    };

    _toggleButtonState () {
        if (this._owner._id === userId) {
            this._deleteButton.classList.add('element__delete-btn_active');
        }
    }

    _getTemplate(){
        return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    };

    _setEventListeners() {
        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._handleCardClick(this._image, this._title);
        });
        this._likeButton.addEventListener('click', () => {
            this._handleLikeCard();
        });
        this._element.querySelector('.element__delete-btn').addEventListener('click', () =>{
            this._handleDeleteCard();
        });
    };

    _toggleLikeState () {
        if (this._isLiked() === true) {
            this._likeButton.classList.add('element__like-btn_active');
        }
    }

    _isLiked() {
        if (this._likes.some(element => element == `${this._user}`) === true) {
            return true;
        }
        else {
            return false;
        }
    }

    _handleLikeCard() {
        if (this._isLiked() === true) {
            this._cardLikeDelete(this._id);
            this._likes.splice(this._likes.indexOf(this._user));
            this._likeButton.classList.remove('element__like-btn_active')
        }
        else {
            this._cardLikeSet(this._id);
            this._likes.push(this._user);
            this._likeButton.classList.add('element__like-btn_active')
        }
    };

    _handleDeleteCard() {
        popupDelete.classList.add('popup_opened');

        popupDelete.addEventListener('submit', () => {
            this._deleteCard(this._id);
        })

    }

    generateCard(){
        this._element = this._getTemplate();
        this._photoElement = this._element.querySelector('.element__photo');
        this._likeCount = this._element.querySelector('.element__like-count');
        this._deleteButton = this._element.querySelector('.element__delete-btn');
        this._likeButton = this._element.querySelector('.element__like-btn');
        console.log(this._likes);
        this._toggleLikeState();
        this._setEventListeners();
        this._toggleButtonState();

        this._photoElement.src = this._image;
        this._photoElement.alt = this._title;
        this._likeCount.textContent = this._likes.length;
        this._element.querySelector('.element__title').textContent = this._title;

        return this._element;
    };
}



