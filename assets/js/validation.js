document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.booking__form');
    if (!form) {
        return;
    }

    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const directionInput = document.getElementById('direction');
    const locationInput = document.getElementById('location');
    const agreementInput = form.querySelector('.checkbox input[type="checkbox"]');

    function removeErrors() {
        form.querySelectorAll('.input.is-danger, .textarea.is-danger, .select select.is-danger').forEach(function (element) {
            element.classList.remove('is-danger');
        });
        form.querySelectorAll('.help.is-danger').forEach(function (element) {
            element.remove();
        });
    }

    function showError(element, message) {
        if (element.classList) {
            element.classList.add('is-danger');
        }

        const field = element.closest('.field');
        if (!field) {
            return;
        }

        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        field.appendChild(help);
    }

    function showCheckboxError(message) {
        const field = agreementInput.closest('.field');
        if (!field) {
            return;
        }

        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        field.appendChild(help);
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        removeErrors();

        let isValid = true;

        const fullnameValue = nameInput.value.trim();
        const words = fullnameValue.split(' ').filter(function (word) {
            return word.length > 0;
        });

        if (fullnameValue === '') {
            showError(nameInput, 'Введите фамилию и имя');
            isValid = false;
        } else if (words.length < 2) {
            showError(nameInput, 'Введите фамилию и имя');
            isValid = false;
        }

        const phoneValue = phoneInput.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');

        if (phoneValue === '') {
            showError(phoneInput, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phoneInput, 'Введите не менее 10 цифр номера');
            isValid = false;
        }

        if (!agreementInput.checked) {
            showCheckboxError('Необходимо согласие на обработку персональных данных');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                direction: directionInput ? directionInput.value : '(не выбрано)',
                location: locationInput ? locationInput.value : '(не выбрано)',
                agreement: agreementInput.checked
            };

            document.dispatchEvent(new CustomEvent('formValid', { detail: formData }));
            alert('Форма отправлена! Данные в консоли.');
        }
    });

    nameInput.addEventListener('input', function () {
        this.classList.remove('is-danger');
        const field = this.closest('.field');
        if (field) {
            field.querySelectorAll('.help.is-danger').forEach(function (element) {
                element.remove();
            });
        }
    });

    phoneInput.addEventListener('input', function () {
        this.classList.remove('is-danger');
        const field = this.closest('.field');
        if (field) {
            field.querySelectorAll('.help.is-danger').forEach(function (element) {
                element.remove();
            });
        }
    });

    agreementInput.addEventListener('change', function () {
        const field = this.closest('.field');
        if (field) {
            field.querySelectorAll('.help.is-danger').forEach(function (element) {
                element.remove();
            });
        }
    });
});