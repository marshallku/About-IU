import React from "react";
import { withRouter } from "react-router-dom";

class BodyClassUpdater extends React.Component {
    update() {
        const pathname = window.location.pathname;

        document.body.className =
            pathname === "/IU/"
                ? "home"
                : pathname.indexOf("discography/") === -1
                ? window.location.pathname.replace("/IU/", "")
                : "lyrics";
    }

    componentDidMount() {
        this.update();
    }

    componentWillUpdate({ location, history }) {
        if (location.pathname === this.props.location.pathname) {
            return;
        }

        if (history.action === "PUSH") {
            this.update();
        }
    }

    render() {
        return null;
    }
}

export default withRouter(BodyClassUpdater);
