
/* функция показывает интерфейс ошибок */
const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    /* получаем span элемент*/
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};
/* функция убирает интерфейс ошибок */
const hideInputError = (formElement, inputElement, validationSettings) => {
    /* получаем span элемент*/
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);

    errorElement.textContent = '';
};

const isValid = (formElement, inputElement, validationSettings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
        hideInputError(formElement, inputElement, validationSettings);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        /* функция из index,присваивает значения input из profile */
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, validationSettings) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', 'disabled');
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    }
};

const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));

    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationSettings);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationSettings)

            toggleButtonState(inputList, buttonElement, validationSettings);
        });
    });
};


const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, validationSettings);
    });
};

enableValidation({
    formSelector: '.popup__validation',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
});