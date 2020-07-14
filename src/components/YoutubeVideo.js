import React from "react";

class YoutubeVideo extends React.Component {
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

        this.player = new window.YT.Player("player", {
            videoId: id,
            playerVars: vars,
            events: {
                onReady: this.onPlayerReady,
            },
        });
    };

    loadVideoById = (id) => {
        this.player.loadVideoById(id);
    };

    onPlayerReady = (event) => {
        if (this.props?.vars?.muted) {
            event.target.mute();
        }

        event.target.playVideo();
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
