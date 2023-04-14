// Ativar notificações
const btn = document.getElementById('btn');

// Notificações Personalizadas
const btnCustom = document.getElementById('btnNotification');
const title = document.getElementById('title');
const message = document.getElementById('message');
const icon = document.getElementById('icon');
const image = document.getElementById('image');

// VapidKey
const publicVapidKey = 'BOYe4oxkSDVXnmoIsUcLGqZf-oSJsAglHs2E6Lmjy0uQ7PWqtt-yGR3059OdvabiCHzI4VDP4gjLVi8hWSxv2IA';

// Send push notification
navigator.serviceWorker.register('sw.js', { scope: '/' })
  .then(async registration => {
    // Ativa notificações
    btn.addEventListener('click', () => {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          registration.showNotification('Notificações ativa', {
            body: 'Você receberá notificações quando sair da pagina ou fechar a pagina.',
          });
        } else {
          console.log('Permission denied');
        }
      })
    });

    // Envia notificação quando a pagina sai do foco
    let notification;
    let interval;
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        const leave = new Date();
        interval = setInterval(() => {
          notification = registration.showNotification('Saiu da pagina', {
            body: `Você está fora da pagina a ${Math.round((new Date() - leave) / 1000)} segundos. Volte logo!`,
            tag: 'leave',
          });
        }, 100);
      } else {
        if (interval) clearInterval(interval);
        registration.getNotifications({ tag: 'leave' }).then(notifications => {
          notifications.forEach(notification => notification.close());
        });
      }
    });

    // Envia notificação personalizada
    btnCustom.addEventListener('click', event => {
      event.preventDefault();
      registration.showNotification(title.value, {
        body: message.value,
        icon: icon.value,
        image: image.value,
      });
    });

    // Registra o service worker
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    // Envia a subscription para o backend
    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'content-type': 'application/json',
      },
    });
  });

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
