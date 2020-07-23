import React from "react";
import List from "../components/List";

export default function Discography() {
    return (
        <section id="discography" className="list grid max-1400">
            <List
                name="discography"
                uri={`${process.env.PUBLIC_URL}/data/album.json`}
                type="grid"
            />
        </section>
    );
}
