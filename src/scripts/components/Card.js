export default class Card {
    constructor({name,link,likes,owner,_id}, cardSelector, handleCardClick,handleDeleteIconClick,handleLikeClick,userId) {
        this._title = name;
        this._image = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._likes = likes;
        this._owner = owner;
        this._id = _id;
        this._handleLikeClick = handleLikeClick;
        this._userId = userId;
    };

    _toggleButtonState () {
        if (this._owner._id === this._userId) {
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
        this._element.querySelector('.element__like-btn').addEventListener('click', () => {
            this._handleLikeClick(this);
        });
        this._deleteButton.addEventListener('click', () => this._handleDeleteIconClick(this));
    };

    isLiked() {
        return Boolean(this._likes.find(item => item._id === this._userId));
    }

    _updateLikesView() {
        this._element.querySelector('.element__like-count').textContent = this._likes.length;

        if (this.isLiked()) {
            this._element.querySelector('.element__like-btn').classList.add('element__like-btn_active');
        }
        else{
            this._element.querySelector('.element__like-btn').classList.remove('element__like-btn_active');
        }
    }

    setLikesInfo(data) {
        this._likes = data.likes;
        this._updateLikesView();
    }

    id() {
        return this._id;
    }

    generateCard(){
        this._element = this._getTemplate();
        this._photoElement = this._element.querySelector('.element__photo');
        this._deleteButton = this._element.querySelector('.element__delete-btn');

        this._updateLikesView();
        this._setEventListeners();
        this._toggleButtonState();

        this._photoElement.src = this._image;
        this._photoElement.alt = this._title;
        this._element.querySelector('.element__title').textContent = this._title;

        return this._element;
    };
}



