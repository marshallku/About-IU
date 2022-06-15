import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDiscographyStore } from "../store";
import Loader from "../components/Loader";
import "./Discography.css";

export default function Discography() {
    const { data, fetchList } = useDiscographyStore();
    const observe = (element: HTMLElement | null) => {
        if (!element) {
            return;
        }

        observer.observe(element);
    };
    const observer = useMemo(
        () =>
            new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const { target, isIntersecting } = entry;

                    if (isIntersecting) {
                        target.classList.add("grid-item--active");
                        return;
                    }

                    target.classList.remove("grid-item--active");
                });
            }),
        []
    );

    useEffect(() => {
        fetchList();
    }, []);

    if (!data) {
        return <Loader />;
    }

    return (
        <section className="grid max-1060">
            {data.map(({ name, category, releaseDate }) => (
                <article key={name} className="grid-item" ref={observe}>
                    <Link to={`/Discography/${name}`}>
                        <div
                            className="grid-item__bg"
                            style={{
                                backgroundImage: `url("${
                                    import.meta.env.BASE_URL
                                }/assets/images/album_cover/${name}.jpg")`,
                            }}
                        />
                        <header className="grid-item__content">
                            <div>{category}</div>
                            <h2 className="grid-item__title">{name}</h2>
                            <time>{releaseDate}</time>
                        </header>
                    </Link>
                </article>
            ))}
        </section>
    );
}
