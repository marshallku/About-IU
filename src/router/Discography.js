import React from "react";
import List from "../components/List";

class Discography extends React.Component {
    constructor(props) {
        super(props);
        document.body.classList.remove("home");
    }

    render() {
        return (
            <section id="discography" className="list grid max-1400">
                <List uri="/data/album.json" type="grid" />
            </section>
        );
    }
}

export default Discography;
