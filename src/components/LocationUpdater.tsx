import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface LocationUpdaterProps extends RouteComponentProps {}

function updateMetaTag(title: string, desc: string) {
    document.head.querySelectorAll("meta").forEach((element) => {
        if (element.classList.contains(".meta-url")) {
            element.content = window.location.href;
        } else if (element.classList.contains("meta-title")) {
            element.content = title;
        } else if (element.classList.contains("meta-desc")) {
            element.content = desc;
        }
    });
}

class LocationUpdater extends React.Component<LocationUpdaterProps> {
    update() {
        const pathname = window.location.pathname;

        if (pathname === "/IU/") {
            document.body.className = "home";

            document.title = "About IU";
            updateMetaTag("About IU", "About IU");
        } else {
            if (pathname.indexOf("Discography/") === -1) {
                const path2 = window.location.pathname.replace("/IU/", "");
                const text =
                    path2 === "Profile"
                        ? "프로필"
                        : path2 === "Discography"
                        ? "가사집"
                        : path2 === "Filmography"
                        ? "필모그래피"
                        : path2 === "Youtube"
                        ? "유튜브 피드"
                        : "인스타그램 피드";

                document.body.className = path2;

                document.title = text;
                updateMetaTag(text, `아이유 ${text}`);
            } else {
                const albumTitle = decodeURI(
                    pathname.slice(
                        pathname.lastIndexOf("/") + 1,
                        pathname.length
                    )
                );
                document.body.className = "lyrics";

                document.title = `${albumTitle} 가사집`;
                updateMetaTag(
                    `${albumTitle} 가사집`,
                    `아이유 ${albumTitle} 가사집`
                );
            }
        }
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate({ location }: any) {
        if (location.pathname !== this.props.location.pathname) {
            this.update();
        }
    }

    render() {
        return null;
    }
}

export default withRouter(LocationUpdater);
