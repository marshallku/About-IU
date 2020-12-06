import React from "react";
import "./Profile.css";

export default function Profile() {
    const ImgURL = `${process.env.PUBLIC_URL}/assets/images/IU`;
    return (
        <section id="profile">
            <picture id="profileBG">
                <source
                    media="(max-width: 1500px)"
                    srcSet={`${ImgURL}-1500w.jpg`}
                />
                <source
                    media="(max-width: 1920px)"
                    srcSet={`${ImgURL}-1920w.jpg`}
                />
                <img src={`${ImgURL}.jpg`} alt="아이유" />
            </picture>
            <div className="mainInfo">
                <h1>아이유 / IU</h1>
                <h2>이지은</h2>
                <div>생년월일 : 1993.05.16</div>
            </div>
        </section>
    );
}
