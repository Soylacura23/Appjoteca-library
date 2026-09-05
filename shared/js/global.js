/* ================================================================
   global.js — Componentes Globales Reutilizables
   AppJoteca v2.0

   Maneja: botón de perfil, menú off-canvas, bandeja de
   notificaciones y overlay compartido.
   Reutilizable en todas las páginas de la biblioteca.
   ================================================================ */

   (function () {
    'use strict';

    /* ════════════════════════════════════════════
       Config
    ════════════════════════════════════════════ */
    var PROFILE_IMAGE = window.AppUser.foto;
    var PROFILE_NAME  = window.AppUser.nombre;
    var PROFILE_ROLE  = window.AppUser.rol;

    /* ════════════════════════════════════════════
       Overlay compartido
    ════════════════════════════════════════════ */
    var overlay = document.getElementById('overlay');

    function showOverlay() {
        if (!overlay) return;
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function hideOverlay() {
        if (!overlay) return;
        // Solo ocultar si no hay panel abierto
        var profileOpen = menuOffCanvas && menuOffCanvas.classList.contains('open');
        var notifOpen   = notifContainer && notifContainer.classList.contains('open');
        if (!profileOpen && !notifOpen) {
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    if (overlay) {
        overlay.addEventListener('click', function () {
            closeProfileMenu();
            closeNotifications();
        });
    }

    /* ════════════════════════════════════════════
       Botón de perfil — creación dinámica
    ════════════════════════════════════════════ */
    function createProfileButton(containerId, sizeClass) {
        sizeClass = sizeClass || 'btn-md';
        var container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML =
            '<button class="profile-button ' + sizeClass + '" aria-label="Abrir menú de perfil" type="button">' +
            '  <img src="' + PROFILE_IMAGE + '" alt="Foto de perfil" class="img-profile">' +
            '</button>';
    }

    createProfileButton('profile-button-topbar', 'btn-md');
    createProfileButton('profile-button-menu',   'btn-lg');


    /* ════════════════════════════════════════════
       Menú off-canvas de perfil
    ════════════════════════════════════════════ */
    var menuOffCanvas = document.querySelector('.menu-off-canva');

    // Insertar nombre y rol si el contenedor los tiene vacíos
    var menuProfileContainer = document.getElementById('profile-button-menu');
    if (menuProfileContainer) {
        // Agregar nombre y rol debajo de la imagen
        var nameEl = document.createElement('p');
        nameEl.className = 'menu-profile-name';
        nameEl.textContent = PROFILE_NAME;

        var roleEl = document.createElement('p');
        roleEl.className = 'menu-profile-role';
        roleEl.textContent = PROFILE_ROLE;

        menuProfileContainer.appendChild(nameEl);
        menuProfileContainer.appendChild(roleEl);
    }

    function openProfileMenu() {
        if (!menuOffCanvas) return;
        closeNotifications(true); // Cerrar notifs sin tocar overlay
        menuOffCanvas.classList.add('open');
        showOverlay();
    }

    function closeProfileMenu() {
        if (!menuOffCanvas) return;
        menuOffCanvas.classList.remove('open');
        hideOverlay();
    }

    // Delegación de eventos para botones de perfil
    document.addEventListener('click', function (e) {
        // Botón perfil en topbar
        if (e.target.closest('#profile-button-topbar .profile-button')) {
            openProfileMenu();
            return;
        }
        // Botón perfil en footer del menú móvil
        if (e.target.closest('#profile-button-menu-footer .profile-button')) {
            openProfileMenu();
            return;
        }
    });

    // Botón volver del off-canvas
    var goBackBtn = document.querySelector('.menu-off-canva .arrow-back');
    if (goBackBtn) {
        goBackBtn.addEventListener('click', closeProfileMenu);
    }

    // Configuración
    var configBtn = document.querySelector('.menu-off-canva .config');
    if (configBtn) {
        configBtn.addEventListener('click', function () {
            window.location.href = '../../pages/settings/configuracion.php';
        });
    }

    // Cerrar sesión
    var signOutBtn = document.querySelector('.menu-off-canva .signout');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', function () {
            window.location.href = '../../backend/auth/logout.php';
        });
    }


    /* ════════════════════════════════════════════
       Bandeja de notificaciones
    ════════════════════════════════════════════ */
    var notifContainer = document.getElementById('notification-container');

    function openNotifications() {
        if (!notifContainer) return;
        closeProfileMenu(); // Cerrar menú de perfil si está abierto
        notifContainer.classList.add('open');
        // Overlay solo en móvil
        if (window.innerWidth < 900) {
            showOverlay();
        }
        // Marcar botón activo
        document.querySelectorAll('.notification-tray').forEach(function (btn) {
            btn.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
        });
    }

    function closeNotifications(skipOverlay) {
        if (!notifContainer) return;
        notifContainer.classList.remove('open');
        if (!skipOverlay) {
            if (window.innerWidth < 900) hideOverlay();
        }
        document.querySelectorAll('.notification-tray').forEach(function (btn) {
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
        });
    }

    // Clicks en botones de notificación
    document.addEventListener('click', function (e) {
        if (e.target.closest('.notification-tray')) {
            if (notifContainer && notifContainer.classList.contains('open')) {
                closeNotifications();
            } else {
                openNotifications();
            }
            return;
        }

        // Cerrar al hacer click fuera del panel
        if (
            notifContainer &&
            notifContainer.classList.contains('open') &&
            !e.target.closest('#notification-container') &&
            !e.target.closest('.notification-tray') &&
            window.innerWidth >= 900
        ) {
            closeNotifications();
        }
    });

    // Marcar todas como leídas
    var markAllBtn = document.getElementById('mark-all-read');
    if (markAllBtn) {
        markAllBtn.addEventListener('click', function () {
            document.querySelectorAll('.notification-item.unread').forEach(function (item) {
                item.classList.remove('unread');
            });
            // Ocultar badge
            document.querySelectorAll('.notification-badge').forEach(function (b) {
                b.classList.add('hidden');
            });
            // Actualizar count pill
            var pill = document.querySelector('.count-pill');
            if (pill) pill.style.display = 'none';
        });
    }

    // Click en item de notificación
    if (notifContainer) {
        notifContainer.addEventListener('click', function (e) {
            var item = e.target.closest('.notification-item');
            if (item) {
                item.classList.remove('unread');
                // Actualizar badge si no quedan no leídas
                var remaining = notifContainer.querySelectorAll('.notification-item.unread').length;
                if (remaining === 0) {
                    document.querySelectorAll('.notification-badge').forEach(function (b) {
                        b.classList.add('hidden');
                    });
                    var pill = notifContainer.querySelector('.count-pill');
                    if (pill) pill.style.display = 'none';
                }
            }
        });
    }


    /* ════════════════════════════════════════════
       Búsqueda (formulario)
    ════════════════════════════════════════════ */
    var searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var q = searchForm.querySelector('[name="query"]');
            console.log('[AppJoteca] Búsqueda:', q ? q.value : '');
        });
    }


    /* ════════════════════════════════════════════
       Tecla Escape — cierra paneles abiertos
    ════════════════════════════════════════════ */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeProfileMenu();
            closeNotifications();
        }
    });


    /* ════════════════════════════════════════════
       Resize — cerrar notificaciones en escritorio
    ════════════════════════════════════════════ */
    window.addEventListener('resize', function () {
        // Si pasa a escritorio y el overlay estaba por notificaciones, quitarlo
        if (window.innerWidth >= 900 && overlay && overlay.classList.contains('show')) {
            var profileOpen = menuOffCanvas && menuOffCanvas.classList.contains('open');
            if (!profileOpen) {
                overlay.classList.remove('show');
                document.body.style.overflow = '';
            }
        }
    });

})();