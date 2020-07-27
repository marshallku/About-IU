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
            metaTitle.forEach((title) => {
                title.content = "About IU";
            });
            metaDesc.forEach((desc) => {
                desc.content = "About IU";
            });
        } else {
            if (pathname.indexOf("Discography/") === -1) {
                const path2 = window.location.pathname.replace("/IU/", "");
                const text =
                    path2 === "Profile"
                        ? "아이유 프로필"
                        : path2 === "Discography"
                        ? "아이유 가사집"
                        : path2 === "Filmography"
                        ? "이지은 연기 활동 목록(필모그래피)"
                        : path2 === "Youtube"
                        ? "아이유 유튜브 피드"
                        : "아이유 인스타그램 피드";

                document.body.className = path2;

                document.title = path2;
                metaTitle.forEach((title) => {
                    title.content = text;
                });
                metaDesc.forEach((desc) => {
                    desc.content = text;
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
                metaTitle.forEach((title) => {
                    title.content = `아이유 ${albumTitle} 가사집`;
                });
                metaDesc.forEach((desc) => {
                    desc.content = `아이유 ${albumTitle} 가사집`;
                });
            }
        }
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate({ location }) {
        if (location.pathname !== this.props.location.pathname) {
            this.update();
        }
    }

    render() {
        return null;
    }
}

export default withRouter(LocationUpdater);
