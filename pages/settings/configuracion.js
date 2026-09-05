  document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ── Referencias ──
    const avatarInput    = document.getElementById('avatarInput');
    const avatarEditBtn  = document.getElementById('avatarEditBtn');
    const avatarImg      = document.getElementById('profileAvatarImg');

    const usernameInput  = document.getElementById('usernameInput');
    const saveUserBtn    = document.getElementById('saveUsernameBtn');
    const displayUser    = document.getElementById('displayUsername');

    const idPreview      = document.getElementById('idDocPreview');
    const idImg          = document.getElementById('idDocImage');
    const idOverlay      = document.getElementById('idDocOverlay');
    const idOverlayImg   = document.getElementById('idDocOverlayImg');
    const idOverlayClose = document.getElementById('idDocOverlayClose');
    const idChangeBtn    = document.getElementById('idDocChangeBtn');
    const idInput        = document.getElementById('idDocInput');

    const newPass        = document.getElementById('newPassword');
    const confirmPass    = document.getElementById('confirmPassword');
    const strengthBar    = document.getElementById('strengthBar');
    const strengthText   = document.getElementById('strengthText');
    const matchHint      = document.getElementById('matchHint');
    const updatePassBtn  = document.getElementById('updatePasswordBtn');

    const requestBtns    = document.querySelectorAll('[data-request]');
    const deleteBtn      = document.getElementById('deleteAccountBtn');


    // ════════════════════════════════════════════
    // 1. Cambiar foto de perfil
    // ════════════════════════════════════════════
    avatarEditBtn.addEventListener('click', () => avatarInput.click());

    avatarInput.addEventListener('change', function () {
        const file = this.files[0];
        if (!file || !file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = e => { avatarImg.src = e.target.result; };
        reader.readAsDataURL(file);
    });


    // ════════════════════════════════════════════
    // 2. Guardar nombre de usuario
    // ════════════════════════════════════════════
    saveUserBtn.addEventListener('click', function () {
        const val = usernameInput.value.trim();
        if (!val) {
            usernameInput.focus();
            return;
        }
        displayUser.textContent = val;

        // Feedback simple
        const old = this.innerHTML;
        this.innerHTML = '<span class="material-symbols-outlined">check</span> Guardado';
        this.style.background = '#4ade80';
        this.style.color = '#000';
        setTimeout(() => {
            this.innerHTML = old;
            this.style.background = '';
            this.style.color = '';
        }, 1800);
    });


    // ════════════════════════════════════════════
    // 3. Documento ID — blur, modal y overlay
    // ════════════════════════════════════════════

    // Click en la preview → SweetAlert
    idPreview.addEventListener('click', function (e) {
        if (e.target.closest('#idDocChangeBtn')) return;

        Swal.fire({
            title: '¿Visualizar documento?',
            text: '¿Estás seguro de que deseas visualizar tu foto de documento de identidad? Es información personal privada.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Visualizar',
            cancelButtonText: 'Volver',
            reverseButtons: true,
            background: '#121212',
            color: '#e2e2e2',
            iconColor: '#f2ca50',
            confirmButtonColor: '#f2ca50',
            cancelButtonColor: 'rgba(255,255,255,0.1)'
        }).then((result) => {
            if (result.isConfirmed) {
                idOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Cerrar overlay
    idOverlayClose.addEventListener('click', closeOverlay);
    idOverlay.addEventListener('click', e => { if (e.target === idOverlay) closeOverlay(); });

    function closeOverlay() {
        idOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Cambiar imagen del documento
    idChangeBtn.addEventListener('click', e => {
        e.stopPropagation();
        idInput.click();
    });

    idInput.addEventListener('change', function () {
        const file = this.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            idImg.src = e.target.result;
            idOverlayImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });


    // ════════════════════════════════════════════
    // 4. Mostrar / ocultar contraseñas
    // ════════════════════════════════════════════
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function () {
            const input = document.getElementById(this.dataset.target);
            const icon  = this.querySelector('.material-symbols-outlined');
            input.type  = input.type === 'password' ? 'text' : 'password';
            icon.textContent = input.type === 'password' ? 'visibility_off' : 'visibility';
        });
    });


    // ════════════════════════════════════════════
    // 5. Fortaleza de contraseña
    // ════════════════════════════════════════════
    newPass.addEventListener('input', function () {
        const v = this.value;
        let s = 0;
        if (v.length >= 8) s++;
        if (/[A-Z]/.test(v)) s++;
        if (/[0-9]/.test(v)) s++;
        if (/[^A-Za-z0-9]/.test(v)) s++;

        strengthBar.className = 'strength-bar';
        let label = 'Débil', color = '#ffb4ab';

        if (v.length === 0) {
            strengthBar.style.width = '0%';
            strengthText.innerHTML = 'Fortaleza: <em>Débil</em>';
            return;
        }
        if (s <= 1)       { strengthBar.classList.add('weak');   label = 'Débil';   color = '#ffb4ab'; }
        else if (s <= 3)  { strengthBar.classList.add('medium'); label = 'Media';   color = '#f2ca50'; }
        else              { strengthBar.classList.add('strong'); label = 'Fuerte';  color = '#4ade80'; }

        strengthText.innerHTML = `Fortaleza: <em style=\"color:${color}\">${label}</em>`;
    });


    // ════════════════════════════════════════════
    // 6. Coincidencia de contraseñas
    // ════════════════════════════════════════════
    confirmPass.addEventListener('input', function () {
        if (!newPass.value || !this.value) { matchHint.textContent = ''; return; }
        if (this.value === newPass.value) {
            matchHint.textContent = 'Las contraseñas coinciden';
            matchHint.style.color = '#4ade80';
        } else {
            matchHint.textContent = 'Las contraseñas no coinciden';
            matchHint.style.color = '#ffb4ab';
        }
    });


    // ════════════════════════════════════════════
    // 7. Actualizar contraseña
    // ════════════════════════════════════════════
    updatePassBtn.addEventListener('click', function () {
        const current = document.getElementById('currentPassword').value;
        const nueva   = newPass.value;
        const confir  = confirmPass.value;

        if (!current || !nueva || !confir) {
            Swal.fire({ icon: 'warning', title: 'Campos incompletos', text: 'Complete todos los campos.', background: '#121212', color: '#e2e2e2', confirmButtonColor: '#f2ca50' });
            return;
        }
        if (nueva !== confir) {
            Swal.fire({ icon: 'error', title: 'No coinciden', text: 'Las contraseñas nuevas no coinciden.', background: '#121212', color: '#e2e2e2', confirmButtonColor: '#f2ca50' });
            return;
        }
        if (nueva.length < 8) {
            Swal.fire({ icon: 'warning', title: 'Muy corta', text: 'Mínimo 8 caracteres.', background: '#121212', color: '#e2e2e2', confirmButtonColor: '#f2ca50' });
            return;
        }

        // Captura de datos para backend
        console.log('[Config] Cambio de contraseña:', { current, nueva });

        // Feedback simple
        const oldHTML = this.innerHTML;
        this.innerHTML = '<span class=\"material-symbols-outlined\">check</span> Actualizada';
        this.style.background = '#4ade80';
        this.style.color = '#000';
        setTimeout(() => {
            this.innerHTML = oldHTML;
            this.style.background = '';
            this.style.color = '';
            document.getElementById('currentPassword').value = '';
            newPass.value = '';
            confirmPass.value = '';
            strengthBar.className = 'strength-bar';
            strengthText.innerHTML = 'Fortaleza: <em>Débil</em>';
            matchHint.textContent = '';
        }, 2000);
    });


    // ════════════════════════════════════════════
    // 8. Solicitudes al bibliotecario
    // ════════════════════════════════════════════
    requestBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const old = this.innerHTML;
            this.innerHTML = '<span class=\"material-symbols-outlined\">schedule</span> Enviada';
            this.style.borderColor = '#f2ca50';
            this.style.color = '#f2ca50';
            this.disabled = true;

            console.log('[Config] Solicitud:', this.dataset.request);

            setTimeout(() => {
                this.innerHTML = old;
                this.style.borderColor = '';
                this.style.color = '';
                this.disabled = false;
            }, 2500);
        });
    });


    // ════════════════════════════════════════════
    // 9. Eliminar cuenta
    // ════════════════════════════════════════════
    deleteBtn.addEventListener('click', function () {
        Swal.fire({
            title: '¿Solicitar eliminación?',
            text: 'Esta acción enviará una solicitud de baja definitiva al administrador. ¿Está seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, solicitar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            background: '#121212',
            color: '#e2e2e2',
            iconColor: '#ffb4ab',
            confirmButtonColor: '#ffb4ab',
            cancelButtonColor: 'rgba(255,255,255,0.1)'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('[Config] Solicitud de eliminación de cuenta enviada');
                Swal.fire({ icon: 'success', title: 'Solicitud enviada', text: 'El administrador revisará su petición.', background: '#121212', color: '#e2e2e2', confirmButtonColor: '#f2ca50' });
            }
        });
    });

});