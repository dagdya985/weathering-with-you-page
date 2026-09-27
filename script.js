const dateSelect = document.getElementById('dateSelect');
const form = document.getElementById('orderForm');
const toast = document.getElementById('toast');
const musicToggle = document.getElementById('musicToggle');
const musicPanel = document.getElementById('musicPanel');
const musicFrame = document.getElementById('musicFrame');
const menuToggle = document.getElementById('menuToggle');
const siteMenu = document.getElementById('siteMenu');

const pad = (n) => String(n).padStart(2, '0');
const start = new Date();
for (let day = 0; day < 7; day++) {
  for (const hour of [10, 12, 14, 16]) {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + day, hour);
    const value = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(hour)}:00`;
    const option = new Option(value, value);
    dateSelect.add(option);
  }
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const nickname = document.getElementById('nicknameInput').value.trim();
  const location = document.getElementById('locationInput').value.trim();
  const reason = document.getElementById('reasonInput').value.trim();
  if (!nickname || !location || !reason) {
    showToast('すべての項目を入力してください。');
    return;
  }
  showToast(`${nickname}さんの晴れのご希望をカートに入れました ☀`);
});

function setMusicOpen(open) {
  musicPanel.hidden = !open;
  musicToggle.setAttribute('aria-expanded', String(open));
  if (open) {
    if (!musicFrame.firstChild) {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/EQ94zflNqn4?autoplay=1&rel=0';
      iframe.title = 'RADWIMPS「愛にできることはまだあるかい」Music Video';
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      musicFrame.appendChild(iframe);
    }
  } else {
    musicFrame.replaceChildren();
  }
}

musicToggle.addEventListener('click', () => setMusicOpen(musicPanel.hidden));
document.getElementById('closeMusic').addEventListener('click', () => setMusicOpen(false));
document.getElementById('menuMusicLink').addEventListener('click', (event) => {
  event.preventDefault();
  siteMenu.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  setMusicOpen(true);
});
menuToggle.addEventListener('click', () => {
  siteMenu.hidden = !siteMenu.hidden;
  menuToggle.setAttribute('aria-expanded', String(!siteMenu.hidden));
});
siteMenu.querySelector('a[href="#order"]').addEventListener('click', () => {
  siteMenu.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
});
