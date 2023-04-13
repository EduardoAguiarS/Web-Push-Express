// Ativar notificações
const btn = document.getElementById('btn');

// Notificações Personalizadas
const btnCustom = document.getElementById('btnNotification');
const title = document.getElementById('title');
const message = document.getElementById('message');
const icon = document.getElementById('icon');

// Verifica se o navegador suporta notificações
btn.addEventListener('click', () => {
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {
      const notification = new Notification('Notificações Ativa', {
        body: 'Você receberá notificações',
      });
    } else {
      console.log('Permission denied');
    }
  });
});

// Envia notificação quando a pagina sai do foco
let notification;
let interval
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    const leave = new Date()
    interval = setInterval(() => {
      notification = new Notification('Saiu da pagina', {
        body: `Você está fora da pagina a ${Math.round((new Date() - leave) / 1000)} segundos. Volte logo!`,
        tag: 'leave',
      });
    }, 100);

  } else {
    if (interval) clearInterval(interval)
    if (notification) notification.close()
  }
});

// Envia notificação quando a pagina é fechada
window.onbeforeunload = () => {
  notification = new Notification('Fechou a pagina', {
    body: 'Volte logo!',
  });
};

// Envia notificação quando a pagina é carregada
window.onload = () => {
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {
      const notification = new Notification('Bem vindo de volta!', {
        body: 'Que bom que voltou!',
      });
    } else {
      console.log('Permission denied');
    }
  });
};

// Envia notificação personalizada
btnCustom.addEventListener('click', event => {
  event.preventDefault();
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {
      const notification = new Notification(title.value, {
        body: message.value,
        icon: icon.value,
      });
    } else {
      console.log('Permission denied');
    }
  });
});