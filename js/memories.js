"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initMemoriesHeader();
    initMemoriesMobileMenu();
    initMemoryModal();
    initMemoryFilters();
    initMemoryViewControls();
    initMemorySearch();
    initMemoryOptionButtons();
    initMemoryReveal();
});


/* =========================================================
   HEADER
========================================================= */

function initMemoriesHeader() {
    const header =
        document.getElementById("memoriesHeader");

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

function initMemoriesMobileMenu() {
    const button =
        document.getElementById(
            "memoriesMenuButton"
        );

    const menu =
        document.getElementById(
            "memoriesMobileMenu"
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
   ADD MEMORY MODAL
========================================================= */

function initMemoryModal() {
    const modal =
        document.getElementById(
            "memoryModal"
        );

    const openButton =
        document.getElementById(
            "addMemoryButton"
        );

    const emptyOpenButton =
        document.getElementById(
            "emptyAddMemoryButton"
        );

    const closeButton =
        document.getElementById(
            "memoryModalClose"
        );

    if (
        !modal ||
        !closeButton
    ) {
        return;
    }

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

    if (openButton) {
        openButton.addEventListener(
            "click",
            openModal
        );
    }

    if (emptyOpenButton) {
        emptyOpenButton.addEventListener(
            "click",
            openModal
        );
    }

    closeButton.addEventListener(
        "click",
        closeModal
    );

    modal
        .querySelectorAll(
            "[data-memory-close]"
        )
        .forEach((element) => {
            element.addEventListener(
                "click",
                closeModal
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
                closeModal();
            }
        }
    );
}


/* =========================================================
   MEMORY FILTERS
========================================================= */

function initMemoryFilters() {
    const filters =
        document.querySelectorAll(
            ".memory-filter"
        );

    if (!filters.length) return;

    filters.forEach((filter) => {
        filter.addEventListener(
            "click",
            () => {
                filters.forEach(
                    (item) => {
                        item.classList.remove(
                            "active"
                        );
                    }
                );

                filter.classList.add(
                    "active"
                );

                filters.forEach(
                    (item) => {
                        item.setAttribute(
                            "aria-pressed",
                            String(
                                item === filter
                            )
                        );
                    }
                );

                /*
                 * There are no memory records yet.
                 * The filter state is prepared for
                 * the real memory data layer.
                 */
            }
        );
    });
}


/* =========================================================
   GRID / LIST VIEW
========================================================= */

function initMemoryViewControls() {
    const gridButton =
        document.getElementById(
            "gridViewButton"
        );

    const listButton =
        document.getElementById(
            "listViewButton"
        );

    const grid =
        document.getElementById(
            "memoriesGrid"
        );

    if (
        !gridButton ||
        !listButton ||
        !grid
    ) {
        return;
    }

    const setView = (view) => {
        const isGrid =
            view === "grid";

        gridButton.classList.toggle(
            "active",
            isGrid
        );

        listButton.classList.toggle(
            "active",
            !isGrid
        );

        gridButton.setAttribute(
            "aria-pressed",
            String(isGrid)
        );

        listButton.setAttribute(
            "aria-pressed",
            String(!isGrid)
        );

        grid.classList.toggle(
            "memory-list-view",
            !isGrid
        );

        grid.classList.toggle(
            "memory-grid-view",
            isGrid
        );

        try {
            window.localStorage.setItem(
                "coupleshub-memory-view",
                view
            );
        } catch (error) {
            /*
             * Storage may be unavailable.
             * The visual view still works.
             */
        }
    };

    let savedView = "grid";

    try {
        const storedView =
            window.localStorage.getItem(
                "coupleshub-memory-view"
            );

        if (
            storedView === "grid" ||
            storedView === "list"
        ) {
            savedView = storedView;
        }
    } catch (error) {
        // Use grid when storage is unavailable.
    }

    setView(savedView);

    gridButton.addEventListener(
        "click",
        () => setView("grid")
    );

    listButton.addEventListener(
        "click",
        () => setView("list")
    );
}


/* =========================================================
   SEARCH
========================================================= */

function initMemorySearch() {
    const button =
        document.getElementById(
            "memorySearchButton"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        () => {
            showMemoryNotice(
                "Memory search will become available when your archive has memories."
            );
        }
    );
}


/* =========================================================
   MEMORY OPTIONS
========================================================= */

function initMemoryOptionButtons() {
    const options =
        document.querySelectorAll(
            ".memory-option"
        );

    if (!options.length) return;

    options.forEach((option) => {
        option.addEventListener(
            "click",
            () => {
                const type =
                    option.dataset.memoryType;

                const labels = {
                    photo:
                        "Photo memories will be connected here.",
                    note:
                        "Little notes will be connected here.",
                    moment:
                        "Moment entries will be connected here."
                };

                showMemoryNotice(
                    labels[type] ||
                    "This memory type will be connected here."
                );
            }
        );
    });
}


/* =========================================================
   TEMPORARY NOTICE
========================================================= */

function showMemoryNotice(message) {
    const existing =
        document.querySelector(
            ".memory-toast"
        );

    if (existing) {
        existing.remove();
    }

    const toast =
        document.createElement("div");

    toast.className =
        "memory-toast";

    toast.innerHTML = `
        <span class="memory-toast-icon">♡</span>
        <span class="memory-toast-text"></span>
    `;

    const text =
        toast.querySelector(
            ".memory-toast-text"
        );

    text.textContent = message;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add(
            "is-visible"
        );
    });

    window.setTimeout(() => {
        toast.classList.remove(
            "is-visible"
        );

        window.setTimeout(() => {
            toast.remove();
        }, 240);
    }, 3000);
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initMemoryReveal() {
    const elements =
        document.querySelectorAll(
            ".memories-hero, " +
            ".memory-stat, " +
            ".memories-empty, " +
            ".memories-quote"
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
                    "memory-visible"
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
                    "memory-visible"
                );
            }
        );

        return;
    }

    elements.forEach(
        (element, index) => {
            element.classList.add(
                "memory-reveal"
            );

            element.style.setProperty(
                "--memory-reveal-delay",
                `${Math.min(index * 45, 250)}ms`
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
                            "memory-visible"
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
   CLEANUP
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