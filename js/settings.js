"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initSettingsHeader();
    initSettingsMobileMenu();
    initDisplayName();
    initThemeOptions();
    initTogglePreferences();
    initAvatarButton();
    initDataInfo();
    initSignOut();
    initSaveSettings();
    initSettingsModal();
});


/* =========================================================
   HEADER
========================================================= */

function initSettingsHeader() {
    const header =
        document.getElementById("settingsHeader");

    if (!header) return;

    const updateHeader = () => {
        const isScrolled = window.scrollY > 12;

        header.classList.toggle(
            "scrolled",
            isScrolled
        );

        header.classList.toggle(
            "is-scrolled",
            isScrolled
        );
    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );
}


/* =========================================================
   MOBILE MENU
========================================================= */

function initSettingsMobileMenu() {
    const button =
        document.getElementById(
            "settingsMenuButton"
        );

    const menu =
        document.getElementById(
            "settingsMobileMenu"
        );

    if (!button || !menu) return;

    const openMenu = () => {
        button.classList.add("active");
        menu.classList.add("is-open");

        document.body.classList.add(
            "menu-open"
        );

        button.setAttribute(
            "aria-expanded",
            "true"
        );

        button.setAttribute(
            "aria-label",
            "Close navigation"
        );
    };

    const closeMenu = () => {
        button.classList.remove("active");
        menu.classList.remove("is-open");

        document.body.classList.remove(
            "menu-open"
        );

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        button.setAttribute(
            "aria-label",
            "Open navigation"
        );
    };

    button.addEventListener(
        "click",
        () => {
            if (
                menu.classList.contains(
                    "is-open"
                )
            ) {
                closeMenu();
            } else {
                openMenu();
            }
        }
    );

    menu.querySelectorAll("a").forEach(
        (link) => {
            link.addEventListener(
                "click",
                closeMenu
            );
        }
    );

    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                menu.classList.contains(
                    "is-open"
                )
            ) {
                closeMenu();
                button.focus();
            }
        }
    );

    document.addEventListener(
        "click",
        (event) => {
            if (
                !menu.classList.contains(
                    "is-open"
                )
            ) {
                return;
            }

            if (
                !menu.contains(event.target) &&
                !button.contains(event.target)
            ) {
                closeMenu();
            }
        }
    );

    window.addEventListener(
        "resize",
        () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        }
    );
}


/* =========================================================
   DISPLAY NAME
========================================================= */

function initDisplayName() {
    const input =
        document.getElementById(
            "displayName"
        );

    const avatarLetter =
        document.getElementById(
            "settingsAvatarLetter"
        );

    if (!input) return;

    const savedName =
        readStorage(
            "coupleshub-display-name"
        );

    if (savedName) {
        input.value = savedName;
    }

    updateAvatarLetter(
        input.value,
        avatarLetter
    );

    input.addEventListener(
        "input",
        () => {
            updateAvatarLetter(
                input.value,
                avatarLetter
            );

            markSettingsChanged();
        }
    );
}

function updateAvatarLetter(
    value,
    avatarElement
) {
    if (!avatarElement) return;

    const cleanValue =
        String(value || "").trim();

    if (!cleanValue) {
        avatarElement.textContent = "Y";
        return;
    }

    avatarElement.textContent =
        cleanValue
            .charAt(0)
            .toUpperCase();
}


/* =========================================================
   THEME OPTIONS
========================================================= */

function initThemeOptions() {
    const options =
        document.querySelectorAll(
            ".settings-theme-option"
        );

    if (!options.length) return;

    let savedTheme =
        readStorage(
            "coupleshub-theme"
        );

    if (
        !["dark", "soft", "midnight"]
            .includes(savedTheme)
    ) {
        savedTheme = "dark";
    }

    setThemeOption(
        options,
        savedTheme
    );

    options.forEach((option) => {
        option.addEventListener(
            "click",
            () => {
                const theme =
                    option.dataset.theme;

                if (
                    !theme ||
                    !["dark", "soft", "midnight"]
                        .includes(theme)
                ) {
                    return;
                }

                setThemeOption(
                    options,
                    theme
                );

                markSettingsChanged();
            }
        );
    });
}

function setThemeOption(
    options,
    selectedTheme
) {
    options.forEach(
        (option) => {
            const active =
                option.dataset.theme ===
                selectedTheme;

            option.classList.toggle(
                "active",
                active
            );

            option.setAttribute(
                "aria-pressed",
                String(active)
            );
        }
    );
}


/* =========================================================
   TOGGLE PREFERENCES
========================================================= */

function initTogglePreferences() {
    const toggleIds = [
        "motionToggle",
        "hoverToggle",
        "memoryNotifications",
        "coupleNotifications",
        "experienceNotifications"
    ];

    toggleIds.forEach((id) => {
        const input =
            document.getElementById(id);

        if (!input) return;

        const saved =
            readStorage(
                `coupleshub-${id}`
            );

        if (saved !== null) {
            input.checked =
                saved === "true";
        }

        input.addEventListener(
            "change",
            () => {
                markSettingsChanged();
            }
        );
    });

    applyMotionPreference();
    applyHoverPreference();

    const motionToggle =
        document.getElementById(
            "motionToggle"
        );

    const hoverToggle =
        document.getElementById(
            "hoverToggle"
        );

    if (motionToggle) {
        motionToggle.addEventListener(
            "change",
            applyMotionPreference
        );
    }

    if (hoverToggle) {
        hoverToggle.addEventListener(
            "change",
            applyHoverPreference
        );
    }
}


/* =========================================================
   MOTION
========================================================= */

function applyMotionPreference() {
    const toggle =
        document.getElementById(
            "motionToggle"
        );

    if (!toggle) return;

    document.body.classList.toggle(
        "settings-reduce-motion",
        !toggle.checked
    );
}


/* =========================================================
   HOVER EFFECTS
========================================================= */

function applyHoverPreference() {
    const toggle =
        document.getElementById(
            "hoverToggle"
        );

    if (!toggle) return;

    document.body.classList.toggle(
        "settings-reduce-hover",
        !toggle.checked
    );
}


/* =========================================================
   AVATAR BUTTON
========================================================= */

function initAvatarButton() {
    const button =
        document.getElementById(
            "changeAvatarButton"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        () => {
            openSettingsModal(
                "Profile photo",
                "Profile photo controls will be connected here when account and profile storage are enabled."
            );
        }
    );
}


/* =========================================================
   DATA INFORMATION
========================================================= */

function initDataInfo() {
    const button =
        document.getElementById(
            "dataInfoButton"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        () => {
            openSettingsModal(
                "Your data",
                "The data controls will be connected with the real account system. This preview does not upload or pretend to manage your account data."
            );
        }
    );
}


/* =========================================================
   SIGN OUT
========================================================= */

function initSignOut() {
    const button =
        document.getElementById(
            "signOutButton"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        () => {
            openSettingsModal(
                "Sign out",
                "Sign-out will be connected to the real authentication system. No fake session is being created or destroyed by this preview."
            );
        }
    );
}


/* =========================================================
   SAVE SETTINGS
========================================================= */

function initSaveSettings() {
    const button =
        document.getElementById(
            "saveSettingsButton"
        );

    const saveText =
        document.getElementById(
            "settingsSaveText"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        () => {
            saveSettings();

            if (saveText) {
                saveText.textContent =
                    "Changes saved locally in this preview.";
            }

            button.classList.add(
                "is-saved"
            );

            window.setTimeout(
                () => {
                    button.classList.remove(
                        "is-saved"
                    );
                },
                1200
            );
        }
    );
}

function saveSettings() {
    const displayName =
        document.getElementById(
            "displayName"
        );

    if (displayName) {
        writeStorage(
            "coupleshub-display-name",
            displayName.value.trim()
        );
    }

    const theme =
        getSelectedTheme();

    if (theme) {
        writeStorage(
            "coupleshub-theme",
            theme
        );
    }

    const toggleIds = [
        "motionToggle",
        "hoverToggle",
        "memoryNotifications",
        "coupleNotifications",
        "experienceNotifications"
    ];

    toggleIds.forEach((id) => {
        const input =
            document.getElementById(id);

        if (!input) return;

        writeStorage(
            `coupleshub-${id}`,
            String(input.checked)
        );
    });

    applyMotionPreference();
    applyHoverPreference();
}

function getSelectedTheme() {
    const active =
        document.querySelector(
            ".settings-theme-option.active"
        );

    return active
        ? active.dataset.theme
        : "dark";
}

function markSettingsChanged() {
    const saveText =
        document.getElementById(
            "settingsSaveText"
        );

    if (!saveText) return;

    saveText.textContent =
        "You have unsaved changes.";
}


/* =========================================================
   SETTINGS MODAL
========================================================= */

function initSettingsModal() {
    const modal =
        document.getElementById(
            "settingsModal"
        );

    const closeButton =
        document.getElementById(
            "settingsModalClose"
        );

    if (!modal || !closeButton) return;

    closeButton.addEventListener(
        "click",
        closeSettingsModal
    );

    modal
        .querySelectorAll(
            "[data-settings-close]"
        )
        .forEach((element) => {
            element.addEventListener(
                "click",
                closeSettingsModal
            );
        });

    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "is-open"
                )
            ) {
                closeSettingsModal();
            }
        }
    );
}

function openSettingsModal(
    title,
    message
) {
    const modal =
        document.getElementById(
            "settingsModal"
        );

    const titleElement =
        document.getElementById(
            "settingsModalTitle"
        );

    const textElement =
        document.getElementById(
            "settingsModalText"
        );

    if (!modal) return;

    if (titleElement) {
        titleElement.textContent =
            title;
    }

    if (textElement) {
        textElement.textContent =
            message;
    }

    modal.classList.add(
        "is-open"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

    const closeButton =
        document.getElementById(
            "settingsModalClose"
        );

    if (closeButton) {
        window.setTimeout(
            () => closeButton.focus(),
            50
        );
    }
}

function closeSettingsModal() {
    const modal =
        document.getElementById(
            "settingsModal"
        );

    if (!modal) return;

    modal.classList.remove(
        "is-open"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );
}


/* =========================================================
   SIMPLE LOCAL STORAGE HELPERS
========================================================= */

function readStorage(key) {
    try {
        return window.localStorage.getItem(
            key
        );
    } catch (error) {
        return null;
    }
}

function writeStorage(key, value) {
    try {
        window.localStorage.setItem(
            key,
            value
        );
    } catch (error) {
        /*
         * Storage may be disabled.
         * The interface still works without it.
         */
    }
}


/* =========================================================
   PAGE CLEANUP
========================================================= */

window.addEventListener(
    "pageshow",
    () => {
        document.body.classList.remove(
            "menu-open",
            "modal-open"
        );
    }
);