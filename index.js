// Import dependencies
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

// App instance
const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'src')));

// Body Parser Middleware
app.use(bodyParser.json());

// Vapid keys
const publicVapidKey = 'BOYe4oxkSDVXnmoIsUcLGqZf-oSJsAglHs2E6Lmjy0uQ7PWqtt-yGR3059OdvabiCHzI4VDP4gjLVi8hWSxv2IA';
const privateVapidKey = 'GGZbc42PxXaT_rsBphSnurg6vUjSXZSEYc7_mMihN3U';

webpush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: 'Backend Notifcation', message: 'Notified by backend push' });

  // Pass object into sendNotification
  setTimeout(() => {
    webpush.sendNotification(subscription, payload)
      .catch(err => console.error(err));
  }, 5000);
});

// Set port
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
