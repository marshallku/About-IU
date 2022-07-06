import { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import fcls from "../utils/fcls";
import "./GlobalNavigation.css";

function LinkWithScroll({ to, children, className }: LinkWithScrollProps) {
    return (
        <NavLink
            to={to}
            className={fcls("main-nav__link", className)}
            onClick={() => {
                window.scrollTo(0, 0);
            }}
        >
            {children}
        </NavLink>
    );
}

export default function HeaderNavigation() {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const handleScroll = useCallback(() => {
        window.scrollY === 0
            ? setScrolled(false)
            : !scrolled && setScrolled(true);
    }, [setScrolled]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={fcls("main-nav", scrolled && "main-nav--shrink")}>
            <div className="left">
                <LinkWithScroll to="/">
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            className="main-nav-icon--home"
                            viewBox="0 0 640 640"
                        >
                            <path d="M597.504 352h-53.504v192c0 14.24-6.208 32-32 32h-128v-192h-128v192h-128c-25.792 0-32-17.76-32-32v-192h-53.504c-19.136 0-15.040-10.368-1.92-23.936l256.768-257.024c6.24-6.464 14.432-9.664 22.656-9.984 8.224 0.32 16.416 3.488 22.656 9.984l256.736 256.992c13.152 13.6 17.248 23.968-1.888 23.968z" />
                        </svg>
                        <span>Home</span>
                    </>
                </LinkWithScroll>
                <LinkWithScroll to="/Youtube">
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            className="main-nav-icon--youtube"
                            viewBox="0 0 640 640"
                        >
                            <path d="M320 73.6c-314.496 0-320 27.968-320 246.4s5.504 246.4 320 246.4 320-27.968 320-246.4-5.504-246.4-320-246.4zM422.56 330.688l-143.68 67.072c-12.576 5.824-22.88-0.704-22.88-14.592v-126.336c0-13.856 10.304-20.416 22.88-14.592l143.68 67.072c12.576 5.888 12.576 15.488 0 21.376z" />
                        </svg>
                        <span>Youtube</span>
                    </>
                </LinkWithScroll>
            </div>
            <div>
                <LinkWithScroll to="/" className="logo">
                    <svg
                        version="1.1"
                        className="logo__icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 200 200"
                    >
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
                    </svg>
                </LinkWithScroll>
            </div>
            <div className="right">
                <LinkWithScroll to="/Discography">
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            className="main-nav-icon--mic"
                            viewBox="0 0 640 640"
                        >
                            <path d="M39.296 348.512c-7.072 4.736-9.344 14.72-5.088 22.080l41.472 71.808c4.256 7.36 14.016 10.4 21.664 6.656l126.656-61.344v220.288h64v-251.328l130.272-63.136-83.84-145.28-295.136 200.256zM590.624 97.184c-35.872-62.080-115.328-83.36-177.472-47.488-29.12 16.8-48.256 43.488-57.632 73.248l95.232 164.992c30.432 6.784 63.136 3.52 92.32-13.28 62.144-35.872 83.424-115.296 47.552-177.472z" />
                        </svg>
                        <span>Discography</span>
                    </>
                </LinkWithScroll>
                <LinkWithScroll to="/Filmography">
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            className="main-nav-icon--film"
                            viewBox="0 0 640 640"
                        >
                            <path d="M640 96v448c0 17.664-14.304 32-32 32h-576c-17.696 0-32-14.336-32-32v-448c0-17.696 14.304-32 32-32h32l96 96h80l-96-96h96l96 96h80l-96-96h96l96 96h80l-96-96h112c17.696 0 32 14.336 32 32z" />
                        </svg>
                        <span>Filmography</span>
                    </>
                </LinkWithScroll>
            </div>
        </nav>
    );
}
