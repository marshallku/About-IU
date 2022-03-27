interface YoutubeItem {
    title: string;
    videoId: string;
}

type YoutubeList = YoutubeItem[];

interface YoutubeStore {
    data?: YoutubeList;
    fetchList: () => Promise<void>;
}
