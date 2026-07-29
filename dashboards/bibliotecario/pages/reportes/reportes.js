/* ============================================================
   reportes.js — Página de Reportes · Appjoteca
   Funcional, limpio y sin complejidad innecesaria
   ============================================================ */

   document.addEventListener('DOMContentLoaded', () => {

    // ── Datos del gráfico ────────────────────────────────
    const chartData = [
        { day: 'Lunes',    value: 40 },
        { day: 'Martes',   value: 65 },
        { day: 'Miércoles',value: 55 },
        { day: 'Jueves',   value: 85 },
        { day: 'Viernes',  value: 45 },
        { day: 'Sábado',   value: 95 },
        { day: 'Domingo',  value: 75 }
    ];

    // ── Renderizar barras del gráfico ────────────────────
    const barsContainer = document.getElementById('chart-bars');
    if (barsContainer) {
        chartData.forEach((item, index) => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = '0%';
            bar.setAttribute('data-value', item.value + '%');
            bar.setAttribute('title', item.day + ': ' + item.value + '%');
            barsContainer.appendChild(bar);

            // Animación escalonada al cargar
            setTimeout(() => {
                bar.style.height = item.value + '%';
            }, 100 + (index * 80));
        });
    }

    // ── Animar barras de densidad horaria ────────────────
    const peakFills = document.querySelectorAll('.peak-bar-fill');
    peakFills.forEach((fill, index) => {
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 300 + (index * 150));
    });

    // ── Hover en tarjetas de métricas (efecto sutil) ───
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'rgba(201, 168, 76, 0.25)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '';
        });
    });

    // ── Botones de acción (feedback visual) ──────────────
    const btnPrimary = document.querySelector('.btn-primary');
    if (btnPrimary) {
        btnPrimary.addEventListener('click', () => {
            btnPrimary.textContent = 'Generando...';
            btnPrimary.style.opacity = '0.7';
            setTimeout(() => {
                btnPrimary.textContent = 'Generar Auditoría';
                btnPrimary.style.opacity = '1';
            }, 1500);
        });
    }

    const btnOutline = document.querySelector('.btn-outline');
    if (btnOutline) {
        btnOutline.addEventListener('click', () => {
            btnOutline.textContent = 'Descargando...';
            setTimeout(() => {
                btnOutline.textContent = 'Descargar PDF';
            }, 1200);
        });
    }

    // ── Efecto parallax sutil en banner ──────────────────
    const forecastBanner = document.querySelector('.forecast-banner');
    if (forecastBanner) {
        forecastBanner.addEventListener('mousemove', (e) => {
            const rect = forecastBanner.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const bg = forecastBanner.querySelector('.forecast-bg');
            if (bg) {
                bg.style.transform = `translate(${x * 8}px, ${y * 8}px) scale(1.05)`;
            }
        });
        forecastBanner.addEventListener('mouseleave', () => {
            const bg = forecastBanner.querySelector('.forecast-bg');
            if (bg) {
                bg.style.transform = 'translate(0,0) scale(1)';
            }
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

        document.addEventListener('click', (e) => {
            if (notifContainer.classList.contains('open') &&
                !notifContainer.contains(e.target) &&
                !notifBtn.contains(e.target)) {
                notifContainer.classList.remove('open');
                notifBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

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
