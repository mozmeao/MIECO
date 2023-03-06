/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
    checkEmailValidity,
    clearFormErrors,
    errorList,
    disableFormFields,
    enableFormFields,
    postToEmailServer
} from './form-utils';

import "/node_modules/@mozilla-protocol/core/protocol/js/protocol-newsletter.min.js";

let form;

const EmailForm = {
    handleFormError: (msg) => {
        let error;

        enableFormFields(form);

        form.querySelector('.mzp-c-form-errors').classList.remove('hidden');

        switch (msg) {
            case errorList.EMAIL_INVALID_ERROR:
                error = form.querySelector('.error-email-invalid');
                break;
            case errorList.PRIVACY_POLICY_ERROR:
                error = form.querySelector('.error-privacy-policy');
                break;
            default:
                error = form.querySelector('.error-try-again-later');
        }

        if (error) {
            error.classList.remove('hidden');
        }
    },

    handleFormSuccess: () => {
        form.classList.add('hidden');
        const thanks = document.getElementById('newsletter-thanks');
        thanks.style.display = "block"
    },

    validateFields: () => {
        const email = form.querySelector('input[type="email"]').value;
        const privacy = !!form.querySelector('input[name="privacy"]:checked');

        // Really basic client side email validity check.
        if (!checkEmailValidity(email)) {
            EmailForm.handleFormError('Invalid email address');
            return false;
        }

        // Confirm privacy policy is checked
        if (!privacy) {
        EmailForm.handleFormError('Privacy policy not checked');
            return false;
        }

        return true;
    },

    submit: (e) => {
        const name = form.querySelector('input[id=name]').value;
        const email = form.querySelector('input[type="email"]').value;
        const interests = Array.from(form.querySelectorAll('input[name=interests]:checked'))
            .map(interests => `${interests.value}`).join(",") || "other"
        const description = form.querySelector('textarea').value;

        const params =  {
            email,
            name,
            description,
            interests
        }

        e.preventDefault();
        e.stopPropagation();

        // Disable form fields until POST has completed.
        disableFormFields(form);

        // Clear any prior messages that might have been displayed.
        clearFormErrors(form);

        // Perform client side form field validation.
        if (!EmailForm.validateFields()) {
            return;
        }

        postToEmailServer(
            params,
            EmailForm.handleFormSuccess,
            EmailForm.handleFormError
        )
    },

    handleRadioChange: ({target}) => {
       const isCollaboration = target.id === "collaboration";
        const description = document.querySelector(".description");
        if (isCollaboration && target.checked) {
            description.style.display = "block";
        } else {
            description.style.display = "none";
        }

    },

    init: () => {
        form = document.getElementById('newsletter-form');

        if (!form) {
            return;
        }

        form.addEventListener('submit', EmailForm.submit, false);

        form.querySelectorAll("input[name=interest]").forEach(function (radio) {
            radio.checked = false;
            radio.addEventListener("change", EmailForm.handleRadioChange, false);
        })
    }
};

EmailForm.init();