import { updateBrowserAction, openInMPV } from "./common.js";

updateBrowserAction();

[["page", "url"], ["link", "linkUrl"], ["video", "srcUrl"], ["audio", "srcUrl"]].forEach(([item, linkType]) => {
    chrome.contextMenus.create({
        title: `Open this ${item} in MPV`,
        id: `open${item}inmpv`,
        contexts: [item],
        onclick: (info, tab) => {
            openInMPV(tab.id, info[linkType]);
        },
    });
});
