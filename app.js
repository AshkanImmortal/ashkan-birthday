const config = window.INVITE_CONFIG;
const yes = document.querySelector('#yes');
const no = document.querySelector('#no');
const caption = document.querySelector('#runaway-caption');
const arena = document.querySelector('#button-arena');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let escapes = 0;
let previous = { x: 0, y: 0 };
let lastEscape = 0;

function dodge(event) {
  event?.preventDefault();
  if (performance.now() - lastEscape < 200) return;
  lastEscape = performance.now();
  const base = no.getBoundingClientRect();
  const origin = { left: base.left - previous.x, top: base.top - previous.y };
  const yesRect = yes.getBoundingClientRect();
  const area = arena.getBoundingClientRect();
  const width = document.documentElement.clientWidth;
  // Choose among safe locations beside or below the yes button, never on top of it.
  const candidates = [
    { x: 16 - origin.left, y: area.bottom + 10 - origin.top },
    { x: width - base.width - 16 - origin.left, y: area.bottom + 10 - origin.top },
    { x: 16 - origin.left, y: area.top - base.height - 10 - origin.top },
    { x: width - base.width - 16 - origin.left, y: area.top - base.height - 10 - origin.top },
  ].filter(p => {
    const left = origin.left + p.x, top = origin.top + p.y;
    return top > 10 && top + base.height < innerHeight - 10 &&
      (left + base.width < yesRect.left - 8 || left > yesRect.right + 8 || top > yesRect.bottom + 8 || top + base.height < yesRect.top - 8);
  });
  const far = candidates.filter(p => Math.hypot(p.x - previous.x, p.y - previous.y) > 70);
  const options = far.length ? far : candidates;
  if (options.length) {
    previous = options[Math.floor(Math.random() * options.length)];
    no.style.transform = `translate(${previous.x}px, ${previous.y}px) rotate(${escapes % 2 ? -7 : 7}deg)`;
  }
  caption.textContent = ['کجا؟', 'اشتباه زدی فکر کنم', 'باشه، حالا بزن میام'][Math.min(escapes++, 2)];
}
no.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') dodge(event); });
no.addEventListener('pointerdown', dodge);
no.addEventListener('click', dodge);
addEventListener('resize', () => { previous = { x: 0, y: 0 }; no.style.transform = ''; });

function celebrate() {
  if (reducedMotion) return;
  for (let i = 0; i < 32; i++) {
    const bit = document.createElement('span');
    bit.className = 'confetti';
    bit.style.left = `${Math.random() * 100}%`;
    bit.style.background = ['#ab2535', '#dfa99a', '#c5a56a'][i % 3];
    bit.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
    bit.style.animationDelay = `${Math.random() * .25}s`;
    document.body.append(bit);
    setTimeout(() => bit.remove(), 2000);
  }
}
yes.addEventListener('click', () => {
  const container = document.querySelector('#form-container');
  if (!container.childElementCount) {
    if (config.formUrl) {
      const frame = document.createElement('iframe');
      const url = new URL(config.formUrl);
      url.searchParams.set('embedded', 'true');
      frame.src = url.href;
      frame.title = 'فرم تأیید حضور در تولد اشکان';
      container.append(frame);
      document.querySelector('#form-external').href = config.formUrl;
    } else {
      container.textContent = 'فرم تأیید حضور به‌زودی اینجا قرار می‌گیرد.';
      document.querySelector('#form-external').hidden = true;
    }
  }
  document.querySelector('#rsvp-dialog').showModal();
  celebrate();
});
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
}));
document.querySelector('#show-map').addEventListener('click', () => {
  const container = document.querySelector('#map-container');
  if (!container.childElementCount) {
    const frame = document.createElement('iframe');
    frame.src = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3381.7648848759786!2d51.39855307594902!3d35.74101397256836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDQ0JzI3LjciTiA1McKwMjQnMDQuMSJF!5e1!3m2!1sen!2s!4v1794057977785!5m2!1sen!2s';
    frame.title = 'نقشه‌ی محل مهمانی';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allowFullscreen = true;
    container.append(frame);
  }
  document.querySelector('#map-dialog').showModal();
});
