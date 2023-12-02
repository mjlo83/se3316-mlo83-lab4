import './styles.css';
import { 
  hideLoginError, 
  showLoginState, 
  showLoginForm, 
  showApp, 
  showLoginError, 
  btnLogin,
  btnSignup,
  btnLogout
} from './ui'

//import and initialize firebase
//must initialize before calling any service getter function
//converted npm paths to browser module paths

import { initializeApp, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';

//import firebase service
import {getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js'

import { 
    getAuth,
    onAuthStateChanged, 
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    connectAuthEmulator
  } from 'firebase/auth';
  
//connect to your firebase project
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCwp773348dXcI1H2EM1nVRIuGdQN2bmYA",
  authDomain: "se3316-lab4-authentication.firebaseapp.com",
  projectId: "se3316-lab4-authentication",
  storageBucket: "se3316-lab4-authentication.appspot.com",
  messagingSenderId: "345802742239",
  appId: "1:345802742239:web:453c08fc597bd3d6cb8c6a",
  measurementId: "G-43MPPBSF02"
});

//get functions
const auth = getAuth(firebaseApp);


onAuthStateChanged(auth, user =>{
    if(user != null){
        console.log('logged in!');
    } else{
        console.log ('No user')
    }
});

// Login using email/password
const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value
    const loginPassword = txtPassword.value
  
    // step 1: try doing this w/o error handling, and then add try/catch
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  
    // step 2: add error handling
    // try {
    //   await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    // }
    // catch(error) {
    //   console.log(`There was an error: ${error}`)
    //   showLoginError(error)
    // }
  }
  
  // Create new account using email/password
  const createAccount = async () => {
    const email = txtEmail.value
    const password = txtPassword.value
  
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    }
    catch(error) {
      console.log(`There was an error: ${error}`)
      showLoginError(error)
    } 
  }

  // Monitor auth state
const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user)
        showApp()
        showLoginState(user)
  
        hideLoginError()
        hideLinkError()
      }
      else {
        showLoginForm()
        lblAuthState.innerHTML = `You're not logged in.`
      }
    })
  }
  
  // Log out
  const logout = async () => {
    await signOut(auth);
  }
  
  btnLogin.addEventListener("click", loginEmailPassword) 
  btnSignup.addEventListener("click", createAccount)
  btnLogout.addEventListener("click", logout)
  
  
  connectAuthEmulator(auth, "http://localhost:9099");
  
  monitorAuthState();
  





