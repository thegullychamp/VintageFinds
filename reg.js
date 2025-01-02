// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxbtX6QaHRN8Wog2-LM3LwR77ycnveIkI",
  authDomain: "thrift-site.firebaseapp.com",
  projectId: "thrift-site",
  storageBucket: "thrift-site.firebasestorage.app",
  messagingSenderId: "911936025348",
  appId: "1:911936025348:web:30ddcaff43d2cfd16c1651",
  measurementId: "G-0Y47FZH941"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const analytics = getAnalytics(app);


const submit=document.getElementById('submit');
submit.addEventListener("click",function(event){
  event.preventDefault()
  const email=document.getElementById('email').value;
  const password=document.getElementById('password').value;

   createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    window.location.href="home.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
  

})
