import { useEffect } from "react";
import Loading from "../components/Loading";
import { useFilmographyStore } from "../store";
import "./Filmography.css";

export default function Filmography() {
    const { data, fetchList } = useFilmographyStore();

    useEffect(() => {
        fetchList();
    }, []);

    if (!data) {
        return <Loading />;
    }

    return (
        <section className="list timeline max-1400 less-top-margin">
            {data.map(({ title, date, name, category, image, video }) => {
                return (
                    <div key={title} className="timeline-item">
                        <h2 className="title">
                            {title}
                            <time className="date">({date})</time>
                        </h2>
                        <h3 className="name">{name}</h3>
                        {image ? (
                            <img src={image} alt={title} />
                        ) : video ? (
                            <video
                                autoPlay
                                playsInline
                                loop
                                muted
                                src={video}
                            ></video>
                        ) : null}
                        <div className="category">{category}</div>
                    </div>
                );
            })}
        </section>
    );
}
