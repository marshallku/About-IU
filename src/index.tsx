import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderNavigation from "./components/HeaderNavigation";
import Home from "./router/Home";
import Profile from "./router/Profile";
import Discography from "./router/Discography";
import DiscographyDetails from "./router/DiscographyDetails";
import Filmography from "./router/Filmography";
import Youtube from "./router/Youtube";
import Instagram from "./router/Instagram";
import LocationUpdater from "./components/LocationUpdater";
import Autograph from "./components/Autograph";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <HeaderNavigation />
            <main id="main">
                <Routes>
                    <Route
                        path={`${process.env.PUBLIC_URL}/`}
                        element={<Home />}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL}/Profile`}
                        element={<Profile />}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL}/Discography`}
                        element={<Discography />}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL}/Discography/:album`}
                        element={<DiscographyDetails />}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL}/Filmography`}
                        element={<Filmography />}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL}/Youtube`}
                        element={<Youtube />}
                    />
                    <Route
                        path={`${process.env.PUBLIC_URL}/Instagram`}
                        element={<Instagram />}
                    />
                </Routes>
            </main>
            <LocationUpdater />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

ReactDOM.render(<Autograph></Autograph>, document.getElementById("loader"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
