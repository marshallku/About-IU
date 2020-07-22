import React from "react";
import { Link } from "react-router-dom";
import "./List.css";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        fetch(this.props.uri)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    list: response,
                });
            });
    }

    render() {
        const { isLoading, list } = this.state;
        const { type } = this.props;

        if (!isLoading) {
            if (type === "grid") {
                return list.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            to={`${process.env.PUBLIC_URL}/Discography/${item.name}`}
                            className="grid-item"
                            data-language={item.language}
                        >
                            <div
                                className="grid-item-bg"
                                style={{
                                    backgroundImage: `url(${process.env.PUBLIC_URL}${item.image})`,
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
                return list.map((item, index) => {
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
            return null;
        }
    }
}

export default List;
