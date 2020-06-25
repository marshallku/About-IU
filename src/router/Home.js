import React from "react";
import Instagram from "../components/Instagram";
import YoutubeVideo from "../components/YoutubeVideo";
import "./Home.css";

function Home() {
    document.body.classList.add("home");
    return (
        <section id="home">
            <div id="homeVideo">
                <div className="videoWrapper">
                    <YoutubeVideo
                        id="TgOu00Mf3kI"
                        vars={{
                            rel: 0,
                            muted: 1,
                            loop: 1,
                            playsinline: 1,
                            playlist: "TgOu00Mf3kI",
                            controls: 0,
                            showinfo: 0,
                        }}
                    />
                </div>
            </div>
            <Instagram />
        </section>
    );
}

export default Home;
