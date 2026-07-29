/* ============================================================
   inventario.js — Appjoteca Inventario
   Gestion de libros, ejemplares, salud del inventario e historial
   ============================================================ */
   (function () {
    'use strict';

    /* ============================================================
       CONSTANTES Y ESTADO
       ============================================================ */
    const STORAGE_KEY  = 'appjoteca_inventario_books';
    const EXEMP_KEY    = 'appjoteca_inventario_exemplares';
    const BACKUP_KEY   = 'appjoteca_inventario_backup';
    const BOOKS_PER_PAGE = 8;

    let books        = [];   // [{id, title, author, category, ...}]
    let exemplars     = {};  // { bookId: [{id, status, location}] }
    let currentBook   = null;
    let isNewBook     = false;
    let hasChanges    = false;
    let tempCoverSrc  = '';
    let coauthorTags  = [];
    let currentPage   = 0;

    const $ = id => document.getElementById(id);

    const els = {
      // Botones anadir
      addBookBtn: $('add-book-btn'),
      emptyAddBtn: $('empty-add-btn'),

      // Grid / filtros / stats
      booksGrid: $('books-grid'),
      emptyState: $('empty-state'),
      filterStatus: $('filter-status'),
      filterCategory: $('filter-category'),
      sortBy: $('sort-by'),
      statTotal: $('stat-total'),
      statAvailable: $('stat-available'),
      statBorrowed: $('stat-borrowed'),
      statCopies: $('stat-copies'),

      // Paginacion
      pagination: $('pagination'),
      pagPrev: $('pagination-prev'),
      pagNext: $('pagination-next'),
      pagPages: $('pagination-pages'),

      // Overlay de detalle
      detailOverlay: $('book-detail-overlay'),
      detailBackdrop: $('detail-backdrop'),
      detailPanelTitle: $('detail-panel-title'),
      detailCloseBtn: $('detail-close-btn'),
      detailForm: $('detail-form'),

      // Portada
      coverPreview: $('cover-preview'),
      coverImg: $('detail-cover-img'),
      coverPlaceholder: $('cover-placeholder'),
      coverChangeBtn: $('detail-cover-change'),
      coverFileInput: $('detail-cover-file'),

      // Campos - informacion basica
      fTitle: $('detail-title-input'),
      fAuthor: $('detail-author-input'),
      fCoauthorsInput: $('detail-coauthors-input'),
      coauthorsList: $('coauthors-list'),
      fCategory: $('detail-category-input'),
      categorySuggestions: $('category-suggestions'),
      fSynopsis: $('detail-synopsis-input'),
      synopsisCount: $('synopsis-count'),

      // Campos - bibliograficos
      fIsbn: $('detail-isbn-input'),
      fPublisher: $('detail-publisher-input'),
      fYear: $('detail-year-input'),
      fEdition: $('detail-edition-input'),
      fCity: $('detail-city-input'),
      fPages: $('detail-pages-input'),
      fMaterialType: $('detail-material-type'),
      fLanguage: $('detail-language'),

      // Campos - inventario / ejemplares
      copiesMinus: $('copies-minus'),
      copiesPlus: $('copies-plus'),
      fTotalCopies: $('detail-total-copies'),
      fInitialStatus: $('detail-initial-status'),
      fLocation: $('detail-location-input'),
      locationSuggestions: $('location-suggestions'),
      fBranch: $('detail-branch'),
      exemplarsCount: $('exemplars-count'),
      exemplarsTableWrap: $('exemplars-table-wrap'),
      exemplarsTbody: $('exemplars-tbody'),

      // Informacion automatica
      autoBookId: $('auto-book-id'),
      autoCreated: $('auto-created-date'),
      autoModified: $('auto-modified-date'),

      // Salud del inventario
      healthTotal: $('health-total'),
      healthAvailable: $('health-available'),
      healthBorrowed: $('health-borrowed'),
      healthRepair: $('health-repair'),
      healthLost: $('health-lost'),
      healthRate: $('health-rate'),

      // Historial
      historyTimeline: $('history-timeline'),
      historyEmpty: $('history-empty'),

      // Pie del panel
      detailStatusDot: $('detail-status-dot'),
      detailStatusText: $('detail-status-text'),
      dirtyBadge: $('dirty-badge'),
      detailCancelBtn: $('detail-cancel-btn'),
      detailDeleteBtn: $('detail-delete-btn'),
      detailSaveBtn: $('detail-save-btn'),
      detailSaveText: $('detail-save-text'),

      // Modal confirmar eliminar
      confirmModal: $('confirm-modal'),
      confirmBackdrop: $('confirm-backdrop'),
      confirmBookTitle: $('confirm-book-title'),
      confirmCancelBtn: $('confirm-cancel-btn'),
      confirmDeleteBtn: $('confirm-delete-btn'),

      // Modal de imagen
      imageModal: $('image-modal'),
      imageModalBackdrop: $('image-modal-backdrop'),
      imgPreviewSrc: $('image-modal-preview-img'),
      imgPlaceholder: $('image-modal-placeholder'),
      imgUrl: $('image-modal-url'),
      fileDropzone: $('image-modal-dropzone'),
      imgFile: $('image-modal-file'),
      imgModalClose: $('image-modal-close-btn'),
      imgCancel: $('image-modal-cancel-btn'),
      imgSave: $('image-modal-save-btn'),

      // Notificaciones y busqueda movil
      searchToggleBtn: $('search-toggle-btn'),
      searchMobile: $('topbar-search-mobile'),
      notificationTrayBtn: $('notification-tray-btn'),
      notificationContainer: $('notification-container'),
      notificationBadge: document.querySelector('.notification-badge'),
      notificationList: $('notification-list'),
      notificationEmpty: $('notification-empty'),
      markAllRead: $('mark-all-read'),
      countPill: document.querySelector('.count-pill'),

      // Overlay lateral generico y toasts
      overlay: $('overlay'),
      menuOffCanva: document.querySelector('.menu-off-canva'),
      toastContainer: $('toast-container'),
    };

    /* ============================================================
       HELPERS
       ============================================================ */
    function pad(n, len = 6) {
      return String(n).slice(-len).padStart(len, '0');
    }

    function fmtDate(iso) {
      if (!iso) return '—';
      const d = new Date(iso);
      if (isNaN(d)) return '—';
      return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function escHtml(str = '') {
      return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function generateExemplarIds(count, bookId) {
      const ids = [];
      for (let i = 1; i <= count; i++) ids.push('EJ-' + pad(i, 4));
      return ids;
    }

    function showToast(message, type = 'info') {
      const icons = { success: 'check_circle', error: 'error', info: 'info' };
      const toast = document.createElement('div');
      toast.className = 'toast ' + type;
      toast.innerHTML = `
        <span class="material-symbols-outlined toast-icon">${icons[type] || 'info'}</span>
        <span class="toast-msg">${escHtml(message)}</span>
      `;
      els.toastContainer.appendChild(toast);
      setTimeout(() => {
        toast.style.transition = 'opacity .3s ease, transform .3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(40px)';
        setTimeout(() => toast.remove(), 300);
      }, 3200);
    }

    /* ============================================================
       PERSISTENCIA
       ============================================================ */
    function saveToStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
        localStorage.setItem(EXEMP_KEY, JSON.stringify(exemplars));
      } catch (_) { /* almacenamiento no disponible */ }
    }

    function loadFromStorage() {
      try {
        const b = localStorage.getItem(STORAGE_KEY);
        const e = localStorage.getItem(EXEMP_KEY);
        books = b ? JSON.parse(b) : [];
        exemplars = e ? JSON.parse(e) : {};
      } catch (_) {
        books = []; exemplars = {};
      }
    }

    function collectFormData() {
      return {
        title: els.fTitle.value.trim(),
        author: els.fAuthor.value.trim(),
        coauthors: [...coauthorTags],
        category: els.fCategory.value.trim(),
        synopsis: els.fSynopsis.value.trim(),
        isbn: els.fIsbn.value.trim(),
        publisher: els.fPublisher.value.trim(),
        year: els.fYear.value,
        edition: els.fEdition.value.trim(),
        city: els.fCity.value.trim(),
        pages: els.fPages.value,
        materialType: els.fMaterialType.value,
        language: els.fLanguage.value,
        totalCopies: parseInt(els.fTotalCopies.value) || 1,
        initialStatus: els.fInitialStatus.value,
        location: els.fLocation.value.trim(),
        branch: els.fBranch.value,
        cover: tempCoverSrc || els.coverImg.src || ''
      };
    }

    function saveBackup() {
      try {
        const data = collectFormData();
        const isEmpty = !data.title && !data.author && !data.category && !data.isbn;
        if (isEmpty) { clearBackup(); return; }
        localStorage.setItem(BACKUP_KEY, JSON.stringify({
          book: { ...(currentBook || {}), ...data },
          isNew: isNewBook
        }));
      } catch (_) { /* noop */ }
    }

    function clearBackup() {
      try { localStorage.removeItem(BACKUP_KEY); } catch (_) { /* noop */ }
    }

    /* ============================================================
       HISTORIAL
       ============================================================ */
    function addHistoryEvent(text, icon) {
      if (!currentBook) return;
      if (!currentBook.history) currentBook.history = [];
      currentBook.history.unshift({ text, icon: icon || 'info', time: new Date().toISOString() });
    }

    function renderHistory() {
      const history = (currentBook && currentBook.history) || [];
      els.historyTimeline.innerHTML = '';
      if (history.length === 0) {
        els.historyTimeline.appendChild(els.historyEmpty);
        return;
      }
      history.forEach(ev => {
        const row = document.createElement('div');
        row.className = 'history-event';
        row.innerHTML = `
          <span class="history-event-icon"><span class="material-symbols-outlined">${ev.icon || 'info'}</span></span>
          <div class="history-event-content">
            <div class="history-event-text">${escHtml(ev.text)}</div>
            <div class="history-event-time">${fmtDate(ev.time)}</div>
          </div>
        `;
        els.historyTimeline.appendChild(row);
      });
    }

    /* ============================================================
       EJEMPLARES Y SALUD DEL INVENTARIO
       ============================================================ */
    function renderExemplarsTable() {
      const total = parseInt(els.fTotalCopies.value) || 0;
      els.exemplarsCount.textContent = `${total} ejemplar${total === 1 ? '' : 'es'}`;

      const bookId = currentBook ? currentBook.id : null;
      const existing = (bookId && exemplars[bookId]) || [];
      const status = els.fInitialStatus.value;
      const location = els.fLocation.value.trim();

      const rows = [];
      for (let i = 0; i < total; i++) {
        if (existing[i]) rows.push(existing[i]);
        else rows.push({ id: 'EJ-' + pad(i + 1, 4), status: status || 'Disponible', location });
      }

      if (rows.length === 0) {
        els.exemplarsTableWrap.hidden = true;
        els.exemplarsTbody.innerHTML = '';
        return;
      }
      els.exemplarsTableWrap.hidden = false;
      els.exemplarsTbody.innerHTML = rows.map(r => `
        <tr>
          <td class="exemplar-id">${escHtml(r.id)}</td>
          <td>${escHtml(r.status)}</td>
        </tr>
      `).join('');
    }

    function updateHealthStats() {
      const bookId = currentBook ? currentBook.id : null;
      const exs = (bookId && exemplars[bookId]) || [];
      const total = exs.length;
      const available = exs.filter(e => e.status === 'Disponible').length;
      const borrowed = exs.filter(e => e.status === 'Prestado').length;
      const repair = exs.filter(e => e.status === 'En reparacion').length;
      const lost = exs.filter(e => e.status === 'Perdido').length;
      const rate = total > 0 ? Math.round((borrowed / total) * 100) : 0;

      els.healthTotal.textContent = total;
      els.healthAvailable.textContent = available;
      els.healthBorrowed.textContent = borrowed;
      els.healthRepair.textContent = repair;
      els.healthLost.textContent = lost;
      els.healthRate.textContent = rate + '%';
    }

    /* ============================================================
       COAUTORES (tags)
       ============================================================ */
    function renderCoauthorTags() {
      els.coauthorsList.innerHTML = coauthorTags.map((name, i) => `
        <span class="tag-chip" data-i="${i}">
          ${escHtml(name)}
          <button type="button" class="tag-chip-remove" aria-label="Quitar ${escHtml(name)}">&times;</button>
        </span>
      `).join('');
      els.coauthorsList.querySelectorAll('.tag-chip-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.closest('.tag-chip').dataset.i);
          coauthorTags.splice(i, 1);
          renderCoauthorTags();
          markDirty();
        });
      });
    }

    function handleCoauthorKey(e) {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const val = els.fCoauthorsInput.value.trim().replace(/,$/, '');
        if (val) {
          coauthorTags.push(val);
          els.fCoauthorsInput.value = '';
          renderCoauthorTags();
          markDirty();
        }
      } else if (e.key === 'Backspace' && !els.fCoauthorsInput.value && coauthorTags.length) {
        coauthorTags.pop();
        renderCoauthorTags();
        markDirty();
      }
    }

    /* ============================================================
       ESTADO "SIN GUARDAR"
       ============================================================ */
    function markDirty() {
      hasChanges = true;
      els.dirtyBadge.hidden = false;
    }

    function handleSynopsisInput() {
      els.synopsisCount.textContent = els.fSynopsis.value.length;
      markDirty();
    }

    function handleStepper(delta) {
      const cur = parseInt(els.fTotalCopies.value) || 1;
      const next = Math.min(999, Math.max(1, cur + delta));
      els.fTotalCopies.value = next;
      renderExemplarsTable();
      markDirty();
    }

    /* ============================================================
       ABRIR / CERRAR OVERLAY DE DETALLE
       ============================================================ */
    function resetForm() {
      els.detailForm.reset();
      coauthorTags = [];
      renderCoauthorTags();
      tempCoverSrc = '';
      els.coverImg.src = '';
      els.coverImg.hidden = true;
      els.coverPlaceholder.hidden = false;
      els.synopsisCount.textContent = '0';
      els.fTotalCopies.value = 1;
    }

    function openOverlay(book, isNew) {
      resetForm();
      isNewBook = isNew;
      hasChanges = false;
      els.dirtyBadge.hidden = true;

      if (isNew) {
        els.detailPanelTitle.textContent = 'Nuevo libro';
        els.detailStatusDot.className = 'status-dot new';
        els.detailStatusText.textContent = 'Nuevo libro';
        els.detailDeleteBtn.hidden = true;
        els.detailSaveText.textContent = 'Crear libro';

        els.autoBookId.textContent = '—';
        els.autoCreated.textContent = '—';
        els.autoModified.textContent = '—';

        currentBook = { id: 'LIB-' + pad(Date.now(), 6), history: [] };
        renderHistory();
      } else {
        currentBook = book;
        els.detailPanelTitle.textContent = book.title || 'Detalle del libro';

        els.coverImg.src = book.cover || '';
        els.coverImg.hidden = !book.cover;
        els.coverPlaceholder.hidden = !!book.cover;

        els.fTitle.value = book.title || '';
        els.fAuthor.value = book.author || '';
        coauthorTags = [...(book.coauthors || [])];
        renderCoauthorTags();
        els.fCategory.value = book.category || '';
        els.fSynopsis.value = book.synopsis || '';
        els.synopsisCount.textContent = (book.synopsis || '').length;

        els.fIsbn.value = book.isbn || '';
        els.fPublisher.value = book.publisher || '';
        els.fYear.value = book.year || '';
        els.fEdition.value = book.edition || '';
        els.fCity.value = book.city || '';
        els.fPages.value = book.pages || '';
        els.fMaterialType.value = book.materialType || 'Libro';
        els.fLanguage.value = book.language || '';

        const exs = exemplars[book.id] || [];
        els.fTotalCopies.value = exs.length || book.totalCopies || 1;
        els.fInitialStatus.value = book.initialStatus || 'Disponible';
        els.fLocation.value = book.location || '';
        els.fBranch.value = book.branch || '';

        els.autoBookId.textContent = book.id || '—';
        els.autoCreated.textContent = fmtDate(book.created);
        els.autoModified.textContent = fmtDate(book.modified);

        els.detailStatusDot.className = 'status-dot editing';
        els.detailStatusText.textContent = 'Editando';
        els.detailDeleteBtn.hidden = false;
        els.detailSaveText.textContent = 'Guardar';

        renderHistory();
      }

      renderExemplarsTable();
      updateHealthStats();

      els.detailOverlay.hidden = false;
      document.body.style.overflow = 'hidden';
      setTimeout(() => els.fTitle.focus(), 50);
    }

    function closeOverlay() {
      els.detailOverlay.hidden = true;
      document.body.style.overflow = '';
      currentBook = null;
      isNewBook = false;
      hasChanges = false;
      tempCoverSrc = '';
    }

    function handleClose() {
      if (hasChanges) {
        saveBackup();
        showToast('Cambios guardados como borrador', 'info');
      }
      closeOverlay();
    }

    /* ============================================================
       GUARDAR LIBRO
       ============================================================ */
    function saveBook() {
      const title    = els.fTitle.value.trim();
      const author   = els.fAuthor.value.trim();
      const category = els.fCategory.value.trim();
      const isbn     = els.fIsbn.value.trim();
      const location = els.fLocation.value.trim();

      if (!title)    { showToast('El titulo es obligatorio', 'error');    els.fTitle.focus();    return; }
      if (!author)   { showToast('El autor es obligatorio', 'error');     els.fAuthor.focus();   return; }
      if (!category) { showToast('La categoria es obligatoria', 'error'); els.fCategory.focus(); return; }
      if (!isbn)     { showToast('El ISBN es obligatorio', 'error');      els.fIsbn.focus();     return; }
      if (!location) { showToast('La ubicacion es obligatoria', 'error'); els.fLocation.focus(); return; }

      const data = collectFormData();
      const now = new Date().toISOString();

      if (isNewBook) {
        const newBook = {
          id: currentBook.id,
          ...data,
          created: now,
          modified: now,
          history: []
        };
        books.unshift(newBook);
        currentBook = newBook;

        const ids = generateExemplarIds(data.totalCopies, newBook.id);
        exemplars[newBook.id] = ids.map(eid => ({ id: eid, status: data.initialStatus, location: data.location }));

        addHistoryEvent('Libro creado', 'add_circle');
        newBook.history = currentBook.history;

      } else {
        const idx = books.findIndex(b => b.id === currentBook.id);
        if (idx === -1) { showToast('Libro no encontrado', 'error'); return; }

        const oldCopies = (exemplars[books[idx].id] || []).length;
        const newCopies = data.totalCopies;

        books[idx] = { ...books[idx], ...data, modified: now };
        currentBook = books[idx];

        if (oldCopies !== newCopies) {
          const ids = generateExemplarIds(newCopies, books[idx].id);
          const existing = exemplars[books[idx].id] || [];
          exemplars[books[idx].id] = ids.map((eid, i) => existing[i] || { id: eid, status: data.initialStatus, location: data.location });

          if (newCopies > oldCopies) {
            addHistoryEvent(`Se agregaron ${newCopies - oldCopies} ejemplar${newCopies - oldCopies > 1 ? 'es' : ''}`, 'add');
          } else {
            addHistoryEvent(`Se eliminaron ${oldCopies - newCopies} ejemplar${oldCopies - newCopies > 1 ? 'es' : ''}`, 'remove');
          }
        }

        addHistoryEvent('Cambios guardados', 'save');
        books[idx].history = currentBook.history;
      }

      saveToStorage();
      clearBackup();
      hasChanges = false;
      closeOverlay();
      renderAll();
      showToast(isNewBook ? 'Libro creado exitosamente' : 'Cambios guardados', 'success');
    }

    /* ============================================================
       ELIMINAR LIBRO
       ============================================================ */
    function showDeleteConfirm() {
      els.confirmBookTitle.textContent = els.fTitle.value || 'este libro';
      els.confirmModal.hidden = false;
    }

    function hideDeleteConfirm() {
      els.confirmModal.hidden = true;
    }

    function confirmDelete() {
      if (!currentBook) return;
      const bookId = currentBook.id;

      const card = document.querySelector(`.book-card[data-id="${bookId}"]`);
      hideDeleteConfirm();

      const finish = () => {
        books = books.filter(b => b.id !== bookId);
        delete exemplars[bookId];
        saveToStorage();
        clearBackup();
        closeOverlay();
        renderAll();
        showToast('Libro eliminado', 'success');
      };

      if (card) {
        card.classList.add('removing');
        card.addEventListener('animationend', finish, { once: true });
      } else {
        finish();
      }
    }

    /* ============================================================
       MODAL DE PORTADA
       ============================================================ */
    function openImageModal() {
      els.imgUrl.value = '';
      els.imgFile.value = '';
      els.imgPreviewSrc.src = '';
      els.imgPreviewSrc.hidden = true;
      els.imgPlaceholder.hidden = false;
      els.imageModal.hidden = false;
      els.imgUrl.focus();
    }

    function closeImageModal() {
      els.imageModal.hidden = true;
    }

    function applyImage() {
      const url = els.imgUrl.value.trim();
      if (url) {
        tempCoverSrc = url;
        els.coverImg.src = url;
        els.coverImg.hidden = false;
        els.coverPlaceholder.hidden = true;
        markDirty();
      }
      closeImageModal();
    }

    function readFile(file) {
      if (!file.type.startsWith('image/')) { showToast('Solo se permiten imagenes', 'error'); return; }
      if (file.size > 5 * 1024 * 1024) { showToast('La imagen excede 5 MB', 'error'); return; }
      const reader = new FileReader();
      reader.onload = e => {
        els.imgPreviewSrc.src = e.target.result;
        els.imgPreviewSrc.hidden = false;
        els.imgPlaceholder.hidden = true;
        els.imgUrl.value = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    function setupDragDrop() {
      const dz = els.fileDropzone;
      const fi = els.imgFile;

      dz.addEventListener('click', () => fi.click());
      fi.addEventListener('change', () => {
        if (fi.files && fi.files[0]) readFile(fi.files[0]);
      });
      dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag-active'); });
      dz.addEventListener('dragleave', () => dz.classList.remove('drag-active'));
      dz.addEventListener('drop', e => {
        e.preventDefault(); dz.classList.remove('drag-active');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) readFile(e.dataTransfer.files[0]);
      });
    }

    function handleCoverClick() {
      els.coverFileInput.click();
    }

    function handleCoverFile() {
      const file = els.coverFileInput.files && els.coverFileInput.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) { showToast('Solo se permiten imagenes', 'error'); return; }
      const reader = new FileReader();
      reader.onload = e => {
        tempCoverSrc = e.target.result;
        els.coverImg.src = e.target.result;
        els.coverImg.hidden = false;
        els.coverPlaceholder.hidden = true;
        markDirty();
      };
      reader.readAsDataURL(file);
    }

    /* ============================================================
       NOTIFICACIONES
       ============================================================ */
    let notifications = [];
    let notifOpen = false;

    function loadNotifications() {
      try {
        const stored = localStorage.getItem('appjoteca_notifications');
        if (stored) notifications = JSON.parse(stored);
      } catch (_) { notifications = []; }
    }

    function saveNotifications() {
      try { localStorage.setItem('appjoteca_notifications', JSON.stringify(notifications)); } catch (_) {}
    }

    function toggleNotifications() {
      notifOpen = !notifOpen;
      els.notificationContainer.classList.toggle('open', notifOpen);
      els.notificationTrayBtn.setAttribute('aria-expanded', notifOpen);
      if (notifOpen) renderNotifications();
    }

    function closeNotifications() {
      notifOpen = false;
      els.notificationContainer.classList.remove('open');
      els.notificationTrayBtn.setAttribute('aria-expanded', 'false');
    }

    function renderNotifications() {
      const unread = notifications.filter(n => !n.read);
      const count = unread.length;

      els.countPill.textContent = count;
      els.countPill.style.display = count > 0 ? 'inline-flex' : 'none';

      if (count > 0) els.notificationBadge.classList.remove('hidden');
      else els.notificationBadge.classList.add('hidden');

      if (notifications.length === 0) {
        els.notificationList.innerHTML = '';
        els.notificationList.appendChild(els.notificationEmpty);
        return;
      }

      els.notificationList.innerHTML = notifications.map((n, i) => `
        <div class="notification-item ${n.read ? '' : 'unread'}" data-idx="${i}">
          <span class="notification-dot"></span>
          <div class="notification-icon">
            <span class="material-symbols-outlined">${n.icon || 'info'}</span>
          </div>
          <div class="notification-body">
            <p class="notification-title">${escHtml(n.title)}</p>
            <p class="notification-desc">${escHtml(n.desc)}</p>
          </div>
          <span class="notification-time">${n.time || ''}</span>
        </div>
      `).join('');

      els.notificationList.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', () => {
          const idx = parseInt(item.dataset.idx);
          if (notifications[idx] && !notifications[idx].read) {
            notifications[idx].read = true;
            saveNotifications();
            renderNotifications();
          }
        });
      });
    }

    function markAllRead() {
      notifications.forEach(n => n.read = true);
      saveNotifications();
      renderNotifications();
    }

    function addNotification(title, desc, icon) {
      notifications.unshift({
        title, desc, icon: icon || 'info',
        time: 'Ahora',
        read: false
      });
      saveNotifications();
      renderNotifications();
      if (notifOpen) return;
      els.notificationBadge.classList.remove('hidden');
    }

    /* ============================================================
       BUSQUEDA EXPANDIBLE (MOBILE)
       ============================================================ */
    function toggleSearchMobile() {
      const isOpen = els.searchMobile.classList.toggle('open');
      els.searchToggleBtn.setAttribute('aria-expanded', isOpen);
      if (isOpen) {
        setTimeout(() => els.searchMobile.querySelector('input').focus(), 100);
      }
    }

    /* ============================================================
       DATOS DE EJEMPLO (seed, solo si no hay datos guardados)
       ============================================================ */
    function seedSampleData() {
      const samples = [
        { title: 'Cien anos de soledad', author: 'Gabriel Garcia Marquez', category: 'Ficcion', isbn: '978-0-06-088328-7', publisher: 'Harper & Row', year: '1967', materialType: 'Libro', totalCopies: 5, synopsis: 'La saga de la familia Buendia a lo largo de siete generaciones en el pueblo ficticio de Macondo.', language: 'Espanol', location: 'Sala A - Estante 3' },
        { title: 'El senor de los anillos', author: 'J.R.R. Tolkien', category: 'Fantasia', isbn: '978-0-618-64015-7', publisher: 'George Allen & Unwin', year: '1954', materialType: 'Libro', totalCopies: 3, synopsis: 'Una epica aventura en la Tierra Media para destruir el Anillo Unico y derrotar a Sauron.', language: 'Espanol', location: 'Sala B - Estante 1' },
        { title: 'Fahrenheit 451', author: 'Ray Bradbury', category: 'Ciencia Ficcion', isbn: '978-1-4516-7330-0', publisher: 'Ballantine Books', year: '1953', materialType: 'Libro', totalCopies: 2, synopsis: 'En un futuro distopico, los libros estan prohibidos y los "bomberos" los queman.', language: 'Espanol', location: 'Sala C - Estante 5' },
        { title: 'Breve historia del tiempo', author: 'Stephen Hawking', category: 'Ciencia', isbn: '978-0-553-38016-8', publisher: 'Bantam Books', year: '1988', materialType: 'Libro', totalCopies: 4, synopsis: 'Una exploracion del universo desde los cuasares hasta los agujeros negros.', language: 'Espanol', location: 'Sala D - Estante 2' },
        { title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', category: 'Clasicos', isbn: '978-0-14-243723-0', publisher: 'Juan de la Cuesta', year: '1605', materialType: 'Libro', totalCopies: 7, synopsis: 'La historia de un hidalgo que enloquece leyendo libros de caballerias y sale a vivir aventuras.', language: 'Espanol', location: 'Sala A - Estante 1' },
        { title: 'Sapiens', author: 'Yuval Noah Harari', category: 'Historia', isbn: '978-0-06-231609-7', publisher: 'Harper', year: '2011', materialType: 'Libro', totalCopies: 3, synopsis: 'Una breve historia de la humanidad, desde las piedras hasta la era digital.', language: 'Espanol', location: 'Sala D - Estante 4' },
      ];
      const statuses = ['Disponible', 'Disponible', 'Disponible', 'Prestado', 'En reparacion', 'Perdido'];

      samples.forEach((s, i) => {
        const id = 'LIB-' + pad(i + 1);
        const created = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
        const book = {
          id, created, modified: created,
          coauthors: [],
          history: [{ text: 'Libro creado', icon: 'add_circle', time: created }],
          initialStatus: 'Disponible', branch: '', city: '', edition: '', pages: '',
          ...s
        };
        exemplars[id] = generateExemplarIds(s.totalCopies, id).map(eid => ({
          id: eid,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          location: s.location
        }));
        books.push(book);
      });
      saveToStorage();
    }

    /* ============================================================
       RENDERIZADO DE LA GRILLA DE LIBROS
       ============================================================ */
    function statusTag(available, total) {
      if (total === 0 || available === 0) return '<span class="book-status-tag status-out-stock">Sin stock</span>';
      if (available < total * 0.3) return '<span class="book-status-tag status-low-stock">Poco stock</span>';
      return '<span class="book-status-tag status-in-stock">Disponible</span>';
    }

    function renderBooks() {
      els.booksGrid.innerHTML = '';

      let filtered = [...books];
      const catFilter = els.filterCategory.value;
      const statusFilter = els.filterStatus.value;
      const sortVal = els.sortBy.value;

      if (catFilter) filtered = filtered.filter(b => b.category === catFilter);
      if (statusFilter) {
        filtered = filtered.filter(b => {
          const exs = exemplars[b.id] || [];
          if (statusFilter === 'available') return exs.some(e => e.status === 'Disponible');
          if (statusFilter === 'borrowed')  return exs.some(e => e.status === 'Prestado');
          if (statusFilter === 'repair')    return exs.some(e => e.status === 'En reparacion');
          if (statusFilter === 'lost')      return exs.some(e => e.status === 'Perdido');
          return true;
        });
      }

      filtered.sort((a, b) => {
        if (sortVal === 'title-asc')   return (a.title || '').localeCompare(b.title || '');
        if (sortVal === 'title-desc')  return (b.title || '').localeCompare(a.title || '');
        if (sortVal === 'author-asc')  return (a.author || '').localeCompare(b.author || '');
        if (sortVal === 'date-desc')   return new Date(b.created || 0) - new Date(a.created || 0);
        if (sortVal === 'copies-desc') return (exemplars[b.id]?.length || 0) - (exemplars[a.id]?.length || 0);
        return 0;
      });

      const totalPages = Math.ceil(filtered.length / BOOKS_PER_PAGE) || 1;
      if (currentPage >= totalPages) currentPage = totalPages - 1;
      if (currentPage < 0) currentPage = 0;

      const start = currentPage * BOOKS_PER_PAGE;
      const page = filtered.slice(start, start + BOOKS_PER_PAGE);

      els.emptyState.hidden = filtered.length !== 0;
      els.booksGrid.hidden = filtered.length === 0;

      page.forEach(book => {
        const exs = exemplars[book.id] || [];
        const total = exs.length;
        const available = exs.filter(e => e.status === 'Disponible').length;

        const card = document.createElement('article');
        card.className = 'book-card';
        card.dataset.id = book.id;
        card.setAttribute('role', 'listitem');
        card.innerHTML = `
          <div class="book-image-wrap">
            ${book.cover ? `<img src="${escHtml(book.cover)}" alt="Portada de ${escHtml(book.title)}">` : ''}
          </div>
          <div class="book-info">
            <div class="book-top-row">
              <span class="book-category">${escHtml(book.category)}</span>
              <button class="book-edit-btn" type="button" aria-label="Editar ${escHtml(book.title)}">
                <span class="material-symbols-outlined">edit_square</span>
              </button>
            </div>
            <h3 class="book-title">${escHtml(book.title)}</h3>
            <p class="book-author">${escHtml(book.author)}</p>
            <div class="book-meta">
              <span class="book-copies"><strong>${available}</strong> / ${total} copias</span>
              ${statusTag(available, total)}
            </div>
          </div>
        `;

        card.addEventListener('click', e => {
          if (e.target.closest('.book-edit-btn')) return;
          const b = books.find(x => x.id === book.id);
          if (b) openOverlay(b, false);
        });
        card.querySelector('.book-edit-btn').addEventListener('click', e => {
          e.stopPropagation();
          const b = books.find(x => x.id === book.id);
          if (b) openOverlay(b, false);
        });

        els.booksGrid.appendChild(card);
      });

      renderPagination(totalPages);
      updateToolbarStats();
      populateCategoryFilter();
    }

    function renderPagination(total) {
      els.pagination.hidden = total <= 1;
      els.pagPages.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const btn = document.createElement('button');
        btn.className = 'pag-page' + (i === currentPage ? ' active' : '');
        btn.type = 'button';
        btn.textContent = i + 1;
        btn.addEventListener('click', () => { currentPage = i; renderBooks(); });
        els.pagPages.appendChild(btn);
      }
      els.pagPrev.disabled = currentPage === 0;
      els.pagNext.disabled = currentPage >= total - 1;
    }

    function updateToolbarStats() {
      const allExs = Object.values(exemplars).flat();
      els.statTotal.textContent = books.length;
      els.statAvailable.textContent = allExs.filter(e => e.status === 'Disponible').length;
      els.statBorrowed.textContent = allExs.filter(e => e.status === 'Prestado').length;
      els.statCopies.textContent = allExs.length;
    }

    function populateCategoryFilter() {
      const cats = [...new Set(books.map(b => b.category).filter(Boolean))].sort();
      const currentVal = els.filterCategory.value;
      els.categorySuggestions.innerHTML = cats.map(c => `<option value="${escHtml(c)}">`).join('');
      els.filterCategory.innerHTML = '<option value="">Todas</option>' +
        cats.map(c => `<option value="${escHtml(c)}">${escHtml(c)}</option>`).join('');
      els.filterCategory.value = currentVal;

      const locs = [...new Set(books.map(b => b.location).filter(Boolean))].sort();
      els.locationSuggestions.innerHTML = locs.map(l => `<option value="${escHtml(l)}">`).join('');
    }

    function renderAll() {
      currentPage = 0;
      renderBooks();
    }

    /* ── Restaurar borrador desde localStorage ───────────────── */
    function tryRestoreBackup() {
      try {
        const raw = localStorage.getItem(BACKUP_KEY);
        if (!raw) return;
        const { book, isNew } = JSON.parse(raw);
        if (!book) return;
        const wantsRestore = confirm('Se encontro un borrador sin guardar. Deseas continuar editandolo?');
        if (wantsRestore) {
          openOverlay(book, isNew);
        } else {
          clearBackup();
        }
      } catch (_) { /* noop */ }
    }

    /* ============================================================
       INICIALIZACION Y EVENTOS
       ============================================================ */
    function init() {
      loadFromStorage();
      if (books.length === 0) seedSampleData();
      loadNotifications();

      setupDragDrop();

      [els.addBookBtn, els.emptyAddBtn].forEach(btn => {
        if (btn) btn.addEventListener('click', () => openOverlay(null, true));
      });

      els.detailCloseBtn.addEventListener('click', handleClose);
      els.detailCancelBtn.addEventListener('click', handleClose);
      els.detailBackdrop.addEventListener('click', handleClose);

      els.detailSaveBtn.addEventListener('click', saveBook);

      els.detailDeleteBtn.addEventListener('click', showDeleteConfirm);
      els.confirmCancelBtn.addEventListener('click', hideDeleteConfirm);
      els.confirmDeleteBtn.addEventListener('click', confirmDelete);
      els.confirmBackdrop.addEventListener('click', hideDeleteConfirm);

      els.coverChangeBtn.addEventListener('click', openImageModal);
      els.imgModalClose.addEventListener('click', closeImageModal);
      els.imgCancel.addEventListener('click', closeImageModal);
      els.imgSave.addEventListener('click', applyImage);
      els.imageModalBackdrop.addEventListener('click', closeImageModal);

      els.coverPreview.addEventListener('click', handleCoverClick);
      els.coverFileInput.addEventListener('change', handleCoverFile);

      els.fCoauthorsInput.addEventListener('keydown', handleCoauthorKey);
      els.fSynopsis.addEventListener('input', handleSynopsisInput);

      els.copiesMinus.addEventListener('click', () => handleStepper(-1));
      els.copiesPlus.addEventListener('click', () => handleStepper(1));
      els.fTotalCopies.addEventListener('change', () => { renderExemplarsTable(); markDirty(); });
      els.fInitialStatus.addEventListener('change', () => { renderExemplarsTable(); updateHealthStats(); markDirty(); });
      els.fLocation.addEventListener('input', () => { renderExemplarsTable(); markDirty(); });

      els.filterCategory.addEventListener('change', renderAll);
      els.filterStatus.addEventListener('change', renderAll);
      els.sortBy.addEventListener('change', renderAll);

      els.pagPrev.addEventListener('click', () => { currentPage = Math.max(0, currentPage - 1); renderBooks(); });
      els.pagNext.addEventListener('click', () => { currentPage++; renderBooks(); });

      // Busqueda expandible movil
      if (els.searchToggleBtn) {
        els.searchToggleBtn.addEventListener('click', toggleSearchMobile);
      }

      // Notificaciones
      if (els.notificationTrayBtn) {
        els.notificationTrayBtn.addEventListener('click', toggleNotifications);
      }
      if (els.markAllRead) {
        els.markAllRead.addEventListener('click', markAllRead);
      }

      // Cerrar notificaciones al hacer click fuera
      document.addEventListener('click', e => {
        if (notifOpen && !els.notificationContainer.contains(e.target) && !els.notificationTrayBtn.contains(e.target)) {
          closeNotifications();
        }
      });

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          if (!els.imageModal.hidden)    { closeImageModal(); return; }
          if (!els.confirmModal.hidden)  { hideDeleteConfirm(); return; }
          if (notifOpen)                 { closeNotifications(); return; }
          if (!els.detailOverlay.hidden) { handleClose(); return; }
        }
      });

      [els.fTitle, els.fAuthor, els.fCategory, els.fSynopsis, els.fLanguage,
       els.fIsbn, els.fPublisher, els.fYear, els.fEdition, els.fCity, els.fPages,
       els.fMaterialType, els.fLocation, els.fBranch].forEach(f => {
        if (f) f.addEventListener('input', markDirty);
      });

      renderAll();
      renderNotifications();
      setTimeout(tryRestoreBackup, 400);
    }

    init();
  })();