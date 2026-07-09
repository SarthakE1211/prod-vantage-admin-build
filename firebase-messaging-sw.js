importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDZhcL2KXaZj82F1PIez7K_xVOxXYMu--Y",
  authDomain: "ovation-wps.firebaseapp.com",
  projectId: "ovation-wps",
  storageBucket: "ovation-wps.firebasestorage.app",
  messagingSenderId: "737208307742",
  appId: "1:737208307742:web:d74aaf64ef3e0071fe9e0f",
  measurementId: "G-D4PQCLYGE7"
});

const messaging = firebase.messaging();
if ("serviceWorker" in navigator) {


  navigator.serviceWorker.register("firebase-messaging-sw.js").then(function (registration) { }).catch(function (err) { console.log("error", err); });
}

messaging.onBackgroundMessage((payload) => {
  self.clients.matchAll({
    type: "window", includeUncontrolled: true
  }).then(function (clients) {
    clients.forEach(function (client) {
      client.postMessage(payload);
    });
  });
});

self.addEventListener("push", (event) => {
  const promiseChain = isClientFocused(event).then((clientIsFocused) => {

    var data = event.data.json().notification;
    var title = data.title || "No tiltle";

    self.registration.showNotification(title, {
      body: data.body,
      icon: './assets/Vantage_Logo.png',
      tag: 'Vantage',
      sound: 'default' // Ask for default system sound
    });


    self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(function (clients) {
      clients.forEach(function (client) {
        client.postMessage({
          type: 'NEW_NOTIFICATION',
          payload: data,
        });
      });
    });

    return;
  });
  event.waitUntil(promiseChain);

});

function isClientFocused(event) {
  var data = event.data.json().data;
  return clients.matchAll({ type: "window", includeUncontrolled: true, }).then((windowClients) => {
    let clientIsFocused = false;
    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      if (windowClient.focused) {
        clientIsFocused = false;
        break;
      }
    }
    return false;

  });
}