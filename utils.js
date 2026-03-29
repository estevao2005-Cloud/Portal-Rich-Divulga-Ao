// utils.js - Funções auxiliares do Portal Rich

function copiarLink() {
  const titulo = document.getElementById('titulo-detalhe').innerText;
  const artista = document.getElementById('artista-detalhe').innerText;
  const urlAtual = window.location.href;
  const textoParaCopiar = `🎵 ${artista} - ${titulo}\n🎧 Ouça no Portal Rich Divulga\n🔗 ${urlAtual}`;
  navigator.clipboard.writeText(textoParaCopiar).then(() => {
    const toast = document.getElementById('copy-toast');
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 2000);
    } else {
      alert("Link copiado!");
    }
  }).catch(() => {
    alert("Não foi possível copiar. Copie manualmente: " + textoParaCopiar);
  });
}

function falarNoZap() {
  // Substitua pelo seu número de WhatsApp (código do país + número, sem +)
  const numeroWhatsApp = "244900000000"; // ALTERE AQUI
  const mensagem = encodeURIComponent("Olá! Quero divulgar minha música no Portal Rich Divulga 🎵");
  window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, '_blank');
}