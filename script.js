const VALID_CODE = 'amor123';

// Gera corações flutuantes no fundo
(function spawnHearts() {
  const bg = document.getElementById('heartsBg');
  const symbols = ['♥', '♡', '❤', '♡', '♥'];

  for (let i = 0; i < 12; i++) {
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
})();

// Submissão
function handleSubmit() {
  const input = document.getElementById('codeInput');
  const msg   = document.getElementById('msg');
  const value = input.value.trim();

  msg.className = 'msg';
  msg.textContent = '';

  if (!value) {
    msg.className = 'msg err';
    msg.textContent = 'Por favor, insira o código de acesso.';
    input.focus();
    return;
  }

  if (value === VALID_CODE) {
    msg.className = 'msg ok';
    msg.textContent = '♥ Acesso concedido! Bem-vindo(a).';
    input.value = '';
  } else {
    msg.className = 'msg err';
    msg.textContent = 'Código incorreto. Tente novamente.';
    input.select();
  }
}

// Eventos
document.getElementById('submitBtn').addEventListener('click', handleSubmit);

document.getElementById('codeInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') handleSubmit();
});
