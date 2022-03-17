import create from "zustand";

const useYoutubeStore = create<YoutubeStore>((set) => ({
    fetchList: async () => {
        const response = await fetch(
            "/get?uri=https://www.youtube.com/c/dlwlrma/videos"
        );
        const text = await response.text();

        const parsed = JSON.parse(
            text
                .slice(text.indexOf('"tabs"'), text.indexOf('"header') - 3)
                .replace('"tabs":', "")
        );
        const ytList =
            parsed[1].tabRenderer.content.sectionListRenderer.contents[0]
                .itemSectionRenderer.contents[0].gridRenderer.items;

        set((state) => ({
            ...state,
            data: ytList
                .filter(
                    (x: { gridVideoRenderer: any }) => !!x.gridVideoRenderer
                )
                .map(
                    ({
                        title,
                        videoId,
                        viewCountText,
                        publishedTimeText,
                    }: {
                        title: any;
                        videoId: any;
                        viewCountText: any;
                        publishedTimeText: any;
                    }) => ({
                        title: `${title.runs[0].text}`,
                        videoId: `${videoId}`,
                        viewCount: `${viewCountText.simpleText}`,
                        publishedAt: `${publishedTimeText.simpleText}`,
                    })
                ),
        }));
    },
}));

export default useYoutubeStore;
