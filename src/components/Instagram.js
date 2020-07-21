import React from "react";
import "./Instagram.css";

export default class Instagram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
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

                    this.setState({
                        posts: edges,
                        isLoading: false,
                    });
                }
            });
    }

    render() {
        if (this.state.isLoading) {
            return null;
        } else {
            return (
                <div id="instagram" className="flex">
                    {this.state.posts.map((post, index) => {
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
            );
        }
    }
}
