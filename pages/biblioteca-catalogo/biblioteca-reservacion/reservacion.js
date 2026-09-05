/* ================================================================
   reservacion.js — Formulario de Reservación
   AppJoteca v2.0
   ================================================================ */

   (function () {
    'use strict';

    var form = document.getElementById('reservation-form');
    var reasonInput = document.getElementById('reason');
    var dateInput = document.getElementById('return-date');
    var messageBox = document.getElementById('message');
    var cancelBtn = document.getElementById('cancel-btn');

    if (!form || !dateInput) return;

    // ── Fechas límite ──
    var today = new Date();
    var maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);

    dateInput.min = formatDate(today);
    dateInput.max = formatDate(maxDate);

    function formatDate(date) {
        var y = date.getFullYear();
        var m = String(date.getMonth() + 1).padStart(2, '0');
        var d = String(date.getDate()).padStart(2, '0');
        return y + '-' + m + '-' + d;
    }

    function showMessage(text, type) {
        messageBox.textContent = text;
        messageBox.className = 'message ' + type;
    }

    function hideMessage() {
        messageBox.className = 'message';
        messageBox.textContent = '';
    }

    // ── Submit ──
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        hideMessage();

        var returnDate = dateInput.value;
        if (!returnDate) {
            showMessage('Por favor selecciona una fecha de devolución.', 'error');
            return;
        }

        var reservation = {
            reason: reasonInput.value.trim(),
            returnDate: returnDate
        };

        console.log('Reservación:', reservation);
        showMessage('Reservación enviada correctamente.', 'success');
        form.reset();
    });

    // ── Cancelar ──
    cancelBtn.addEventListener('click', function () {
        form.reset();
        hideMessage();
    });
})();