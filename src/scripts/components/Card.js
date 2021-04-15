export default class Card {
    constructor({name,link}, cardSelector, handleCardClick) {
        this._title = name;
        this._image = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    };

    _getTemplate(){
        return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    };

    _setEventListeners() {
        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._handleCardClick(this._image, this._title);
        });
        this._element.querySelector('.element__like-btn').addEventListener('click', () => {
            this._handleLikeCard();
        });
        this._element.querySelector('.element__delete-btn').addEventListener('click', () =>{
            this._handleDeleteCard();
        });
    };


    _handleLikeCard() {
        this._element.querySelector('.element__like-btn').classList.toggle('element__like-btn_active');
    };

    _handleDeleteCard() {
        this._element.remove();
    };

    generateCard(){
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__photo').src = this._image;
        this._element.querySelector('.element__photo').alt = this._title;
        this._element.querySelector('.element__title').textContent = this._title;

        return this._element;
    };
}



