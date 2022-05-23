import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./auth.css";
import { useAuth } from "../../context";
import { useDocumentTitle } from "../../hooks";

const Login = () => {
  useDocumentTitle("Login");
  const { login, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });

  if (token) {
    setTimeout(() => {
      navigate(location?.state?.from || "/", { replace: true });
    }, 1000);
  }

  const loginHandler = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
  };

  return (
    <section className="auth-container">
      <form className="login-form p-2p5 pt-0" onSubmit={loginHandler}>
        <h4 className="text-center pt-1">Login</h4>
        <div className="input-field mb-2">
          <input
            className="input"
            type="text"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <span className="bar"></span>
          <label className="placeholder">Enter Email</label>
        </div>
        <div className="input-field">
          <input
            className="input"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <span className="bar"></span>
          <label className="placeholder">Password</label>
        </div>
        <div className="authbox-container flex-row gap-1 mt-0p5">
          <label htmlFor="auth-checkbox">
            <input id="auth-checkbox" type="checkbox" />
            Remember me
          </label>
          <Link
            to="/forgot_password"
            className="button-link secondary-text fw-700"
          >
            Forgot Password?
          </Link>
        </div>

        <p className="mt-1p5 mb-1">
          <small>
            By continuing, you agree to Dazzle Cerashop's{" "}
            <span className="secondary-text fw-700">Terms of use</span> and
            <span className="secondary-text fw-700"> Privacy Policy.</span>
          </small>
        </p>
        <button
          type="submit"
          className="button inverted-primary form-btn mb-1"
          onClick={() =>
            setFormData({
              ...formData,
              email: "apurvasawant@gmail.com",
              password: "apurva123",
            })
          }
        >
          Login as Guest
        </button>
        <button
          type="submit"
          className="button primary form-btn mb-1"
          onClick={loginHandler}
        >
          Login
        </button>
        <p className="text-center">
          New user? Create your account{" "}
          <Link to="/signup" className="secondary-text fw-700">
            here
          </Link>
        </p>
      </form>
    </section>
  );
};

export { Login };
