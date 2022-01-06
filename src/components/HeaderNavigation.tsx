/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./HeaderNavigation.css";

export default function HeaderNavigation() {
    const location = useLocation();
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [navOpened, setNavOpened] = useState<boolean>(false);
    const [current, setCurrent] = useState<string>("");
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

    const hideNav = () => {
        setNavOpened(false);
    };

    const isCurrent = (uri: string): string => {
        if (uri === current) {
            return "highlight";
        } else if (
            uri.includes("/Discography") &&
            current.includes("/Discography")
        ) {
            return "highlight";
        } else {
            return "";
        }
    };

    const checkScreenSize = () => {
        const isSmallerThan860 = window.innerWidth <= 860;

        if (isSmallScreen !== isSmallerThan860) {
            setIsSmallScreen(isSmallerThan860);
        }
    };

    useEffect(() => {
        setCurrent(location.pathname.replace("/IU", ""));
    }, [location.pathname]);

    window.addEventListener(
        "scroll",
        () => {
            window.scrollY === 0
                ? setScrolled(false)
                : !scrolled && setScrolled(true);
        },
        { passive: true }
    );
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize, { passive: true });

    return (
        <>
            <nav
                id="main-nav"
                className={`${scrolled ? "shrink" : ""} ${
                    navOpened ? " navrevealed" : ""
                }`}
            >
                <div className="left">
                    {!isSmallScreen && (
                        <>
                            <Link
                                className={isCurrent("/")}
                                to={`${process.env.PUBLIC_URL}/`}
                            >
                                Home
                            </Link>
                            <Link
                                className={isCurrent("/Profile")}
                                to={`${process.env.PUBLIC_URL}/Profile`}
                            >
                                Profile
                            </Link>
                            <Link
                                className={isCurrent("/Instagram")}
                                to={`${process.env.PUBLIC_URL}/Instagram`}
                            >
                                Instagram
                            </Link>
                        </>
                    )}
                </div>
                <div className="flex center">
                    <Link
                        to={`${process.env.PUBLIC_URL}/`}
                        className="logoWrap"
                    >
                        <svg
                            version="1.1"
                            id="logo"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 200 200"
                        >
                            <g>
                                <path
                                    d="M16,169c-1.1,0-1.9-1-1.7-2c0.6-4.1,2.3-13.3,3-17.5c2.5-15.6,4.8-31.2,7.3-46.7c2.2-13.9,4.4-27.9,6.8-41.8
    c1.8-10.5,3.6-21,5.5-31.5c0.1-0.8,0.9-1.5,1.7-1.5H63c0.2,0.5,0.6,1,0.5,1.4c-2.3,15.3-4.6,30.6-7,45.8
    c-2.1,13.3-4.5,26.6-6.7,39.9c-2.8,17-5.3,34.1-8.1,51.1c-0.2,1.2-1.9,3.1-2.9,3.1C31.2,169.4,23.6,169.2,16,169z"
                                />
                                <path
                                    d="M84.5,28h23c0.8,0,1.6,0.6,1.7,1.4c0.2,1,0.4,2,0.2,2.9c-1.1,7.6-2.5,15.2-3.7,22.9c-2.3,14.1-4.7,28.2-6.7,42.4
    c-1.4,10.3-3,20.6-3.1,31c-0.1,10.2,4.3,18.6,13.2,20.2c7.2,1.3,14.5,1.3,21.1-3.2c9.2-6.2,12.6-15.9,14.9-25.9
    c2.3-10.3,3.8-20.7,5.4-31.1c2.3-14.3,4.4-28.6,6.7-42.9c0.9-5.5,2.2-10.9,3.4-16.3c0.2-0.8,0.9-1.4,1.7-1.4H185
    c1.1,0,1.9,0.9,1.7,2c-0.7,6.1-1.3,12.1-2.3,18.2c-2.5,15.9-5.1,31.9-7.8,47.8c-2.5,15.3-4.2,30.6-11.3,44.9
    c-5.6,11.4-12,33.3-53.8,33.3c-13.1,0-32.4-8.5-38.6-20.9c-7.1-14-5.3-28.8-3.4-43.4C71.3,96,74,82.2,76.2,68.4
    c2.1-13,4.3-26,6.5-38.9C82.9,28.6,83.6,28,84.5,28z"
                                />
                            </g>
                        </svg>
                    </Link>
                </div>
                <div className="right">
                    {!isSmallScreen && (
                        <>
                            <Link
                                className={isCurrent("/Youtube")}
                                to={`${process.env.PUBLIC_URL}/Youtube`}
                            >
                                Youtube
                            </Link>
                            <Link
                                className={isCurrent("/Discography")}
                                to={`${process.env.PUBLIC_URL}/Discography`}
                            >
                                Discography
                            </Link>
                            <Link
                                className={isCurrent("/Filmography")}
                                to={`${process.env.PUBLIC_URL}/Filmography`}
                            >
                                Filmography
                            </Link>
                        </>
                    )}
                    <div
                        className="hbg openbtn"
                        onClick={() => {
                            setNavOpened(true);
                        }}
                    >
                        <div className="hbg-top"></div>
                        <div className="hbg-mid"></div>
                        <div className="hbg-bot"></div>
                    </div>
                </div>
            </nav>

            {isSmallScreen && (
                <nav id="nav" className={navOpened ? "navrevealed" : ""}>
                    <div className="hbg" onClick={hideNav}>
                        <div className="hbg-top"></div>
                        <div className="hbg-mid"></div>
                        <div className="hbg-bot"></div>
                    </div>
                    <Link
                        className={isCurrent("/")}
                        onClick={hideNav}
                        to={`${process.env.PUBLIC_URL}/`}
                    >
                        Home
                    </Link>
                    <Link
                        className={isCurrent("/Profile")}
                        onClick={hideNav}
                        to={`${process.env.PUBLIC_URL}/Profile`}
                    >
                        Profile
                    </Link>
                    <Link
                        className={isCurrent("/Instagram")}
                        onClick={hideNav}
                        to={`${process.env.PUBLIC_URL}/Instagram`}
                    >
                        Instagram
                    </Link>
                    <Link
                        className={isCurrent("/Youtube")}
                        onClick={hideNav}
                        to={`${process.env.PUBLIC_URL}/Youtube`}
                    >
                        Youtube
                    </Link>
                    <Link
                        className={isCurrent("/Discography")}
                        onClick={hideNav}
                        to={`${process.env.PUBLIC_URL}/Discography`}
                    >
                        Discography
                    </Link>
                    <Link
                        className={isCurrent("/Filmography")}
                        onClick={hideNav}
                        to={`${process.env.PUBLIC_URL}/Filmography`}
                    >
                        Filmography
                    </Link>
                </nav>
            )}
        </>
    );
}
