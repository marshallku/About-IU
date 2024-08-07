import { useState, useEffect } from "react";
import { useYoutubeStore } from "../store";
import fcls from "../utils/fcls";
import YoutubeVideo from "../components/YoutubeVideo";
import Loader from "../components/Loader";
import "./Youtube.css";

function YoutubeContainer({ children }: { children: React.ReactChild }) {
    return (
        <section className="youtube max-1400">
            <div className="youtube__info">
                <img
                    className="circle"
                    src="https://yt3.ggpht.com/a/AATXAJzM1nsL7mNxOXuc626lhqXuKxjJW-Z6H4Elern5lw=s150-c-k-c0xffffffff-no-rj-mo"
                    alt="이지금"
                />
                <h1 className="youtube__title">이지금 [IU Official]</h1>
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

        if (
            "lock" in window.screen.orientation &&
            typeof window.screen.orientation.lock === "function"
        ) {
            window.screen.orientation
                .lock("landscape-primary")
                .catch((error: Error) => {
                    console.log(error);
                });
        }

        documentElement.classList.add("overflow-hidden");
        setPoppedUpVideoId(videoId);
    };

    const handleFullScreenChange = () => {
        if (!document.fullscreenElement) {
            document.documentElement.classList.remove("overflow-hidden");
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
                <section className="youtube__list">
                    {data.map(({ title, videoId }) => (
                        <article
                            key={videoId}
                            onClick={() => {
                                fullScreen(videoId);
                            }}
                            className="youtube-item"
                        >
                            <figure className="youtube-item__thumbnail">
                                <img
                                    src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                                    alt={title}
                                />
                            </figure>
                            <header className="youtube-item__content">
                                <h2 className="youtube-item__title">{title}</h2>
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
