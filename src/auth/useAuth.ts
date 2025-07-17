import { useState, useEffect, useCallback } from "react";

export const useAuth = (otpInputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleSendOtp = async () => {
    const cleanedPhone = phone.replace(/\D/g, "");
    if (!cleanedPhone || cleanedPhone.length !== 10) {
      setOtpError("Please enter a valid 10-digit phone number");
      return;
    }

    if (!navigator.onLine) {
      setOtpError("No internet connection. Please check your network and try again.");
      return;
    }

    try {
      setIsSendingOtp(true);
      setOtpError("");

      const phoneToSend = `91${cleanedPhone}`;
      const response = await fetch(
        `https://2factor.in/API/V1/${process.env.NEXT_PUBLIC_TWO_FACTOR_API_KEY}/SMS/${phoneToSend}/AUTOGEN`,
        { method: "GET" }
      );

      const data = await response.json();
      console.log("Send OTP response:", data);
      if (data.Status === "Success") {
        setOtpSent(true);
        setResendTimer(30);
        setOtpVerified(false);
        setOtp("");
        setSessionId(data.Details);
      } else {
        throw new Error(data.Details || "Failed to send OTP");
      }
    } catch (error) {
      console.error("OTP send error:", error);
      let errorMessage = "Failed to send OTP. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("Invalid API Key")) {
          errorMessage = "Service configuration error. Please contact support.";
        } else if (error.message.includes("Insufficient Credits")) {
          errorMessage = "Service temporarily unavailable. Please try again later or check SMS credits.";
        } else if (error.message.includes("Invalid Number")) {
          errorMessage = "Invalid phone number. Please check and try again.";
        } else {
          errorMessage = error.message;
        }
      }
      setOtpError(errorMessage);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = useCallback(async () => {
    if (otp.length !== 6) {
      setOtpError("Please enter a 6-digit OTP.");
      return;
    }

    if (!sessionId) {
      setOtpError("No session ID available. Please request a new OTP.");
      return;
    }

    setIsSendingOtp(true);
    setOtpError("");

    try {
      const response = await fetch(
        `https://2factor.in/API/V1/${process.env.NEXT_PUBLIC_TWO_FACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`,
        { method: "GET" }
      );

      const data = await response.json();
      console.log("Verify OTP response:", data);
      if (data.Status === "Success" && data.Details === "OTP Matched") {
        setOtpVerified(true);
        setOtpError("");
      } else if (data.Details === "OTP Mismatch") {
        setOtpError("Invalid OTP. Please try again.");
      } else if (data.Details === "OTP Expired") {
        setOtpError("OTP has expired. Please request a new one.");
        setOtpSent(false);
        setSessionId(null);
      } else if (data.Details === "Invalid Session") {
        setOtpError("Invalid session. Please request a new OTP.");
        setOtpSent(false);
        setSessionId(null);
      } else {
        setOtpError(`Verification failed: ${data.Details || "Unknown error"}`);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setOtpError("Failed to verify OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  }, [otp, sessionId]);

  useEffect(() => {
    if (otp.length === 6 && !otpVerified && sessionId && !isVerifying) {
      setIsVerifying(true);
      handleVerifyOtp().finally(() => {
        setIsVerifying(false);
      });
    }
  }, [otp, otpVerified, sessionId, handleVerifyOtp]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    if (value && index < 5 && otpInputRefs.current[index + 1]) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && otpInputRefs.current[index - 1]) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  return {
    phone,
    setPhone,
    otp,
    setOtp,
    otpSent,
    otpVerified,
    isSendingOtp,
    otpError,
    resendTimer,
    handleSendOtp,
    handleVerifyOtp,
    handleOtpChange,
    handleOtpKeyDown,
  };
};