interface YoutubeItem {
    title: string;
    videoId: string;
    viewCount: string;
    publishedAt: string;
}

type YoutubeList = YoutubeItem[];

interface YoutubeStore {
    data?: YoutubeList;
    fetchList: () => Promise<void>;
}
