export {};

declare global {
    interface Window {
        player: YT.Player;
        ytList: any;
        inList: any;
        filmography: any;
        discography: any;
        onYouTubeIframeAPIReady: Function;
    }
}
