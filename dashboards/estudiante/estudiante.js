document.addEventListener('DOMContentLoaded', () => {
  setGreeting();
  setDate();
});

function setGreeting() {
  const el = document.getElementById('greetingTime');
  if (!el) return;

  const hour = new Date().getHours();
  let text = 'Buenas noches';
  if (hour >= 5 && hour < 12) text = 'Buenos días';
  else if (hour >= 12 && hour < 19) text = 'Buenas tardes';

  el.textContent = text;
}

function setDate() {
  const el = document.getElementById('currentDate');
  if (!el) return;

  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let txt = new Date().toLocaleDateString('es-ES', opts);
  el.textContent = txt.charAt(0).toUpperCase() + txt.slice(1);
}