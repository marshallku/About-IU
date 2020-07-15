import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import HeaderNavigation from "./components/HeaderNavigation";
import Home from "./router/Home";
import Profile from "./router/Profile";
import Discography from "./router/Discography";
import DiscographyDetails from "./router/DiscographyDetails";
import Filmography from "./router/Filmography";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <HeaderNavigation />
            <main id="main">
                <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/`}
                    component={Home}
                />
                <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/profile`}
                    component={Profile}
                />
                <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/discography`}
                    component={Discography}
                />
                <Route
                    strict
                    path={`${process.env.PUBLIC_URL}/discography/`}
                    component={DiscographyDetails}
                />
                <Route
                    exact
                    path={`${process.env.PUBLIC_URL}/Filmography`}
                    component={Filmography}
                />
            </main>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
