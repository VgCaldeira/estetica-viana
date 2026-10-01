(() => {
  "use strict";

  const yearEl = document.getElementById("year");
  const currentYear = new Date().getFullYear();
  if (yearEl) yearEl.textContent = currentYear;

  const header = document.getElementById("siteHeader");
  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");

  const closeMobileNav = () => {
    if (!hamburgerBtn || !mobileNav) return;
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Abrir menu");
    mobileNav.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
      hamburgerBtn.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileNav);
    });
  }

  const revealTargets = document.querySelectorAll(".reveal, .reveal-stagger");

  if ("IntersectionObserver" in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* Contador animado "Desde 1978" */
  const counterEl = document.getElementById("yearsCounter");
  if (counterEl) {
    const startYear = 1978;
    const target = currentYear - startYear;
    let animated = false;

    const animateCounter = () => {
      if (animated) return;
      animated = true;
      const duration = 1400;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counterEl.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter();
              counterObserver.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      counterObserver.observe(counterEl);
    } else {
      counterEl.textContent = target;
    }
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) closeMobileNav();
  });
})();
