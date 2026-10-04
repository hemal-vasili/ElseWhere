/* =========================================================
   COUPLESHUB — TOGETHER
   Frontend interactions
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initTogetherHeader();
    initTogetherMobileMenu();
    initGameCards();
    initFeaturedPlayButton();
    initTogetherModal();
    initPointerEffects();
    initScrollReveal();
});


/* =========================================================
   HEADER
========================================================= */

function initTogetherHeader() {
    const header =
        document.getElementById("togetherHeader");

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

function initTogetherMobileMenu() {
    const button =
        document.getElementById(
            "togetherMenuButton"
        );

    const menu =
        document.getElementById(
            "togetherMobileMenu"
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
            const isOpen =
                menu.classList.contains(
                    "is-open"
                );

            if (isOpen) {
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
   GAME CARDS
========================================================= */

function initGameCards() {
    const buttons =
        document.querySelectorAll(
            ".game-card-button"
        );

    if (!buttons.length) return;

    buttons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const game =
                    button.dataset.game || "";

                const title =
                    getGameTitle(game);

                openTogetherModal(
                    title
                );
            }
        );
    });
}

function getGameTitle(game) {
    const titles = {
        "remember-us":
            "Remember Us",
        "two-of-us":
            "Two of Us",
        "couple-quiz":
            "How Well Do You Know Me?",
        "pick-for-us":
            "Pick For Us"
    };

    return (
        titles[game] ||
        "This game"
    );
}


/* =========================================================
   FEATURED GAME
========================================================= */

function initFeaturedPlayButton() {
    const button =
        document.getElementById(
            "featuredPlayButton"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        () => {
            openTogetherModal(
                "Something fun for two."
            );
        }
    );
}


/* =========================================================
   MODAL
========================================================= */

function initTogetherModal() {
    const modal =
        document.getElementById(
            "togetherModal"
        );

    const closeButton =
        document.getElementById(
            "togetherModalClose"
        );

    if (!modal || !closeButton) {
        return;
    }

    const closeTargets =
        modal.querySelectorAll(
            "[data-together-close]"
        );

    closeButton.addEventListener(
        "click",
        closeTogetherModal
    );

    closeTargets.forEach(
        (element) => {
            element.addEventListener(
                "click",
                closeTogetherModal
            );
        }
    );

    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "is-open"
                )
            ) {
                closeTogetherModal();
            }
        }
    );
}

function openTogetherModal(title) {
    const modal =
        document.getElementById(
            "togetherModal"
        );

    const titleElement =
        document.getElementById(
            "togetherModalTitle"
        );

    const textElement =
        document.getElementById(
            "togetherModalText"
        );

    if (!modal) return;

    if (titleElement) {
        titleElement.textContent =
            `${title} isn't ready yet.`;
    }

    if (textElement) {
        textElement.textContent =
            "The game system will be connected here. " +
            "For now, this experience is waiting to be built.";
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
            "togetherModalClose"
        );

    if (closeButton) {
        window.setTimeout(() => {
            closeButton.focus();
        }, 50);
    }
}

function closeTogetherModal() {
    const modal =
        document.getElementById(
            "togetherModal"
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

function initPointerEffects() {
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

    initFeaturedWindowEffect();
    initGameCardEffect();
}

function initFeaturedWindowEffect() {
    const windowElement =
        document.querySelector(
            ".featured-game-window"
        );

    if (!windowElement) return;

    let frame = null;

    windowElement.addEventListener(
        "pointermove",
        (event) => {
            const rect =
                windowElement.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;

            const rotateY =
                (x - 0.5) * 4;

            const rotateX =
                (0.5 - y) * 3;

            if (frame) {
                cancelAnimationFrame(
                    frame
                );
            }

            frame =
                requestAnimationFrame(() => {
                    windowElement.style.transform =
                        `perspective(1300px) rotateY(${rotateY - 2}deg) rotateX(${rotateX}deg) translateY(-5px)`;
                });
        }
    );

    windowElement.addEventListener(
        "pointerleave",
        () => {
            if (frame) {
                cancelAnimationFrame(
                    frame
                );
            }

            windowElement.style.transform =
                "";
        }
    );
}

function initGameCardEffect() {
    const cards =
        document.querySelectorAll(
            ".together-game-card"
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
                    (0.5 - y) * 1.5;

                const rotateY =
                    (x - 0.5) * 1.5;

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

function initScrollReveal() {
    const elements =
        document.querySelectorAll(
            ".together-featured, " +
            ".together-game-card, " +
            ".together-moment"
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
                    "together-visible"
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
                    "together-visible"
                );
            }
        );

        return;
    }

    elements.forEach(
        (element, index) => {
            element.classList.add(
                "together-reveal"
            );

            element.style.setProperty(
                "--together-reveal-delay",
                `${Math.min(index * 55, 260)}ms`
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
                            "together-visible"
                        );

                        currentObserver.unobserve(
                            entry.target
                        );
                    }
                );
            },
            {
                threshold: 0.12,
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
   INITIAL CLEANUP
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