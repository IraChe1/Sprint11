export class FormValidator {
    constructor(form, submitBtn, errorMessages) {
        this.form = form;
        this.submitBtn = submitBtn;
        this.errorMessages = errorMessages;
        this.setEventListeners();
        this.setSubmitButtonState();
    }

    checkInputValidity(input) {
        input.setCustomValidity("");
        
        if (input.validity.valueMissing) {
            input.setCustomValidity(this.errorMessages.empty);
        }

        if (input.validity.tooShort || input.validity.tooLong) {
            console.log(this.errorMessages.wrongLength);
            input.setCustomValidity(this.errorMessages.wrongLength);
        }

        if (input.validity.typeMismatch && input.type === 'url') {
            input.setCustomValidity(this.errorMessages.wrongUrl);
        }

        this.setErrorText(input);
        this.setSubmitButtonState();
    }

    setErrorText(input) {
        const errorElem = input.closest('.popup__form').querySelector(`#${input.id}-error`);
        errorElem.textContent = input.validationMessage;
    };

    setSubmitButtonState() {
        const state = this.form.checkValidity();
        if (state) {
            this.submitBtn.removeAttribute('disabled');
            this.submitBtn.classList.add(`popup__button_valid`);
        } else {
            this.submitBtn.setAttribute('disabled', true);
            this.submitBtn.classList.remove(`popup__button_valid`);
        }
    }

    resetErrors() {
        this.form.reset();
        const inputs = this.form.querySelectorAll('input');
        for (const input of inputs) {
            input.setCustomValidity("");
        }
        const spans = this.form.querySelectorAll('.error');
        for (const span of spans) {
            span.textContent = '';
        }
    }

    setEventListeners() {
        this.form.addEventListener('input', (evt) => this.checkInputValidity(evt.target));
    }
    }