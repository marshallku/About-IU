import React from "react";
import "./Profile.css";

export default function Profile() {
    return (
        <section id="profile">
            <div
                id="profileBG"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/IU.jpg)`,
                }}
            ></div>
            <div className="mainInfo">
                <h1>아이유 / IU</h1>
                <h2>이지은</h2>
                <div>생년월일 : 1993.05.16</div>
            </div>
        </section>
    );
}
