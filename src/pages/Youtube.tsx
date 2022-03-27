import { useState, useEffect } from "react";
import YoutubeVideo from "../components/YoutubeVideo";
import Loader from "../components/Loader";
import { useYoutubeStore } from "../store";
import "./Youtube.css";
import fcls from "../utils/fcls";

function YoutubeContainer({ children }: { children: React.ReactChild }) {
    return (
        <section className="max-1400">
            <div id="info" className="center">
                <img
                    className="circle"
                    src="https://yt3.ggpht.com/a/AATXAJzM1nsL7mNxOXuc626lhqXuKxjJW-Z6H4Elern5lw=s150-c-k-c0xffffffff-no-rj-mo"
                    alt="이지금"
                ></img>
                <h1>이지금 [IU Official]</h1>
                <a
                    href="https://www.youtube.com/c/dlwlrma/featured"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    채널 바로가기
                </a>
            </div>
            {children}
        </section>
    );
}

export default function Youtube() {
    const [poppedUpVideoId, setPoppedUpVideoId] = useState("");
    const { data, fetchList } = useYoutubeStore();

    const fullScreen = (videoId: string) => {
        const { documentElement } = document;

        documentElement.requestFullscreen();
        window.screen.orientation.lock("landscape-primary").catch(() => {
            return null;
        });
        documentElement.classList.add("overHidden");
        setPoppedUpVideoId(videoId);
    };

    const handleFullScreenChange = () => {
        if (!document.fullscreenElement) {
            document.documentElement.classList.remove("overHidden");
            setPoppedUpVideoId("");
        }
    };

    useEffect(() => {
        fetchList();
        document.addEventListener("fullscreenchange", handleFullScreenChange);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullScreenChange
            );
        };
    }, []);

    if (!data) {
        return <Loader />;
    }

    return (
        <YoutubeContainer>
            <>
                <section className="youtube-list">
                    {data.map(({ title, videoId, viewCount, publishedAt }) => (
                        <article
                            key={videoId}
                            onClick={() => {
                                fullScreen(videoId);
                            }}
                            className="youtube-item"
                        >
                            <figure className="youtube-item__thumbnail">
                                <img
                                    src={`https://i.ytimg.com/vi/${videoId}/sddefault.jpg`}
                                    alt={title}
                                />
                            </figure>
                            <header className="youtube-item__content">
                                <h2 className="youtube-item__title">{title}</h2>
                                <div>
                                    <span>{viewCount}</span>
                                    <span className="dot">•</span>
                                    <span>{publishedAt}</span>
                                </div>
                            </header>
                        </article>
                    ))}
                </section>
                <div
                    className={fcls(
                        "youtube-popup",
                        poppedUpVideoId !== "" && "youtube-popup--revealed"
                    )}
                >
                    <YoutubeVideo
                        id={poppedUpVideoId}
                        vars={{
                            rel: 0,
                            loop: 1,
                            playsinline: 1,
                            controls: 1,
                            showinfo: 1,
                            autoplay: 1,
                        }}
                    />
                </div>
            </>
        </YoutubeContainer>
    );
}
