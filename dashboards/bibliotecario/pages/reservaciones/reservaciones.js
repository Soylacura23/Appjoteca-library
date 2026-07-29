/* ============================================================
   reservaciones.js — Página de Reservaciones · Appjoteca
   Funcional, limpio y sin complejidad innecesaria
   ============================================================ */

   document.addEventListener('DOMContentLoaded', () => {

    // ── Datos de ejemplo ─────────────────────────────────
    const requests = [
        {
            title: 'El Gran Gatsby',
            author: 'F. Scott Fitzgerald',
            badge: 'Primera Edición · 1924',
            user: 'Julián Sterling',
            userId: '1186404044',
            cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop'
        },
        {
            title: 'Crimen y Castigo',
            author: 'Fyodor Dostoevsky',
            badge: 'Colección Especial',
            user: 'Elena Moretti',
            userId: '1186404045',
            cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=300&fit=crop'
        },
        {
            title: 'El Alquimista',
            author: 'Paulo Coelho',
            badge: 'Manuscrito · Restringido',
            user: 'Marcus Vane',
            userId: '1186404046',
            cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=300&fit=crop'
        }
    ];

    const returns = [
        { title: 'Más Allá del Bien y del Mal', user: 'Sarah Jenkins', time: '14:30 Hoy', label: 'Devolución Esperada', thumb: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=60&h=80&fit=crop' },
        { title: 'La República', user: 'David Chen', time: '16:45 Hoy', label: 'Devolución Esperada', thumb: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=60&h=80&fit=crop' },
        { title: 'Meditaciones', user: 'Amara Okafor', time: '09:00 Mañana', label: 'Turno Temprano', thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=80&fit=crop' }
    ];

    const history = [
        { title: 'Kafka en la Orilla', id: 'LIB-992-X', user: 'Víctor Hugo', tier: 'Platinum', type: 'return', date: '12 Oct 2026', time: '14:32:01' },
        { title: 'El Retrato de Dorian Gray', id: 'LIB-104-A', user: 'Oscar Wilde', tier: 'Scholar', type: 'loan', date: '12 Oct 2026', time: '12:15:44' },
        { title: 'Matadero Cinco', id: 'LIB-455-B', user: 'Kurt Vonnegut', tier: 'Standard', type: 'extension', date: '12 Oct 2026', time: '09:02:11' },
        { title: 'La Odisea', id: 'LIB-001-A', user: 'Homero', tier: 'Arch-Member', type: 'overdue', date: '11 Oct 2026', time: '23:59:59' }
    ];

    const badgeClasses = {
        return: 'badge-return',
        loan: 'badge-loan',
        extension: 'badge-extension',
        overdue: 'badge-overdue'
    };

    const badgeLabels = {
        return: 'Devolución Completada',
        loan: 'Préstamo Emitido',
        extension: 'Extensión Concedida',
        overdue: 'Marcado como Atrasado'
    };

    // ── Renderizar solicitudes ───────────────────────────
    const requestsGrid = document.getElementById('requests-grid');
    if (requestsGrid) {
        requests.forEach((req, i) => {
            const card = document.createElement('div');
            card.className = 'request-card';
            card.style.animationDelay = `${i * 100}ms`;
            card.innerHTML = `
                <div class="request-thumb">
                    <img src="${req.cover}" alt="Portada de ${req.title}" loading="lazy">
                </div>
                <div class="request-body">
                    <div class="request-meta">
                        <span class="request-badge">${req.badge}</span>
                        <h3 class="request-title">${req.title}</h3>
                        <p class="request-author">${req.author}</p>
                        <div class="request-user">
                            <span class="material-symbols-outlined">person</span>
                            <a href="/dashboards/bibliotecario/pages/usuarios/index.html?id=${req.userId}">${req.user}</a>
                        </div>
                    </div>
                    <div class="request-actions">
                        <button class="btn-approve" data-action="approve" data-title="${req.title}">Aprobar</button>
                        <button class="btn-decline" data-action="decline" data-title="${req.title}">Rechazar</button>
                    </div>
                </div>
            `;
            requestsGrid.appendChild(card);
        });
    }

    // ── Renderizar devoluciones ──────────────────────────
    const returnsList = document.getElementById('returns-list');
    if (returnsList) {
        returns.forEach(ret => {
            const item = document.createElement('div');
            item.className = 'return-item';
            item.innerHTML = `
                <div class="return-book">
                    <div class="return-thumb">
                        <img src="${ret.thumb}" alt="" loading="lazy">
                    </div>
                    <div class="return-info">
                        <span class="return-title">${ret.title}</span>
                        <span class="return-user">Prestado a: ${ret.user}</span>
                    </div>
                </div>
                <div class="return-time">
                    <span class="return-time-main">${ret.time}</span>
                    <span class="return-time-label">${ret.label}</span>
                </div>
            `;
            returnsList.appendChild(item);
        });
    }

    // ── Renderizar historial ─────────────────────────────
    const historyTbody = document.getElementById('history-tbody');
    if (historyTbody) {
        history.forEach(h => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Volumen">
                    <div class="history-item-book">
                        <div class="history-item-icon">
                            <span class="material-symbols-outlined">book_4</span>
                        </div>
                        <div>
                            <div class="history-item-title">${h.title}</div>
                            <div class="history-item-id">ID: ${h.id}</div>
                        </div>
                    </div>
                </td>
                <td data-label="Usuario">
                    <div class="history-item-user">${h.user}</div>
                    <div class="history-item-tier">${h.tier}</div>
                </td>
                <td data-label="Movimiento">
                    <span class="history-badge ${badgeClasses[h.type]}">${badgeLabels[h.type]}</span>
                </td>
                <td data-label="Fecha" class="text-right">
                    <span class="history-item-date">${h.date}</span>
                    <span class="history-item-time">${h.time}</span>
                </td>
            `;
            historyTbody.appendChild(row);
        });
    }

    // ── Acciones de aprobar/rechazar ────────────────────
    document.querySelectorAll('.btn-approve, .btn-decline').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            const title = this.dataset.title;
            const card = this.closest('.request-card');

            if (action === 'approve') {
                this.textContent = 'Aprobado';
                this.style.background = '#22c55e';
                this.style.color = '#fff';
            } else {
                this.textContent = 'Rechazado';
                this.style.background = '#ef4444';
                this.style.color = '#fff';
            }

            // Deshabilitar ambos botones
            const actions = card.querySelectorAll('.btn-approve, .btn-decline');
            actions.forEach(b => {
                b.disabled = true;
                b.style.opacity = '0.5';
                b.style.cursor = 'not-allowed';
            });

            // Animar salida de la tarjeta después de 1s
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateX(40px) scale(0.95)';
                setTimeout(() => card.remove(), 400);
            }, 800);
        });
    });

    // ── Cargar más historial (simulado) ─────────────────
    const loadBtn = document.getElementById('history-load-btn');
    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            loadBtn.innerHTML = '<span class="material-symbols-outlined" style="animation: spin 1s linear infinite">refresh</span> Cargando...';
            setTimeout(() => {
                loadBtn.innerHTML = 'Archivo Completo Cargado <span class="material-symbols-outlined">check</span>';
                loadBtn.style.color = '#22c55e';
                loadBtn.disabled = true;
            }, 1200);
        });
    }

    // ── Notificaciones (toggle) ──────────────────────────
    const notifBtn = document.getElementById('notification-tray-btn');
    const notifContainer = document.getElementById('notification-container');
    if (notifBtn && notifContainer) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifContainer.classList.toggle('open');
            notifBtn.setAttribute('aria-expanded', notifContainer.classList.contains('open'));
        });

        // Cerrar al hacer click fuera
        document.addEventListener('click', (e) => {
            if (notifContainer.classList.contains('open') &&
                !notifContainer.contains(e.target) &&
                !notifBtn.contains(e.target)) {
                notifContainer.classList.remove('open');
                notifBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ── Marcar todas como leídas ────────────────────────
    const markAllBtn = document.getElementById('mark-all-read');
    const countPill = document.querySelector('.count-pill');
    const notifBadge = document.querySelector('.notification-badge');
    if (markAllBtn) {
        markAllBtn.addEventListener('click', () => {
            if (countPill) countPill.textContent = '0';
            if (notifBadge) notifBadge.classList.add('hidden');
        });
    }

    // ── Búsqueda móvil ──────────────────────────────────
    const searchToggle = document.getElementById('search-toggle-btn');
    const searchMobile = document.getElementById('topbar-search-mobile');
    if (searchToggle && searchMobile) {
        searchToggle.addEventListener('click', () => {
            const isOpen = searchMobile.classList.toggle('open');
            searchToggle.setAttribute('aria-expanded', isOpen);
            searchMobile.setAttribute('aria-hidden', !isOpen);
            if (isOpen) {
                const input = searchMobile.querySelector('input');
                if (input) input.focus();
            }
        });
    }

});
