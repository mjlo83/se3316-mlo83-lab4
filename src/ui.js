import { AuthErrorCodes } from 'firebase/auth';

export const txtEmail = document.querySelector('#txtEmail')
export const txtPassword = document.querySelector('#txtPassword')

export const btnLogin = document.querySelector('#btnLogin')
export const btnSignup = document.querySelector('#btnSignup')

export const btnLogout = document.querySelector('#btnLogout')

export const divAuthState = document.querySelector('#divAuthState')
export const lblAuthState = document.querySelector('#lblAuthState')

export const divLoginError = document.querySelector('#divLoginError')
export const lblLoginErrorMessage = document.querySelector('#lblLoginErrorMessage')
export const btnDeleteAccount = document.querySelector('#btnDeleteAccount');

export const newPassword = document.querySelector('#newPassword');
export const btnChangePassword = document.querySelector('#btnChangePassword');
export const introductionElement = document.querySelector('#introduction')

export const hideIntroduction = () => {
  const introductionElement = document.getElementById('introduction');
  if (introductionElement) {
    introductionElement.style.display = 'none';
  }
}

export const showApp = () => {
  const login = document.getElementById('login');
  const app = document.getElementById('app');
  login.style.display = 'none';
  app.style.display = 'block';
  hideIntroduction(); // This line will hide the introduction section
}

export const showPasswordChangeForm = () => {
  const passwordChangeForm = document.querySelector('#passwordChangeForm');
  passwordChangeForm.style.display = 'block'; // Assuming you want to show this form only when necessary
}

export const hidePasswordChangeForm = () => {
  const passwordChangeForm = document.querySelector('#passwordChangeForm');
  passwordChangeForm.style.display = 'none';
}

export const showDeleteConfirmation = (callback) => {
  const confirmation = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
  if (confirmation) {
    callback();
  }
}


export const showLoginForm = () => {
  login.style.display = 'block'
  app.style.display = 'none'  
}


export const hideLoginError = () => {
  divLoginError.style.display = 'none'
  lblLoginErrorMessage.innerHTML = ''
}

export const showLoginError = (error) => {
  divLoginError.style.display = 'block'    
  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
    lblLoginErrorMessage.innerHTML = `Wrong password. Try again.`
  }
  else {
    lblLoginErrorMessage.innerHTML = `Error: ${error.message}`      
  }
}

export const showLoginState = (user) => {
  lblAuthState.innerHTML = `Welcome! You're logged in as ${user.displayName} (uid: ${user.uid}, email: ${user.email}) `
}

hideLoginError()