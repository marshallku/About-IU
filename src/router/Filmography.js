import React from "react";
import List from "../components/List";

class Filmography extends React.Component {
    constructor(props) {
        super(props);
        document.body.classList.remove("hideHeader", "home");
    }

    render() {
        return (
            <section id="filmography" className="list thumbBg max-1400">
                <List uri="/data/filmography.json" type="thumbBg" />
            </section>
        );
    }
}

export default Filmography;
