import { useState, useEffect } from "react";
import fcls from "../utils/fcls";
import "./YoutubeVideo.css";

export default function YoutubeVideo({
    id,
    vars,
    fixed,
    mute,
}: YoutubeVideoProps) {
    const [queued, setQueued] = useState<string>("");
    const [videoId, setVideoId] = useState<string>("");

    const loadApiScript = () => {
        if (document.getElementById("iframe-api")) {
            return;
        }

        const script = document.createElement("script");

        script.id = "iframe-api";
        script.src = "https://www.youtube.com/iframe_api";
        window.onYouTubeIframeAPIReady = loadPlayer;
        document.body.append(script);
    };

    const loadPlayer = () => {
        // Turn off captions by default
        vars.cc_load_policy = 0;
        // I don't know what's happening, but cc_load_policy=0 doesn't work without this
        vars.hl = "ko-KR";

        window.player = new window.YT.Player("player", {
            videoId: id,
            playerVars: vars,
            events: {
                onReady: onPlayerReady,
                onStateChange: restartVideo,
            },
        });
    };

    const loadVideoById = (id: string) => {
        if (typeof window.player.loadVideoById === "function") {
            window.player.loadVideoById(id);
        } else {
            setQueued(id);
        }
    };

    const onPlayerReady = (event: YT.PlayerEvent) => {
        const { target } = event;

        if (mute) {
            target.mute();
        }

        if (queued) {
            window.player.loadVideoById(queued);
        }

        target.playVideo();
    };

    const restartVideo = () => {
        0 === window.player.getPlayerState() && window.player.playVideo();
    };

    useEffect(() => {
        if (!!window.YT) {
            loadPlayer();
            return;
        }

        loadApiScript();
    }, []);

    useEffect(() => {
        if (videoId === id) {
            return;
        }

        setVideoId(id);
        loadVideoById(id);
    }, [id, videoId]);

    return <div id="player" className={fcls(fixed && "fixed")} />;
}
