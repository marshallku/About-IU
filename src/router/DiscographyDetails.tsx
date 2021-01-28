import React, { useState, useEffect } from "react";
import * as H from "history";
import { Link, RouteComponentProps } from "react-router-dom";
import YoutubeVideo from "../components/YoutubeVideo";
import "./DiscographyDetails.css";

interface BackButtonProps {
    location: H.Location;
}

function BackButton(props: BackButtonProps) {
    if (props.location.state) {
        return (
            <button
                onClick={() => {
                    window.history.back();
                }}
                className="album-closer icon-times"
                aria-label="back"
            ></button>
        );
    } else {
        return (
            <Link
                to="../Discography"
                className="album-closer icon-times"
                aria-label="back"
            ></Link>
        );
    }
}

export default function DiscographyDetails(props: RouteComponentProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [activated, setActivated] = useState<number | false>(false);
    const [videoRevealed, setVideoRevealed] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(false);
    const [videoScrolled, setVideoScrolled] = useState<boolean>(false);
    const [data, setData] = useState<discographyDetailJson>();

    const { pathname } = window.location;
    const albumTitle = decodeURI(
        pathname.slice(pathname.lastIndexOf("/") + 1, pathname.length)
    );
    const coverImageUrl = `${process.env.PUBLIC_URL}/assets/images/album_cover/${albumTitle}.jpg`;
    let prevScroll = 0;

    const shrinkVideo = () => {
        if (!videoRevealed) return;

        setVideoScrolled(prevScroll < window.scrollY);
        prevScroll = window.scrollY;
    };

    const pauseVideo = () => {
        setPaused(true);
        window.player.pauseVideo();
    };

    const playVideo = () => {
        setPaused(false);
        window.player.playVideo();
    };

    const toggleVideo = () => {
        if (paused) {
            playVideo();
        } else {
            pauseVideo();
        }
    };

    useEffect(() => {
        const data = `${props.location.pathname.replace(
            "Discography",
            "data/albums"
        )}.json`;

        fetch(data)
            .then((response) => {
                const contentType = response.headers.get("content-type");

                if (contentType && contentType.includes("json")) {
                    return response.json();
                } else {
                    return "";
                }
            })
            .then((response: discographyDetailJson) => {
                if (response) {
                    setLoading(false);
                    setData(response);
                }
            });

        window.addEventListener("scroll", shrinkVideo, { passive: true });

        return () => {
            window.removeEventListener("scroll", shrinkVideo);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!loading && data) {
        return (
            <section
                id="discographyDetail"
                className={activated !== false ? "lyric-activated" : ""}
            >
                <BackButton location={props.location} />
                <div
                    className="back-to-tracklist icon-arrow-left"
                    onClick={() => {
                        setActivated(false);
                    }}
                ></div>
                <div
                    className="album-bg"
                    style={{
                        backgroundImage: `url("${coverImageUrl}")`,
                    }}
                ></div>
                <div className="album-art">
                    <div id="albumart">
                        <img
                            src={coverImageUrl}
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
                                        ) - 10,
                                        false
                                    );
                                }}
                            ></button>
                            <button
                                id="playVideo"
                                className={paused ? "icon-play" : "icon-pause"}
                                title="일시 정지 / 재생"
                                aria-label="일시 정지 / 재생"
                                onClick={toggleVideo}
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
                                        ) + 10,
                                        false
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
                        {activated !== false && data.tracks[activated].video ? (
                            <div>
                                <button
                                    className="icon-youtube-play"
                                    onClick={() => {
                                        pauseVideo();
                                        setVideoRevealed(true);
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
                                            setActivated(index);
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
                    className={`lyrics ${activated !== false ? "reveal" : ""}`}
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
                data &&
                data.tracks[activated].video &&
                videoRevealed ? (
                    <div
                        className={`video-popup${
                            videoScrolled ? " scrolled" : ""
                        }`}
                    >
                        <div
                            className="video-popup-closer"
                            onClick={() => {
                                playVideo();
                                setVideoRevealed(false);
                                setVideoScrolled(false);
                            }}
                        ></div>
                        <div className="video-wrapper">
                            <div className="iframe-wrapper">
                                <iframe
                                    width="560"
                                    height="315"
                                    title="Music Video Popup"
                                    src={`https://youtube.com/embed/${data.tracks[activated].video}?rel=0&playsinline=1&autoplay=1`}
                                ></iframe>
                            </div>
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
                                <feFuncA type="discrete" tableValues="1 1" />
                            </feComponentTransfer>
                        </filter>
                    </defs>
                </svg>
            </section>
        );
    } else {
        return (
            <section id="discographyDetail" className="loading">
                <BackButton location={props.location} />
                <div
                    className="back-to-tracklist icon-arrow-left"
                    onClick={() => {
                        setActivated(false);
                    }}
                ></div>
                <div
                    className="album-bg"
                    style={{
                        backgroundImage: `url("${coverImageUrl}")`,
                    }}
                ></div>
                <div className="album-art">
                    <div id="albumart">
                        <img
                            src={coverImageUrl}
                            className="album-art-img"
                            alt={albumTitle}
                        />
                    </div>
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
                                <feFuncA type="discrete" tableValues="1 1" />
                            </feComponentTransfer>
                        </filter>
                    </defs>
                </svg>
            </section>
        );
    }
}
