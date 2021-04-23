import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor ({popupSelector, handleFormSubmit}){
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this._formSubmit = this._popupElement.querySelector('.popup__validation');
    }
// сбор данных с input
    _getInputValues() {
        this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));

        this._formValues = {};

        this._inputList.forEach(input => {this._formValues[input.name] = input.value});
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this._getInputValues());

        })
    }
// сброс значений формы
    close(){
        super.close();
        this._formSubmit.reset();
    }
}