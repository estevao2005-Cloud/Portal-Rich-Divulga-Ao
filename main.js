// ========== CONFIGURAÇÃO DO FIREBASE ==========
const firebaseConfig = {
    apiKey: "AIzaSyCBZ4yTbDv-vwL4rdKCF39NVI8WzLW1Yzc",
    authDomain: "portal-rich-divulga-angola.firebaseapp.com",
    databaseURL: "https://portal-rich-divulga-angola-default-rtdb.firebaseio.com",
    projectId: "portal-rich-divulga-angola",
    storageBucket: "portal-rich-divulga-angola.firebasestorage.app",
    messagingSenderId: "410802724742",
    appId: "1:410802724742:web:97452059340f10d71f1607",
    measurementId: "G-JW522BHFBT"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ========== VARIÁVEIS GLOBAIS ==========
let musicasData = [];
let destaquesData = [];

// ========== CARREGAR DADOS DO FIREBASE ==========
function carregarMusicasFirebase() {
    db.ref('musicas').on('value', snapshot => {
        musicasData = [];
        snapshot.forEach(child => {
            musicasData.push(child.val());
        });
        carregarFeed();
    });
}

function carregarDestaquesFirebase() {
    db.ref('destaques').on('value', snapshot => {
        destaquesData = [];
        snapshot.forEach(child => {
            destaquesData.push(child.val());
        });
        renderizarDestaques();
    });
}

// ========== FUNÇÕES DO PORTAL ==========
function carregarFeed() {
    const feed = document.getElementById('portal-feed');
    if (!feed) return;
    feed.innerHTML = "";
    
    musicasData.forEach(m => {
        const card = document.createElement('article');
        card.className = m.destaque ? "post-card destaque-semana" : "post-card";
        card.innerHTML = `
            ${m.destaque ? '<span class="badge-destaque">⭐ NOVIDADE</span>' : ''}
            <img src="${m.capa}" alt="Capa" onclick="abrirMusica('${m.titulo.replace(/'/g, "\\'")}', '${m.artista.replace(/'/g, "\\'")}', '${m.capa}', '${m.arquivo}')">
            <div class="info" onclick="abrirMusica('${m.titulo.replace(/'/g, "\\'")}', '${m.artista.replace(/'/g, "\\'")}', '${m.capa}', '${m.arquivo}')">
                <h3>${m.artista} - ${m.titulo}</h3>
                <small>Portal Rich Divulga</small>
            </div>
        `;
        feed.appendChild(card);
    });
}

function renderizarDestaques() {
    const container = document.getElementById('featured-scroll');
    if (!container) return;
    container.innerHTML = '';
    destaquesData.forEach(d => {
        const card = document.createElement('div');
        card.className = "featured-card";
        card.onclick = () => abrirVideo(d.id);
        card.innerHTML = `
            <img src="https://img.youtube.com/vi/${d.id}/mqdefault.jpg" alt="${d.titulo}">
            <h4>${d.titulo}</h4>
            <small>${d.artista}</small>
        `;
        container.appendChild(card);
    });
}

function abrirMusica(titulo, artista, capa, arquivo) {
    document.getElementById('titulo-detalhe').innerText = titulo;
    document.getElementById('artista-detalhe').innerText = artista;
    document.getElementById('capa-detalhe').src = capa;
    
    const btnDown = document.querySelector('.btn-download');
    if (btnDown) {
        btnDown.onclick = (e) => {
            e.preventDefault();
            window.location.href = `download.html?file=${encodeURIComponent(arquivo)}&name=${encodeURIComponent(titulo)}`;
        };
    }
    
    const player = document.getElementById('main-audio');
    player.src = arquivo;
    
    document.getElementById('p-titulo').innerText = titulo;
    document.getElementById('p-artista').innerText = artista;
    document.getElementById('player-bar').classList.remove('hidden');
    
    mostrarSecao('detalhes-musica');
}

function mostrarSecao(id) {
    document.querySelectorAll('.conteudo').forEach(s => s.classList.add('hidden'));
    const secao = document.getElementById(id);
    if (secao) secao.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function filtrar() {
    const termo = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.post-card');
    cards.forEach(card => {
        const texto = card.innerText.toLowerCase();
        card.style.display = texto.includes(termo) ? "block" : "none";
    });
}

function togglePlay() {
    const audio = document.getElementById('main-audio');
    const btn = document.getElementById('play-btn');
    if (audio.paused) {
        audio.play();
        btn.innerText = '⏸';
    } else {
        audio.pause();
        btn.innerText = "▶";
    }
}

function abrirVideo(videoId) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('youtubeIframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.style.display = "flex";
}

function fecharModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('youtubeIframe');
    iframe.src = "";
    modal.style.display = "none";
}

// ========== TEMA (CLARO/ESCURO) ==========
function alternarTema() {
    const body = document.body;
    const botaoTema = document.querySelector('.header-icons .icon-btn');
    
    body.classList.toggle('light-mode');
    
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('tema-portal', isLight ? 'claro' : 'escuro');
    
    if (botaoTema) {
        botaoTema.innerText = isLight ? '☀️' : '🌓';
    }
}

// ========== EFEITO DE VIBRAÇÃO (HAPTIC FEEDBACK) ==========
function aplicarVibracao() {
    const botoesMenu = document.querySelectorAll('.bottom-nav button');
    botoesMenu.forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.navigator.vibrate) {
                window.navigator.vibrate(10);
            }
        });
    });
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    carregarMusicasFirebase();
    carregarDestaquesFirebase();
    
    document.getElementById('inicio').classList.remove('hidden');
    document.getElementById('resultados-pesquisa')?.classList.add('hidden');
    document.getElementById('destaques-section')?.classList.remove('hidden');
    
    const temaGuardado = localStorage.getItem('tema-portal');
    const body = document.body;
    const botaoTema = document.querySelector('.header-icons .icon-btn');
    if (temaGuardado === 'claro') {
        body.classList.add('light-mode');
        if (botaoTema) botaoTema.innerText = '☀️';
    } else {
        if (botaoTema) botaoTema.innerText = '🌓';
    }
    
    aplicarVibracao();
});
