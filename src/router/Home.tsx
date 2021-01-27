import React from "react";
import YoutubeVideo from "../components/YoutubeVideo";
import "./Home.css";

interface HomeProps {}

export default class Home extends React.Component<
    HomeProps,
    {
        scrolled: boolean;
        video: string;
    }
> {
    constructor(props: HomeProps) {
        super(props);

        const mvList = [
            "TgOu00Mf3kI",
            "D1PvIWdJ8xo",
            "R3Fwdnij49o",
            "nM0xDI5R50E",
            "cxcxskPKtiI",
            "Rh5ok0ljrzA",
            "d9IxdwEFk1c",
            "BzYnNdJhZQw",
            "42Gtm4-Ax2U",
            "GHu39FEFIks",
            "npttud7NkL0",
            "EiVmQZwJhsA",
            "Q0xvVgKJxfs",
            "HiIjdaSlFug",
            "Ct8NZdYWOFI",
            "AWtwkrGpp4w",
            "f_iQRO5BdCM",
            "8fCksQtuVek",
            "qGWZUtfV3IU",
            "jeqdYqsrsA0",
        ];

        this.state = {
            scrolled: window.scrollY > 0,
            video: mvList[Math.round(Math.random() * (mvList.length - 1))],
        };
    }

    onScroll = () => {
        window.scrollY === 0
            ? this.setState({
                  scrolled: false,
              })
            : this.state.scrolled ||
              this.setState({
                  scrolled: true,
              });
    };

    toggleMute = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = event.target as HTMLElement;
        if (typeof window.player.mute === "function") {
            if (window.player.isMuted()) {
                window.player.unMute();
                target.classList.remove("disabled");
            } else {
                window.player.mute();
                target.classList.add("disabled");
            }
        }
    };

    componentDidMount() {
        window.addEventListener("scroll", this.onScroll, { passive: true });
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll);
    }

    render() {
        const { video } = this.state;
        return (
            <section id="home">
                <div id="homeVideo">
                    <div className="videoWrapper">
                        <YoutubeVideo
                            id={video}
                            vars={{
                                rel: 0,
                                loop: 1,
                                playsinline: 1,
                                playlist: video,
                                controls: 0,
                                showinfo: 0,
                            }}
                            mute={true}
                        />
                    </div>
                </div>
                <div
                    id="ringWrap"
                    style={this.state.scrolled ? { opacity: 0 } : {}}
                >
                    <ul className="text-ring">
                        <li>
                            <span role="img" aria-label="purple heart">
                                💜
                            </span>
                        </li>
                        <li>아</li>
                        <li>이</li>
                        <li>유</li>
                        <li>
                            <span role="img" aria-label="purple heart">
                                💜
                            </span>
                        </li>
                        <li>참</li>
                        <li>
                            <span role="img" aria-label="purple heart">
                                💜
                            </span>
                        </li>
                        <li>좋</li>
                        <li>다</li>
                        <li>
                            <span role="img" aria-label="purple heart">
                                💜
                            </span>
                        </li>
                        <li>*</li>
                        <li>*</li>
                    </ul>
                </div>
                <button
                    id="toggleMute"
                    aria-label="음소거 / 해제"
                    className="icon-note disabled"
                    onClick={this.toggleMute}
                ></button>
            </section>
        );
    }
}
