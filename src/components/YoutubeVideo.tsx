import React from "react";

interface YoutubeVideoProps {
    id: string;
    vars: YT.PlayerVars;
    mute?: boolean;
}

class YoutubeVideo extends React.Component<
    YoutubeVideoProps,
    {
        queued: string;
    }
> {
    constructor(props: YoutubeVideoProps) {
        super(props);
        this.state = {
            queued: "",
        };
    }

    componentDidMount = () => {
        if (!window.YT) {
            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            window.onYouTubeIframeAPIReady = this.loadVideo;
            document.body.append(script);
        } else {
            this.loadVideo();
        }
    };

    loadVideo = () => {
        const { id, vars } = this.props;

        window.player = new window.YT.Player("player", {
            videoId: id,
            playerVars: vars,
            events: {
                onReady: this.onPlayerReady,
                onStateChange: this.restartVideo,
            },
        });
    };

    loadVideoById = (id: string) => {
        if (typeof window.player.loadVideoById === "function") {
            window.player.loadVideoById(id);
        } else {
            this.setState({
                queued: id,
            });
        }
    };

    onPlayerReady = (event: YT.PlayerEvent) => {
        const { queued } = this.state;

        if (this.props.mute) {
            event.target.mute();
        }

        if (queued) {
            window.player.loadVideoById(queued);
        }

        event.target.playVideo();
    };

    restartVideo = () => {
        0 === window.player.getPlayerState() && window.player.playVideo();
    };

    componentDidUpdate(prevProps: YoutubeVideoProps) {
        const { id } = this.props;

        if (prevProps.id !== id) {
            this.loadVideoById(id);
        }
    }

    render() {
        return <div id="player" />;
    }
}

export default YoutubeVideo;
