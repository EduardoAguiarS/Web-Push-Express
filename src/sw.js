console.log('Service Worker Loaded...');

self.addEventListener('push', event => {
  const data = event.data.json();
  
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbadPFChluFcVIQHBxH4uOS-oIlFBxBZ9dJ0B8i0zHvwXJ60HrcHROqpmVmAD1RNtefuQ&usqp=CAU'
  });

  console.log(data);
});