import React from "react";

class YoutubeVideo extends React.Component {
    componentDidMount = () => {
        if (this.props.id) {
            if (!window.YT) {
                const script = document.createElement("script");
                script.src = "https://www.youtube.com/iframe_api";
                window.onYouTubeIframeAPIReady = this.loadVideo;
                document.body.append(script);
            } else {
                this.loadVideo();
            }
        }
    };

    loadVideo = () => {
        const { id, vars } = this.props;

        if (id) {
            this.player = new window.YT.Player("player", {
                videoId: id,
                playerVars: vars,
                events: {
                    onReady: this.onPlayerReady,
                },
            });
        }
    };

    onPlayerReady = (event) => {
        event.target.playVideo();
    };

    render() {
        if (this.props.id) {
            return <div id="player" />;
        } else {
            return null;
        }
    }
}

export default YoutubeVideo;
