const VALID_CODE = 'HDM-2026-MOMO';

// Gera corações flutuantes em um container
function spawnHearts(containerId) {
  const bg = document.getElementById(containerId);
  if (!bg) return;
  const symbols = ['♥', '♡', '❤', '♡', '♥'];
  for (let i = 0; i < 14; i++) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = symbols[i % symbols.length];
    h.style.left             = (Math.random() * 88 + 4) + '%';
    h.style.bottom           = '0px';
    h.style.fontSize         = (11 + Math.random() * 12) + 'px';
    h.style.animationDelay    = (Math.random() * 5) + 's';
    h.style.animationDuration = (4 + Math.random() * 4) + 's';
    bg.appendChild(h);
  }
}

spawnHearts('heartsBg');
spawnHearts('heartsBg2');

// Mostra o fallback do Spotify se a imagem não carregar
const spotifyImg = document.getElementById('spotifyImg');
const fallback   = document.getElementById('spotify-fallback');
if (spotifyImg) {
  spotifyImg.addEventListener('error', function () {
    spotifyImg.classList.add('hidden');
    fallback.classList.remove('hidden');
  });
}

// Máscara do input: HDM-2026-MOMO → 3 letras + hífen + 4 números + hífen + 4 letras
// Padrão: LLL-DDDD-LLLL  (L = letra, D = dígito)
const MASK_PATTERN = [
  { type: 'alpha', max: 3 },
  { type: 'sep' },
  { type: 'digit', max: 4 },
  { type: 'sep' },
  { type: 'alpha', max: 4 },
];

function applyMask(raw) {
  // Remove tudo que não for letra ou número, e converte para maiúsculas
  const clean = raw.replace(/[^A-Z0-9]/g, '').toUpperCase();
  let result = '';
  let ci = 0; // índice em clean

  for (const seg of MASK_PATTERN) {
    if (ci >= clean.length) break;

    if (seg.type === 'sep') {
      if (ci > 0) result += '-';
      continue;
    }

    let count = 0;
    while (count < seg.max && ci < clean.length) {
      const ch = clean[ci];
      if (seg.type === 'alpha' && /[A-Z]/.test(ch)) {
        result += ch;
        count++;
      } else if (seg.type === 'digit' && /[0-9]/.test(ch)) {
        result += ch;
        count++;
      }
      ci++;
    }
  }

  return result;
}

const input = document.getElementById('codeInput');

input.addEventListener('input', function (e) {
  const pos   = this.selectionStart;
  const raw   = this.value.toUpperCase();
  const masked = applyMask(raw);
  this.value  = masked;

  // Reposiciona o cursor de forma razoável
  const diff = masked.length - raw.length;
  this.setSelectionRange(pos + diff, pos + diff);
});

// Impede colagem de caracteres inválidos
input.addEventListener('paste', function (e) {
  e.preventDefault();
  const pasted = (e.clipboardData || window.clipboardData).getData('text');
  const masked = applyMask(pasted.toUpperCase());
  this.value   = masked;
});

// Troca de telas com fade
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById(id);
  target.classList.remove('hidden');
}

// Submissão
function handleSubmit() {
  const value = input.value.trim();
  const msg   = document.getElementById('msg');

  msg.className   = 'msg';
  msg.textContent = '';

  if (!value) {
    msg.className   = 'msg err';
    msg.textContent = 'Por favor, insira o código de acesso.';
    input.focus();
    return;
  }

  if (value === VALID_CODE) {
    msg.className   = 'msg ok';
    msg.textContent = '♥ Acesso concedido!';
    setTimeout(() => showScreen('screen-spotify'), 700);
  } else {
    msg.className   = 'msg err';
    msg.textContent = 'Código incorreto. Tente novamente.';
    input.select();
  }
}

document.getElementById('submitBtn').addEventListener('click', handleSubmit);
input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSubmit(); });