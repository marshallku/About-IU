import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import "./List.css";

interface ListProps {
    name: "filmography" | "discography";
    uri: string;
    type: string;
}

export default function List(props: ListProps) {
    const { name, type } = props;
    const [stored, setStored] = useState<boolean>(!!window[props.name]);

    useEffect(() => {
        if (!stored) {
            fetch(props.uri)
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    window[props.name] = response;
                    setStored(true);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (stored) {
        if (type === "grid") {
            return window[name].map((item: any, index: number) => {
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
                                }${`/assets/images/album_cover/${item.name}.jpg`}")`,
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
            return window[name].map((item: any, index: number) => {
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
