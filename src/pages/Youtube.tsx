import { useState, useEffect } from "react";
import YoutubeVideo from "../components/YoutubeVideo";
import ErrorMsg from "../components/ErrorMsg";
import Loading from "../components/Loading";
import { useYoutubeStore } from "../store";
import "./Youtube.css";

function YoutubeContainer({ children }: { children: React.ReactChild }) {
    return (
        <section id="youtube" className="max-1400">
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
        return <Loading />;
    }

    return (
        <YoutubeContainer>
            <>
                <div id="ytList" className="flex">
                    {data.map(({ title, videoId, viewCount, publishedAt }) => (
                        <span
                            key={videoId}
                            onClick={() => {
                                fullScreen(videoId);
                            }}
                            className="ytItem"
                        >
                            <div className="thumbnail">
                                <img
                                    src={`https://i.ytimg.com/vi/${videoId}/sddefault.jpg`}
                                    alt={title}
                                />
                            </div>
                            <div className="details">
                                <h2>{title}</h2>
                                <div>
                                    <span>{viewCount}</span>
                                    <span className="dot">•</span>
                                    <span>{publishedAt}</span>
                                </div>
                            </div>
                        </span>
                    ))}
                </div>
                {poppedUpVideoId && (
                    <div id="popup">
                        <YoutubeVideo
                            id={poppedUpVideoId}
                            vars={{
                                rel: 0,
                                loop: 1,
                                playsinline: 1,
                                controls: 1,
                                showinfo: 1,
                            }}
                        />
                    </div>
                )}
            </>
        </YoutubeContainer>
    );
}
