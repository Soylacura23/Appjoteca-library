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

function ocultarError() {
  errorBox.hidden = true;
}

usuarioInput.addEventListener('input', ocultarError);
passInput.addEventListener('input', ocultarError);
roleInputs.forEach(r => r.addEventListener('change', ocultarError));

function mostrarError(msg) {
  errorText.textContent = msg;
  errorBox.hidden = false;

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

// ── Envío del formulario de Login ──────────────────────
form.addEventListener('submit', async (e) => { 
  e.preventDefault();

  const rolSeleccionado = document.querySelector('.role-radio:checked')?.value;
  const usuario         = usuarioInput.value.trim();
  const contrasena      = passInput.value;

  // Validaciones básicas de la vista
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

  // Estilos visuales de carga
  btnLoginText.textContent = 'Verificando acceso…';
  btnLogin.disabled        = true;
  btnLogin.style.opacity   = '0.75';

  try {

    const formData = new FormData(form);

    const respuesta = await fetch('../../backend/auth/login-send.php', {
      method: 'POST',
      body: formData
    });

    const resultado = await respuesta.json();

    if (resultado.status === 'success') {

      setTimeout(() => {
        window.location.href = resultado.redirect;
      }, 700);
    } else {

      mostrarError(resultado.message || 'Usuario o contraseña incorrectos.');
      btnLoginText.textContent = 'Iniciar Sesión';
      btnLogin.disabled        = false;
      btnLogin.style.opacity   = '1';
      passInput.value = '';
      passInput.focus();
    }

  } catch (err) {
    mostrarError('Error de conexión con el servidor.');
    btnLoginText.textContent = 'Iniciar Sesión';
    btnLogin.disabled        = false;
    btnLogin.style.opacity   = '1';
    console.error(err);
  }
});
