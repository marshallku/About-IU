import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_TITLE = "About IU";

function updateMetaTag(title: string, desc: string) {
    document.head.querySelectorAll("meta").forEach((element) => {
        if (element.classList.contains(".meta-url")) {
            element.content = window.location.href;
            return;
        }

        if (element.classList.contains("meta-title")) {
            element.content = title;
            return;
        }

        if (element.classList.contains("meta-desc")) {
            element.content = desc;
        }
    });
}

export default function LocationUpdater() {
    const location = useLocation();
    const titleInKr = useMemo(
        () => ({
            Youtube: "유튜브 목록",
            Discography: "음반 목록",
            Filmography: "연기 목록",
        }),
        []
    );

    useEffect(() => {
        const { pathname } = location;
        const [, path, rawTitle] = pathname.split("/");

        if (path === "") {
            document.body.className = "home";

            document.title = DEFAULT_TITLE;
            updateMetaTag(DEFAULT_TITLE, DEFAULT_TITLE);
            return;
        }

        if (rawTitle) {
            const parsedTitle = decodeURI(rawTitle);

            document.body.className = "lyrics";
            document.title = `${parsedTitle} 가사집`;
            updateMetaTag(
                `${parsedTitle} 가사집`,
                `아이유 ${parsedTitle} 가사집`
            );
            return;
        }

        const koreanTitle =
            titleInKr[path as keyof typeof titleInKr] || DEFAULT_TITLE;

        document.body.className = path;
        document.title = koreanTitle;
        updateMetaTag(koreanTitle, `아이유 ${koreanTitle}`);
    }, [location]);

    return null;
}
