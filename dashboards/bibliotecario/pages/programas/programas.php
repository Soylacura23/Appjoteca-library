<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Programas · APPJOTECA</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap">
    <link rel="stylesheet" href="../../css/global.css">
    <link rel="stylesheet" href="../../../../shared/css/components/notifications.css">
    <link rel="stylesheet" href="../../css/theme.css">
    <link rel="stylesheet" href="programas.css">
    <link rel="stylesheet" href="../../../../shared/css/components/footer.css">
    <link rel="favicon" type="image/png" href="../../../../shared/images/logo-appjoteca.png">
<base target="_self">
</head>
<body>

    <!-- Topbar -->
    <header class="topbar">
        <div class="topbar-inner">
            <button id="menu-activar" class="hamburguer">
                <span class="material-symbols-outlined">menu</span>
            </button>
            <div class="logo">
                <div id="logo"></div>
                <h1 class="headline-md text-primary">APPJOTECA</h1>
            </div>
            <div class="search-engine">
                <form id="search-form">
                    <button type="submit">
                        <span class="material-symbols-outlined search-icon">search</span>
                    </button>
                    <input id="search" name="query" type="search" placeholder="Busca libros, funciones o usuarios" required minlength="1">
                </form>
            </div>
            <div class="topbar-derecha">
                <button class="icon-btn search-toggle-btn" id="search-toggle-btn" aria-label="Buscar" aria-expanded="false">
                    <span class="material-symbols-outlined">search</span>
                </button>
                <button class="notification-tray" id="notification-tray-btn" aria-label="Notificaciones" aria-expanded="false">
                    <span class="material-symbols-outlined">notifications</span>
                    <span class="notification-badge hidden" aria-hidden="true"></span>
                </button>
                <div id="profile-button-topbar"></div>
            </div>
        </div>
        <div class="topbar-search-mobile" id="topbar-search-mobile" aria-hidden="true">
            <input type="text" placeholder="Buscar libros, funciones o usuarios..." aria-label="Buscar en programas">
        </div>
    </header>

    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar">
    <nav class="sidebar-navigator">
            <ul class="menu-items">
                <li>
                    <a href="../../index.php" class="menu-item">
                        <span class="material-symbols-outlined">dashboard</span>
                        <span class="menu-texto">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="../inventario/inventario.php" class="menu-item">
                        <span class="material-symbols-outlined">menu_book</span>
                        <span class="menu-texto">Inventario</span>
                    </a>
                </li>
                <li>
                    <a href="../reservaciones/reservaciones.php" class="menu-item">
                        <span class="material-symbols-outlined">event_available</span>
                        <span class="menu-texto">Reservaciones</span>
                    </a>
                </li>
                <li>
                    <a href="../usuarios/usuarios.php" class="menu-item">
                        <span class="material-symbols-outlined">group</span>
                        <span class="menu-texto">Usuarios</span>
                    </a>
                </li>
                
                <li>
                    <a href="programas.php" class="menu-item active">
                        <span class="material-symbols-outlined">school</span>
                        <span class="menu-texto">Programas</span>
                    </a>
                </li>

                <li>
                    <a href="../reportes/reportes.php" class="menu-item">
                        <span class="material-symbols-outlined">analytics</span>
                        <span class="menu-texto">Reportes</span>
                    </a>
                </li>
                <li>
                    <a href="../ajustes/ajustes.php" class="menu-item">
                        <span class="material-symbols-outlined">settings</span>
                        <span class="menu-texto">Ajustes</span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>

    <!-- Main Content -->
    <main id="main-content" class="main-content">

        <!-- Header -->
        <section class="page-header">
            <div class="header-text">
                <p class="label-overline text-primary">Portal Académico</p>
                <h1 class="headline-xl white-text">Programas Académicos</h1>
                <p class="text-body text-outline">Gestiona los programas de estudio, asigna docentes y organiza los recursos bibliográficos de cada asignatura.</p>
            </div>
            <button class="btn-add-program" id="btn-add-program">
                <span class="material-symbols-outlined">add</span>
                Crear Programa
            </button>
        </section>

        <!-- Estadísticas -->
        <section class="stats-bar">
            <div class="stat-chip">
                <div class="stat-icon-bg">
                    <span class="material-symbols-outlined">school</span>
                </div>
                <div class="stat-info">
                    <strong id="stat-programs">0</strong>
                    <span>Programas Activos</span>
                </div>
            </div>
            <div class="stat-chip">
                <div class="stat-icon-bg">
                    <span class="material-symbols-outlined">group</span>
                </div>
                <div class="stat-info">
                    <strong id="stat-students">0</strong>
                    <span>Estudiantes Inscritos</span>
                </div>
            </div>
            <div class="stat-chip">
                <div class="stat-icon-bg">
                    <span class="material-symbols-outlined">menu_book</span>
                </div>
                <div class="stat-info">
                    <strong id="stat-materials">0</strong>
                    <span>Materiales Asignados</span>
                </div>
            </div>
        </section>

        <!-- Programa Destacado -->
        <section class="featured-program" id="featured-program">
            <div class="featured-image">
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&h=500&fit=crop" alt="Aula de Matemáticas" loading="lazy">
                <div class="featured-overlay"></div>
            </div>
            <div class="featured-content">
                <div class="featured-badges">
                    <span class="badge-live">
                        <span class="live-dot"></span>
                        En Curso
                    </span>
                    <span class="badge-teacher">
                        <span class="material-symbols-outlined">person</span>
                        Prof. Claudia Martínez
                    </span>
                </div>
                <h2 class="featured-title">Matemáticas Avanzadas</h2>
                <p class="featured-desc">Desarrollo de habilidades analíticas y resolución de problemas complejos. El programa abarca álgebra lineal, cálculo multivariable, ecuaciones diferenciales y estadística aplicada.</p>
                <div class="featured-metrics">
                    <div class="featured-metric">
                        <span class="material-symbols-outlined">group</span>
                        <div>
                            <span class="featured-metric-value">28</span>
                            <span class="featured-metric-label">Estudiantes</span>
                        </div>
                    </div>
                    <div class="featured-metric">
                        <span class="material-symbols-outlined">menu_book</span>
                        <div>
                            <span class="featured-metric-value">12</span>
                            <span class="featured-metric-label">Materiales</span>
                        </div>
                    </div>
                    <div class="featured-metric">
                        <span class="material-symbols-outlined">calendar_month</span>
                        <div>
                            <span class="featured-metric-value">Lun — Vie</span>
                            <span class="featured-metric-label">Horario</span>
                        </div>
                    </div>
                    <div class="featured-metric">
                        <span class="material-symbols-outlined">schedule</span>
                        <div>
                            <span class="featured-metric-value">10:00 AM</span>
                            <span class="featured-metric-label">Inicio</span>
                        </div>
                    </div>
                </div>
                <div class="featured-actions">
                    <button class="btn-primary-sm">Ver Materiales</button>
                    <button class="btn-outline-sm">Editar Programa</button>
                </div>
            </div>
        </section>

        <!-- Grid de Programas -->
        <section class="programs-section">
            <div class="section-header">
                <div class="section-title-group">
                    <h2 class="headline-sm white-text">
                        <span class="material-symbols-outlined">grid_view</span>
                        Todos los Programas
                    </h2>
                    <p class="section-subtitle">Gestiona cada asignatura, sus docentes y recursos</p>
                </div>
                <div class="section-filters">
                    <select class="filter-select" id="filter-dept">
                        <option value="">Todos los departamentos</option>
                        <option value="matematicas">Matemáticas</option>
                        <option value="literatura">Literatura</option>
                        <option value="ciencias">Ciencias</option>
                        <option value="historia">Historia</option>
                    </select>
                    <select class="filter-select" id="filter-status">
                        <option value="">Todos los estados</option>
                        <option value="active">En Curso</option>
                        <option value="upcoming">Próximo</option>
                        <option value="finished">Finalizado</option>
                    </select>
                </div>
            </div>
            <div class="programs-grid" id="programs-grid"></div>
        </section>

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

    </main>

    <!-- Overlay -->
    <div id="overlay" class="overlay"></div>

    <!-- Modal Confirmar Eliminar -->
    <div class="confirm-modal" id="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title" hidden>
        <div class="confirm-backdrop" id="confirm-backdrop"></div>
        <div class="confirm-box">
            <div class="confirm-icon">
                <span class="material-symbols-outlined">warning</span>
            </div>
            <h3 id="confirm-title">Eliminar Programa</h3>
            <p>¿Estás seguro de que deseas eliminar <strong id="confirm-program-name"></strong>? Esta acción eliminará todos los materiales asociados y las inscripciones de los estudiantes. No se puede deshacer.</p>
            <div class="confirm-actions">
                <button class="btn-confirm-cancel" id="confirm-cancel">Cancelar</button>
                <button class="btn-confirm-delete" id="confirm-delete">
                    <span class="material-symbols-outlined">delete_forever</span>
                    Eliminar
                </button>
            </div>
        </div>
    </div>

    <!-- Notificaciones -->
    <div class="notification-container" id="notification-container">
        <div class="notification-header">
            <h3 class="notification-header-title">
                Notificaciones
                <span class="count-pill">0</span>
            </h3>
            <button class="notification-mark-all" id="mark-all-read">Marcar leídas</button>
        </div>
        <div class="notification-list" id="notification-list">
            <div class="notification-empty" id="notification-empty">
                <span class="material-symbols-outlined">notifications_none</span>
                <p>No hay notificaciones nuevas</p>
            </div>
        </div>
        <div class="notification-footer">
            <button class="notification-see-all">Ver todas las notificaciones</button>
        </div>
    </div>

    <!-- Menú Off-canvas -->
    <div class="menu-off-canva">
        <span class="material-symbols-outlined arrow-back">arrow_back_ios</span>
        <div id="profile-button-menu"></div>
        <div class="menu-buttons">
            <button class="config">
                <span class="material-symbols-outlined">settings</span>
                Configuración
            </button>
            <button class="signout">
                <span class="material-symbols-outlined">logout</span>
                Cerrar Sesión
            </button>
        </div>
    </div>

    <script src="../../js/global.js"></script>
    <script src="programas.js"></script>
</body>
</html>
