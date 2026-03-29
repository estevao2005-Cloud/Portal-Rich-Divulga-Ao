 /**
 * PORTAL RICH - Sistema de Temas e UI
 */

function alternarTema() {
    const body = document.body;
    const botaoTema = document.querySelector('.header-icons .icon-btn');
    
    // Alterna a classe no body
    body.classList.toggle('light-mode');
    
    // Salva a preferência do utilizador no navegador
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('tema-portal', isLight ? 'claro' : 'escuro');

    // Atualiza o ícone visualmente
    if (isLight) {
        botaoTema.innerText = '☀️';
    } else {
        botaoTema.innerText = '🌓';
    }
}

// Lógica para carregar o tema guardado assim que a página abre
document.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('tema-portal');
    const body = document.body;
    const botaoTema = document.querySelector('.header-icons .icon-btn');

    if (temaGuardado === 'claro') {
        body.classList.add('light-mode');
        if (botaoTema) botaoTema.innerText = '☀️';
    }
});

// Efeito de vibração ao clicar nos botões do menu (Haptic Feedback)
const botoesMenu = document.querySelectorAll('.bottom-nav button');
botoesMenu.forEach(btn => {
    btn.addEventListener('click', () => {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(10); // Vibração curta de 10ms
        }
    });
});