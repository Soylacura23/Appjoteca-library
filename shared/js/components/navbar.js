/* ================================================================
   navbar.js — Componente Barra de Navegación
   AppJoteca v2.0
   ================================================================ */

   document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ════════════════════════════════════════════
    // Links de navegación — desktop
    // ════════════════════════════════════════════
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.forEach(function (l) { l.classList.remove('active'); });
            link.classList.add('active');

            // Sincronizar estado activo con el menú móvil
            const target = link.getAttribute('data-nav');
            if (target) {
                document.querySelectorAll('.mobile-nav-link').forEach(function (ml) {
                    ml.classList.toggle('active', ml.getAttribute('data-nav') === target);
                });
            }
        });
    });


    // ════════════════════════════════════════════
    // Links de navegación — menú móvil
    // ════════════════════════════════════════════
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileNavLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            mobileNavLinks.forEach(function (l) { l.classList.remove('active'); });
            link.classList.add('active');

            // Sincronizar estado activo con el nav de desktop
            const target = link.getAttribute('data-nav');
            if (target) {
                navLinks.forEach(function (dl) {
                    dl.classList.toggle('active', dl.getAttribute('data-nav') === target);
                });
            }

            closeMobileMenu();
        });
    });


    // ════════════════════════════════════════════
    // Menú hamburguesa — apertura y cierre
    // ════════════════════════════════════════════
    const menuToggleBtn    = document.querySelector('.menu-toggle-btn');
    const mobileMenu       = document.querySelector('.mobile-menu');
    const mobileMenuClose  = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    function openMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('open');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('open');
        document.body.classList.add('menu-open');
        if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'true');
        // Foco accesible al cerrar
        if (mobileMenuClose) {
            setTimeout(function () { mobileMenuClose.focus(); }, 80);
        }
        console.log('[AppJoteca] Menú móvil abierto');
    }

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('open');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('open');
        document.body.classList.remove('menu-open');
        if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'false');
        // Devolver el foco al botón que abrió el menú
        if (menuToggleBtn) menuToggleBtn.focus();
        console.log('[AppJoteca] Menú móvil cerrado');
    }

    if (menuToggleBtn && mobileMenu) {
        menuToggleBtn.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Cerrar con Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    });


    // ════════════════════════════════════════════
    // Búsqueda móvil — toggle desplegable
    // ════════════════════════════════════════════
    const searchToggleBtn   = document.querySelector('.search-toggle-btn');
    const searchMobileArea  = document.querySelector('.topbar-search-mobile');
    const searchMobileInput = searchMobileArea
        ? searchMobileArea.querySelector('input')
        : null;

    if (searchToggleBtn && searchMobileArea) {
        searchToggleBtn.addEventListener('click', function () {
            const isOpen = searchMobileArea.classList.toggle('open');
            searchToggleBtn.setAttribute('aria-expanded', String(isOpen));
            if (isOpen && searchMobileInput) {
                searchMobileInput.focus();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && searchMobileArea.classList.contains('open')) {
                searchMobileArea.classList.remove('open');
                searchToggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }


    // ════════════════════════════════════════════
    // Sincronizar inputs de búsqueda (topbar ↔ móvil)
    // ════════════════════════════════════════════
    const topbarSearchInput = document.querySelector('.topbar-search-input');

    if (topbarSearchInput && searchMobileInput) {
        topbarSearchInput.addEventListener('input', function () {
            searchMobileInput.value = topbarSearchInput.value;
        });
        searchMobileInput.addEventListener('input', function () {
            topbarSearchInput.value = searchMobileInput.value;
        });
    }


    // ════════════════════════════════════════════
    // Redimensionado — cerrar paneles en desktop
    // ════════════════════════════════════════════
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 900) {
            closeMobileMenu();
            if (searchMobileArea) {
                searchMobileArea.classList.remove('open');
                if (searchToggleBtn) searchToggleBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });

});