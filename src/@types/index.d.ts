declare global {
    interface Window {
        player: YT.Player;
        onYouTubeIframeAPIReady: () => unknown;
    }
}

export {};
