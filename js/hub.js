"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initHubHeader();
    initHubMobileMenu();
    initInviteModal();
    initNotificationButton();
    initHubCardMotion();
    initHubReveal();
});


/* =========================================================
   HEADER
========================================================= */

function initHubHeader() {
    const header = document.getElementById("hubHeader");

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

function initHubMobileMenu() {
    const button =
        document.getElementById("hubMenuButton");

    const menu =
        document.getElementById("hubMobileMenu");

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

            const clickedMenu =
                menu.contains(event.target);

            const clickedButton =
                button.contains(event.target);

            if (
                !clickedMenu &&
                !clickedButton
            ) {
                closeMenu();
            }
        }
    );

    window.addEventListener(
        "resize",
        () => {
            if (
                window.innerWidth > 900
            ) {
                closeMenu();
            }
        }
    );
}


/* =========================================================
   INVITE MODAL
========================================================= */

function initInviteModal() {
    const modal =
        document.getElementById(
            "inviteModal"
        );

    const openButton =
        document.getElementById(
            "invitePartnerButton"
        );

    const closeButton =
        document.getElementById(
            "inviteModalClose"
        );

    if (
        !modal ||
        !openButton ||
        !closeButton
    ) {
        return;
    }

    const closeTargets =
        modal.querySelectorAll(
            "[data-modal-close]"
        );

    let previouslyFocused = null;

    const openModal = () => {
        previouslyFocused =
            document.activeElement;

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

        window.setTimeout(() => {
            closeButton.focus();
        }, 50);
    };

    const closeModal = () => {
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

        if (
            previouslyFocused &&
            typeof previouslyFocused.focus ===
                "function"
        ) {
            previouslyFocused.focus();
        }
    };

    openButton.addEventListener(
        "click",
        openModal
    );

    closeButton.addEventListener(
        "click",
        closeModal
    );

    closeTargets.forEach(
        (element) => {
            element.addEventListener(
                "click",
                closeModal
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
                closeModal();
            }
        }
    );

    modal.addEventListener(
        "click",
        (event) => {
            const card =
                modal.querySelector(
                    ".hub-modal-card"
                );

            if (
                card &&
                !card.contains(
                    event.target
                ) &&
                event.target !==
                    modal.querySelector(
                        ".hub-modal-backdrop"
                    )
            ) {
                return;
            }
        }
    );
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function initNotificationButton() {
    const button =
        document.getElementById(
            "hubNotificationButton"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        () => {
            showHubNotice(
                "Notifications will appear here once your shared space is connected."
            );
        }
    );
}


/* =========================================================
   TEMPORARY UI NOTICE
   No fake notifications or backend state.
========================================================= */

function showHubNotice(message) {
    const existing =
        document.querySelector(
            ".hub-toast"
        );

    if (existing) {
        existing.remove();
    }

    const toast =
        document.createElement("div");

    toast.className = "hub-toast";

    toast.innerHTML = `
        <span class="hub-toast-icon">♥</span>
        <span class="hub-toast-text"></span>
    `;

    const text =
        toast.querySelector(
            ".hub-toast-text"
        );

    text.textContent = message;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("is-visible");
    });

    window.setTimeout(() => {
        toast.classList.remove(
            "is-visible"
        );

        window.setTimeout(() => {
            toast.remove();
        }, 250);
    }, 3200);
}


/* =========================================================
   CARD POINTER MOTION
========================================================= */

function initHubCardMotion() {
    const cards =
        document.querySelectorAll(
            ".hub-action-card"
        );

    if (!cards.length) return;

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
                    (0.5 - y) * 1.8;

                const rotateY =
                    (x - 0.5) * 1.8;

                if (frame) {
                    cancelAnimationFrame(
                        frame
                    );
                }

                frame =
                    requestAnimationFrame(
                        () => {
                            card.style.transform =
                                `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
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

function initHubReveal() {
    const elements =
        document.querySelectorAll(
            ".hub-action-card, .hub-dashboard-card, .hub-lower-strip"
        );

    if (!elements.length) return;

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reducedMotion) return;

    if (
        !("IntersectionObserver" in window)
    ) {
        elements.forEach(
            (element) => {
                element.classList.add(
                    "hub-visible"
                );
            }
        );

        return;
    }

    elements.forEach(
        (element, index) => {
            element.style.setProperty(
                "--hub-reveal-delay",
                `${Math.min(index * 55, 300)}ms`
            );

            element.classList.add(
                "hub-reveal"
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
                            "hub-visible"
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
                    "0px 0px -30px 0px"
            }
        );

    elements.forEach(
        (element) => {
            observer.observe(element);
        }
    );
}


/* =========================================================
   ESCAPE BODY LOCK
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