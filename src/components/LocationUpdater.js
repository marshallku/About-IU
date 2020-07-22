import React from "react";
import { withRouter } from "react-router-dom";

class LocationUpdater extends React.Component {
    update() {
        const pathname = window.location.pathname;
        const metaTitle = document.querySelectorAll(".meta-title");
        const metaDesc = document.querySelectorAll(".meta-desc");

        [...document.querySelectorAll(".meta-url")].forEach((url) => {
            url.content = window.location.href;
        });

        if (pathname === "/IU/") {
            document.body.className = "home";

            document.title = "About IU";
            [...metaTitle].forEach((title) => {
                title.content = "About IU";
            });
            [...metaDesc].forEach((desc) => {
                desc.content = "About IU";
            });
        } else {
            if (pathname.indexOf("Discography/") === -1) {
                const path2 = window.location.pathname.replace("/IU/", "");
                document.body.className = path2;

                document.title = path2;
                [...metaTitle].forEach((title) => {
                    title.content = path2;
                });
                [...metaDesc].forEach((desc) => {
                    desc.content =
                        path2 === "Profile"
                            ? "아이유 프로필"
                            : path2 === "Discography"
                            ? "아이유 가사집"
                            : "이지은 연기 활동 목록(필모그래피)";
                });
            } else {
                const albumTitle = decodeURI(
                    pathname.slice(
                        pathname.lastIndexOf("/") + 1,
                        pathname.length
                    )
                );
                document.body.className = "lyrics";

                document.title = albumTitle;
                [...metaTitle].forEach((title) => {
                    title.content = albumTitle;
                });
                [...metaDesc].forEach((desc) => {
                    desc.content = `아이유 ${albumTitle} 가사집`;
                });
            }
        }
    }

    componentDidMount() {
        this.update();
    }

    UNSAFE_componentWillUpdate({ location, history }) {
        if (location.pathname === this.props.location.pathname) {
            return;
        }

        if (history.action === "PUSH") {
            this.update();
        }
    }

    render() {
        return null;
    }
}

export default withRouter(LocationUpdater);
