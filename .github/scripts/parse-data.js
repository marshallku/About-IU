const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "../../tmp.txt"), "utf8");
const parsed = JSON.parse(
    data
        .slice(data.indexOf('"tabs"'), data.indexOf('"header') - 3)
        .replace('"tabs":', "")
);
const list =
    parsed[1].tabRenderer.content.sectionListRenderer.contents[0]
        .itemSectionRenderer.contents[0].gridRenderer.items;
const parsedList = list
    .filter((x) => !!x.gridVideoRenderer)
    .map(({ gridVideoRenderer }) => gridVideoRenderer)
    .map(({ title, videoId }) => ({
        title: `${title.runs[0].text}`,
        videoId: `${videoId}`,
    }));

process.stdout.write(JSON.stringify(parsedList));
