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
                <List
                    uri={`${process.env.PUBLIC_URL}/data/filmography.json`}
                    type="thumbBg"
                />
            </section>
        );
    }
}

export default Filmography;
