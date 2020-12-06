import React from "react";
import YoutubeVideo from "../components/YoutubeVideo";
import Loading from "../components/Loading";
import "./Youtube.css";

interface YoutubeProps {}

export default class Youtube extends React.Component<
    YoutubeProps,
    {
        isStored: boolean;
        videoId?: string;
        error?: boolean;
    }
> {
    constructor(props: YoutubeProps) {
        super(props);
        this.state = {
            isStored: !!window.ytList,
        };
    }

    fullScreen(videoId: string) {
        const html = document.documentElement;
        html.requestFullscreen();
        window.screen.orientation.lock("landscape-primary").catch(() => {
            return null;
        });
        html.classList.add("overHidden");
        this.setState({
            videoId: videoId,
        });
    }

    handleFullScreenChange() {
        if (!document.fullscreenElement) {
            document.documentElement.classList.remove("overHidden");
            this.setState({
                videoId: undefined,
            });
        }
    }

    componentDidMount() {
        document.addEventListener("fullscreenchange", () => {
            this.handleFullScreenChange();
        });

        if (!this.state.isStored) {
            fetch(
                "https://marshall-ku.com/get?uri=https://www.youtube.com/c/dlwlrma/videos"
            )
                .then((response) => {
                    return response.text();
                })
                .then((response) => {
                    try {
                        const parsed = JSON.parse(
                            response
                                .slice(
                                    response.indexOf("tabs"),
                                    response.indexOf('"header') - 3
                                )
                                .replace('tabs":', "")
                        );
                        const ytList =
                            parsed[1].tabRenderer.content.sectionListRenderer
                                .contents[0].itemSectionRenderer.contents[0]
                                .gridRenderer.items;

                        ytList && (window.ytList = ytList);
                        this.setState({
                            isStored: true,
                        });
                    } catch (err) {
                        this.setState({
                            error: true,
                        });
                    }
                });
        }
    }

    componentWillUnmount() {
        document.removeEventListener(
            "fullscreenchange",
            () => this.handleFullScreenChange
        );
    }

    render() {
        const { videoId } = this.state;
        if (this.state.isStored) {
            return (
                <section id="youtube" className="max-1400">
                    <div id="info" className="center">
                        <img
                            className="circle"
                            src="https://yt3.ggpht.com/a/AATXAJzM1nsL7mNxOXuc626lhqXuKxjJW-Z6H4Elern5lw=s150-c-k-c0xffffffff-no-rj-mo"
                            alt="이지금"
                        ></img>
                        <h1>이지금 [IU Official]</h1>
                        <a
                            href="https://www.youtube.com/c/dlwlrma/featured"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            채널 바로가기
                        </a>
                    </div>
                    <div id="ytList" className="flex">
                        {window.ytList.map((itemObj: any) => {
                            const item = itemObj.gridVideoRenderer;
                            const title = item.title.runs[0].text;

                            return (
                                <span
                                    key={item.videoId}
                                    onClick={() => {
                                        this.fullScreen(item.videoId);
                                    }}
                                    className="ytItem"
                                >
                                    <div className="thumbnail">
                                        <img
                                            src={`https://i.ytimg.com/vi/${item.videoId}/sddefault.jpg`}
                                            alt={title}
                                        />
                                    </div>
                                    <div className="details">
                                        <h2>{title}</h2>
                                        <div>
                                            <span>
                                                {item.viewCountText.simpleText}
                                            </span>
                                            <span className="dot">•</span>
                                            <span>
                                                {
                                                    item.publishedTimeText
                                                        .simpleText
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </span>
                            );
                        })}
                    </div>
                    {videoId && (
                        <div id="popup">
                            <YoutubeVideo
                                id={videoId}
                                vars={{
                                    rel: 0,
                                    loop: 1,
                                    playsinline: 1,
                                    controls: 1,
                                    showinfo: 1,
                                }}
                            />
                        </div>
                    )}
                </section>
            );
        } else {
            if (this.state.error) {
                return (
                    <section>
                        <div className="center">
                            뭔가 잘못됐어요{" "}
                            <span role="img" aria-label="ㅠㅠ">
                                😰
                            </span>
                        </div>
                    </section>
                );
            } else {
                return <Loading />;
            }
        }
    }
}
