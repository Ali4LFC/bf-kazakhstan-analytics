(function () {
  "use strict";

  var THEME_KEY = "bfk-theme-v1";
  var root = document.documentElement;

  function savedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (error) {
      return null;
    }
  }

  function detectTheme() {
    var stored = savedTheme();
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function persistTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      /* ignore storage errors */
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    persistTheme(theme);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      var isLight = theme === "light";
      button.setAttribute("aria-pressed", isLight ? "true" : "false");
      button.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
      button.title = isLight ? "Switch to dark theme" : "Switch to light theme";
    });
    window.dispatchEvent(
      new CustomEvent("bfk:themechange", {
        detail: { theme: theme },
      }),
    );
  }

  function initTheme() {
    applyTheme(detectTheme());
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(next);
      });
    });
  }

  function setNavOpen(open) {
    document.body.classList.toggle("nav-open", open);
    document.querySelectorAll("[data-nav-toggle]").forEach(function (button) {
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function initNav() {
    document.querySelectorAll("[data-nav-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        setNavOpen(!document.body.classList.contains("nav-open"));
      });
    });

    document.addEventListener("click", function (event) {
      if (!document.body.classList.contains("nav-open")) return;
      var target = event.target;
      if (!target.closest(".side-rail") && !target.closest("[data-nav-toggle]")) {
        setNavOpen(false);
      }
      if (target.closest(".rail-link")) {
        setNavOpen(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) setNavOpen(false);
    });
  }

  function formatValue(element, value) {
    var format = element.dataset.format || "number";
    var decimals = Number(element.dataset.decimals || 0);

    if (format === "currency-usd") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
    }

    if (format === "currency-bdt") {
      return (
        new Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(value) + " BDT"
      );
    }

    return (
      (element.dataset.prefix || "") +
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value) +
      (element.dataset.suffix || "")
    );
  }

  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          var element = entry.target;
          var target = Number(element.dataset.count || 0);
          var duration = 1400;
          var start = performance.now();

          function step(now) {
            var progress = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = formatValue(element, target * eased);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              element.textContent = formatValue(element, target);
            }
          }

          requestAnimationFrame(step);
        });
      },
      { threshold: 0.35 },
    );

    counters.forEach(function (counter) {
      counter.textContent = formatValue(counter, 0);
      observer.observe(counter);
    });
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" },
    );

    items.forEach(function (item, index) {
      item.style.transitionDelay = (index % 6) * 50 + "ms";
      observer.observe(item);
    });
  }

  function initTopSearch() {
    var search = document.querySelector("[data-top-search]");
    if (!search) return;

    document.addEventListener("keydown", function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        search.focus();
        search.select();
      }
    });
  }

  function init() {
    initTheme();
    initNav();
    initCounters();
    initReveal();
    initTopSearch();

    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
