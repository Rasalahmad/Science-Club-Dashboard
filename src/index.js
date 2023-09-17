import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { LoginProvider } from "./context/loginContext";

ReactDOM.render(
  <React.StrictMode>
    <LoginProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </LoginProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
