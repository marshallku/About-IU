import React from "react";

class YoutubeVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quened: "",
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

    loadVideoById = (id) => {
        if (typeof window.player.loadVideoById === "function") {
            window.player.loadVideoById(id);
        } else {
            this.setState({
                quened: id,
            });
        }
    };

    onPlayerReady = (event) => {
        const { quened } = this.state;

        if (this.props?.vars?.muted) {
            event.target.mute();
        }

        if (quened) {
            window.player.loadVideoById(quened);
        }

        event.target.playVideo();
    };

    restartVideo = () => {
        0 === window.player.getPlayerState() && window.player.playVideo();
    };

    componentDidUpdate(prevProps) {
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
