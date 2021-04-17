import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhoto = this._popupElement.querySelector('.popup__photo');
        this._popupHeading = this._popupElement.querySelector('.popup__heading');
    }

    open(link, text) {
        super.open();
        this._popupPhoto.src = link;
        this._popupPhoto.alt = text;
        this._popupHeading.textContent = text;
    }
}