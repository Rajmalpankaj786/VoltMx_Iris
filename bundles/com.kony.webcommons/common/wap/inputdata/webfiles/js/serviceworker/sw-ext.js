var cacheid = '@cacheid@', fcmsenderid = '@fcmsenderid@';
try{
  if(fcmsenderid) {
      importScripts('https://www.gstatic.com/firebasejs/5.5.3/firebase-app.js');
      importScripts('https://www.gstatic.com/firebasejs/5.5.3/firebase-messaging.js');

      firebase.initializeApp({
        'messagingSenderId': fcmsenderid
      });

      const messaging = firebase.messaging();
      messaging.setBackgroundMessageHandler(function(payload) {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        // Customize notification here
        return self.registration.showNotification(notificationTitle,
          notificationOptions);
      });
  }
} catch(exception) {
  console.log("Push Notification is not supported for this browser");
}