import React from "react";
import List from "../components/List";

export default class Discography extends React.Component {
    constructor(props) {
        super(props);
        document.body.classList.remove("hideHeader");
    }

    render() {
        return (
            <section id="discography" className="list grid max-1400">
                <List
                    uri={`${process.env.PUBLIC_URL}/data/album.json`}
                    type="grid"
                />
            </section>
        );
    }
}
