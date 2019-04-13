const formValidator = window.formValidator || {};

const inputs = {
    firstname: {
        item: document.getElementById('firstname'),
        value: () => inputs.firstname.item.value,
        isValid: () => {
            const pattern = /^[a-zA-Z 0-9'\- ]+$/g;
            const validFormat = pattern.test(inputs.firstname.value());
            return inputs.firstname.value().trim().length > 1 && validFormat === true;
        },
        sanitizedValue: () => inputs.firstname.value().trim().replace(/[^a-zA-Z 0-9'\- ]+/g, ""),
        mandatory: true,
        pristine: true,
        errorMessage: "Please check your first name."
    },
    lastname: {
        item: document.getElementById('lastname'),
        value: () => inputs.lastname.item.value,
        isValid: () => {
            const pattern = /^[a-zA-Z 0-9'\- ]+$/g;
            const validFormat = pattern.test(inputs.lastname.value());
            return inputs.lastname.value().trim().length > 1 && validFormat === true;
        },
        sanitizedValue: () => inputs.lastname.value().trim().replace(/[^a-zA-Z 0-9'\- ]+/g, ""),
        mandatory: true,
        pristine: true,
        errorMessage: "Please check your last name."
    },
    email: {
        item: document.getElementById('email'),
        value: () => inputs.email.item.value,
        isValid: () => {
            const pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            const validFormat = pattern.test(inputs.email.value());
            return inputs.email.value().trim().length > 1 && validFormat === true;
        },
        sanitizedValue: () => inputs.email.value().trim(),
        mandatory: true,
        pristine: true,
        errorMessage: "Please check your email address."
    },
    terms: {
        item: document.getElementById('terms'),
        value: () => inputs.terms.item.checked,
        isValid: () => inputs.terms.value() === true,
        sanitizedValue: () => inputs.terms.value() === true,
        mandatory: true,
        pristine: true,
        errorMessage: "You need to accept the terms & condition to enter the competition."
    }
}

function getFormObject() {
    return {
        firstname: inputs.firstname.sanitizedValue(),
        lastname: inputs.lastname.sanitizedValue(),
        email: inputs.email.sanitizedValue()
    }
}

const formErrorsItem = document.getElementById('formErrors');
const submitButton = document.getElementById('submitButton');
const form = document.getElementById('form');

formValidator.checkFormErrors = function checkFormErrors() {
    let isValid = true;
    let allFieldsEdited = true;
    let errors = [];
    Object.keys(inputs).forEach((formId) => {
        if (inputs[formId].isValid() === false && inputs[formId].pristine === false) {
            isValid = false;
            errors.push(inputs[formId].errorMessage);
        }
    });

    // check if mandatory fields are defined
    if (isValid === true) {
        // activate submit button if all fields have been touched
        Object.keys(inputs).forEach((formId) => {
            if (inputs[formId].pristine === true && inputs[formId].mandatory === true) {
                allFieldsEdited = false;
            }
        });
    } else {
        allFieldsEdited = false;
    }

    // append error messages to html
    if (errors.length > 0) {
        formErrorsItem.innerText = errors.join('\r\n');
    } else {
        formErrorsItem.innerText = '';
    }

    // activate submit button
    if (allFieldsEdited === true) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
    return isValid;
}

formValidator.onInputChange = function onInputChange(inputName) {
    if (inputs[inputName].pristine === false) {
        formValidator.checkFormErrors();
    }
}

formValidator.onInputBlur = function onInputBlur(inputName) {
    inputs[inputName].pristine = false;
    formValidator.checkFormErrors();
}

formValidator.sendForm = function sendForm(event) {
    const isFormValid = formValidator.checkFormErrors();
    if (isFormValid === true) {
        const parsedForm = getFormObject();
        console.log('Send form to server here using fetch', parsedForm);
        clearForm();
    }
    event.preventDefault();
}

function clearForm(){
    form.reset();
    Object.keys(inputs).forEach((input) => {
        inputs[input].pristine = true;
    });
}

clearForm();

window.formValidator = window.formValidator || formValidator;
