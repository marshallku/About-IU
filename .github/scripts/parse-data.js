(async () => {
    const data = process.argv.filter((_, i) => i > 1).join("");
    const parsed = JSON.parse(
        data
            .slice(data.indexOf('"tabs"'), data.indexOf('"header') - 3)
            .replace('"tabs":', "")
    );
    const list =
        parsed[1].tabRenderer.content.sectionListRenderer.contents[0]
            .itemSectionRenderer.contents[0].gridRenderer.items;
    const parsedList = list
        .filter(
            (x) => !!x.gridVideoRenderer
        )
        .map(
            ({ gridVideoRenderer }) => gridVideoRenderer
        )
        .map(
            ({
                title,
                videoId,
                viewCountText,
                publishedTimeText,
            }) => ({
                title: `${title.runs[0].text}`,
                videoId: `${videoId}`,
                viewCount: `${viewCountText.simpleText}`,
                publishedAt: `${publishedTimeText.simpleText}`,
            })
        );

    process.stdout.write(JSON.stringify(parsedList))
})();


