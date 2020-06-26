import React from "react";
import { Link } from "react-router-dom";

class DiscographyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        const data = `${this.props.location.pathname.replace(
            "discography",
            "data/albums"
        )}.json`;

        fetch(data)
            .then((response) => {
                const contentType = response.headers.get("content-type");

                if (contentType.includes("json")) {
                    return response.json();
                } else {
                    return "";
                }
            })
            .then((response) => {
                if (response) {
                    this.setState({
                        isLoading: false,
                        data: response,
                    });
                }
            });
    }

    render() {
        if (!this.state.isLoading) {
            const { data } = this.state;
            return (
                <section>
                    <Link to="../discography">Back</Link>
                    <div class="back-to-tracklist icon-arrow-left"></div>
                    <div
                        class="album-bg"
                        style={{ backgroundImage: `url(${data.coverImage})` }}
                    ></div>
                    <div class="album-art">
                        <div id="albumart">
                            <img
                                src={data.coverImage}
                                class="album-art-img"
                                alt={data.name}
                            />
                        </div>
                        <div id="bgmVid">
                            <div id="player"></div>
                        </div>
                        <div class="song-info">
                            <div class="song-title"></div>
                            <div class="song-artist">아이유</div>
                            <div class="song-album">{data.name}</div>
                        </div>
                    </div>
                    <div class="detail">
                        <div class="tracklist">
                            <h2 class="detail-title">Tracklist</h2>
                            <ul>
                                {data.tracks.map((track, index) => {
                                    return <li key={index}>{track.title}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                    <div class="lyrics">
                        {data.lyrics.map((lyric, index) => {
                            return <div key={index}>{lyric}</div>;
                        })}
                    </div>
                </section>
            );
        } else {
            return null;
        }
    }
}

export default DiscographyDetails;
