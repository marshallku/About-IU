import { useState, useEffect } from "react";

interface YoutubeVideoProps {
    id: string;
    vars: YT.PlayerVars;
    mute?: boolean;
}

export default function YoutubeVideo(props: YoutubeVideoProps) {
    const [queued, setQueued] = useState<string>("");
    const [videoId, setVideoId] = useState<string>("");

    const loadVideo = () => {
        const { id, vars } = props;

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
        if (props.mute) {
            event.target.mute();
        }

        if (queued) {
            window.player.loadVideoById(queued);
        }

        event.target.playVideo();
    };

    const restartVideo = () => {
        0 === window.player.getPlayerState() && window.player.playVideo();
    };

    useEffect(() => {
        if (!window.YT) {
            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            window.onYouTubeIframeAPIReady = loadVideo;
            document.body.append(script);
        } else {
            loadVideo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { id } = props;

        if (videoId !== id) {
            setVideoId(id);
            loadVideoById(id);
        }
    }, [props, props.id, videoId]);

    return <div id="player" />;
}
