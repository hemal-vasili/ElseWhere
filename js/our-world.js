/* =========================================================
   COUPLESHUB — OUR WORLD
   Frontend interactions
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initWorldHeader();
    initWorldMobileMenu();
    initWorldCustomization();
    initWorldModal();
    initWorldPointerEffects();
    initWorldReveal();
});


/* =========================================================
   HEADER
========================================================= */

function initWorldHeader() {
    const header =
        document.getElementById("worldHeader");

    if (!header) return;

    const updateHeader = () => {
        const scrolled = window.scrollY > 12;

        header.classList.toggle(
            "scrolled",
            scrolled
        );

        header.classList.toggle(
            "is-scrolled",
            scrolled
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

function initWorldMobileMenu() {
    const button =
        document.getElementById(
            "worldMenuButton"
        );

    const menu =
        document.getElementById(
            "worldMobileMenu"
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
   CUSTOMIZATION OPTIONS
========================================================= */

function initWorldCustomization() {
    const buttons =
        document.querySelectorAll(
            ".world-option-button"
        );

    if (!buttons.length) return;

    buttons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const option =
                    button.dataset.worldOption || "";

                openWorldModal(
                    getWorldOptionTitle(option),
                    getWorldOptionMessage(option)
                );
            }
        );
    });

    const mainButton =
        document.getElementById(
            "customizeWorldButton"
        );

    if (mainButton) {
        mainButton.addEventListener(
            "click",
            () => {
                openWorldModal(
                    "Customize our world.",
                    "Your world customization controls will be connected here. " +
                    "This is where the shared appearance and personal details will eventually live."
                );
            }
        );
    }
}

function getWorldOptionTitle(option) {
    const titles = {
        theme:
            "Choose your atmosphere.",
        couple:
            "Make it about you.",
        places:
            "Keep your favorite places.",
        atmosphere:
            "Shape the feeling."
    };

    return (
        titles[option] ||
        "Make it yours."
    );
}

function getWorldOptionMessage(option) {
    const messages = {
        theme:
            "Theme controls will let you shape the colors, visual mood and overall appearance of your shared space.",
        couple:
            "Your couple profile will eventually hold the names, photos and little details that make this space yours.",
        places:
            "Places will eventually let you save meaningful spots, trips and locations connected to your story.",
        atmosphere:
            "Atmosphere controls will eventually let you adjust ambient effects and the mood of your shared world."
    };

    return (
        messages[option] ||
        "Your customization controls will be connected here."
    );
}


/* =========================================================
   MODAL
========================================================= */

function initWorldModal() {
    const modal =
        document.getElementById(
            "worldModal"
        );

    const closeButton =
        document.getElementById(
            "worldModalClose"
        );

    if (!modal || !closeButton) return;

    closeButton.addEventListener(
        "click",
        closeWorldModal
    );

    modal
        .querySelectorAll(
            "[data-world-close]"
        )
        .forEach((element) => {
            element.addEventListener(
                "click",
                closeWorldModal
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
                closeWorldModal();
            }
        }
    );
}

function openWorldModal(
    title,
    message
) {
    const modal =
        document.getElementById(
            "worldModal"
        );

    const titleElement =
        document.getElementById(
            "worldModalTitle"
        );

    const textElement =
        document.getElementById(
            "worldModalText"
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
            "worldModalClose"
        );

    if (closeButton) {
        window.setTimeout(
            () => closeButton.focus(),
            50
        );
    }
}

function closeWorldModal() {
    const modal =
        document.getElementById(
            "worldModal"
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
   POINTER EFFECTS
========================================================= */

function initWorldPointerEffects() {
    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;

    if (
        reducedMotion ||
        !finePointer
    ) {
        return;
    }

    initPreviewTilt();
    initOptionCardTilt();
}

function initPreviewTilt() {
    const preview =
        document.querySelector(
            ".world-preview"
        );

    if (!preview) return;

    let frame = null;

    preview.addEventListener(
        "pointermove",
        (event) => {
            const rect =
                preview.getBoundingClientRect();

            const x =
                (event.clientX -
                    rect.left) /
                rect.width;

            const y =
                (event.clientY -
                    rect.top) /
                rect.height;

            const rotateX =
                (0.5 - y) * 1.7;

            const rotateY =
                (x - 0.5) * 1.7;

            if (frame) {
                cancelAnimationFrame(
                    frame
                );
            }

            frame =
                requestAnimationFrame(
                    () => {
                        preview.style.transform =
                            `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
                    }
                );
        }
    );

    preview.addEventListener(
        "pointerleave",
        () => {
            if (frame) {
                cancelAnimationFrame(
                    frame
                );
            }

            preview.style.transform = "";
        }
    );
}

function initOptionCardTilt() {
    const cards =
        document.querySelectorAll(
            ".world-option-card"
        );

    if (!cards.length) return;

    cards.forEach((card) => {
        let frame = null;

        card.addEventListener(
            "pointermove",
            (event) => {
                const rect =
                    card.getBoundingClientRect();

                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width;

                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height;

                const rotateX =
                    (0.5 - y) * 1.35;

                const rotateY =
                    (x - 0.5) * 1.35;

                if (frame) {
                    cancelAnimationFrame(
                        frame
                    );
                }

                frame =
                    requestAnimationFrame(
                        () => {
                            card.style.transform =
                                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
                        }
                    );
            }
        );

        card.addEventListener(
            "pointerleave",
            () => {
                if (frame) {
                    cancelAnimationFrame(
                        frame
                    );
                }

                card.style.transform = "";
            }
        );
    });
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initWorldReveal() {
    const elements =
        document.querySelectorAll(
            ".world-preview-section, " +
            ".world-option-card, " +
            ".world-story"
        );

    if (!elements.length) return;

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reducedMotion) {
        elements.forEach(
            (element) => {
                element.classList.add(
                    "world-visible"
                );
            }
        );

        return;
    }

    if (
        !("IntersectionObserver" in window)
    ) {
        elements.forEach(
            (element) => {
                element.classList.add(
                    "world-visible"
                );
            }
        );

        return;
    }

    elements.forEach(
        (element, index) => {
            element.classList.add(
                "world-reveal"
            );

            element.style.setProperty(
                "--world-reveal-delay",
                `${Math.min(index * 50, 250)}ms`
            );
        }
    );

    const observer =
        new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach(
                    (entry) => {
                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "world-visible"
                        );

                        currentObserver.unobserve(
                            entry.target
                        );
                    }
                );
            },
            {
                threshold: 0.10,
                rootMargin:
                    "0px 0px -35px 0px"
            }
        );

    elements.forEach(
        (element) => {
            observer.observe(element);
        }
    );
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