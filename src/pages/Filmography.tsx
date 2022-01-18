import List from "../components/List";
import "./Filmography.css";

export default function Filmography() {
    return (
        <section
            id="filmography"
            className="list timeline max-1400 less-top-margin"
        >
            <List
                name="filmography"
                uri={`${process.env.PUBLIC_URL}/data/filmography.json`}
                type="timeline"
            />
        </section>
    );
}
