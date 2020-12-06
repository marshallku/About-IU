import React from "react";
import Loading from "../components/Loading";
import "./Instagram.css";

interface InstagramProps {}

export default class Instagram extends React.Component<
    InstagramProps,
    {
        isStored: boolean;
    }
> {
    constructor(props: InstagramProps) {
        super(props);
        this.state = {
            isStored: !!window.inList,
        };
    }

    componentDidMount() {
        fetch("https://www.instagram.com/dlwlrma/")
            .then((response) => {
                return response.text();
            })
            .then((response) => {
                if (response.indexOf("edge_owner_to_timeline_media") !== -1) {
                    const media = JSON.parse(
                        response.slice(
                            response.indexOf("edge_owner_to_timeline_media") +
                                30,
                            response.indexOf("edge_saved_media") - 2
                        )
                    );
                    const { edges } = media;

                    edges && (window.inList = edges);
                    this.setState({
                        isStored: true,
                    });
                }
            });
    }

    render() {
        if (this.state.isStored) {
            return (
                <section id="instagram">
                    <div id="info" className="center">
                        <img
                            className="circle"
                            src={`${process.env.PUBLIC_URL}/assets/images/insta_profile.jpg`}
                            alt="이지금"
                        ></img>
                        <h1>dlwlrma</h1>
                        <a
                            href="https://www.instagram.com/dlwlrma/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            인스타 바로가기
                        </a>
                    </div>
                    <div id="inList" className="flex">
                        {window.inList.map((post: any, index: number) => {
                            const { node } = post;
                            return (
                                <a
                                    key={index}
                                    href={`https://www.instagram.com/p/${node.shortcode}/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={node.display_url}
                                        alt={node.accessibility_caption}
                                    />
                                </a>
                            );
                        })}
                    </div>
                </section>
            );
        } else {
            return <Loading />;
        }
    }
}
