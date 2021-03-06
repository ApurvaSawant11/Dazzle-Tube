import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { useDocumentTitle } from "../../hooks";

const Signup = () => {
  useDocumentTitle("SIgnup");
  const { signup, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  if (token) {
    setTimeout(() => {
      navigate(location?.state?.from || "/", { replace: true });
    }, 1000);
  }

  const signupHandler = (e) => {
    e.preventDefault();
    const { email, password, confirmPwd, firstName, lastName } = formData;
    if (email && password && confirmPwd && firstName && lastName) {
      if (password === confirmPwd) {
        signup(email, password, firstName, lastName);
      } else {
        console.error("Password don't match");
      }
    }
  };

  const fillFormValue = (event, fieldName) => {
    const regex = "^\\s+$";
    const { value } = event.target;
    if (!value.match(regex))
      setFormData((form) => ({ ...form, [fieldName]: value }));
  };

  return (
    <section className="auth-container">
      <form className="signup-form p-2p5 pt-0" onSubmit={signupHandler}>
        <h4 className="text-center pt-1">Signup</h4>
        <div className="flex-row form-name">
          <div className="input-field mb-2">
            <input
              className="input"
              type="text"
              value={formData.firstName}
              onChange={(e) => fillFormValue(e, "firstName")}
              required
            />
            <span className="bar"></span>
            <label className="placeholder">First Name</label>
          </div>
          <div className="input-field mb-2">
            <input
              className="input"
              type="text"
              value={formData.lastName}
              onChange={(e) => fillFormValue(e, "lastName")}
              required
            />
            <span className="bar"></span>
            <label className="placeholder">Last Name</label>
          </div>
        </div>

        <div className="input-field mb-2">
          <input
            className="input"
            type="email"
            value={formData.email}
            onChange={(e) => fillFormValue(e, "email")}
            required
          />
          <span className="bar"></span>
          <label className="placeholder">Enter Email</label>
        </div>
        <div className="input-field mb-2">
          <input
            className="input"
            type="password"
            value={formData.password}
            onChange={(e) => fillFormValue(e, "password")}
            required
          />
          <span className="bar"></span>
          <label className="placeholder">Password</label>
        </div>
        <div className="input-field mb-2">
          <input
            className="input"
            type="password"
            value={formData.confirmPwd}
            onChange={(e) => fillFormValue(e, "confirmPwd")}
            required
          />
          <span className="bar"></span>
          <label className="placeholder">Confirm Password</label>
        </div>
        <p>
          <small>
            By continuing, you agree to Dazzle Cerashop's
            <span className="secondary-text fw-700">Terms of use</span> and
            <span className="secondary-text fw-700">Privacy Policy.</span>
          </small>
        </p>
        <button type="submit" className="button primary form-btn mt-0p5">
          Signup
        </button>

        <p className="text-center mt-1">
          Already have an account? Login{" "}
          <Link className="secondary-text fw-700" to="/login">
            here
          </Link>
        </p>
      </form>
    </section>
  );
};

export { Signup };
