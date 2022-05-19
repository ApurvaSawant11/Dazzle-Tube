import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import {
  AuthProvider,
  VideoProvider,
  DropdownProvider,
  ToastProvider,
  ThemeProvider,
} from "./context";

// Call make Server
makeServer();
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <VideoProvider>
          <ToastProvider>
            <AuthProvider>
              <DropdownProvider>
                <App />
              </DropdownProvider>
            </AuthProvider>
          </ToastProvider>
        </VideoProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
