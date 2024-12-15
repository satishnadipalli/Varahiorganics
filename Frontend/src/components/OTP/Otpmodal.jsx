import React, { useState, useRef, useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../../Firebase';
import "./Otpmodal.css"

const PhoneOtpModal = ({ isOpen, onClose, onVerificationComplete, setIsOpenModal }) => {
  const [step, setStep] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const otpInputs = useRef([]);
  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    if (isOpen && step === 'phone') {
      document.getElementById('phone-input').focus();
    }
  }, [isOpen, step]);

  useEffect(() => {
    if (!recaptchaVerifier.current) {
      recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible', // Invisible reCAPTCHA (it will work in the background)
        'callback': () => {},
      });
    }
  }, []);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setError('');

    try {
      const formattedPhoneNumber = `+91${phoneNumber}`; // Assuming Indian phone numbers
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier.current);
      setConfirmationResult(confirmation);
      setStep('otp');
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    setError('');

    try {
      await confirmationResult.confirm(enteredOtp);
      onVerificationComplete();
      onClose();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="backdrop" onClick={handleBackdropClick}>
      <div className="modal" style={{
        paddingBottom: "30px",
        paddingTop: "20px",
        width: "360px",
        height: "250px",
        backgroundColor: "white",
        borderRadius: "30px"
      }}>
        <button className="closeButton" onClick={() => setIsOpenModal(false)}>
          &times;
        </button>
        <div className="content">
          {step === 'phone' ? (
            <>
              <h2>Enter Your Phone Number</h2>
              <form onSubmit={handlePhoneSubmit}>
                <div className="inputGroup">
                  <input
                    id="phone-input"
                    type="tel"
                    style={{ width: "93%" }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder=""
                    required
                  />
                  <label htmlFor="phone-input">Phone Number</label>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="submitButton">
                  Send OTP
                </button>
              </form>
            </>
          ) : (
            <>
              <h2>Enter OTP</h2>
              <p className="otpMessage">
                We've sent a 6-digit OTP to {phoneNumber}
              </p>
              <form onSubmit={handleOtpSubmit}>
                <div className="otpInputs">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      required
                    />
                  ))}
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="submitButton">
                  Verify OTP
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneOtpModal;

