/* ============================================================
   login.js — Autenticación · Appjoteca
   Credenciales temporales hardcodeadas (sin base de datos)
   ============================================================ */

// ── Credenciales por rol ────────────────────────────────────
const CREDENCIALES = {
  estudiante: {
    usuario: 'estudiante',
    contrasena: 'est123',
    destino: '/dashboards/estudiante/index.html'
  },
  profesor: {
    usuario: 'profesor',
    contrasena: 'prof123',
    destino: '/dashboards/docente/index.html'
  },
  bibliotecario: {
    usuario: 'bibliotecario',
    contrasena: 'bib123',
    destino: '/dashboards/bibliotecario/index.html'
  }
};

// ── Referencias al DOM ──────────────────────────────────────
const form           = document.getElementById('login-form');
const errorBox       = document.getElementById('login-error');
const errorText      = document.getElementById('login-error-text');
const usuarioInput   = document.getElementById('usuario');
const passInput      = document.getElementById('contrasena');
const togglePassBtn  = document.getElementById('toggle-pass');
const togglePassIcon = document.getElementById('toggle-pass-icon');
const btnLogin       = document.querySelector('.btn-login');
const btnLoginText   = document.getElementById('btn-login-text');
const roleInputs     = document.querySelectorAll('.role-radio');

// ── Mostrar / ocultar contraseña ────────────────────────────
togglePassBtn.addEventListener('click', () => {
  const visible = passInput.type === 'text';
  passInput.type            = visible ? 'password' : 'text';
  togglePassIcon.textContent = visible ? 'visibility' : 'visibility_off';
  togglePassBtn.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
  passInput.focus();
});

// ── Ocultar error al escribir en cualquier campo ────────────
function ocultarError() {
  errorBox.hidden = true;
}

usuarioInput.addEventListener('input', ocultarError);
passInput.addEventListener('input', ocultarError);
roleInputs.forEach(r => r.addEventListener('change', ocultarError));

function mostrarError(msg) {
  errorText.textContent = msg;
  errorBox.hidden = false;
  // Reinicia la animación de temblor
  errorBox.style.animation = 'none';
  void errorBox.offsetWidth; // reflow
  errorBox.style.animation = '';
  errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Feedback visual al cambiar de rol ──────────────────────
roleInputs.forEach(radio => {
  radio.addEventListener('change', () => {
    // Limpiar campos al cambiar de rol para evitar confusión
    usuarioInput.value = '';
    passInput.value    = '';
    usuarioInput.focus();
  });
});

// ── Envío del formulario ────────────────────────────────────
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const rolSeleccionado = document.querySelector('.role-radio:checked')?.value;
  const usuario         = usuarioInput.value.trim();
  const contrasena      = passInput.value;

  // Validaciones básicas
  if (!rolSeleccionado) {
    mostrarError('Selecciona tu tipo de acceso para continuar.');
    return;
  }

  if (!usuario) {
    mostrarError('Por favor, ingresa tu usuario o correo institucional.');
    usuarioInput.focus();
    return;
  }

  if (!contrasena) {
    mostrarError('Por favor, ingresa tu contraseña.');
    passInput.focus();
    return;
  }

  // Verificar credenciales del rol seleccionado
  const creds = CREDENCIALES[rolSeleccionado];

  if (usuario !== creds.usuario || contrasena !== creds.contrasena) {
    mostrarError('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
    passInput.value = '';
    passInput.focus();
    return;
  }

  // ── Éxito: feedback y redirección ──────────────────────
  btnLoginText.textContent = 'Verificando acceso…';
  btnLogin.disabled        = true;
  btnLogin.style.opacity   = '0.75';

  setTimeout(() => {
    window.location.href = creds.destino;
  }, 700);
});