import React from "react";

class YoutubeVideo extends React.Component {
    constructor(props) {
        super(props);
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
        const { id } = this.props;
        this.player = new window.YT.Player("player", {
            videoId: id,
            events: {
                onReady: this.onPlayerReady,
            },
        });
    };

    onPlayerReady = (event) => {
        event.target.playVideo();
    };

    render = () => {
        return <div id="player" />;
    };
}

export default YoutubeVideo;
