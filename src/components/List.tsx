import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import "./List.css";

export default function List(props: ListProps) {
    const [stored, setStored] = useState<boolean>(!!window[props.name]);
    const { name, type, animate } = props;
    const observe = (element: HTMLElement | null) => {
        if (element && animate) observer.observe(element);
    };
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const target = entry.target;
            if (entry.isIntersecting) {
                target.classList.add("animate--active");
            } else {
                target.classList.remove("animate--active");
            }
        });
    });

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
                        to={`${process.env.PUBLIC_URL}/Discography/${item.name}`}
                        className={`grid-item ${animate ? "animate" : ""}`}
                        data-language={item.language}
                        ref={observe}
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
                    <div
                        key={index}
                        className={`timeline-item ${animate ? "animate" : ""}`}
                        ref={observe}
                    >
                        <h2 className="title">
                            {item.title}
                            <time className="date">({item.date})</time>
                        </h2>
                        <h3 className="name">{item.name}</h3>
                        {item.image ? (
                            <img src={item.image} alt={item.title} />
                        ) : item.video ? (
                            <video
                                autoPlay
                                playsInline
                                loop
                                muted
                                src={item.video}
                            ></video>
                        ) : null}
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
