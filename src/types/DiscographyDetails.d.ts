interface discographyDetailJson {
    name: string;
    artist?: string;
    image: string;
    tracks: [
        {
            title: string;
            music: string;
            video?: string;
        }
    ];
    lyrics: [string];
}
