import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Autograph from "./components/Autograph";
import "./index.css";
import "./icon.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("global-loader")!).render(
    <Autograph />
);
