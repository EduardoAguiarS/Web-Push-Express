console.log('Service Worker Loaded...');

self.addEventListener('push', event => {
  const body = event.data?.text() ?? 'no payload';

  event.waitUntil(
    self.registration.showNotification('Hello world!', {
      body,
    })
  );
});