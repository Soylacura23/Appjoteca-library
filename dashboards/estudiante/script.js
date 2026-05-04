document.addEventListener("DOMContentLoaded", function () {
  /* ==================== MENÚ HAMBURGUESA ==================== */
  const hamburguesa = document.getElementById("hamburguesa");
  const overlayMenu = document.getElementById("overlay-menu");
  const cerrarOverlay = document.querySelector(".cerrar-overlay");

  if (hamburguesa && overlayMenu && cerrarOverlay) {
    hamburguesa.addEventListener("click", () => {
      overlayMenu.classList.add("activo");
    });

    cerrarOverlay.addEventListener("click", () => {
      overlayMenu.classList.remove("activo");
    });

    /* Cerrar al hacer clic en cualquier enlace del menú móvil */
    const enlacesOverlay = document.querySelectorAll(
      ".menu-overlay .enlace-overlay",
    );
    enlacesOverlay.forEach((enlace) => {
      enlace.addEventListener("click", () => {
        overlayMenu.classList.remove("activo");
      });
    });
  }

  /* ==================== MENÚ DE PERFIL ==================== */
  const perfilBtn = document.getElementById("perfil-btn");
  const perfilDropdown = document.getElementById("perfil-dropdown");
  const perfilContenedor = document.querySelector(".perfil-contenedor");

  if (perfilBtn && perfilDropdown && perfilContenedor) {
    perfilBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      perfilDropdown.classList.toggle("activo");
    });

    /* Cerrar dropdown al hacer clic fuera */
    document.addEventListener("click", function (e) {
      if (!perfilContenedor.contains(e.target)) {
        perfilDropdown.classList.remove("activo");
      }
    });
  }
});
