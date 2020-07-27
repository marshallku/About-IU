import React from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import "./List.css";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStored: !!window[this.props.name],
        };
    }

    componentDidMount() {
        if (!this.state.isStored) {
            fetch(this.props.uri)
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    window[this.props.name] = response;
                    this.setState({
                        isStored: true,
                    });
                });
        }
    }

    render() {
        const { name, type } = this.props;

        if (this.state.isStored) {
            if (type === "grid") {
                return window[name].map((item, index) => {
                    return (
                        <Link
                            key={index}
                            to={{
                                pathname: `${process.env.PUBLIC_URL}/Discography/${item.name}`,
                                state: {
                                    fromList: true,
                                },
                            }}
                            className="grid-item"
                            data-language={item.language}
                        >
                            <div
                                className="grid-item-bg"
                                style={{
                                    backgroundImage: `url("${
                                        process.env.PUBLIC_URL
                                    }${`/assets/images/cover/${item.name}.jpg`}")`,
                                }}
                            ></div>
                            <div className="grid-item-content">
                                <div>{item.category}</div>
                                <h3>{item.name}</h3>
                                <time>{item.releaseDate}</time>
                            </div>
                        </Link>
                    );
                });
            } else if (type === "timeline") {
                return window[name].map((item, index) => {
                    return (
                        <div key={index} className="timeline-item">
                            <h2 className="title">
                                {item.title}
                                <time className="date">({item.date})</time>
                            </h2>
                            <h3 className="name">{item.name}</h3>
                            {item.image ? (
                                <img src={item.image} alt={item.title} />
                            ) : (
                                <video
                                    autoPlay
                                    playsInline
                                    loop
                                    muted
                                    src={item.video}
                                ></video>
                            )}
                            <div className="category">{item.category}</div>
                        </div>
                    );
                });
            } else {
                return null;
            }
        } else {
            return <Loading />;
        }
    }
}

export default List;
