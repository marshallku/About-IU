import React from "react";
import "./Profile.css";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        document.body.classList.remove("hideHeader", "home");
    }

    componentDidMount = () => {
        this.setState({
            mounted: true,
        });
    };

    render() {
        return (
            <section id="profile">
                <div className="mainInfo">
                    <div className="profileImgWrap">
                        <img src="/assets/images/profile.jpeg" alt="profile" />
                    </div>
                    <h1>아이유 IU</h1>
                    <h2>이지은</h2>
                </div>
            </section>
        );
    }
}

export default Profile;
