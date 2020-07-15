import React from "react";
import { Link } from "react-router-dom";
import YoutubeVideo from "../components/YoutubeVideo";
import "./DiscographyDetails.css";

class DiscographyDetails extends React.Component {
    constructor(props) {
        super(props);
        document.body.classList.add("hideHeader");
        document.body.classList.remove("home");
        this.state = {
            isLoading: true,
            activated: false,
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

    setActivated = (index) => {
        this.setState({
            activated: index,
        });
    };

    render() {
        if (!this.state.isLoading) {
            const { data, activated } = this.state;
            return (
                <section
                    id="discographyDetail"
                    className={activated !== false ? "lyric-activated" : ""}
                >
                    <Link
                        to="../discography"
                        className="album-closer icon-times"
                        aria-label="back"
                    ></Link>
                    <div
                        className="back-to-tracklist icon-arrow-left"
                        onClick={() => {
                            this.setState({ activated: false });
                        }}
                    ></div>
                    <div
                        className="album-bg"
                        style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL}${data.image})`,
                        }}
                    ></div>
                    <div className="album-art">
                        <div id="albumart">
                            <img
                                src={`${process.env.PUBLIC_URL}${data.image}`}
                                className="album-art-img"
                                alt={data.name}
                            />
                        </div>
                        <div
                            id="bgmVid"
                            className={
                                activated !== false
                                    ? data.tracks[activated].music
                                        ? "reveal"
                                        : ""
                                    : ""
                            }
                        >
                            <YoutubeVideo
                                id={
                                    activated !== false
                                        ? data.tracks[activated].music
                                        : ""
                                }
                                vars={{
                                    rel: 0,
                                    muted: 0,
                                    loop: 1,
                                    playsinline: 1,
                                    controls: 0,
                                    showinfo: 0,
                                }}
                            />
                        </div>
                        <div className="song-info">
                            <div className="song-title">
                                {activated !== false &&
                                    data.tracks[activated].title}
                            </div>
                            <div className="song-artist">아이유</div>
                            <div className="song-album">{data.name}</div>
                        </div>
                    </div>
                    <div className="detail">
                        <div
                            className="tracklist"
                            style={
                                activated !== false
                                    ? { maxHeight: 0 }
                                    : {
                                          maxHeight: `${
                                              data.tracks.length * 2.5 + 2.3
                                          }rem`,
                                      }
                            }
                        >
                            <h2 className="detail-title">Tracklist</h2>
                            <ul>
                                {data.tracks.map((track, index) => {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                this.setActivated(index);
                                            }}
                                            className="song-list"
                                        >
                                            {track.title}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div
                        className={`lyrics ${
                            activated !== false ? "reveal" : ""
                        }`}
                    >
                        {data.lyrics.map((lyric, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`lyric ${
                                        activated === index ? "reveal" : ""
                                    }`}
                                >
                                    {lyric}
                                </div>
                            );
                        })}
                    </div>

                    <svg width="0" height="0">
                        <defs>
                            <filter
                                id="blur"
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                            >
                                <feGaussianBlur stdDeviation="20" />
                                <feComponentTransfer>
                                    <feFuncA
                                        type="discrete"
                                        tableValues="1 1"
                                    />
                                </feComponentTransfer>
                            </filter>
                        </defs>
                    </svg>
                </section>
            );
        } else {
            return null;
        }
    }
}

export default DiscographyDetails;
