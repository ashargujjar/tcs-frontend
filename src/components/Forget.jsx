import React, { useState } from "react";
import { Nav } from "./homeComponent/Nav";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Send email to backend
    setStep(2); // move to OTP step
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    // Send OTP to backend to verify
    console.log("Entered OTP:", enteredOtp);
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-center text-emerald-600 mb-4">
                Forgot Password
              </h2>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Enter your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md font-medium"
                >
                  Send OTP
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                Enter OTP
              </h2>
              <form onSubmit={handleOtpSubmit}>
                <div className="flex justify-center space-x-2 mb-6">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-10 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md font-medium"
                >
                  Verify OTP
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
