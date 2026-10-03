import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/anton/index.css";
import "@fontsource/dm-sans/index.css";
import "./styles/tokens.css";
import App from "./App.jsx";

document.documentElement.classList.add("js");
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
