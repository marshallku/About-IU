const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(__dirname, "../../tmp.txt"), "utf8");
const parsed = JSON.parse(
    data
        .slice(
            data.indexOf('"tabs"'),
            data.lastIndexOf('"header":{"c4TabbedHeaderRenderer"') - 3
        )
        .replace('"tabs":', "")
);
const list = parsed[1].tabRenderer.content.richGridRenderer.contents;
const parsedList = list
    .filter((x) => !!x.richItemRenderer)
    .map(({ richItemRenderer }) => richItemRenderer.content.videoRenderer)
    .map(({ title, videoId }) => ({
        title: `${title.runs[0].text}`,
        videoId: `${videoId}`,
    }));

process.stdout.write(JSON.stringify(parsedList));
