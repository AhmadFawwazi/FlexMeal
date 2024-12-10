// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVjNAD2oLnZRlazlKiB5ebwXAzwDsn-bY",
  authDomain: "auth-flexmeal.firebaseapp.com",
  projectId: "auth-flexmeal",
  storageBucket: "auth-flexmeal.firebasestorage.app",
  messagingSenderId: "993494188943",
  appId: "1:993494188943:web:c6a8e23ae4ffefd40ac1fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

let buttonSignup = document.getElementById("button_signup");
let buttonSignin = document.getElementById("button_signin");

buttonSignup.addEventListener("click", (e) => {
    let name = document.getElementById("name").value;
    let nohp = document.getElementById("nohp").value;
    let emailSignup = document.getElementById("email_signup").value;
    let passwordSignup = document.getElementById("psw_signup").value;

  createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    set(ref(database, "users/" + user.uid), {
      name: name,
      nohp: nohp,
      email: emailSignup,
      password: passwordSignup
    });
    // ...
  })
  .then(()=>{
    alert("User Telah Ditambahkan");
  })
  .catch((error)=>{
    alert(error);
  })
  .catch((error)=>{
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    // ..
});