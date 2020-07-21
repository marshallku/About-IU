import React from "react";
import { Link } from "react-router-dom";
import YoutubeVideo from "../components/YoutubeVideo";
import "./DiscographyDetails.css";

export default class DiscographyDetails extends React.Component {
    constructor(props) {
        super(props);
        document.body.classList.add("hideHeader");
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

    pauseVideo = () => {
        this.setState(
            {
                paused: true,
            },
            () => {
                window.player.pauseVideo();
            }
        );
    };

    playVideo = () => {
        this.setState(
            {
                paused: false,
            },
            () => {
                window.player.playVideo();
            }
        );
    };

    toggleVideo = () => {
        const { paused } = this.state;

        if (paused) {
            this.playVideo();
        } else {
            this.pauseVideo();
        }
    };

    render() {
        if (!this.state.isLoading) {
            const { data, activated, paused, videoRevealed } = this.state;
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
                        {activated !== false && data.tracks[activated].music ? (
                            <div className="center">
                                <button
                                    id="rewind10"
                                    className="icon-backward"
                                    title="10초 되감기"
                                    aria-label="10초 되감기"
                                    onClick={() => {
                                        window.player.seekTo(
                                            Math.floor(
                                                window.player.getCurrentTime()
                                            ) - 10
                                        );
                                    }}
                                ></button>
                                <button
                                    id="playVideo"
                                    className={
                                        paused ? "icon-play" : "icon-pause"
                                    }
                                    title="일시 정지 / 재생"
                                    aria-label="일시 정지 / 재생"
                                    onClick={this.toggleVideo}
                                ></button>
                                <button
                                    id="forward10"
                                    className="icon-forward"
                                    title="10초 빨리 감기"
                                    aria-label="10초 빨리 감기"
                                    onClick={() => {
                                        window.player.seekTo(
                                            Math.floor(
                                                window.player.getCurrentTime()
                                            ) + 10
                                        );
                                    }}
                                ></button>
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="song-info">
                            <div className="song-title">
                                {activated !== false &&
                                    data.tracks[activated].title}
                            </div>
                            <div className="song-artist">
                                {data.artist ? data.artist : "아이유"}
                            </div>
                            <div className="song-album">{data.name}</div>
                            {activated !== false &&
                            data.tracks[activated].video ? (
                                <div>
                                    <button
                                        className="icon-youtube-play"
                                        onClick={() => {
                                            this.pauseVideo();
                                            this.setState({
                                                videoRevealed: true,
                                            });
                                        }}
                                    ></button>
                                </div>
                            ) : (
                                ""
                            )}
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

                    {activated !== false &&
                    data.tracks[activated].video &&
                    videoRevealed ? (
                        <div className="video-popup">
                            <div
                                className="video-popup-closer"
                                onClick={() => {
                                    this.playVideo();
                                    this.setState({
                                        videoRevealed: false,
                                    });
                                }}
                            ></div>
                            <div className="video-wrapper">
                                <iframe
                                    width="560"
                                    height="315"
                                    title="Music Video Popup"
                                    src={`https://youtube.com/embed/${data.tracks[activated].video}?rel=0&playsinline=1&autoplay=1`}
                                ></iframe>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

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
