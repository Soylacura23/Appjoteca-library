<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reservaciones · APPJOTECA</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap">
    <link rel="stylesheet" href="../../css/global.css">
    <link rel="stylesheet" href="../../../../shared/css/components/notifications.css">
    <link rel="stylesheet" href="../../css/theme.css">
    <link rel="stylesheet" href="../../../../shared/css/components/footer.css">
    <link rel="stylesheet" href="reservaciones.css">
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
            <input type="text" placeholder="Buscar libros, funciones o usuarios..." aria-label="Buscar en reservaciones">
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
                    <a href="reservaciones.php" class="menu-item active">
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
                    <a href="../programas/programas.php" class="menu-item">
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
        <section class="header">
            <div class="header-text">
                <p class="label-overline text-primary">Gestión de Préstamos</p>
                <h1 class="headline-xl white-text">Reservaciones</h1>
                <p class="text-body text-outline">Administra las solicitudes de préstamo, supervisa las devoluciones y controla los volúmenes atrasados.</p>
            </div>
            <div class="header-stats">
                <div class="header-stat">
                    <span class="header-stat-value">12</span>
                    <span class="header-stat-label">Nuevas Solicitudes</span>
                </div>
                <div class="header-stat danger">
                    <span class="header-stat-value">4</span>
                    <span class="header-stat-label">Ítems Atrasados</span>
                </div>
            </div>
        </section>

        <!-- Solicitudes Nuevas -->
        <section class="requests-section">
            <div class="section-header">
                <h2 class="headline-sm white-text">
                    <span class="material-symbols-outlined">pending_actions</span>
                    Solicitudes Nuevas
                </h2>
                <a href="#" class="section-link">
                    Ver Cola
                    <span class="material-symbols-outlined">arrow_forward</span>
                </a>
            </div>
            <div class="requests-grid" id="requests-grid"></div>
        </section>

        <!-- Estado en Vivo + Próximas Devoluciones -->
        <section class="status-grid">
            <div class="status-panel">
                <h2 class="headline-sm white-text">
                    <span class="material-symbols-outlined">analytics</span>
                    Estado en Vivo
                </h2>
                <div class="status-cards">
                    <div class="status-card">
                        <div class="status-card-top">
                            <span class="status-card-label">Vencen Hoy</span>
                            <span class="material-symbols-outlined">schedule</span>
                        </div>
                        <span class="status-card-value">08</span>
                        <span class="status-card-hint">Verificación antes de las 18:00</span>
                    </div>
                    <div class="status-card danger">
                        <div class="status-card-top">
                            <span class="status-card-label">Atrasados Críticos</span>
                            <span class="material-symbols-outlined">warning</span>
                        </div>
                        <span class="status-card-value">04</span>
                        <span class="status-card-hint">Protocolos de notificación activados</span>
                    </div>
                </div>
            </div>
            <div class="returns-panel">
                <div class="returns-header">
                    <span class="returns-title">Próximas Devoluciones</span>
                    <div class="live-badge">
                        <span class="live-dot"></span>
                        <span>En vivo</span>
                    </div>
                </div>
                <div class="returns-list" id="returns-list"></div>
            </div>
        </section>

        <!-- Historial de Movimientos -->
        <section class="history-section">
            <div class="section-header">
                <h2 class="headline-sm white-text">
                    <span class="material-symbols-outlined">history</span>
                    Historial de Movimientos
                </h2>
                <div class="history-actions">
                    <button class="btn-ghost-sm">Filtrar</button>
                    <button class="btn-ghost-sm">Exportar Log</button>
                </div>
            </div>
            <div class="history-table-wrap">
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>Volumen / Ítem</th>
                            <th>Usuario</th>
                            <th>Tipo de Movimiento</th>
                            <th class="text-right">Fecha y Hora</th>
                        </tr>
                    </thead>
                    <tbody id="history-tbody"></tbody>
                </table>
            </div>
            <div class="history-footer">
                <button class="history-load-btn" id="history-load-btn">
                    Cargar Archivo Completo
                    <span class="material-symbols-outlined">expand_more</span>
                </button>
            </div>
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
    <script src="reservaciones.js"></script>
</body>
</html>
