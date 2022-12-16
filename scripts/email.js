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
    postToBasket
} from './form-utils';

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
            case errorList.NEWSLETTER_ERROR:
                form.querySelector(
                    '.error-newsletter-checkbox'
                ).classList.remove('hidden');
                break;
            case errorList.COUNTRY_ERROR:
                error = form.querySelector('.error-select-country');
                break;
            case errorList.LANGUAGE_ERROR:
                error = form.querySelector('.error-select-language');
                break;
            case errorList.PRIVACY_POLICY_ERROR:
                error = form.querySelector('.error-privacy-policy');
                break;
            case errorList.LEGAL_TERMS_ERROR:
                error = form.querySelector('.error-terms');
                break;
            default:
                error = form.querySelector('.error-try-again-later');
        }

        if (error) {
            error.classList.remove('hidden');
        }
    },

    handleFormSuccess: () => {
        const newsletters = Array.from(
            document.querySelectorAll("input[name='newsletters']:checked")
        ).map((newsletter) => newsletter.value);
        form.classList.add('hidden');
        const thanks = document.getElementById('newsletter-thanks');
        thanks.style.display = "block"

        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'newsletter-signup-success',
                newsletter: newsletters
            });
        }
    },

    serialize: () => {
        // Email address
        const email = encodeURIComponent(
            form.querySelector('input[type="email"]').value
        );

        // Newsletter format
        const format = form.querySelector('input[name="format"]:checked').value;

        // Country (optional form <select>)
        const countrySelect = form.querySelector('select[name="country"]');
        const country = countrySelect ? `&country=${countrySelect.value}` : '';

        // Language (get by DOM ID as field can be <input> or <select>)
        const lang = form.querySelector('#id_lang').value;

        // Selected newsletter(s)
        let newsletters = Array.from(
            form.querySelectorAll('input[name="newsletters"]:checked')
        )
            .map((newsletter) => {
                return `${newsletter.value}`;
            })
            .join(',');
        newsletters = encodeURIComponent(newsletters);


        return `email=${email}&format=${format}${country}&lang=${lang}&newsletters=${newsletters}`;
    },

    validateFields: () => {
        const email = form.querySelector('input[type="email"]').value;
        const privacy = form.querySelector('input[name="privacy"]:checked')
            ? true
            : false;
        const newsletters = form.querySelectorAll(
            'input[name="newsletters"]:checked'
        );
        const countrySelect = form.querySelector('select[name="country"]');
        const lang = form.querySelector('#id_lang').value;
        const terms = form.querySelector('input[name="terms"]');

        // Really basic client side email validity check.
        if (!checkEmailValidity(email)) {
            EmailForm.handleFormError('Invalid email address');
            return false;
        }

        // Check for country selection value.
        if (countrySelect && !countrySelect.value) {
            EmailForm.handleFormError('Country not selected');
            return false;
        }

        // Confirm at least one newsletter is checked
        if (newsletters.length === 0) {
            EmailForm.handleFormError('Newsletter not selected');
            return false;
        }

        // Confirm privacy policy is checked
        if (!privacy) {
        EmailForm.handleFormError('Privacy policy not checked');
            return false;
        }

        return true;
    },

    sumbit: (e) => {
        const url = '';
        const name = form.querySelector('input[id=name]')
        const email = form.querySelector('input[type="email"]').value;
        const interests = Array.from(form.querySelectorAll('input[name=interests]:checked'))
            .map(interests => `${interests.value}`).join(",");
        const description = form.querySelector('')

        const params =  {
            email,
            name,
            description,
            interests
        }

        console.log(params)

        e.preventDefault();
        e.stopPropagation();

        // // Disable form fields until POST has completed.
        // disableFormFields(form);

        // // Clear any prior messages that might have been displayed.
        // clearFormErrors(form);

        // // Perform client side form field validation.
        // if (!EmailForm.validateFields()) {
        //     return;
        // }

        // postToBasket(
        //     email,
        //     params,
        //     url,
        //     NewsletterForm.handleFormSuccess,
        //     NewsletterForm.handleFormError
        // );
    },

    init: () => {
        form = document.getElementById('email-form');

        if (!form) {
            return;
        }

        form.addEventListener('submit', EmailForm.sumbit, false);
    }
};

NewsletterForm.init();