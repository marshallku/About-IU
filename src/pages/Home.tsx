import React from "react";
import YoutubeVideo from "../components/YoutubeVideo";
import "./Home.css";

export default function Home() {
    const videoList = ["JpTqSzm4JOk", "nvJeJSrghOI"];
    const video = videoList[Math.round(Math.random() * (videoList.length - 1))];

    const toggleMute = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const target = event.target as HTMLElement;

        if (typeof window.player.mute !== "function") {
            return;
        }

        if (window.player.isMuted()) {
            window.player.unMute();
            target.classList.remove("home__toggle-mute--muted");
            return;
        }

        window.player.mute();
        target.classList.add("home__toggle-mute--muted");
    };

    return (
        <section className="home">
            <div className="home__video">
                <YoutubeVideo
                    id={video}
                    vars={{
                        rel: 0,
                        loop: 1,
                        playsinline: 1,
                        playlist: video,
                        controls: 0,
                        showinfo: 0,
                    }}
                    mute={true}
                />
            </div>
            <div className="home__content">
                <ul className="text-ring">
                    <li>
                        <span role="img" aria-label="purple heart">
                            💜
                        </span>
                    </li>
                    <li>아</li>
                    <li>이</li>
                    <li>유</li>
                    <li>
                        <span role="img" aria-label="purple heart">
                            💜
                        </span>
                    </li>
                    <li>참</li>
                    <li>
                        <span role="img" aria-label="purple heart">
                            💜
                        </span>
                    </li>
                    <li>좋</li>
                    <li>다</li>
                    <li>
                        <span role="img" aria-label="purple heart">
                            💜
                        </span>
                    </li>
                    <li>*</li>
                    <li>*</li>
                </ul>
            </div>
            <button
                aria-label="음소거 / 해제"
                className="home__toggle-mute icon-note home__toggle-mute--muted"
                onClick={toggleMute}
            />
        </section>
    );
}
