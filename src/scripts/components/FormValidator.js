export default class FormValidator {
    constructor(validationSettings, formElement) {
        this._validationSettings = validationSettings;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
    };

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationSettings.inputErrorClass);

        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationSettings.errorClass);
    };

    _hideInputError (inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validationSettings.inputErrorClass);
        errorElement.classList.remove(this._validationSettings.errorClass);

        errorElement.textContent = '';
    };

    _isValid (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this._hideInputError(inputElement);
        }
}

    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState () {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.setAttribute('disabled', 'disabled');
            this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
        }
        else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
        }
    }

    _setEventListeners () {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    };

    clearErrors() {
        this._inputList.forEach((inputElement) => {
            const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
            inputElement.classList.remove(this._validationSettings.inputErrorClass);
            errorElement.classList.remove(this._validationSettings.errorClass);
            errorElement.textContent = '';
            //fix button state
            this._toggleButtonState();
        });
    };

    enableValidation () {
        this._setEventListeners();
    };
}