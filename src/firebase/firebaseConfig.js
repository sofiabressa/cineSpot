import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAwO5kyS4QR2OcYRaFE2b67ePgbj3sSuC0",
  authDomain: "cinespot-dc921.firebaseapp.com",
  projectId: "cinespot-dc921",
  storageBucket: "cinespot-dc921.firebasestorage.app",
  messagingSenderId: "203238658170",
  appId: "1:203238658170:web:953eefcf151a24a31debc3"
};

const app = initializeApp(firebaseConfig);

export { app };