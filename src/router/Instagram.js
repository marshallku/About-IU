import React from "react";
import Loading from "../components/Loading";
import "./Instagram.css";

export default class Instagram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStored: !!window["inList"],
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

                    edges && (window["inList"] = edges);
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
                            src="https://scontent-gmp1-1.cdninstagram.com/v/t51.2885-19/s150x150/28434316_190831908314778_1954023563480530944_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com&_nc_ohc=9uJiGWpgGHAAX8hcoXP&oh=859e6154b55b2a0befaf5a3913a3fe9d&oe=5F42BB60"
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
                        {window["inList"].map((post, index) => {
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
