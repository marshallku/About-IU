import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import YoutubeVideo from "../components/YoutubeVideo";
import fcls from "../utils/fcls";
import "./DiscographyDetails.css";

function BackButton() {
    if (window.history.length > 1) {
        return (
            <button
                onClick={() => {
                    window.history.back();
                }}
                className="album__closer icon-times"
                aria-label="back"
            />
        );
    }

    return (
        <Link
            to="../Discography"
            className="album__closer icon-times"
            aria-label="back"
        />
    );
}

export default function DiscographyDetails() {
    const { album } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [activated, setActivated] = useState<number | false>(false);
    const [_videoRevealed, _setVideoRevealed] = useState<boolean>(false);
    const videoRevealed = useRef(_videoRevealed);
    const setVideoRevealed = (revealed: boolean) => {
        videoRevealed.current = revealed;
        _setVideoRevealed(revealed);
    };
    const [paused, setPaused] = useState<boolean>(false);
    const [videoScrolled, setVideoScrolled] = useState<boolean>(false);
    const [_prevScroll, _setPrevScroll] = useState(0);
    const prevScroll = useRef(_prevScroll);
    const setPrevScroll = (number: number) => {
        prevScroll.current = number;
        _setPrevScroll(number);
    };
    const [data, setData] = useState<discographyDetailJson>();
    const albumTitle = album ? decodeURI(album) : "";
    const coverImageUrl = `${
        import.meta.env.BASE_URL
    }/assets/images/album_cover/${album}.jpg`;

    const shrinkVideo = () => {
        if (!videoRevealed.current) {
            return;
        }

        const { scrollY } = window;

        setVideoScrolled(prevScroll.current < scrollY);
        setPrevScroll(scrollY);
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
        fetch(`${import.meta.env.BASE_URL}/data/albums/${album}.json`)
            .then((response) => {
                const contentType = response.headers.get("content-type");

                if (contentType && contentType.includes("json")) {
                    return response.json();
                }

                return "";
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

    return (
        <section
            className={fcls(
                "album",
                activated !== false && "album--lyric-revealed",
                loading && "loading"
            )}
        >
            <BackButton />
            <div
                className="album__back icon-arrow-left"
                onClick={() => {
                    setActivated(false);
                }}
            />
            <div
                className="album__bg"
                style={{
                    backgroundImage: `url("${coverImageUrl}")`,
                }}
            />
            <div className="album-cover">
                <figure className="album-cover__image">
                    <img src={coverImageUrl} alt={albumTitle} />
                </figure>
                {!!data && (
                    <>
                        <div
                            className={fcls(
                                "album-cover__player",
                                activated !== false &&
                                    data.tracks[activated].music &&
                                    "album-cover__player--revealed"
                            )}
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
                        {activated !== false && data.tracks[activated].music && (
                            <div className="album-cover__controller">
                                <button
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
                                />
                                <button
                                    className={`album-cover__play-button ${
                                        paused ? "icon-play" : "icon-pause"
                                    }`}
                                    title="일시 정지 / 재생"
                                    aria-label="일시 정지 / 재생"
                                    onClick={toggleVideo}
                                />
                                <button
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
                                />
                            </div>
                        )}
                        <div className="song-info">
                            <h2 className="song-info__title">
                                {activated !== false &&
                                    data.tracks[activated].title}
                            </h2>
                            <div className="song-info__artist">
                                {data.artist ? data.artist : "아이유"}
                            </div>
                            <div className="song-info__album">{albumTitle}</div>
                            {activated !== false &&
                                data.tracks[activated].video && (
                                    <div>
                                        <button
                                            className="icon-youtube-play"
                                            onClick={() => {
                                                pauseVideo();
                                                setVideoRevealed(true);
                                            }}
                                        />
                                    </div>
                                )}
                        </div>
                    </>
                )}
            </div>
            {!!data && (
                <>
                    <div
                        className="track-list"
                        style={{
                            maxHeight:
                                activated !== false
                                    ? 0
                                    : `${data.tracks.length * 2.5 + 2.3}rem`,
                        }}
                    >
                        <h2 className="track-list__title">수록곡</h2>
                        <ul>
                            {data.tracks.map((track, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            setActivated(index);
                                        }}
                                        className="track-list__song"
                                    >
                                        {track.title}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div
                        className={fcls(
                            "lyric-list",
                            activated !== false && "lyric-list--revealed"
                        )}
                    >
                        {data.lyrics.map((lyric, index) => {
                            return (
                                <div
                                    key={index}
                                    className={fcls(
                                        "lyric-list__item",
                                        activated === index &&
                                            "lyric-list__item--revealed"
                                    )}
                                >
                                    {lyric}
                                </div>
                            );
                        })}
                    </div>
                    {activated !== false &&
                        data.tracks[activated].video &&
                        videoRevealed.current && (
                            <div
                                className={fcls(
                                    "video-popup",
                                    videoScrolled && "video-popup--scrolled"
                                )}
                            >
                                <div
                                    className="video-popup__closer"
                                    onClick={() => {
                                        playVideo();
                                        setVideoRevealed(false);
                                        setVideoScrolled(false);
                                    }}
                                />
                                <div className="video-popup__container">
                                    <div className="video-popup__ratio-container">
                                        <iframe
                                            width="560"
                                            height="315"
                                            title="Music Video Popup"
                                            src={`https://youtube.com/embed/${data.tracks[activated].video}?rel=0&playsinline=1&autoplay=1`}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                </>
            )}
            <svg width="0" height="0">
                <defs>
                    <filter id="blur" x="0" y="0" width="100%" height="100%">
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
