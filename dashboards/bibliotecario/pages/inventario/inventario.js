  (function () {
    'use strict';
  
    // ---------- Datos ----------
    let libros = JSON.parse(localStorage.getItem('libros')) || [];
    let libroActual = null;
    let esNuevo = false;
    let coautores = [];
  
    // ---------- Helpers ----------
    const $ = id => document.getElementById(id);
    const toast = (msg, tipo) => {
      const div = document.createElement('div');
      div.className = 'toast ' + tipo;
      div.innerHTML = `<span class="material-symbols-outlined">${tipo === 'error' ? 'error' : 'check_circle'}</span><span>${msg}</span>`;
      $('toast-container').appendChild(div);
      setTimeout(() => div.remove(), 2500);
    };
  
    // ---------- Guardar ----------
    const guardar = () => localStorage.setItem('libros', JSON.stringify(libros));
  
    // ---------- Datos de ejemplo ----------
    function datosEjemplo() {
      libros = [
        { id: 1, titulo: 'Cien años de soledad', autor: 'G. García Márquez', categoria: 'Ficción', isbn: '978-0-06-088328-7', copias: 5, disponibles: 3, prestados: 1, reparacion: 1, perdidos: 0, portada: '', sinopsis: 'Saga de la familia Buendía.', ubicacion: 'Sala A', estado: 'Disponible' },
        { id: 2, titulo: 'El señor de los anillos', autor: 'J.R.R. Tolkien', categoria: 'Fantasía', isbn: '978-0-618-64015-7', copias: 3, disponibles: 1, prestados: 2, reparacion: 0, perdidos: 0, portada: '', sinopsis: 'Épica en la Tierra Media.', ubicacion: 'Sala B', estado: 'Prestado' },
        { id: 3, titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', categoria: 'Ciencia Ficción', isbn: '978-1-4516-7330-0', copias: 2, disponibles: 0, prestados: 1, reparacion: 0, perdidos: 1, portada: '', sinopsis: 'Libros prohibidos en el futuro.', ubicacion: 'Sala C', estado: 'Perdido' },
        { id: 4, titulo: 'Breve historia del tiempo', autor: 'Stephen Hawking', categoria: 'Ciencia', isbn: '978-0-553-38016-8', copias: 4, disponibles: 4, prestados: 0, reparacion: 0, perdidos: 0, portada: '', sinopsis: 'Exploración del universo.', ubicacion: 'Sala D', estado: 'Disponible' },
        { id: 5, titulo: 'Don Quijote', autor: 'M. de Cervantes', categoria: 'Clásicos', isbn: '978-0-14-243723-0', copias: 7, disponibles: 5, prestados: 1, reparacion: 1, perdidos: 0, portada: '', sinopsis: 'Hidalgo y sus aventuras.', ubicacion: 'Sala A', estado: 'Disponible' },
        { id: 6, titulo: 'Sapiens', autor: 'Yuval Noah Harari', categoria: 'Historia', isbn: '978-0-06-231609-7', copias: 3, disponibles: 2, prestados: 1, reparacion: 0, perdidos: 0, portada: '', sinopsis: 'Historia de la humanidad.', ubicacion: 'Sala D', estado: 'Disponible' }
      ];
      guardar();
    }
  
    // ---------- Renderizar grid ----------
    function mostrarLibros() {
      let lista = [...libros];
  
      // Filtros
      const cat = $('filter-category').value;
      const est = $('filter-status').value;
      const ord = $('sort-by').value;
  
      if (cat) lista = lista.filter(l => l.categoria === cat);
      if (est) lista = lista.filter(l => l.estado === est);
      if (ord === 'az') lista.sort((a, b) => a.titulo.localeCompare(b.titulo));
      if (ord === 'za') lista.sort((a, b) => b.titulo.localeCompare(a.titulo));
  
      // Stats
      $('stat-total').textContent = libros.length;
      $('stat-available').textContent = libros.reduce((s, l) => s + l.disponibles, 0);
      $('stat-borrowed').textContent = libros.reduce((s, l) => s + l.prestados, 0);
      $('stat-copies').textContent = libros.reduce((s, l) => s + l.copias, 0);
  
      // Grid
      if (!lista.length) {
        $('books-grid').hidden = true;
        $('empty-state').hidden = false;
        return;
      }
      $('books-grid').hidden = false;
      $('empty-state').hidden = true;
  
      $('books-grid').innerHTML = lista.map(l => `
        <article class="book-card" onclick="abrirDetalle(${l.id})">
          <div class="book-image-wrap">${l.portada ? `<img src="${l.portada}" alt="">` : ''}</div>
          <div class="book-info">
            <div class="book-top-row">
              <span class="book-category">${l.categoria}</span>
              <button class="book-edit-btn" onclick="event.stopPropagation(); abrirDetalle(${l.id})">
                <span class="material-symbols-outlined">edit_square</span>
              </button>
            </div>
            <h3 class="book-title">${l.titulo}</h3>
            <p class="book-author">${l.autor}</p>
            <div class="book-meta">
              <span class="book-copies"><strong>${l.disponibles}</strong> / ${l.copias} copias</span>
              <span class="book-status-tag ${l.disponibles === 0 ? 'status-out-stock' : l.disponibles < l.copias * 0.3 ? 'status-low-stock' : 'status-in-stock'}">
                ${l.estado}
              </span>
            </div>
          </div>
        </article>
      `).join('');
  
      // Categorías para el filtro
      const categorias = [...new Set(libros.map(l => l.categoria))].sort();
      $('filter-category').innerHTML = '<option value="">Todas</option>' +
        categorias.map(c => `<option value="${c}">${c}</option>`).join('');
    }
  
    // ---------- Abrir detalle ----------
    window.abrirDetalle = function (id) {
      libroActual = libros.find(l => l.id === id) || null;
      esNuevo = !libroActual;
      coautores = [];
  
      if (esNuevo) {
        libroActual = { id: Date.now(), copias: 1, disponibles: 1, prestados: 0, reparacion: 0, perdidos: 0, estado: 'Disponible' };
        $('detail-panel-title').textContent = 'Nuevo libro';
        $('detail-delete-btn').hidden = true;
        $('detail-save-text').textContent = 'Crear';
        $('auto-book-id').textContent = '—';
        $('auto-created-date').textContent = '—';
        $('auto-modified-date').textContent = '—';
        $('detail-form').reset();
        $('detail-cover-img').hidden = true;
        $('cover-placeholder').hidden = false;
      } else {
        $('detail-panel-title').textContent = libroActual.titulo;
        $('detail-delete-btn').hidden = false;
        $('detail-save-text').textContent = 'Guardar';
        $('auto-book-id').textContent = libroActual.id;
        $('auto-created-date').textContent = 'Hoy';
        $('auto-modified-date').textContent = 'Hoy';
  
        $('detail-title-input').value = libroActual.titulo || '';
        $('detail-author-input').value = libroActual.autor || '';
        $('detail-category-input').value = libroActual.categoria || '';
        $('detail-synopsis-input').value = libroActual.sinopsis || '';
        $('detail-isbn-input').value = libroActual.isbn || '';
        $('detail-total-copies').value = libroActual.copias || 1;
        $('detail-initial-status').value = libroActual.estado || 'Disponible';
        $('detail-location-input').value = libroActual.ubicacion || '';
  
        if (libroActual.portada) {
          $('detail-cover-img').src = libroActual.portada;
          $('detail-cover-img').hidden = false;
          $('cover-placeholder').hidden = true;
        } else {
          $('detail-cover-img').hidden = true;
          $('cover-placeholder').hidden = false;
        }
      }
  
      // Salud e historial (simulado)
      $('health-total').textContent = libroActual.copias;
      $('health-available').textContent = libroActual.disponibles;
      $('health-borrowed').textContent = libroActual.prestados;
      $('health-repair').textContent = libroActual.reparacion;
      $('health-lost').textContent = libroActual.perdidos;
      $('health-rate').textContent = libroActual.copias ? Math.round((libroActual.prestados / libroActual.copias) * 100) + '%' : '0%';
  
      $('history-timeline').innerHTML = `
        <div class="history-event">
          <span class="history-event-icon"><span class="material-symbols-outlined">add_circle</span></span>
          <div class="history-event-content">
            <div class="history-event-text">Libro registrado en el sistema</div>
            <div class="history-event-time">Hoy</div>
          </div>
        </div>
        <div class="history-event">
          <span class="history-event-icon"><span class="material-symbols-outlined">save</span></span>
          <div class="history-event-content">
            <div class="history-event-text">Información actualizada</div>
            <div class="history-event-time">Hoy</div>
          </div>
        </div>
      `;
  
      $('book-detail-overlay').hidden = false;
      document.body.style.overflow = 'hidden';
    };
  
    // ---------- Guardar ----------
    function guardarLibro() {
      const titulo = $('detail-title-input').value.trim();
      const autor = $('detail-author-input').value.trim();
      const categoria = $('detail-category-input').value.trim();
      const isbn = $('detail-isbn-input').value.trim();
      const ubicacion = $('detail-location-input').value.trim();
  
      if (!titulo) { toast('El título es obligatorio', 'error'); return; }
      if (!autor) { toast('El autor es obligatorio', 'error'); return; }
      if (!categoria) { toast('La categoría es obligatoria', 'error'); return; }
      if (!isbn) { toast('El ISBN es obligatorio', 'error'); return; }
      if (!ubicacion) { toast('La ubicación es obligatoria', 'error'); return; }
  
      const datos = {
        titulo, autor, categoria, isbn, ubicacion,
        sinopsis: $('detail-synopsis-input').value.trim(),
        copias: parseInt($('detail-total-copies').value) || 1,
        estado: $('detail-initial-status').value,
        portada: $('detail-cover-img').src && !$('detail-cover-img').hidden ? $('detail-cover-img').src : ''
      };
  
      if (esNuevo) {
        libros.unshift({ ...libroActual, ...datos });
        toast('Libro creado', 'success');
      } else {
        const idx = libros.findIndex(l => l.id === libroActual.id);
        libros[idx] = { ...libros[idx], ...datos };
        toast('Cambios guardados', 'success');
      }
  
      guardar();
      cerrarDetalle();
      mostrarLibros();
    }
  
    // ---------- Eliminar ----------
    function eliminarLibro() {
      if (!libroActual) return;
      libros = libros.filter(l => l.id !== libroActual.id);
      guardar();
      cerrarDetalle();
      mostrarLibros();
      toast('Libro eliminado', 'success');
    }
  
    // ---------- Cerrar ----------
    function cerrarDetalle() {
      $('book-detail-overlay').hidden = true;
      $('confirm-modal').hidden = true;
      $('image-modal').hidden = true;
      document.body.style.overflow = '';
      libroActual = null;
    }
  
    // ---------- Portada ----------
    function cambiarPortada() {
      const url = $('image-modal-url').value.trim();
      if (url) {
        $('detail-cover-img').src = url;
        $('detail-cover-img').hidden = false;
        $('cover-placeholder').hidden = true;
      }
      $('image-modal').hidden = true;
    }
  
    function subirPortada(input) {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        $('detail-cover-img').src = e.target.result;
        $('detail-cover-img').hidden = false;
        $('cover-placeholder').hidden = true;
        $('image-modal-preview-img').src = e.target.result;
        $('image-modal-preview-img').hidden = false;
        $('image-modal-placeholder').hidden = true;
      };
      reader.readAsDataURL(file);
    }
  
    // ---------- Eventos ----------
    function init() {
      if (!libros.length) datosEjemplo();
  
      $('add-book-btn').onclick = () => abrirDetalle();
      $('empty-add-btn').onclick = () => abrirDetalle();
      $('detail-close-btn').onclick = cerrarDetalle;
      $('detail-cancel-btn').onclick = cerrarDetalle;
      $('detail-backdrop').onclick = cerrarDetalle;
      $('detail-save-btn').onclick = guardarLibro;
      $('detail-delete-btn').onclick = () => $('confirm-modal').hidden = false;
      $('confirm-cancel-btn').onclick = () => $('confirm-modal').hidden = true;
      $('confirm-backdrop').onclick = () => $('confirm-modal').hidden = true;
      $('confirm-delete-btn').onclick = eliminarLibro;
      $('detail-cover-change').onclick = () => $('image-modal').hidden = false;
      $('image-modal-close-btn').onclick = cerrarDetalle;
      $('image-modal-cancel-btn').onclick = cerrarDetalle;
      $('image-modal-save-btn').onclick = cambiarPortada;
      $('cover-preview').onclick = () => $('detail-cover-file').click();
      $('detail-cover-file').onchange = function () { subirPortada(this); };
      $('image-modal-file').onchange = function () { subirPortada(this); };
  
      $('copies-minus').onclick = () => {
        const v = parseInt($('detail-total-copies').value) || 1;
        $('detail-total-copies').value = Math.max(1, v - 1);
      };
      $('copies-plus').onclick = () => {
        const v = parseInt($('detail-total-copies').value) || 1;
        $('detail-total-copies').value = Math.min(999, v + 1);
      };
  
      $('filter-category').onchange = mostrarLibros;
      $('filter-status').onchange = mostrarLibros;
      $('sort-by').onchange = mostrarLibros;
  
      document.onkeydown = e => {
        if (e.key === 'Escape') cerrarDetalle();
      };
  
      mostrarLibros();
    }
  
    init();
  })();