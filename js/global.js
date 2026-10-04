"use strict";

/* ============================================================
   COUPLESHUB — GLOBAL JAVASCRIPT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initHeader();
    initMobileMenu();
    initSmoothScrolling();
});


/* ============================================================
   01. PAGE LOADER
   ============================================================ */

function initLoader() {
    const loader = document.getElementById("pageLoader");

    if (!loader) {
        return;
    }

    const hideLoader = () => {
        loader.classList.add("is-hidden");
    };

    /*
     * Don't keep the user staring at the loader waiting
     * for every resource on the page.
     */

    window.setTimeout(hideLoader, 350);

    /*
     * Absolute fallback.
     */

    window.setTimeout(hideLoader, 1800);
}


/* ============================================================
   02. HEADER SCROLL STATE
   ============================================================ */

function initHeader() {
    const header = document.getElementById("siteHeader");

    if (!header) {
        return;
    }

    const updateHeader = () => {
        const isScrolled = window.scrollY > 24;

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
        {
            passive: true
        }
    );
}


/* ============================================================
   03. MOBILE MENU
   ============================================================ */

function initMobileMenu() {
    const button =
        document.getElementById("mobileMenuButton");

    const menu =
        document.getElementById("mobileMenu");

    if (!button || !menu) {
        return;
    }


    const openMenu = () => {

        button.classList.add("active");

        menu.classList.add("active");

        document.body.classList.add("menu-open");

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

        menu.classList.remove("active");

        document.body.classList.remove("menu-open");

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
                menu.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }
    );


    /*
     * Close when a mobile navigation item is selected.
     */

    const links =
        menu.querySelectorAll("a");

    links.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    /*
     * Escape closes the menu.
     */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                menu.classList.contains("active")
            ) {

                closeMenu();

                button.focus();
            }
        }
    );


    /*
     * Clicking outside the menu closes it.
     */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !menu.classList.contains("active")
            ) {
                return;
            }


            const clickedInsideMenu =
                menu.contains(event.target);

            const clickedButton =
                button.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedButton
            ) {

                closeMenu();

            }

        }
    );


    /*
     * Reset the mobile state when returning to desktop.
     */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 760) {
                closeMenu();
            }

        }
    );
}


/* ============================================================
   04. SMOOTH SCROLLING
   ============================================================ */

function initSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const header =
                    document.getElementById(
                        "siteHeader"
                    );


                const headerOffset =
                    header
                        ? header.offsetHeight + 25
                        : 25;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerOffset;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });
}


/* ============================================================
   05. MOBILE NAVIGATION CLEANUP
   ============================================================ */

window.addEventListener(
    "pageshow",
    () => {

        document.body.classList.remove(
            "menu-open"
        );

    }
);