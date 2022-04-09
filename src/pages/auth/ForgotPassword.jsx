import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

const ForgotPassword = () => {
  const [showSection, setShowSection] = useState(false);
  return (
    <section className="auth-container">
      <form className="forgot-form p-2p5 pt-1">
        <h4 className="text-center pb-1">Forgot Password?</h4>
        {!showSection && (
          <div className="send-email-div">
            <div className="input-field mb-2">
              <input className="input" type="text" required />
              <span className="bar"></span>
              <label className="placeholder">Enter Email</label>
            </div>
            <button
              className="button primary form-btn send-email-btn text-center"
              onClick={() => setShowSection(true)}
            >
              Send Email
            </button>
            <p className="text-center mt-1">
              Remember Password? Login{" "}
              <Link to="/login" className="secondary-text fw-700">
                here
              </Link>
            </p>
          </div>
        )}

        {showSection && (
          <div className="change-pwd-div">
            <div className="input-field mb-2">
              <input className="input" type="password" required />
              <span className="bar"></span>
              <label className="placeholder">Enter OTP</label>
            </div>

            <div className="input-field mb-2">
              <input className="input" type="password" required />
              <span className="bar"></span>
              <label className="placeholder">New Password</label>
            </div>

            <Link
              to="/login"
              className="button primary flex-row-center"
              onClick={() => setShowSection(true)}
            >
              Send Email
            </Link>
          </div>
        )}
      </form>
    </section>
  );
};

export { ForgotPassword };
