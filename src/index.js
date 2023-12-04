import './styles.css';
import { 
  hideLoginError, 
  showLoginState, 
  showLoginForm, 
  showApp, 
  showLoginError, 
  btnLogin,
  btnSignup,
  btnLogout,
  showDeleteConfirmation
  
} from './ui'

import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";



import { 
  getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator,
  deleteUser,
  
  //sendEmailVerification
} from 'firebase/auth';




const firebaseApp = initializeApp({
  apiKey: "AIzaSyA0K_py-j72t7FufzsJg8af3KsFR6vxmzk",
  authDomain: "login-ad25a.firebaseapp.com",
  projectId: "login-ad25a",
  storageBucket: "login-ad25a.appspot.com",
  messagingSenderId: "103410718436",
  appId: "1:103410718436:web:ee01b7e993347f4a413ef1",
  measurementId: "G-FXMKLXRC9D"
});

// Login using email/password
const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value
  const loginPassword = txtPassword.value

  // step 1: try doing this w/o error handling, and then add try/catch
  //await signInWithEmailAndPassword(auth, loginEmail, loginPassword)

  // step 2: add error handling
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      console.log(userCredential.user);
    }
    catch(error) {
      console.log(`There was an error: ${error}`)
      showLoginError(error)
    }
}

const sendEmailVerification = async () => {
  const auth = getAuth();
  if (auth.currentUser) {
    await auth.currentUser.sendEmailVerification();
    alert("Email verification link sent! Please check your email.");
  }
}


// Create new account using email/password
const createAccount = async () => {
  const email = txtEmail.value
  const password = txtPassword.value



  try {
    await createUserWithEmailAndPassword(auth, email, password)
    .then(()=> {
      sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Email verification link sent!");
      });
      alert("Account created Successfuly!")
    })
  }
  catch(error) {
    console.log(`There was an error: ${error}`)
    showLoginError(error)
  } 
}

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    //user signed in
    if (user) {
      console.log(user)
      showApp()
      showLoginState(user)

      hideLoginError()
      hideLinkError()
    }
    //user signed out
    else {
      showLoginForm()
      lblAuthState.innerHTML = `You're not logged in.`
    }
  })
}

//delete account
const deleteAccount = async () => {
  try {
    await deleteUser(auth.currentUser);
    alert("Your account has been successfully deleted.");
    showLoginForm();
  } catch (error) {
    console.error("Error deleting account:", error);
    alert("Failed to delete account. Please try again.");
  }
}

// Log out
const logout = async () => {
  await signOut(auth);
}

btnLogin.addEventListener("click", loginEmailPassword) 
btnSignup.addEventListener("click", createAccount)
btnLogout.addEventListener("click", logout)
btnDeleteAccount.addEventListener("click", () => showDeleteConfirmation(deleteAccount));

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");

monitorAuthState();