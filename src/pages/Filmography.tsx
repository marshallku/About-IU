import { useEffect } from "react";
import Loader from "../components/Loader";
import { useFilmographyStore } from "../store";
import "./Filmography.css";

export default function Filmography() {
    const { data, fetchList } = useFilmographyStore();

    useEffect(() => {
        fetchList();
    }, []);

    if (!data) {
        return <Loader />;
    }

    return (
        <section className="timeline max-1400 less-top-margin">
            {data.map(({ title, date, name, category, image, video }) => {
                return (
                    <article key={title} className="timeline-item">
                        <h2 className="timeline-item__title">
                            {title}
                            <time className="timeline-item__date">
                                ({date})
                            </time>
                        </h2>
                        <h3 className="timeline-item__name">{name}</h3>
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
                        <div className="timeline-item__category">
                            {category}
                        </div>
                    </article>
                );
            })}
        </section>
    );
}
