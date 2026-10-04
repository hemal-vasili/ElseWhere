"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initHeroProductTilt();
    initHeroParallax();
    initFloatingCards();
    initFeatureCards();
    initTogetherOrbit();
    initHeroHearts();
    initScrollReveal();
});


/* =========================================================
   HERO PRODUCT TILT
========================================================= */

function initHeroProductTilt() {
    const visual = document.querySelector(".hero-visual");
    const product = document.querySelector(".hero-product");

    if (!visual || !product) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const finePointer = window.matchMedia(
        "(pointer: fine)"
    ).matches;

    if (reducedMotion || !finePointer) return;

    let frame = null;

    visual.addEventListener("pointermove", (event) => {
        const rect = visual.getBoundingClientRect();

        if (!rect.width || !rect.height) return;

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 7;
        const rotateX = (0.5 - y) * 5;

        if (frame) {
            cancelAnimationFrame(frame);
        }

        frame = requestAnimationFrame(() => {
            product.style.transform =
                `perspective(1400px)
                 rotateX(${rotateX}deg)
                 rotateY(${-3 + rotateY}deg)
                 translateY(-4px)`;
        });
    });

    visual.addEventListener("pointerleave", () => {
        if (frame) {
            cancelAnimationFrame(frame);
        }

        product.style.transform =
            "perspective(1400px) rotateY(-3deg) rotateX(1deg)";
    });
}


/* =========================================================
   HERO PARALLAX
========================================================= */

function initHeroParallax() {
    const hero = document.querySelector(".hero-section");
    const visual = document.querySelector(".hero-visual");

    if (!hero || !visual) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    let ticking = false;

    const update = () => {
        const rect = hero.getBoundingClientRect();
        const height = Math.max(
            hero.offsetHeight,
            window.innerHeight
        );

        const progress = Math.max(
            -1,
            Math.min(1, -rect.top / height)
        );

        const movement = progress * -24;

        visual.style.translate = `0 ${movement}px`;

        ticking = false;
    };

    const requestUpdate = () => {
        if (ticking) return;

        ticking = true;
        requestAnimationFrame(update);
    };

    window.addEventListener(
        "scroll",
        requestUpdate,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        requestUpdate
    );

    update();
}


/* =========================================================
   FLOATING HERO CARDS
========================================================= */

function initFloatingCards() {
    const cards = document.querySelectorAll(
        ".floating-card"
    );

    if (!cards.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    cards.forEach((card, index) => {
        const amplitude = index % 2 === 0 ? 7 : 9;
        const duration = 4300 + index * 850;
        const delay = index * -700;

        card.animate(
            [
                {
                    transform:
                        "translate3d(0, 0, 0)"
                },
                {
                    transform:
                        `translate3d(0, ${amplitude}px, 0)`
                },
                {
                    transform:
                        "translate3d(0, 0, 0)"
                }
            ],
            {
                duration,
                delay,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    });
}


/* =========================================================
   FEATURE CARDS
========================================================= */

function initFeatureCards() {
    const cards = document.querySelectorAll(
        ".feature-card"
    );

    if (!cards.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const finePointer = window.matchMedia(
        "(pointer: fine)"
    ).matches;

    if (reducedMotion || !finePointer) return;

    cards.forEach((card) => {
        let frame = null;

        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();

            if (!rect.width || !rect.height) return;

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;

            const rotateX = (0.5 - y) * 2.2;
            const rotateY = (x - 0.5) * 2.2;

            if (frame) {
                cancelAnimationFrame(frame);
            }

            frame = requestAnimationFrame(() => {
                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-6px)`;
            });
        });

        card.addEventListener("pointerleave", () => {
            if (frame) {
                cancelAnimationFrame(frame);
            }

            card.style.transform = "";
        });
    });
}


/* =========================================================
   TOGETHER ORBIT
========================================================= */

function initTogetherOrbit() {
    const orbitCards = document.querySelectorAll(
        ".together-orbit-card"
    );

    if (!orbitCards.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    orbitCards.forEach((card, index) => {
        const movement =
            index % 2 === 0
                ? 5 + index
                : -(5 + index);

        card.animate(
            [
                {
                    transform:
                        "translate3d(0, 0, 0)"
                },
                {
                    transform:
                        `translate3d(0, ${movement}px, 0)`
                },
                {
                    transform:
                        "translate3d(0, 0, 0)"
                }
            ],
            {
                duration:
                    4000 + index * 650,
                delay:
                    index * -750,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    });
}


/* =========================================================
   HERO HEART MICRO ANIMATION
========================================================= */

function initHeroHearts() {
    const hearts = document.querySelectorAll(
        ".hero-heart"
    );

    if (!hearts.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    hearts.forEach((heart, index) => {
        heart.animate(
            [
                {
                    transform:
                        "translate3d(0, 0, 0) scale(1)"
                },
                {
                    transform:
                        `translate3d(0, ${index % 2 === 0 ? -6 : 6}px, 0) scale(1.04)`
                },
                {
                    transform:
                        "translate3d(0, 0, 0) scale(1)"
                }
            ],
            {
                duration:
                    3400 + index * 800,
                delay:
                    index * -500,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    });
}


/* =========================================================
   SECTION REVEAL
========================================================= */

function initScrollReveal() {
    const sections = document.querySelectorAll(
        ".section"
    );

    if (!sections.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
        sections.forEach((section) => {
            section.classList.add(
                "section-visible"
            );
        });

        return;
    }

    if (!("IntersectionObserver" in window)) {
        sections.forEach((section) => {
            section.classList.add(
                "section-visible"
            );
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "section-visible"
                    );

                    currentObserver.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );

    sections.forEach((section) => {
        observer.observe(section);
    });
}