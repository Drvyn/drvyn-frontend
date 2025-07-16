import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    grecaptcha?: any; // Defined for TypeScript
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyBcYTi5dgw0cjQtAFLqQUfvPfsljQ3jRkQ",
  authDomain: "drvynin-d0c73.firebaseapp.com",
  projectId: "drvynin-d0c73",
  storageBucket: "drvynin-d0c73.firebasestorage.app",
  messagingSenderId: "316617020168",
  appId: "1:316617020168:web:ad780796af3037d1fe52bd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const setupRecaptcha = async (elementId: string): Promise<RecaptchaVerifier> => {
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
      console.log('Previous reCAPTCHA verifier cleared');
    } catch (error) {
      console.error('Error clearing reCAPTCHA:', error);
    }
    delete window.recaptchaVerifier;
  }

  const container = document.getElementById(elementId) || document.createElement('div');
  if (!document.getElementById(elementId)) {
    container.id = elementId;
    container.style.position = 'fixed';
    container.style.top = '-10000px';
    document.body.appendChild(container);
  }

  if (!window.grecaptcha) {
    throw new Error('reCAPTCHA script not loaded');
  }

  window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
    size: 'invisible',
    callback: () => console.log('reCAPTCHA solved successfully'),
    'expired-callback': () => console.log('reCAPTCHA expired'),
  });

  try {
    console.log('Rendering reCAPTCHA verifier...');
    await window.recaptchaVerifier.render();
    console.log('reCAPTCHA verifier rendered');
    return window.recaptchaVerifier;
  } catch (error) {
    console.error('reCAPTCHA render failed:', error);
    throw new Error('Security check failed. Please try again.');
  }
};

export const sendOTP = async (phoneNumber: string, appVerifier: RecaptchaVerifier) => {
  try {
    console.log('Sending OTP to:', phoneNumber);
    const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    console.log('OTP sent successfully');
    return result;
  } catch (error) {
    console.error('Phone auth error:', error);
    throw error;
  }
};