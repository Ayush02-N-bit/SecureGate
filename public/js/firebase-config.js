var firebaseConfig = {
  apiKey: "AIzaSyDdP73aGpqEkZLlDhVdP9vWuJ857mBua6Y",
  authDomain: "gate-c4303.firebaseapp.com",
  projectId: "gate-c4303",
  storageBucket: "gate-c4303.firebasestorage.app",
  messagingSenderId: "815086686814",
  appId: "1:815086686814:web:9fc534bb5ca178c1dddacf"
};
if (typeof firebase === 'undefined') {
  console.error('Firebase is not loaded! Make sure firebase-app.js is loaded before firebase-config.js');
} else if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}