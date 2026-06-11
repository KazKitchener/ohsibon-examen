/* ==========================================================================
   OHSIBON — Intranet · script partagé
   - injecte l'en-tête/navigation et le pied de page sur chaque page
   - menu mobile, état actif, animations d'apparition
   ========================================================================== */
(function () {
  "use strict";

  // Logo maple-leaf (inline SVG, même tracé que assets/logo.svg)
  var MARK =
    '<svg class="brand__mark" viewBox="0 0 64 64" aria-hidden="true">' +
    '<circle cx="32" cy="32" r="31" fill="#bf5630"/>' +
    '<circle cx="32" cy="32" r="31" fill="none" stroke="#7a3c20" stroke-width="2"/>' +
    '<path fill="#e8492b" stroke="#3a1c10" stroke-width="1.6" stroke-linejoin="round" d="M32 9 l4.2 8.6 6.2-3.1-2.0 7.6 8.0-0.6-5.4 5.9 8.2 3.0-7.6 2.4 4.4 6.0-7.0-1.4 1.1 8.2-6.1-5.0-2.0 5.0-2.0-5.0-6.1 5.0 1.1-8.2-7.0 1.4 4.4-6.0-7.6-2.4 8.2-3.0-5.4-5.9 8.0 0.6-2.0-7.6 6.2 3.1z"/>' +
    '<path fill="none" stroke="#3a1c10" stroke-width="1.4" stroke-linecap="round" d="M32 50 V30 M32 36 l-5 -4 M32 36 l5 -4 M32 42 l-6 -5 M32 42 l6 -5"/>' +
    "</svg>";

  // Arborescence du site (libellés en français)
  var LINKS = [
    { href: "index.html", label: "Accueil" },
    {
      label: "Notre entreprise",
      children: [
        { href: "entreprise.html", label: "Qui nous sommes" },
        { href: "equipe.html", label: "Notre équipe" }
      ]
    },
    {
      label: "Expansion",
      children: [
        { href: "strategie.html", label: "Stratégie" },
        { href: "plan-action.html", label: "Plan d'action" },
        { href: "rh-postes.html", label: "Postes à combler" }
      ]
    },
    {
      label: "Ressources humaines",
      children: [
        { href: "rh-organigramme.html", label: "Organigramme" },
        { href: "rh-gestion.html", label: "Approche de gestion" },
        { href: "rh-bienetre.html", label: "Bien-être du personnel" }
      ]
    }
  ];

  function current() {
    var p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function navMarkup() {
    var here = current();
    var items = LINKS.map(function (l) {
      if (l.children) {
        var active = l.children.some(function (c) { return c.href === here; });
        var sub = l.children.map(function (c) {
          var cur = c.href === here ? ' aria-current="page"' : "";
          return '<li><a href="' + c.href + '"' + cur + ">" + c.label + "</a></li>";
        }).join("");
        return (
          '<li class="nav__item">' +
          '<a href="' + l.children[0].href + '"' + (active ? ' aria-current="page"' : "") +
          ">" + l.label + ' <span class="nav__caret">▾</span></a>' +
          '<ul class="nav__dd">' + sub + "</ul></li>"
        );
      }
      var cur = l.href === here ? ' aria-current="page"' : "";
      return '<li class="nav__item"><a href="' + l.href + '"' + cur + ">" + l.label + "</a></li>";
    }).join("");

    return (
      '<div class="container">' +
      '<nav class="nav" aria-label="Navigation principale">' +
      '<a class="brand" href="index.html">' + MARK +
      '<span>OHSIBON<small>Portail interne</small></span></a>' +
      '<button class="nav__toggle" aria-label="Menu" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
      "</button>" +
      '<ul class="nav__links">' + items + "</ul>" +
      "</nav></div>"
    );
  }

  function footerMarkup() {
    return (
      '<div class="container">' +
      '<div class="footer__grid">' +
      "<div>" +
      '<div class="footer__brand">' + MARK + "<b>OHSIBON</b></div>" +
      "<p>Produits à base d'érable, en Ontario. " +
      "L'érable sous toutes ses formes : à savourer, à boire, à prendre soin.</p>" +
      "</div>" +
      "<div><h4>Sections</h4><ul>" +
      '<li><a href="index.html">Accueil</a></li>' +
      '<li><a href="entreprise.html">Qui nous sommes</a></li>' +
      '<li><a href="equipe.html">Notre équipe</a></li>' +
      '<li><a href="strategie.html">Stratégie</a></li>' +
      '<li><a href="plan-action.html">Plan d\'action</a></li>' +
      '<li><a href="rh-postes.html">Postes à combler</a></li>' +
      "</ul></div>" +
      "<div><h4>Ressources humaines</h4><ul>" +
      '<li><a href="rh-organigramme.html">Organigramme</a></li>' +
      '<li><a href="rh-gestion.html">Approche de gestion</a></li>' +
      '<li><a href="rh-bienetre.html">Bien-être du personnel</a></li>' +
      "</ul></div>" +
      "</div>" +
      '<div class="footer__bottom">' +
      "<span>© <span data-year></span> Ohsibon — Portail interne du personnel</span>" +
      "<span>Paco &amp; Justine · Eauclaire, Ontario</span>" +
      "</div></div>"
    );
  }

  function mount() {
    var header = document.querySelector("[data-site-header]");
    if (header) header.innerHTML = navMarkup();
    var footer = document.querySelector("[data-site-footer]");
    if (footer) footer.innerHTML = footerMarkup();

    // Année du pied de page
    var y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();

    // Menu mobile
    var nav = document.querySelector(".nav");
    var toggle = document.querySelector(".nav__toggle");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.getAttribute("data-open") === "true";
        nav.setAttribute("data-open", String(!open));
        toggle.setAttribute("aria-expanded", String(!open));
      });
    }

    // Cartes FFPM : retournement au clic / tap (en plus du survol)
    document.querySelectorAll(".flip").forEach(function (el) {
      el.addEventListener("click", function () { el.classList.toggle("is-flipped"); });
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.classList.toggle("is-flipped"); }
      });
    });

    // Animations d'apparition
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && reveals.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
