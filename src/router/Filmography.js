import React from "react";
import List from "../components/List";

export default class Filmography extends React.Component {
    constructor(props) {
        super(props);
        document.body.classList.remove("hideHeader");
    }

    render() {
        return (
            <section
                id="filmography"
                className="list timeline max-1400 less-top-margin"
            >
                <List
                    uri={`${process.env.PUBLIC_URL}/data/filmography.json`}
                    type="timeline"
                />
            </section>
        );
    }
}
