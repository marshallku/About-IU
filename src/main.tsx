import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Autograph from "./components/Autograph";
import "./index.css";
import "./icon.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

ReactDOM.render(<Autograph />, document.getElementById("global-loader"));
