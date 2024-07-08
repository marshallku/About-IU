const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

const data = fs.readFileSync(path.resolve(__dirname, "../../tmp.txt"), "utf8");
const {
    window: { document },
} = new JSDOM(data);

const targetScript = [...document.querySelectorAll("script")]
    .map((x) => x.innerHTML)
    .find((x) => x.includes("ytInitialData") && x.includes("i.ytimg.com"));

if (!targetScript) {
    return;
}

const tryParseYoutubeData = (data) => {
    const vm = require("vm");

    const context = {};
    vm.createContext(context);

    const scriptContent = `
    (function() {
      ${data}
      if (typeof ytInitialData !== 'undefined') {
        return ytInitialData;
      }
    })()
  `;

    try {
        const script = new vm.Script(scriptContent);
        const ytInitialData = script.runInContext(context);

        return ytInitialData;
    } catch (error) {
        return null;
    }
};

const parsedData = tryParseYoutubeData(targetScript);
const list = parsedData?.contents?.twoColumnBrowseResultsRenderer?.tabs?.find(
    (x) => typeof x === "object" && x.tabRenderer?.content
).tabRenderer.content?.richGridRenderer?.contents;

if (!list || !Array.isArray(list)) {
    return;
}

const parsedList = list
    .filter((x) => !!x?.richItemRenderer)
    .map(({ richItemRenderer }) => richItemRenderer?.content?.videoRenderer)
    .filter((x) => !!x && typeof x === "object" && x.title && x.videoId)
    .map(({ title, videoId }) => ({
        title: `${title.runs[0].text}`,
        videoId: `${videoId}`,
    }));

if (!parsedList.length) {
    return;
}

process.stdout.write(JSON.stringify(parsedList));
