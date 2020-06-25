import React from "react";
import List from "../components/List";

class Discography extends React.Component {
    constructor(props) {
        super(props);
        document.body.classList.remove("home");
    }

    render() {
        return (
            <section id="discography">
                <List uri="album" />
            </section>
        );
    }
}

export default Discography;
