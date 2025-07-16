'use client';
import { useState, useRef, useEffect } from 'react';
import { setupRecaptcha, sendOTP } from '../../lib/firebase';
import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    grecaptcha?: any; // Defined for TypeScript
  }
}

export default function PhoneLoginForm() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const recaptchaContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js'; // Standard reCAPTCHA
    script.async = true;
    script.defer = true;
    script.onload = () => console.log('reCAPTCHA script loaded');
    script.onerror = () => setError('Failed to load reCAPTCHA script');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        delete window.recaptchaVerifier;
      }
    };
  }, []);

  const handleSendOTP = async () => {
    if (!phone || phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      setLoading(true);
      setError('');
      console.log('Sending OTP to:', `+91${phone}`);
      const appVerifier = await setupRecaptcha('recaptcha-container');
      const result = await sendOTP(`+91${phone}`, appVerifier);
      setConfirmationResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (!confirmationResult) {
        throw new Error('Session expired. Please request a new OTP.');
      }

      await confirmationResult.confirm(otp);
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Phone Login</h2>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {!confirmationResult ? (
        <>
          <div className="mb-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter phone number"
              className="w-full p-3 border rounded"
              disabled={loading}
            />
          </div>
          <button
            onClick={handleSendOTP}
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter OTP"
              className="w-full p-3 border rounded"
              disabled={loading}
            />
          </div>
          <button
            onClick={handleVerifyOTP}
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:bg-green-400"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </>
      )}

      <div id="recaptcha-container" ref={recaptchaContainer} className="my-4" />
    </div>
  );
}