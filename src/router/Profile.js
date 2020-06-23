import React from "react";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        document.body.classList.remove("home");
    }

    render() {
        return <section>Profile</section>;
    }
}

export default Profile;
