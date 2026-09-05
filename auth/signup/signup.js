// ── Referencias al DOM ──────────────────────────────────────
const form            = document.getElementById('signup-form');
const errorBox        = document.getElementById('signup-error');
const errorText       = document.getElementById('signup-error-text');
const successBox      = document.getElementById('signup-success');
const successText     = document.getElementById('signup-success-text');
const nombreInput     = document.getElementById('nombre');
const usuarioInput    = document.getElementById('usuario');
const emailInput      = document.getElementById('email');
const cedulaInput     = document.getElementById('cedula');
const cedulaFileInput = document.getElementById('cedula-file');
const cedulaPreview   = document.getElementById('cedula-preview');
const passInput       = document.getElementById('contrasena');
const pass2Input      = document.getElementById('contrasena2');
const togglePassBtn   = document.getElementById('toggle-pass');
const togglePassIcon  = document.getElementById('toggle-pass-icon');
const togglePass2Btn  = document.getElementById('toggle-pass2');
const togglePass2Icon = document.getElementById('toggle-pass2-icon');
const btnSignup       = document.querySelector('.btn-signup');
const btnSignupText   = document.getElementById('btn-signup-text');
const roleInputs      = document.querySelectorAll('.role-radio');

// ── Utilidades ──────────────────────────────────────────────
function ocultarMensajes() {
  errorBox.hidden = true;
  successBox.hidden = true;
}

function mostrarError(msg) {
  ocultarMensajes();
  errorText.textContent = msg;
  errorBox.hidden = false;
  errorBox.style.animation = 'none';
  void errorBox.offsetWidth;
  errorBox.style.animation = '';
  errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function mostrarExito(msg) {
  ocultarMensajes();
  successText.textContent = msg;
  successBox.hidden = false;
  successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setLoading(isLoading) {
  btnSignup.disabled = isLoading;
  btnSignupText.textContent = isLoading ? 'Creando cuenta…' : 'Crear Cuenta';
  btnSignup.style.opacity = isLoading ? '0.75' : '1';
}

// ── Mostrar / ocultar contraseña (ambos campos) ──────────────
function setupPasswordToggle(btn, input, icon) {
  btn.addEventListener('click', () => {
    const visible = input.type === 'text';
    input.type = visible ? 'password' : 'text';
    icon.textContent = visible ? 'visibility' : 'visibility_off';
    btn.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
    input.focus();
  });
}

setupPasswordToggle(togglePassBtn, passInput, togglePassIcon);
setupPasswordToggle(togglePass2Btn, pass2Input, togglePass2Icon);

// ── Preview de archivo subido ────────────────────────────────
cedulaFileInput.addEventListener('change', () => {
  const file = cedulaFileInput.files[0];
  if (!file) {
    cedulaPreview.hidden = true;
    cedulaPreview.innerHTML = '';
    return;
  }

  // Validar tipo y tamaño
  const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10 MB

  if (!allowedTypes.includes(file.type)) {
    mostrarError('Formato no permitido. Use PDF, PNG, JPG o WEBP.');
    cedulaFileInput.value = '';
    return;
  }

  if (file.size > maxSize) {
    mostrarError('El archivo supera los 10 MB permitidos.');
    cedulaFileInput.value = '';
    return;
  }

  ocultarMensajes();

  const isImage = file.type.startsWith('image/');
  const icon = isImage ? 'image' : 'picture_as_pdf';

  cedulaPreview.innerHTML = `
    <span class="material-symbols-outlined file-preview-icon" aria-hidden="true">${icon}</span>
    <span class="file-preview-name">${file.name}</span>
    <button type="button" class="file-preview-remove" aria-label="Eliminar archivo">
      <span class="material-symbols-outlined">close</span>
    </button>
  `;
  cedulaPreview.hidden = false;

  // Botón eliminar
  cedulaPreview.querySelector('.file-preview-remove').addEventListener('click', (e) => {
    e.stopPropagation();
    cedulaFileInput.value = '';
    cedulaPreview.hidden = true;
    cedulaPreview.innerHTML = '';
  });
});

// ── Ocultar error al interactuar ────────────────────────────
const allInputs = [nombreInput, usuarioInput, emailInput, cedulaInput, cedulaFileInput, passInput, pass2Input];
allInputs.forEach(input => input.addEventListener('input', ocultarMensajes));
roleInputs.forEach(r => r.addEventListener('change', ocultarMensajes));

// ── Limpiar campos al cambiar rol ───────────────────────────
roleInputs.forEach(radio => {
  radio.addEventListener('change', () => {
    // Solo limpiamos campos que dependen del rol (opcional, aquí no limpiamos todo)
    // usuarioInput.value = '';
    // passInput.value = '';
    // pass2Input.value = '';
    // nombreInput.focus();
  });
});

// ── Validaciones ────────────────────────────────────────────
function validarEmailInstitucional(email) {
  // Dominios institucionales típicos - ajustar según necesidad
  const dominiosPermitidos = [
    '.edu', '.edu.co', '.edu.mx', '.edu.ar', '.edu.pe', '.edu.cl',
    '.ac.', '.gob.', '.gov.', 'institucion.edu'
  ];
  return dominiosPermitidos.some(d => email.toLowerCase().includes(d));
}

function validarFormulario() {
  const rol = document.querySelector('.role-radio:checked')?.value;
  const nombre = nombreInput.value.trim();
  const usuario = usuarioInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const cedula = cedulaInput.value.trim();
  const cedulaFile = cedulaFileInput.files[0];
  const pass = passInput.value;
  const pass2 = pass2Input.value;

  if (!rol) {
    mostrarError('Selecciona tu tipo de acceso para continuar.');
    return false;
  }

  if (!nombre) {
    mostrarError('Por favor, ingresa tus nombres y apellidos.');
    nombreInput.focus();
    return false;
  }

  if (nombre.length < 3) {
    mostrarError('El nombre debe tener al menos 3 caracteres.');
    nombreInput.focus();
    return false;
  }

  if (!usuario) {
    mostrarError('Por favor, ingresa un nombre de usuario.');
    usuarioInput.focus();
    return false;
  }

  if (usuario.length < 3) {
    mostrarError('El nombre de usuario debe tener al menos 3 caracteres.');
    usuarioInput.focus();
    return false;
  }

  if (!/^[a-zA-Z0-9._-]+$/.test(usuario)) {
    mostrarError('El usuario solo puede contener letras, números, punto, guión y guión bajo.');
    usuarioInput.focus();
    return false;
  }

  if (!email) {
    mostrarError('Por favor, ingresa tu correo institucional.');
    emailInput.focus();
    return false;
  }

  if (!validarEmailInstitucional(email)) {
    mostrarError('El correo debe ser de un dominio institucional (.edu, .ac, .gob, etc.).');
    emailInput.focus();
    return false;
  }

  if (!cedula) {
    mostrarError('Por favor, ingresa tu número de cédula o tarjeta de identidad.');
    cedulaInput.focus();
    return false;
  }

  if (!cedulaFile) {
    mostrarError('Debes subir una foto o PDF de tu tarjeta de identidad.');
    cedulaFileInput.focus();
    return false;
  }

  if (!pass) {
    mostrarError('Por favor, ingresa una contraseña.');
    passInput.focus();
    return false;
  }

  if (pass.length < 8) {
    mostrarError('La contraseña debe tener al menos 8 caracteres.');
    passInput.focus();
    return false;
  }

  if (pass !== pass2) {
    mostrarError('Las contraseñas no coinciden.');
    pass2Input.focus();
    return false;
  }

  return { rol, nombre, usuario, email, cedula, cedulaFile, pass };
}

// ── Envío del formulario ────────────────────────────────────
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  ocultarMensajes();

  // 1. Tus validaciones locales de JS
  const datosValidos = validarFormulario(); 
  if (!datosValidos) return;

  setLoading(true);
  
  try {

    const formData = new FormData(form);

    const respuesta = await fetch(form.action, {
      method: form.method,
      body: formData // Envía texto, radios y archivos automáticamente
    });

    const resultado = await respuesta.json();

    if (resultado.status === 'success') {
      mostrarExito('¡Cuenta creada correctamente! Redirigiendo al inicio de sesión…');
      setLoading(false);

      setTimeout(() => {
        window.location.href = '../login/login.php';
      }, 2000);
    } else {
      setLoading(false);
      mostrarError(resultado.message || 'Error al registrar la cuenta.');
    }

  } catch (err) {
    setLoading(false);
    mostrarError('Error de red o servidor. Inténtalo de nuevo.');
    console.error(err);
  }
});