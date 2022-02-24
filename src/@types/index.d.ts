declare global {
    interface Window {
        player: YT.Player;
        ytList: any;
        filmography: any;
        discography: any;
        onYouTubeIframeAPIReady: Function;
    }
}

export {};
