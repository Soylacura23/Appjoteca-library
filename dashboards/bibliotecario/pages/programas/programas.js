  document.addEventListener('DOMContentLoaded', () => {

    // ── Datos de ejemplo ─────────────────────────────────
    const programs = [
        {
            name: 'Matemáticas Avanzadas',
            dept: 'Matemáticas',
            teacher: 'Claudia Martínez',
            teacherId: '1186404044',
            status: 'active',
            students: 28,
            materials: 12,
            cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop'
        },
        {
            name: 'Literatura Contemporánea',
            dept: 'Literatura',
            teacher: 'Jorge Ramírez',
            teacherId: '1186404045',
            status: 'active',
            students: 22,
            materials: 8,
            cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop'
        },
        {
            name: 'Física Cuántica',
            dept: 'Ciencias',
            teacher: 'Ana López',
            teacherId: '1186404046',
            status: 'upcoming',
            students: 0,
            materials: 15,
            cover: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=250&fit=crop'
        },
        {
            name: 'Historia del Arte',
            dept: 'Historia',
            teacher: 'Pedro Gómez',
            teacherId: '1186404047',
            status: 'finished',
            students: 35,
            materials: 20,
            cover: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=400&h=250&fit=crop'
        },
        {
            name: 'Química Orgánica',
            dept: 'Ciencias',
            teacher: 'María Torres',
            teacherId: '1186404048',
            status: 'active',
            students: 19,
            materials: 10,
            cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop'
        },
        {
            name: 'Filosofía Moderna',
            dept: 'Literatura',
            teacher: 'Carlos Ruiz',
            teacherId: '1186404049',
            status: 'upcoming',
            students: 0,
            materials: 6,
            cover: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400&h=250&fit=crop'
        }
    ];

    const statusLabels = {
        active: 'En Curso',
        upcoming: 'Próximo',
        finished: 'Finalizado'
    };

    const statusClasses = {
        active: 'status-active',
        upcoming: 'status-upcoming',
        finished: 'status-finished'
    };

    // ── Actualizar estadísticas ──────────────────────────
    const activePrograms = programs.filter(p => p.status === 'active').length;
    const totalStudents = programs.reduce((sum, p) => sum + p.students, 0);
    const totalMaterials = programs.reduce((sum, p) => sum + p.materials, 0);

    document.getElementById('stat-programs').textContent = activePrograms;
    document.getElementById('stat-students').textContent = totalStudents;
    document.getElementById('stat-materials').textContent = totalMaterials;

    // ── Renderizar grid de programas ─────────────────────
    const programsGrid = document.getElementById('programs-grid');
    let cardToDelete = null;

    if (programsGrid) {
        programs.forEach((prog, i) => {
            const card = document.createElement('article');
            card.className = 'program-card';
            card.style.animationDelay = `${i * 100}ms`;
            card.dataset.dept = prog.dept.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
            card.dataset.status = prog.status;

            card.innerHTML = `
                <div class="program-card-header">
                    <img src="${prog.cover}" alt="${prog.name}" loading="lazy">
                    <div class="program-card-header-overlay"></div>
                    <span class="program-card-status ${statusClasses[prog.status]}">${statusLabels[prog.status]}</span>
                </div>
                <div class="program-card-body">
                    <span class="program-card-dept">${prog.dept}</span>
                    <h3 class="program-card-title">${prog.name}</h3>
                    <p class="program-card-teacher">
                        <span class="material-symbols-outlined">person</span>
                        Docente: <a href="/dashboards/bibliotecario/pages/usuarios/index.html?id=${prog.teacherId}">${prog.teacher}</a>
                    </p>
                    <div class="program-card-meta">
                        <span class="program-card-meta-item">
                            <span class="material-symbols-outlined">group</span>
                            <strong>${prog.students}</strong> estudiantes
                        </span>
                        <span class="program-card-meta-item">
                            <span class="material-symbols-outlined">menu_book</span>
                            <strong>${prog.materials}</strong> materiales
                        </span>
                    </div>
                    <div class="program-card-actions">
                        <button class="btn-card-primary">Ver</button>
                        <button class="btn-card-outline">Editar</button>
                        <button class="btn-card-danger" data-action="delete">Eliminar</button>
                    </div>
                </div>
            `;
            programsGrid.appendChild(card);
        });
    }

    // ── Filtros ──────────────────────────────────────────
    const filterDept = document.getElementById('filter-dept');
    const filterStatus = document.getElementById('filter-status');

    function applyFilters() {
        const deptVal = filterDept ? filterDept.value : '';
        const statusVal = filterStatus ? filterStatus.value : '';

        document.querySelectorAll('.program-card').forEach(card => {
            const matchDept = !deptVal || card.dataset.dept === deptVal;
            const matchStatus = !statusVal || card.dataset.status === statusVal;
            card.style.display = (matchDept && matchStatus) ? '' : 'none';
        });
    }

    if (filterDept) filterDept.addEventListener('change', applyFilters);
    if (filterStatus) filterStatus.addEventListener('change', applyFilters);

    // ── Modal de eliminación ─────────────────────────────
    const confirmModal = document.getElementById('confirm-modal');
    const confirmBackdrop = document.getElementById('confirm-backdrop');
    const confirmCancel = document.getElementById('confirm-cancel');
    const confirmDelete = document.getElementById('confirm-delete');
    const confirmName = document.getElementById('confirm-program-name');

    function openModal(card) {
        cardToDelete = card;
        const name = card.querySelector('.program-card-title').textContent;
        confirmName.textContent = name;
        confirmModal.hidden = false;
    }

    function closeModal() {
        confirmModal.hidden = true;
        cardToDelete = null;
    }

    function doDelete() {
        if (!cardToDelete) return;
        cardToDelete.style.transition = 'all 0.4s cubic-bezier(0.32,0.72,0,1)';
        cardToDelete.style.opacity = '0';
        cardToDelete.style.transform = 'scale(0.92) translateY(20px)';
        setTimeout(() => {
            cardToDelete.remove();
            cardToDelete = null;
        }, 400);
        closeModal();
    }

    document.querySelectorAll('.btn-card-danger').forEach(btn => {
        btn.addEventListener('click', function() {
            openModal(this.closest('.program-card'));
        });
    });

    if (confirmCancel) confirmCancel.addEventListener('click', closeModal);
    if (confirmDelete) confirmDelete.addEventListener('click', doDelete);
    if (confirmBackdrop) confirmBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !confirmModal.hidden) {
            closeModal();
        }
    });

    // ── Botón nuevo programa ─────────────────────────────
    const addBtn = document.getElementById('btn-add-program');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            addBtn.innerHTML = '<span class="material-symbols-outlined">hourglass_top</span> Pronto...';
            setTimeout(() => {
                addBtn.innerHTML = '<span class="material-symbols-outlined">add</span> Crear Programa';
            }, 1200);
        });
    }

    // ── Notificaciones ───────────────────────────────────
    const notifBtn = document.getElementById('notification-tray-btn');
    const notifContainer = document.getElementById('notification-container');
    if (notifBtn && notifContainer) {
        notifBtn.addEventListener('click', () => {
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
            searchMobile.classList.toggle('open');
            searchToggle.setAttribute('aria-expanded', searchMobile.classList.contains('open'));
            if (searchMobile.classList.contains('open')) {
                const input = searchMobile.querySelector('input');
                if (input) input.focus();
            }
        });
    }

});
