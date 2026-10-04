"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initPasswordToggle();
    initConfirmPasswordToggle();
    initLoginForm();
    initSignupForm();
    initForgotPassword();
    initSocialButtons();
});

/* =========================================================
   PASSWORD TOGGLE
========================================================= */

function initPasswordToggle() {
    const toggle = document.getElementById("passwordToggle");
    const password = document.getElementById("password");

    if (!toggle || !password) return;

    toggle.addEventListener("click", () => {
        togglePassword(password, toggle);
    });
}

function initConfirmPasswordToggle() {
    const toggle = document.getElementById("confirmPasswordToggle");
    const password = document.getElementById("confirmPassword");

    if (!toggle || !password) return;

    toggle.addEventListener("click", () => {
        togglePassword(password, toggle);
    });
}

function togglePassword(input, button) {
    const isPassword = input.type === "password";

    input.type = isPassword ? "text" : "password";
    button.textContent = isPassword ? "Hide" : "Show";

    button.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
    );

    button.setAttribute(
        "aria-pressed",
        String(isPassword)
    );
}

/* =========================================================
   LOGIN
========================================================= */

function initLoginForm() {
    const form = document.getElementById("loginForm");

    if (!form) return;

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const status = document.getElementById("loginStatus");

    const submitButton = form.querySelector(
        'button[type="submit"]'
    );

    if (
        !email ||
        !password ||
        !emailError ||
        !passwordError ||
        !status ||
        !submitButton
    ) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        clearErrors(
            [emailError, passwordError],
            status
        );

        const emailValue = email.value.trim();
        const passwordValue = password.value;

        let valid = true;

        if (!emailValue) {
            showError(
                emailError,
                "Enter your email address."
            );
            valid = false;
        } else if (!isValidEmail(emailValue)) {
            showError(
                emailError,
                "Enter a valid email address."
            );
            valid = false;
        }

        if (!passwordValue) {
            showError(
                passwordError,
                "Enter your password."
            );
            valid = false;
        } else if (passwordValue.length < 6) {
            showError(
                passwordError,
                "Your password must be at least 6 characters."
            );
            valid = false;
        }

        if (!valid) {
            focusFirstError(
                email,
                emailError,
                password,
                passwordError
            );
            return;
        }

        setButtonLoading(
            submitButton,
            true,
            "Checking…"
        );

        status.textContent = "";

        try {
            /*
             * Authentication backend will be connected here.
             *
             * No fake login or fake successful authentication
             * is performed by the frontend.
             */

            await wait(450);

            showStatus(
                status,
                "Your details are valid. Authentication is ready to connect.",
                "success"
            );
        } catch (error) {
            console.error("Login error:", error);

            showStatus(
                status,
                "Something went wrong. Please try again.",
                "error"
            );
        } finally {
            setButtonLoading(
                submitButton,
                false
            );
        }
    });

    email.addEventListener("input", () => {
        clearFieldError(emailError, status);
    });

    password.addEventListener("input", () => {
        clearFieldError(passwordError, status);
    });
}

/* =========================================================
   SIGN UP
========================================================= */

function initSignupForm() {
    const form = document.getElementById("signupForm");

    if (!form) return;

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById(
        "confirmPassword"
    );
    const terms = document.getElementById("terms");

    const fullNameError = document.getElementById(
        "fullNameError"
    );
    const emailError = document.getElementById(
        "emailError"
    );
    const passwordError = document.getElementById(
        "passwordError"
    );
    const confirmPasswordError = document.getElementById(
        "confirmPasswordError"
    );
    const termsError = document.getElementById(
        "termsError"
    );
    const status = document.getElementById(
        "signupStatus"
    );

    const submitButton = document.getElementById(
        "signupSubmit"
    );

    if (
        !fullName ||
        !email ||
        !password ||
        !confirmPassword ||
        !terms ||
        !fullNameError ||
        !emailError ||
        !passwordError ||
        !confirmPasswordError ||
        !termsError ||
        !status ||
        !submitButton
    ) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        clearErrors(
            [
                fullNameError,
                emailError,
                passwordError,
                confirmPasswordError,
                termsError
            ],
            status
        );

        const nameValue = fullName.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value;
        const confirmValue = confirmPassword.value;

        let valid = true;

        /* -------------------------
           NAME
        ------------------------- */

        if (!nameValue) {
            showError(
                fullNameError,
                "Enter your name."
            );

            valid = false;
        } else if (nameValue.length < 2) {
            showError(
                fullNameError,
                "Your name must contain at least 2 characters."
            );

            valid = false;
        }

        /* -------------------------
           EMAIL
        ------------------------- */

        if (!emailValue) {
            showError(
                emailError,
                "Enter your email address."
            );

            valid = false;
        } else if (!isValidEmail(emailValue)) {
            showError(
                emailError,
                "Enter a valid email address."
            );

            valid = false;
        }

        /* -------------------------
           PASSWORD
        ------------------------- */

        if (!passwordValue) {
            showError(
                passwordError,
                "Create a password."
            );

            valid = false;
        } else if (passwordValue.length < 6) {
            showError(
                passwordError,
                "Your password must be at least 6 characters."
            );

            valid = false;
        }

        /* -------------------------
           CONFIRM PASSWORD
        ------------------------- */

        if (!confirmValue) {
            showError(
                confirmPasswordError,
                "Confirm your password."
            );

            valid = false;
        } else if (passwordValue !== confirmValue) {
            showError(
                confirmPasswordError,
                "Your passwords do not match."
            );

            valid = false;
        }

        /* -------------------------
           TERMS
        ------------------------- */

        if (!terms.checked) {
            showError(
                termsError,
                "Please agree to continue."
            );

            valid = false;
        }

        /* -------------------------
           STOP IF INVALID
        ------------------------- */

        if (!valid) {
            focusSignupError({
                fullName,
                fullNameError,
                email,
                emailError,
                password,
                passwordError,
                confirmPassword,
                confirmPasswordError,
                terms,
                termsError
            });

            return;
        }

        /* -------------------------
           SUBMIT STATE
        ------------------------- */

        setButtonLoading(
            submitButton,
            true,
            "Creating…"
        );

        try {
            /*
             * Authentication backend will be connected here.
             *
             * We intentionally do NOT create a fake account,
             * store a fake password, or pretend signup succeeded.
             */

            await wait(600);

            showStatus(
                status,
                "Your account details are valid. Authentication is ready to connect.",
                "success"
            );
        } catch (error) {
            console.error("Signup error:", error);

            showStatus(
                status,
                "Something went wrong. Please try again.",
                "error"
            );
        } finally {
            setButtonLoading(
                submitButton,
                false
            );
        }
    });

    /* -------------------------
       LIVE VALIDATION CLEARING
    ------------------------- */

    fullName.addEventListener("input", () => {
        clearFieldError(
            fullNameError,
            status
        );
    });

    email.addEventListener("input", () => {
        clearFieldError(
            emailError,
            status
        );
    });

    password.addEventListener("input", () => {
        clearFieldError(
            passwordError,
            status
        );

        if (
            confirmPassword.value &&
            password.value === confirmPassword.value
        ) {
            confirmPasswordError.textContent = "";
        }
    });

    confirmPassword.addEventListener("input", () => {
        clearFieldError(
            confirmPasswordError,
            status
        );
    });

    terms.addEventListener("change", () => {
        clearFieldError(
            termsError,
            status
        );
    });
}

/* =========================================================
   FORGOT PASSWORD
========================================================= */

function initForgotPassword() {
    const link = document.getElementById(
        "forgotPasswordLink"
    );

    if (!link) return;

    link.addEventListener("click", (event) => {
        event.preventDefault();

        window.location.href =
            "forgot-password.html";
    });
}

/* =========================================================
   SOCIAL AUTH
========================================================= */

function initSocialButtons() {
    const buttons = document.querySelectorAll(
        ".social-button"
    );

    if (!buttons.length) return;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const provider =
                button.dataset.provider;

            const status =
                document.getElementById("loginStatus") ||
                document.getElementById("signupStatus");

            if (!status) return;

            const providerName =
                capitalize(provider);

            showStatus(
                status,
                `${providerName} sign-in will be connected here.`,
                "error"
            );
        });
    });
}

/* =========================================================
   VALIDATION HELPERS
========================================================= */

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function showError(element, message) {
    if (!element) return;

    element.textContent = message;
}

function clearFieldError(element, status) {
    if (element) {
        element.textContent = "";
    }

    if (status) {
        status.textContent = "";
        status.classList.remove(
            "success",
            "error"
        );
    }
}

function clearErrors(elements, status) {
    elements.forEach((element) => {
        if (element) {
            element.textContent = "";
        }
    });

    if (status) {
        status.textContent = "";
        status.classList.remove(
            "success",
            "error"
        );
    }
}

function showStatus(element, message, type) {
    if (!element) return;

    element.textContent = message;

    element.classList.remove(
        "success",
        "error"
    );

    if (type) {
        element.classList.add(type);
    }
}

/* =========================================================
   FOCUS FIRST ERROR
========================================================= */

function focusFirstError(
    firstInput,
    firstError,
    secondInput,
    secondError
) {
    if (firstError.textContent) {
        firstInput.focus();
        return;
    }

    if (secondError.textContent) {
        secondInput.focus();
    }
}

function focusSignupError(fields) {
    if (fields.fullNameError.textContent) {
        fields.fullName.focus();
        return;
    }

    if (fields.emailError.textContent) {
        fields.email.focus();
        return;
    }

    if (fields.passwordError.textContent) {
        fields.password.focus();
        return;
    }

    if (fields.confirmPasswordError.textContent) {
        fields.confirmPassword.focus();
        return;
    }

    if (fields.termsError.textContent) {
        fields.terms.focus();
    }
}

/* =========================================================
   BUTTON LOADING STATE
========================================================= */

function setButtonLoading(
    button,
    loading,
    loadingText = "Loading…"
) {
    if (!button) return;

    if (loading) {
        if (!button.dataset.originalText) {
            button.dataset.originalText =
                button.innerHTML;
        }

        button.disabled = true;
        button.setAttribute(
            "aria-busy",
            "true"
        );

        button.innerHTML = `
            <span class="button-loader"></span>
            <span>${loadingText}</span>
        `;
    } else {
        button.disabled = false;
        button.removeAttribute(
            "aria-busy"
        );

        if (button.dataset.originalText) {
            button.innerHTML =
                button.dataset.originalText;
        }
    }
}

/* =========================================================
   UTILITIES
========================================================= */

function capitalize(value) {
    if (!value) return "";

    return (
        value.charAt(0).toUpperCase() +
        value.slice(1)
    );
}

function wait(milliseconds) {
    return new Promise((resolve) => {
        window.setTimeout(
            resolve,
            milliseconds
        );
    });
}