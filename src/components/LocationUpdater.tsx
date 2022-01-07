import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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

export default function LocationUpdater() {
    const location = useLocation();
    const update = () => {
        const { pathname } = location;

        if (pathname === "/IU/") {
            document.body.className = "home";

            document.title = "About IU";
            updateMetaTag("About IU", "About IU");
        } else {
            if (pathname.indexOf("Discography/") === -1) {
                const path2 = pathname.replace("/IU/", "");
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
    };

    useEffect(update, [location]);

    return null;
}
