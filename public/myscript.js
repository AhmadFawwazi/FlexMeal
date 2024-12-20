// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVjNAD2oLnZRlazlKiB5ebwXAzwDsn-bY",
  authDomain: "auth-flexmeal.firebaseapp.com",
  databaseURL: "https://auth-flexmeal-default-rtdb.firebaseio.com",
  projectId: "auth-flexmeal",
  storageBucket: "auth-flexmeal.firebasestorage.app",
  messagingSenderId: "993494188943",
  appId: "1:993494188943:web:c6a8e23ae4ffefd40ac1fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Debug log Firebase initialization
console.log("Firebase telah diinisialisasi.");

// Sign Up button event listener
document.getElementById("button_signup").addEventListener("click", async (e) => {
  e.preventDefault(); // Prevent form reload

  // Get input values
  const name = document.getElementById("name").value;
  const nohp = document.getElementById("nohp").value;
  const emailSignup = document.getElementById("email_signup").value;
  const passwordSignup = document.getElementById("psw_signup").value;

  // Validate inputs
  if (!name || !nohp || !emailSignup || !passwordSignup) {
    alert("Harap isi semua kolom!");
    return;
  }

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, emailSignup, passwordSignup);
    const user = userCredential.user;

    // Save user data in Realtime Database
    await set(ref(database, "users/" + user.uid), {
      name: name,
      nohp: nohp,
      email: emailSignup
    });

    alert("Pengguna berhasil ditambahkan.");
    console.log("Sign up berhasil:", user);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("Email sudah terdaftar. Gunakan email lain.");
    } else {
      console.error("Error saat Sign Up:", error);
      alert("Error: " + error.message);
    }
  }
});

// Inisialisasi variabel buttonSignin
let buttonSignin = document.getElementById("button_signin");

// Sign In button event listener
buttonSignin.addEventListener("click", async (e) => {
  e.preventDefault(); // Mencegah pengiriman form secara default
  let emailSignin = document.getElementById("email_signin").value;
  let passwordSignin = document.getElementById("psw_signin").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, emailSignin, passwordSignin);
    const user = userCredential.user;

    let lgDate = new Date();
    await update(ref(database, "users/" + user.uid), {
      last_login: lgDate
    });

    console.log("User berhasil login:", user);
    location.href = "flexmeal/homepage.html"; // Redirect ke halaman utama
  } catch (error) {
    console.error("Error saat Sign In:", error);
    alert(error.message);
  }
});

// Debugging tambahan untuk log status pengguna
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Pengguna saat ini:", user);
  } else {
    console.log("Tidak ada pengguna yang sedang login.");
  }
});
