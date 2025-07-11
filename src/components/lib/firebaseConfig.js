import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Global variable to store recaptcha verifier
let recaptchaVerifier = null;

/**
 * Initializes the reCAPTCHA verifier
 * @returns {Promise} Resolves when reCAPTCHA is ready
 */
const initializeRecaptcha = async () => {
  return new Promise((resolve, reject) => {
    try {
      // Ensure container exists
      let container = document.getElementById('recaptcha-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'recaptcha-container';
        container.style.display = 'none';
        document.body.appendChild(container);
      }

      // Clear existing verifier
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }

      // Initialize new verifier
      recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container', 
        {
          size: 'invisible',
          callback: () => resolve(),
          'expired-callback': () => {
            console.log("reCAPTCHA expired");
            if (recaptchaVerifier) {
              recaptchaVerifier.clear();
              recaptchaVerifier = null;
            }
          }
        }, 
        auth
      );

      // Workaround for Firebase issue
      if (!recaptchaVerifier.verify()) {
        recaptchaVerifier.render().then(resolve).catch(reject);
      } else {
        resolve();
      }
    } catch (error) {
      console.error("reCAPTCHA initialization error:", error);
      reject(error);
    }
  });
};

/**
 * Sets up reCAPTCHA and initiates phone number authentication
 * @param {string} phoneNumber - User's phone number (with country code)
 * @returns {Promise} Confirmation result
 */
const setUpRecaptcha = async (phoneNumber) => {
  try {
    // Ensure reCAPTCHA is initialized
    await initializeRecaptcha();
    
    if (!recaptchaVerifier) {
      throw new Error("reCAPTCHA verifier not initialized");
    }

    // Initiate phone number sign-in
    return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  } catch (error) {
    console.error("reCAPTCHA setup error:", error);
    
    // Clean up on error
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      recaptchaVerifier = null;
    }
    
    throw new Error("Failed to set up reCAPTCHA. Please try again.");
  }
};

/**
 * Verifies the OTP code sent to user's phone
 * @param {object} confirmationResult - Result from phone number sign-in
 * @param {string} otp - 6-digit OTP code
 * @returns {Promise} User credential
 */
const verifyOTP = async (confirmationResult, otp) => {
  try {
    if (!otp || otp.length < 6) {
      throw new Error("Invalid OTP code");
    }

    const result = await confirmationResult.confirm(otp);
    
    // Clean up recaptcha after successful verification
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      recaptchaVerifier = null;
    }
    
    return result.user;
  } catch (error) {
    console.error("OTP verification error:", error);
    throw new Error("Invalid OTP code. Please try again.");
  }
};

/**
 * Signs out the current user
 * @returns {Promise} 
 */
const signOutUser = async () => {
  try {
    await signOut(auth);
    
    // Clean up recaptcha on sign out
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      recaptchaVerifier = null;
    }
  } catch (error) {
    console.error("Sign out error:", error);
    throw new Error("Failed to sign out. Please try again.");
  }
};

/**
 * Gets the current authenticated user
 * @returns {object|null} Current user or null if not authenticated
 */
const getCurrentUser = () => {
  return auth.currentUser;
};

export { 
  auth, 
  setUpRecaptcha, 
  verifyOTP, 
  signOutUser, 
  getCurrentUser 
};