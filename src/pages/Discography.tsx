import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useDiscographyStore } from "../store";
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
                        target.classList.add("animate--active");
                        return;
                    }

                    target.classList.remove("animate--active");
                });
            }),
        []
    );

    useEffect(() => {
        fetchList();
    }, []);

    if (!data) {
        return <Loading />;
    }

    return (
        <section className="list grid max-1060">
            {data.map(({ name, category, releaseDate }) => (
                <Link
                    key={name}
                    to={`/Discography/${name}`}
                    className="grid-item animate"
                    ref={observe}
                >
                    <div
                        className="grid-item-bg"
                        style={{
                            backgroundImage: `url("${
                                import.meta.env.BASE_URL
                            }${`/assets/images/album_cover/${name}.jpg`}")`,
                        }}
                    ></div>
                    <div className="grid-item-content">
                        <div>{category}</div>
                        <h3>{name}</h3>
                        <time>{releaseDate}</time>
                    </div>
                </Link>
            ))}
        </section>
    );
}
