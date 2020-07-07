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
                            to={`/discography/${item.name}`}
                            className="grid-item"
                            data-language={item.language}
                            style={{
                                backgroundImage: `url(${item.image})`,
                            }}
                        >
                            <div className="grid-item-content">
                                <div>{item.category}</div>
                                <h3>{item.name}</h3>
                                <time>{item.releaseDate}</time>
                            </div>
                        </Link>
                    );
                });
            } else {
                return list.map((item, index) => {
                    return (
                        <div key={index} className="thumb-item">
                            <div
                                className="bg"
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                }}
                            ></div>
                            <div className="detail">
                                <div className="title">{item.title}</div>
                                <h3 className="name">{item.name}</h3>
                                <div className="category">{item.category}</div>
                            </div>
                        </div>
                    );
                });
            }
        } else {
            return null;
        }
    }
}

export default List;
