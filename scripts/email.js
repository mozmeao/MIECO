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

    switch (msg) {
      case errorList.EMAIL_INVALID_ERROR:
        error = form.querySelector(".error-email-invalid");
        break;
      case errorList.PRIVACY_POLICY_ERROR:
        error = form.querySelector(".error-privacy-policy");
        break;
      case errorList.NEWSLETTER_ERROR:
        error = form.querySelector(".error-newsletter");
        break;
      default:
        error = form.querySelector(".error-try-again-later");
    }

    if (error) {
        console.log(error)
        const errorContainer = form.querySelector(".mzp-c-form-errors");
        errorContainer.classList.remove("hidden");
        errorContainer.style.display = "block";
        error.classList.remove("hidden");
    }
  },

  handleFormSuccess: () => {
    form.classList.add("hidden");
    const thanks = document.getElementById("newsletter-thanks");
    thanks.style.display = "block";
  },

  validateFields: () => {
    const email = form.querySelector('input[type="email"]').value;
    const privacy = !!form.querySelector('input[name="privacy"]:checked');
    const newsletters = form.querySelectorAll('input[name="interests"]:checked');

    // Really basic client side email validity check.
    if (!checkEmailValidity(email)) {
      EmailForm.handleFormError(errorList.EMAIL_INVALID_ERROR);
      return false;
    }

    // Confirm privacy policy is checked
    if (!privacy) {
      EmailForm.handleFormError(errorList.PRIVACY_POLICY_ERROR);
      return false;
    }
    if (newsletters.length === 0) {
      EmailForm.handleFormError(errorList.NEWSLETTER_ERROR);
      return false;
    }

    return true;
  },


  submit: (e) => {
    const name = form.querySelector('input[id="name"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const interests =
      Array.from(form.querySelectorAll('input[name="interests"]:checked'))
        .map((interests) => `${interests.value}`)
        .join(",");
    const description = form.querySelector("textarea").value;
    const website = form.querySelector('input["name=website"]');

    const params = {
      email,
      name,
      description,
      interests,
    };

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


    if (form.classList.contains("mieco-form")) {
    postToEmailServer(
        { ...params, message_id: "mieco" },
        EmailForm.handleFormSuccess,
        EmailForm.handleFormError
    );
    } else if (interests.includes("newsletter")) {
        // This will only come from the innovation home page and will post to Basket
      postToEmailServer(
        {...params,
            format: "H",
            country: "us",
            lang: "en",
            newsletters: "mozilla-technology",
            message_id: "innovations"
        },
        EmailForm.handleFormSuccess,
        EmailForm.handleFormError
      );
    }
    if (interests.includes("collaboration")) {
      postToEmailServer(
        { ...params,
            website: website.value || "",
            message_id: "innovations"
        },
        EmailForm.handleFormSuccess,
        EmailForm.handleFormError
      );
    }
  },

  handleCheckboxChange: ({ target }) => {
    const description = document.querySelector(".description");
    if (target.checked) {
      description.style.display = "block";
    } else {
      description.style.display = "none";
    }
  },

  init: () => {
    form = document.getElementById("newsletter-form");

    if (!form) {
      return;
    }

    if (form.classList.contains("innovations-form")) {
      const newsletter = form.querySelector("input#newsletter");
      const checkbox = form.querySelector("input#collaboration");

      if (newsletter) {
        newsletter.checked = true;
      }

      if (checkbox?.checked) {
        const description = document.querySelector(".description");
        description.style.display = "block";
      }

      checkbox.addEventListener("change", EmailForm.handleCheckboxChange, false);
    }

    form.addEventListener("submit", EmailForm.submit, false);
  },
};

EmailForm.init();