import { useEffect, useState } from "react";
import ErrorMsg from "../components/ErrorMsg";
import Loading from "../components/Loading";
import "./Instagram.css";

export default function Instagram() {
    const [stored, setStored] = useState<boolean>(!!window.inList);
    const [error, setError] = useState<boolean>(false);

    const fetchList = () => {
        fetch("https://www.instagram.com/dlwlrma/")
            .then((response) => {
                return response.text();
            })
            .then((response) => {
                if (response.includes("edge_owner_to_timeline_media")) {
                    const media = JSON.parse(
                        response.slice(
                            response.indexOf("edge_owner_to_timeline_media") +
                                30,
                            response.indexOf("edge_saved_media") - 2
                        )
                    );
                    const { edges } = media;

                    edges && (window.inList = edges);
                    setStored(true);
                } else {
                    throw new Error("Can't parse list");
                }
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            });
    };

    useEffect(() => {
        if (!stored) {
            fetchList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error) {
        return (
            <section id="instagram">
                <div id="info" className="center">
                    <img
                        className="circle"
                        src={`${process.env.PUBLIC_URL}/assets/images/insta_profile.jpg`}
                        alt="이지금"
                    ></img>
                    <h1>dlwlrma</h1>
                    <a
                        href="https://www.instagram.com/dlwlrma/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        인스타 바로가기
                    </a>
                </div>
                <ErrorMsg />
            </section>
        );
    } else if (!stored) {
        return <Loading />;
    } else {
        return (
            <section id="instagram">
                <div id="info" className="center">
                    <img
                        className="circle"
                        src={`${process.env.PUBLIC_URL}/assets/images/insta_profile.jpg`}
                        alt="이지금"
                    ></img>
                    <h1>dlwlrma</h1>
                    <a
                        href="https://www.instagram.com/dlwlrma/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        인스타 바로가기
                    </a>
                </div>
                <div id="inList" className="flex">
                    {window.inList.map((post: any, index: number) => {
                        const { node } = post;
                        return (
                            <a
                                key={index}
                                href={`https://www.instagram.com/p/${node.shortcode}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={node.display_url}
                                    alt={node.accessibility_caption}
                                />
                            </a>
                        );
                    })}
                </div>
            </section>
        );
    }
}
