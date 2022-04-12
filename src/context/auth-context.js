import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localStorageUser = JSON.parse(localStorage.getItem("DazzleTube User"));
  const [user, setUser] = useState(localStorageUser?.user);
  const localStorageToken = JSON.parse(
    localStorage.getItem("DazzleTube Token")
  );
  const [token, setToken] = useState(localStorageToken?.token);

  const login = async (email, password) => {
    try {
      const {
        data: { foundUser, encodedToken },
        status,
      } = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });

      if (status === 200) {
        localStorage.setItem(
          "DazzleTube Token",
          JSON.stringify({ token: encodedToken })
        );
        setToken(encodedToken);

        localStorage.setItem(
          "DazzleTube User",
          JSON.stringify({ user: foundUser })
        );

        setUser({ ...user, ...foundUser });
      }
    } catch (error) {
      console.error("Error in login", error);
    }
  };

  const signup = async (email, password, firstName, lastName) => {
    try {
      const {
        data: { createdUser, encodedToken },
        status,
      } = await axios.post("/api/auth/signup", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });

      if (status === 201) {
        localStorage.setItem(
          "DazzleTube Signup",
          JSON.stringify({ token: encodedToken })
        );
        setToken(encodedToken);
        localStorage.setItem(
          "DazzleTube User",
          JSON.stringify({ user: createdUser })
        );
        setUser(createdUser);
      }
    } catch (error) {
      console.error("Error in signup", error);
    }
  };
  const value = { user, setUser, token, setToken, login, signup };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
