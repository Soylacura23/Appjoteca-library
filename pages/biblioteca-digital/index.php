<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estantería</title>

    <!-- Fuentes -->
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,300;1,400&family=Manrope:wght@300;400;500;700;800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">

    <!-- Estilos: orden importante — theme (variables) primero -->
    <link rel="stylesheet" href="../../shared/css/theme.css">
    <link rel="stylesheet" href="../../shared/css/components/notifications.css">
    <link rel="stylesheet" href="../../shared/css/components/navbar.css">
    <link rel="stylesheet" href="../../shared/css/components/book-card.css">
    <link rel="stylesheet" href="biblioteca.css">
    <link rel="stylesheet" href="../../shared/css/components/footer.css">
</head>
<body>

    <!-- ══════════════════════════════════════════
         OVERLAY GLOBAL (perfil + notificaciones)
    ══════════════════════════════════════════════ -->
    <div id="overlay" class="overlay" aria-hidden="true"></div>


    <!-- ══════════════════════════════════════════
         BANDEJA DE NOTIFICACIONES
    ══════════════════════════════════════════════ -->
    <div class="notification-container" id="notification-container" role="dialog" aria-label="Notificaciones" aria-hidden="true">
        <div class="notification-header">
            <h3 class="notification-header-title">
                Notificaciones
                <span class="count-pill">3</span>
            </h3>
            <button class="notification-mark-all" id="mark-all-read">Marcar leídas</button>
        </div>

        <div class="notification-list">

            <div class="notification-item unread">
                <span class="notification-dot"></span>
                <div class="notification-icon">
                    <span class="material-symbols-outlined">auto_stories</span>
                </div>
                <div class="notification-body">
                    <p class="notification-title">Reserva confirmada</p>
                    <p class="notification-desc">Tu reserva de "Cien Años de Soledad" fue aprobada. Disponible para recoger hoy.</p>
                </div>
                <span class="notification-time">2m</span>
            </div>

            <div class="notification-item unread">
                <span class="notification-dot"></span>
                <div class="notification-icon">
                    <span class="material-symbols-outlined">schedule</span>
                </div>
                <div class="notification-body">
                    <p class="notification-title">Préstamo por vencer</p>
                    <p class="notification-desc">"Ética a Nicómaco" vence en 2 días. Renueva para evitar cargos.</p>
                </div>
                <span class="notification-time">1h</span>
            </div>

            <div class="notification-item unread">
                <span class="notification-dot"></span>
                <div class="notification-icon">
                    <span class="material-symbols-outlined">new_releases</span>
                </div>
                <div class="notification-body">
                    <p class="notification-title">Nuevos ingresos</p>
                    <p class="notification-desc">Se agregaron 14 títulos nuevos al catálogo esta semana.</p>
                </div>
                <span class="notification-time">3h</span>
            </div>

            <div class="notification-item">
                <span class="notification-dot"></span>
                <div class="notification-icon">
                    <span class="material-symbols-outlined">check_circle</span>
                </div>
                <div class="notification-body">
                    <p class="notification-title">Devolución registrada</p>
                    <p class="notification-desc">"Constelaciones Doradas" fue devuelto exitosamente el 28 de mayo.</p>
                </div>
                <span class="notification-time">2d</span>
            </div>

            <div class="notification-item">
                <span class="notification-dot"></span>
                <div class="notification-icon">
                    <span class="material-symbols-outlined">bookmark_added</span>
                </div>
                <div class="notification-body">
                    <p class="notification-title">Añadido a tu biblioteca</p>
                    <p class="notification-desc">"Archivo Acheron" fue guardado en tu lista de lectura.</p>
                </div>
                <span class="notification-time">5d</span>
            </div>

        </div>

        <div class="notification-footer">
            <button class="notification-see-all">Ver todas las notificaciones</button>
        </div>
    </div>


    <!-- ══════════════════════════════════════════
         MENÚ OFF-CANVAS DE PERFIL
    ══════════════════════════════════════════════ -->
    <div class="menu-off-canva" role="dialog" aria-modal="true" aria-label="Menú de perfil">
        <button class="material-symbols-outlined arrow-back" aria-label="Cerrar menú de perfil">arrow_back_ios</button>

        <div id="profile-button-menu">
            <!-- La imagen se inserta via global.js -->
        </div>

        <div class="menu-off-canva-divider"></div>

        <div class="menu-buttons">
            <button class="config" type="button">
                <span class="material-symbols-outlined">settings</span>
                Configuración
            </button>
            <button class="signout" type="button">
                <span class="material-symbols-outlined">logout</span>
                Cerrar Sesión
            </button>
        </div>
    </div>


    <!-- ══════════════════════════════════════════
         BARRA DE NAVEGACIÓN
    ══════════════════════════════════════════════ -->
    <header class="topbar" role="banner">
        <div class="topbar-inner">

            <!-- Logo -->
            <a href="#" class="topbar-logo">
                <div class="logo" aria-hidden="true"></div>
                <span class="logo-text">AppJoteca</span>
            </a>

            <!-- Búsqueda inline (visible en desktop) -->
            <div class="topbar-search">
                <input
                    type="text"
                    class="topbar-search-input"
                    placeholder="Buscar título o autor..."
                    aria-label="Buscar en el catálogo"
                >
                <span class="material-symbols-outlined topbar-search-icon">search</span>
            </div>

            <!-- Links de navegación (visible en desktop) -->
            <nav class="topbar-nav" aria-label="Navegación principal">
                <a href="#" class="nav-link active" data-nav="catalogo">Catálogo</a>
                <a href="#" class="nav-link" data-nav="biblioteca">Mi Biblioteca</a>
                <a href="#" class="nav-link" data-nav="panel">Panel</a>
            </nav>

            <!-- Acciones -->
            <div class="topbar-actions">
                <!-- Botón búsqueda (solo móvil) -->
                <button class="icon-btn search-toggle-btn" aria-label="Buscar" aria-expanded="false">
                    <span class="material-symbols-outlined">search</span>
                </button>

                <!-- Bandeja de notificaciones -->
                <button class="notification-tray" aria-label="Notificaciones" aria-expanded="false">
                    <span class="material-symbols-outlined">notifications</span>
                    <span class="notification-badge" aria-label="3 notificaciones sin leer"></span>
                </button>

                <!-- Botón de perfil -->
                <div id="profile-button-topbar"></div>

                <!-- Botón hamburguesa (solo móvil) -->
                <button class="icon-btn menu-toggle-btn" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobileMenu">
                    <span class="material-symbols-outlined">menu</span>
                </button>
            </div>
        </div>

        <!-- Búsqueda expandible en móvil -->
        <div class="topbar-search-mobile" aria-hidden="true">
            <input
                type="text"
                placeholder="Buscar título o autor..."
                aria-label="Buscar en el catálogo"
            >
        </div>
    </header>


    <!-- ══════════════════════════════════════════
         MENÚ MÓVIL (hamburguesa)
    ══════════════════════════════════════════════ -->

    <!-- Overlay del menú hamburguesa -->
    <div class="mobile-menu-overlay" aria-hidden="true"></div>

    <!-- Panel deslizante -->
    <div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Menú de navegación">

        <!-- Cabecera -->
        <div class="mobile-menu-header">
            <a href="#" class="mobile-menu-logo topbar-logo">
                <div class="logo" aria-hidden="true"></div>
                <span class="logo-text">AppJoteca</span>
            </a>
            <button class="mobile-menu-close" aria-label="Cerrar menú">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>

        <!-- Navegación principal -->
        <nav class="mobile-menu-nav" aria-label="Navegación principal">
            <a href="#" class="mobile-nav-link active" data-nav="catalogo">Catálogo</a>
            <a href="#" class="mobile-nav-link" data-nav="biblioteca">Mi Biblioteca</a>
            <a href="#" class="mobile-nav-link" data-nav="panel">Panel</a>
        </nav>

        <!-- Divisor -->
        <div class="mobile-menu-divider" aria-hidden="true"></div>

        <!-- Sección novedades -->
        <div class="mobile-menu-section">
            <p class="mobile-menu-section-title">Novedades</p>
            <div class="mobile-menu-items">

                <a href="#" class="mobile-menu-item">
                    <div class="mobile-menu-item-thumb">
                        <img src="/assets/images/books/cien-años-de-soledad.jpg" alt="Cien Años de Soledad" loading="lazy">
                    </div>
                    <div class="mobile-menu-item-info">
                        <p class="mobile-menu-item-name">Cien Años de Soledad</p>
                        <p class="mobile-menu-item-sub">García Márquez · Literatura</p>
                    </div>
                    <span class="material-symbols-outlined mobile-menu-item-arrow">arrow_forward</span>
                </a>

                <a href="#" class="mobile-menu-item">
                    <div class="mobile-menu-item-thumb">
                        <img src="/assets/images/books/constelaciones-doradas.png" alt="Constelaciones Doradas" loading="lazy">
                    </div>
                    <div class="mobile-menu-item-info">
                        <p class="mobile-menu-item-name">Constelaciones Doradas</p>
                        <p class="mobile-menu-item-sub">Atlas Celestial · Ciencia</p>
                    </div>
                    <span class="material-symbols-outlined mobile-menu-item-arrow">arrow_forward</span>
                </a>

                <a href="#" class="mobile-menu-item">
                    <div class="mobile-menu-item-thumb">
                        <img src="/assets/images/books/acheron.jpg" alt="Archivo Acheron" loading="lazy">
                    </div>
                    <div class="mobile-menu-item-info">
                        <p class="mobile-menu-item-name">Archivo Acheron</p>
                        <p class="mobile-menu-item-sub">Acceso Institucional · Arquitectura</p>
                    </div>
                    <span class="material-symbols-outlined mobile-menu-item-arrow">arrow_forward</span>
                </a>

            </div>

            <a href="#" class="mobile-menu-all">
                <span>Ver todo el catálogo</span>
                <span class="material-symbols-outlined">chevron_right</span>
            </a>
        </div>

        <!-- Pie del menú -->
        <div class="mobile-menu-footer">
            <span class="mobile-menu-tagline">Sistema Institucional</span>
            <div class="mobile-menu-footer-actions">
                <!-- Notificaciones en menú móvil -->
                <button class="notification-tray icon-btn" aria-label="Notificaciones" aria-expanded="false">
                    <span class="material-symbols-outlined">notifications</span>
                    <span class="notification-badge" aria-hidden="true"></span>
                </button>
                <!-- Perfil en menú móvil -->
                <div id="profile-button-menu-footer"></div>
            </div>
        </div>

    </div><!-- /mobile-menu -->


    <!-- ══════════════════════════════════════════
         CONTENIDO PRINCIPAL
    ══════════════════════════════════════════════ -->
    <main class="main-content">

        <!-- ──────────────────────────────────────
             HERO / CARRUSEL DESTACADOS
        ─────────────────────────────────────────── -->
        <section class="hero-section">

            <!-- Fondo -->
            <div class="hero-background">
                <img
                    src="../../assets/images/books/biblioteca-bg.png"
                    alt="Biblioteca grandiosa"
                    class="hero-image"
                    loading="eager"
                >
                <div class="hero-overlay" aria-hidden="true"></div>
            </div>

            <!-- Contenido del hero -->
            <div class="hero-content">
                <span class="hero-label">Ver libros</span>
                <h1 class="hero-title">
                    Estantería<br>
                    <span class="hero-title-accent">Digital</span>
                </h1>
            </div>

            <!-- Carrusel -->
            <div class="carousel-wrapper">
                <div class="carousel-fade carousel-fade--left" aria-hidden="true"></div>
                <div class="carousel-fade carousel-fade--right" aria-hidden="true"></div>

                <button class="carousel-btn carousel-btn--prev" id="carouselPrev" aria-label="Anterior" disabled>
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
                <button class="carousel-btn carousel-btn--next" id="carouselNext" aria-label="Siguiente">
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>

                <div class="featured-carousel" id="featuredCarousel" role="list" aria-label="Libros destacados">

                    <div class="featured-card" role="listitem">
                        <div class="featured-cover">
                            <img src="../../assets/images/books/cien-años-de-soledad.jpg" alt="Cien Años de Soledad" loading="lazy">
                        </div>
                        <div class="featured-info">
                            <span class="featured-tag">Literatura</span>
                            <p class="featured-title">Cien Años de Soledad</p>
                            <p class="featured-desc">Una saga familiar que atraviesa generaciones en el mítico Macondo, tejida con el realismo mágico de García Márquez.</p>
                            <a href="/pages/biblioteca-catalogo/vista-libro/book-view.php" class="btn-primary" style="align-self:flex-start">
                                <span class="material-symbols-outlined">auto_stories</span>
                                Ver libro
                            </a>
                        </div>
                    </div>

                    <div class="featured-card" role="listitem">
                        <div class="featured-cover">
                            <img src="/assets/images/books/constelaciones-doradas.png" alt="Constelaciones Doradas" loading="lazy">
                        </div>
                        <div class="featured-info">
                            <span class="featured-tag">Ciencia</span>
                            <p class="featured-title">Constelaciones Doradas</p>
                            <p class="featured-desc">Un atlas celestial del siglo XVII que cartografió el firmamento con una precisión sorprendente para su época.</p>
                            <a href="#" class="btn-primary" style="align-self:flex-start">
                                <span class="material-symbols-outlined">auto_stories</span>
                                Ver libro
                            </a>
                        </div>
                    </div>

                    <div class="featured-card" role="listitem">
                        <div class="featured-cover">
                            <img src="../../assets/images/books/acheron.jpg" alt="Archivo Acheron" loading="lazy">
                        </div>
                        <div class="featured-info">
                            <span class="featured-tag">Arquitectura</span>
                            <p class="featured-title">Archivo Acheron</p>
                            <p class="featured-desc">Documentación completa de un edificio nunca construido: planos, memorias y especulaciones de un maestro olvidado.</p>
                            <a href="#" class="btn-primary" style="align-self:flex-start">
                                <span class="material-symbols-outlined">auto_stories</span>
                                Ver libro
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        </section><!-- /hero-section -->


        <!-- ──────────────────────────────────────
             FILTROS
        ─────────────────────────────────────────── -->
        <section class="filters-section" aria-label="Filtros del catálogo">
            <div class="filters-container">
                <div class="filters-row">
                    <div class="filter-group">
                        <label class="filter-label" for="filterCategory">Categoría</label>
                        <select class="filter-select" id="filterCategory">
                            <option value="">Todas las categorías</option>
                            <option value="literatura">Literatura</option>
                            <option value="ciencia">Ciencia</option>
                            <option value="filosofia">Filosofía</option>
                            <option value="historia">Historia</option>
                            <option value="arquitectura">Arquitectura</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label class="filter-label" for="filterAvailability">Disponibilidad</label>
                        <select class="filter-select" id="filterAvailability">
                            <option value="">Cualquier estado</option>
                            <option value="disponible">Disponible</option>
                            <option value="prestado">En préstamo</option>
                            <option value="reservado">Reservado</option>
                        </select>
                    </div>
                </div>
                <div class="filters-actions">
                    <button class="btn-filter">
                        <span class="material-symbols-outlined">filter_list</span>
                        Aplicar
                    </button>
                </div>
            </div>
        </section>


        <!-- ──────────────────────────────────────
             CATÁLOGO
        ─────────────────────────────────────────── -->
        <section class="catalog-section" aria-label="Catálogo de libros">
            <div class="catalog-header">
                <div class="catalog-header-left">
                    <h2 class="catalog-title">El <span>Catálogo</span></h2>
                    <button class="btn-ver-todo">
                        Ver todo
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>

                <div class="catalog-tabs" role="tablist" aria-label="Ordenar por">
                    <button class="tab-btn active" role="tab" aria-selected="true">Más recomendados</button>
                    <button class="tab-btn" role="tab" aria-selected="false">Agregados Recientemente</button>
                    <button class="tab-btn" role="tab" aria-selected="false">Más Prestados</button>
                </div>
            </div>

            <!-- Grid de tarjetas -->
            <div class="book-grid">

                <article class="book-card" aria-label="Cien Años de Soledad">
                    <div class="book-cover-wrapper">
                        <img src="/assets/images/books/cien-años-de-soledad.jpg" alt="Cien Años de Soledad" class="book-cover" loading="lazy" onclick="verLibro()">
                        <span class="book-badge">Literatura</span>
                        <div class="book-card-cta">
                            <button class="book-card-cta-btn" onclick="verLibro()">
                                <span class="material-symbols-outlined">auto_stories</span>
                                Ver Libro
                            </button>
                        </div>
                    </div>
                    <div class="book-info">
                        <h4 class="book-title">Cien Años de Soledad</h4>
                        <p class="book-author">Gabriel García Márquez</p>
                        <div class="book-tags">
                            <span class="book-tag">Realismo Mágico</span>
                            <span class="book-tag">Clásico</span>
                        </div>
                    </div>
                </article>

                <article class="book-card" aria-label="Constelaciones Doradas">
                    <div class="book-cover-wrapper">
                        <img src="../../assets/images/books/constelaciones-doradas.png" alt="Constelaciones Doradas" class="book-cover" loading="lazy">
                        <span class="book-badge">Ciencia</span>
                        <div class="book-card-cta">
                            <button class="book-card-cta-btn">
                                <span class="material-symbols-outlined">auto_stories</span>
                                Ver Libro
                            </button>
                        </div>
                    </div>
                    <div class="book-info">
                        <h4 class="book-title">Constelaciones Doradas</h4>
                        <p class="book-author">Atlas Celestial</p>
                        <div class="book-tags">
                            <span class="book-tag">Astronomía</span>
                            <span class="book-tag">Siglo XVII</span>
                        </div>
                    </div>
                </article>

                <article class="book-card" aria-label="Ética a Nicómaco">
                    <div class="book-cover-wrapper">
                        <img src="../../assets/images/books/etica-a-nicomaco.jpg" alt="Ética a Nicómaco" class="book-cover" loading="lazy">
                        <span class="book-badge">Filosofía</span>
                        <div class="book-card-cta">
                            <button class="book-card-cta-btn">
                                <span class="material-symbols-outlined">auto_stories</span>
                                Ver Libro
                            </button>
                        </div>
                    </div>
                    <div class="book-info">
                        <h4 class="book-title">Ética a Nicómaco</h4>
                        <p class="book-author">Aristóteles</p>
                        <div class="book-tags">
                            <span class="book-tag">Tratado</span>
                        </div>
                    </div>
                </article>

            </div><!-- /book-grid -->
        </section><!-- /catalog-section -->

    </main><!-- /main-content -->


    <!-- ══════════════════════════════════════════
         FOOTER
    ══════════════════════════════════════════════ -->
    <footer class="footer" role="contentinfo">
        <div class="footer-inner">
            <div class="footer-brand">
                <span class="footer-logo">AppJoteca</span>
                <p class="footer-tagline">
                    Punto de acceso institucional para fomentar la lectura en los estudiantes de la institución.
                </p>
                <div class="footer-social">
                    <button class="footer-social-btn" aria-label="Sitio web">
                        <span class="material-symbols-outlined">language</span>
                    </button>
                    <button class="footer-social-btn" aria-label="Compartir">
                        <span class="material-symbols-outlined">share</span>
                    </button>
                    <button class="footer-social-btn" aria-label="Correo electrónico">
                        <span class="material-symbols-outlined">mail</span>
                    </button>
                </div>
            </div>

            <div class="footer-nav-cols">
                <div class="footer-col">
                    <p class="footer-col-title">Explorar</p>
                    <nav>
                        <a href="#">El Catálogo</a>
                        <a href="#">Nuevos Ingresos</a>
                        <a href="#">Mi Biblioteca</a>
                        <a href="#">Mapa Institucional</a>
                    </nav>
                </div>
                <div class="footer-col">
                    <p class="footer-col-title">Sistema</p>
                    <nav>
                        <a href="#">Términos de Uso</a>
                        <a href="#">Privacidad</a>
                        <a href="#">Soporte</a>
                        <a href="#">Accesibilidad</a>
                    </nav>
                </div>
                <div class="footer-col">
                    <p class="footer-col-title">Acceso</p>
                    <nav>
                        <a href="#">Acceso Institucional</a>
                        <a href="#">Panel Administrativo</a>
                        <a href="#">Contacto</a>
                    </nav>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p class="footer-copyright">
                &copy; 2024 AppJoteca &nbsp;·&nbsp; Sistema de Biblioteca Institucional
            </p>
        </div>
    </footer>


    <!-- ══════════════════════════════════════════
         FAB
    ══════════════════════════════════════════════ -->
    <div class="fab-container">
        <button class="fab" aria-label="Explorar el archivo">
            <span class="material-symbols-outlined">auto_stories</span>
            <span class="fab-text">Explorar</span>
        </button>
    </div>


    <!-- Scripts -->
    <script src="../../shared/js/components/navbar.js"></script>
    <script src="../../shared/js/components/book-cards.js"></script>
    <script src="../../shared/js/global.js"></script>
    <script src="biblioteca.js"></script>

</body>
</html>