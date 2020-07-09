import React from "react";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        document.body.classList.remove("hideHeader", "home");
    }

    render() {
        return <section id="profile">Profile</section>;
    }
}

export default Profile;
