document.addEventListener('DOMContentLoaded', () => {
  const usuarios = Array.isArray(window.USUARIOS_DATA) ? window.USUARIOS_DATA : [];

  const els = {
    filterRole: document.getElementById('filter-role'),
    filterStatus: document.getElementById('filter-status'),
    statTotal: document.getElementById('stat-total'),
    statActive: document.getElementById('stat-active'),
    statStudents: document.getElementById('stat-students'),
    statTeachers: document.getElementById('stat-teachers'),
    searchToggleBtn: document.getElementById('search-toggle-btn'),
    searchMobile: document.getElementById('topbar-search-mobile'),
    searchMobileInput: document.getElementById('search-mobile-input'),
    searchDesktop: document.getElementById('search'),

    detailOverlay: document.getElementById('user-detail-overlay'),
    detailBackdrop: document.getElementById('user-detail-backdrop'),
    detailClose: document.getElementById('user-detail-close'),
    detailTitle: document.getElementById('user-detail-title'),
    detailAvatar: document.getElementById('detail-avatar'),
    detailName: document.getElementById('detail-name'),
    detailSubtitle: document.getElementById('detail-subtitle'),
    detailStatusBadge: document.getElementById('detail-status-badge'),
    detailBio: document.getElementById('detail-bio'),
    detailUsuario: document.getElementById('detail-usuario'),
    detailEmail: document.getElementById('detail-email'),
    detailDocumento: document.getElementById('detail-documento'),
    detailRol: document.getElementById('detail-rol'),
    detailDocImg: document.getElementById('detail-doc-img'),
    idPlaceholder: document.getElementById('id-placeholder'),
    deleteAccountBtn: document.getElementById('delete-account-btn'),

    deleteConfirmModal: document.getElementById('delete-confirm-modal'),
    deleteConfirmBackdrop: document.getElementById('delete-confirm-backdrop'),
    deleteConfirmName: document.getElementById('delete-confirm-name'),
    deleteConfirmCancel: document.getElementById('delete-confirm-cancel'),
    deleteConfirmAccept: document.getElementById('delete-confirm-accept'),
  };

  let selectedData = null;

  /* ── Tabla con Tabulator ─────────────────────────────────────── */
  const table = new Tabulator('#users-table', {
    data: usuarios,
    index: 'id',
    layout: 'fitColumns',
    placeholder: 'No hay usuarios para mostrar',
    columns: [
      {
        title: 'Perfil',
        field: 'nombre',
        minWidth: 240,
        formatter(cell) {
          const d = cell.getRow().getData();
          return `
            <div class="user-cell">
              <img src="${d.foto_perfil}" alt="${d.nombre}" class="user-avatar">
              <div class="user-info">
                <span class="user-name">${d.nombre}</span>
                <span class="user-subtitle">@${d.usuario}</span>
              </div>
            </div>`;
        },
      },
      {
        title: 'Rol',
        field: 'rol',
        width: 150,
        formatter(cell) {
          const d = cell.getRow().getData();
          const claseRol = d.rol === 'Docente' ? 'rol-docente' : d.rol === 'Bibliotecario' ? 'rol-bibliotecario' : '';
          return `<span class="rol-badge ${claseRol}"><span>${d.rol}</span></span>`;
        },
      },
      { title: 'Documento', field: 'documento', width: 160 },
      {
        title: 'Estado',
        field: 'estado',
        width: 130,
        formatter(cell) {
          const valor = cell.getValue();
          const clase = valor === 'activo' ? 'status-active' : 'status-inactive';
          return `<span class="status-badge ${clase}">${valor}</span>`;
        },
      },
    ],
  });

  table.on('rowClick', (e, row) => openOverlay(row.getData()));
  table.on('dataFiltered', (filters, rows) => updateStats(rows.length));
  table.on('tableBuilt', () => updateStats(usuarios.length));

  function updateStats(visibleCount) {
    const total = usuarios.length;
    if (els.statTotal) els.statTotal.textContent = total;
    if (els.statActive) els.statActive.textContent = usuarios.filter(u => u.estado === 'activo').length;
    if (els.statStudents) els.statStudents.textContent = usuarios.filter(u => u.rol === 'Estudiante').length;
    if (els.statTeachers) els.statTeachers.textContent = usuarios.filter(u => u.rol === 'Docente').length;
  }

  function applyFilters() {
    const role = els.filterRole?.value || '';
    const status = els.filterStatus?.value || '';
    const query = (els.searchMobileInput?.value || els.searchDesktop?.value || '').trim().toLowerCase();

    table.setFilter((data) => {
      const matchesRole = !role || data.rol === role;
      const matchesStatus = !status || data.estado === status;
      const haystack = [data.nombre, data.usuario, data.rol, data.documento, data.correo]
        .join(' ')
        .toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      return matchesRole && matchesStatus && matchesQuery;
    });
  }

  function openOverlay(d) {
    selectedData = d;

    els.detailTitle.textContent = d.nombre;
    els.detailAvatar.src = d.foto_perfil;
    els.detailAvatar.alt = `Foto de ${d.nombre}`;
    els.detailName.textContent = d.nombre;
    els.detailSubtitle.textContent = `@${d.usuario} · ${d.rol}`;
    els.detailBio.textContent = d.biografia ? `"${d.biografia}"` : 'Sin biografía registrada.';

    els.detailUsuario.textContent = d.usuario || '—';
    els.detailEmail.textContent = d.correo || '—';
    els.detailDocumento.textContent = d.documento || '—';
    els.detailRol.textContent = d.rol || '—';

    const isActive = d.estado === 'activo';
    els.detailStatusBadge.textContent = isActive ? 'Activo' : 'Inactivo';
    els.detailStatusBadge.classList.toggle('inactive', !isActive);

    // window.AppUser lo define user_context.php con los datos de la sesión activa.
    // No se puede eliminar la propia cuenta desde este panel.
    const esMiPropiaCuenta = window.AppUser && String(window.AppUser.id) === String(d.id);
    if (els.deleteAccountBtn) {
      els.deleteAccountBtn.hidden = !!esMiPropiaCuenta;
    }

    if (d.foto_documento) {
      els.detailDocImg.src = d.foto_documento;
      els.detailDocImg.hidden = false;
      els.idPlaceholder.hidden = true;
    } else {
      els.detailDocImg.hidden = true;
      els.detailDocImg.src = '';
      els.idPlaceholder.hidden = false;
    }

    els.detailOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeOverlay() {
    els.detailOverlay.hidden = true;
    document.body.style.overflow = '';
    selectedData = null;
  }

  function showDeleteConfirm() {
    if (!selectedData) return;
    els.deleteConfirmName.textContent = selectedData.nombre;
    els.deleteConfirmModal.hidden = false;
  }

  function hideDeleteConfirm() {
    els.deleteConfirmModal.hidden = true;
  }

  function deleteSelectedUser() {
    if (!selectedData) return;

    const usuarioAEliminar = selectedData;

    // El JS limpia la fila de la tabla de inmediato (optimista)...
    table.deleteRow(usuarioAEliminar.id);
    const idx = usuarios.findIndex(u => u.id === usuarioAEliminar.id);
    if (idx > -1) usuarios.splice(idx, 1);
    updateStats(table.getDataCount('active'));
    closeOverlay();

    // ...pero si el backend falla, se revierte y se avisa.
    // Nombre de archivo corregido: era 'usuarios_eliminar.php' (guion bajo,
    // no existe) y por eso el borrado nunca llegaba a la base de datos.
    fetch('usuarios-eliminar.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `id_usuario=${encodeURIComponent(usuarioAEliminar.id)}`,
    })
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (!data.ok) {
          throw new Error(data.error || `Error ${status} al eliminar`);
        }
      })
      .catch(err => {
        // Revertir: volver a insertar el usuario en la tabla y en memoria
        if (idx > -1) usuarios.splice(idx, 0, usuarioAEliminar);
        table.addData([usuarioAEliminar]);
        updateStats(table.getDataCount('active'));
        alert(`No se pudo eliminar el usuario: ${err.message}`);
      });
  }

  function toggleSearchMobile() {
    const isOpen = els.searchMobile.classList.toggle('open');
    els.searchToggleBtn.setAttribute('aria-expanded', isOpen);
    els.searchMobile.setAttribute('aria-hidden', !isOpen);
    if (isOpen) {
      setTimeout(() => els.searchMobileInput?.focus(), 100);
    }
  }

  els.detailClose.addEventListener('click', closeOverlay);
  els.detailBackdrop.addEventListener('click', closeOverlay);

  els.deleteAccountBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showDeleteConfirm();
  });

  els.deleteConfirmCancel.addEventListener('click', hideDeleteConfirm);
  els.deleteConfirmBackdrop.addEventListener('click', hideDeleteConfirm);
  els.deleteConfirmAccept.addEventListener('click', () => {
    hideDeleteConfirm();
    deleteSelectedUser();
  });

  if (els.searchToggleBtn) {
    els.searchToggleBtn.addEventListener('click', toggleSearchMobile);
  }

  [els.filterRole, els.filterStatus].forEach(el => {
    el?.addEventListener('change', applyFilters);
  });

  els.searchMobileInput?.addEventListener('input', applyFilters);
  els.searchDesktop?.addEventListener('input', applyFilters);

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!els.deleteConfirmModal.hidden) { hideDeleteConfirm(); return; }
    if (!els.detailOverlay.hidden) { closeOverlay(); }
  });
});