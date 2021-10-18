import React from "react";
import YoutubeVideo from "../components/YoutubeVideo";
import "./Home.css";

export default function Home() {
    const mvList = ["sqgxcCjD04s"];
    const video = mvList[Math.round(Math.random() * (mvList.length - 1))];

    const toggleMute = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const target = event.target as HTMLElement;
        if (typeof window.player.mute === "function") {
            if (window.player.isMuted()) {
                window.player.unMute();
                target.classList.remove("disabled");
            } else {
                window.player.mute();
                target.classList.add("disabled");
            }
        }
    };

    return (
        <section id="home">
            <div id="homeVideo">
                <div className="videoWrapper">
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
            </div>
            <div id="ringWrap">
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
                id="toggleMute"
                aria-label="음소거 / 해제"
                className="icon-note disabled"
                onClick={toggleMute}
            ></button>
        </section>
    );
}
