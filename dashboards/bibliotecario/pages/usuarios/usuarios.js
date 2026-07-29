document.addEventListener('DOMContentLoaded', () => {
  const DELETE_CODE = '1234';
  const CODE_VALIDITY_MINUTES = 15;

  const els = {
    tbody: document.getElementById('users-tbody'),
    filterRole: document.getElementById('filter-role'),
    filterStatus: document.getElementById('filter-status'),
    statTotal: document.getElementById('stat-total'),
    statActive: document.getElementById('stat-active'),
    statStudents: document.getElementById('stat-students'),
    statTeachers: document.getElementById('stat-teachers'),
    paginationInfo: document.getElementById('pagination-info'),
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
    detailPhone: document.getElementById('detail-phone'),
    detailEmail: document.getElementById('detail-email'),
    detailId: document.getElementById('detail-id'),
    detailCreated: document.getElementById('detail-created'),
    revealIdBtn: document.getElementById('reveal-id-btn'),
    documentOverlay: document.querySelector('.document-overlay'),
    deleteAccountBtn: document.getElementById('delete-account-btn'),

    deleteConfirmModal: document.getElementById('delete-confirm-modal'),
    deleteConfirmBackdrop: document.getElementById('delete-confirm-backdrop'),
    deleteConfirmName: document.getElementById('delete-confirm-name'),
    deleteConfirmCancel: document.getElementById('delete-confirm-cancel'),
    deleteConfirmAccept: document.getElementById('delete-confirm-accept'),

    deleteCodeModal: document.getElementById('delete-code-modal'),
    deleteCodeBackdrop: document.getElementById('delete-code-backdrop'),
    deleteCodeInput: document.getElementById('delete-code-input'),
    deleteCodeError: document.getElementById('code-error'),
    deleteCodeCancel: document.getElementById('delete-code-cancel'),
    deleteCodeSubmit: document.getElementById('delete-code-submit'),
  };

  let selectedRow = null;
  let codeSentAt = null;

  function updateStats() {
    const rows = [...els.tbody.querySelectorAll('tr.user')];
    const visible = rows.filter(r => !r.classList.contains('hidden-row'));
    els.statTotal.textContent = rows.length;
    els.statActive.textContent = rows.filter(r => r.dataset.status === 'activo').length;
    els.statStudents.textContent = rows.filter(r => r.dataset.role === 'Estudiante').length;
    els.statTeachers.textContent = rows.filter(r => r.dataset.role === 'Docente').length;
    els.paginationInfo.textContent = `Mostrando 1 a ${visible.length} de ${rows.length} usuarios`;
  }

  function applyFilters() {
    const role = els.filterRole.value;
    const status = els.filterStatus.value;
    const query = (els.searchMobileInput?.value || els.searchDesktop?.value || '').trim().toLowerCase();

    els.tbody.querySelectorAll('tr.user').forEach(row => {
      const matchesRole = !role || row.dataset.role === role;
      const matchesStatus = !status || row.dataset.status === status;
      const haystack = [
        row.dataset.name,
        row.dataset.role,
        row.dataset.id,
        row.dataset.subtitle,
        row.dataset.email,
      ].join(' ').toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      row.classList.toggle('hidden-row', !(matchesRole && matchesStatus && matchesQuery));
    });

    updateStats();
  }

  function populateOverlay(row) {
    const d = row.dataset;
    els.detailTitle.textContent = d.name;
    els.detailAvatar.src = d.avatar;
    els.detailAvatar.alt = `Foto de ${d.name}`;
    els.detailName.textContent = d.name;
    els.detailSubtitle.textContent = d.subtitle || d.role;
    els.detailBio.textContent = `"${d.bio}"`;
    els.detailPhone.textContent = d.phone;
    els.detailEmail.textContent = d.email;
    els.detailId.textContent = d.id;
    els.detailCreated.textContent = d.created;

    const isActive = d.status === 'activo';
    els.detailStatusBadge.textContent = isActive ? 'Miembro Activo' : 'Inactivo';
    els.detailStatusBadge.classList.toggle('inactive', !isActive);

    if (els.documentOverlay) {
      els.documentOverlay.classList.remove('hidden');
    }
  }

  function openOverlay(row) {
    selectedRow = row;
    populateOverlay(row);
    els.detailOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeOverlay() {
    els.detailOverlay.hidden = true;
    document.body.style.overflow = '';
    selectedRow = null;
  }

  function showDeleteConfirm() {
    if (!selectedRow) return;
    els.deleteConfirmName.textContent = selectedRow.dataset.name;
    els.deleteConfirmModal.hidden = false;
  }

  function hideDeleteConfirm() {
    els.deleteConfirmModal.hidden = true;
  }

  function showCodeModal() {
    codeSentAt = Date.now();
    els.deleteCodeInput.value = '';
    els.deleteCodeError.hidden = true;
    els.deleteCodeModal.hidden = false;
    setTimeout(() => els.deleteCodeInput.focus(), 100);
  }

  function hideCodeModal() {
    els.deleteCodeModal.hidden = true;
    els.deleteCodeInput.value = '';
    els.deleteCodeError.hidden = true;
    codeSentAt = null;
  }

  function isCodeValid() {
    if (!codeSentAt) return false;
    const elapsed = Date.now() - codeSentAt;
    return elapsed <= CODE_VALIDITY_MINUTES * 60 * 1000;
  }

  function deleteSelectedUser() {
    if (!selectedRow) return;
    selectedRow.remove();
    hideCodeModal();
    closeOverlay();
    applyFilters();
  }

  function toggleSearchMobile() {
    const isOpen = els.searchMobile.classList.toggle('open');
    els.searchToggleBtn.setAttribute('aria-expanded', isOpen);
    els.searchMobile.setAttribute('aria-hidden', !isOpen);
    if (isOpen) {
      setTimeout(() => els.searchMobileInput?.focus(), 100);
    }
  }

  els.tbody.addEventListener('click', (e) => {
    const row = e.target.closest('tr.user');
    if (!row || row.classList.contains('hidden-row')) return;
    if (e.target.closest('.btn-view')) {
      e.stopPropagation();
    }
    openOverlay(row);
  });

  els.detailClose.addEventListener('click', closeOverlay);
  els.detailBackdrop.addEventListener('click', closeOverlay);

  els.revealIdBtn?.addEventListener('click', () => {
    els.documentOverlay?.classList.add('hidden');
  });

  els.deleteAccountBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showDeleteConfirm();
  });

  els.deleteConfirmCancel.addEventListener('click', hideDeleteConfirm);
  els.deleteConfirmBackdrop.addEventListener('click', hideDeleteConfirm);
  els.deleteConfirmAccept.addEventListener('click', () => {
    hideDeleteConfirm();
    showCodeModal();
  });

  els.deleteCodeCancel.addEventListener('click', hideCodeModal);
  els.deleteCodeBackdrop.addEventListener('click', hideCodeModal);
  els.deleteCodeSubmit.addEventListener('click', () => {
    const code = els.deleteCodeInput.value.trim();
    if (!isCodeValid()) {
      els.deleteCodeError.textContent = 'El código ha expirado. Solicite uno nuevo.';
      els.deleteCodeError.hidden = false;
      return;
    }
    if (code !== DELETE_CODE) {
      els.deleteCodeError.textContent = 'Código incorrecto. Inténtelo de nuevo.';
      els.deleteCodeError.hidden = false;
      return;
    }
    deleteSelectedUser();
  });

  els.deleteCodeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      els.deleteCodeSubmit.click();
    }
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
    if (!els.deleteCodeModal.hidden) { hideCodeModal(); return; }
    if (!els.deleteConfirmModal.hidden) { hideDeleteConfirm(); return; }
    if (!els.detailOverlay.hidden) { closeOverlay(); }
  });

  updateStats();
});
