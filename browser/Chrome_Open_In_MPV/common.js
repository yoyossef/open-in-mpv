const options = [
    new Option("iconAction", "radio", "clickOnly"),
    new Option("iconActionOption", "radio", "direct"),
];

export function openInMPV(tabId, url = {}) {
    const baseURL = `ytdl://`;
    const params = [`${encodeURIComponent(url)}`];
    const code = `
        var link = document.createElement('a');
        link.href='${baseURL}${params.join("&")}';
        document.body.appendChild(link);
        link.click();
        `;
    chrome.tabs.executeScript(tabId, { code });
}

export function updateBrowserAction() {
            chrome.browserAction.onClicked.addListener(() => {
                // get active window
                chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
                    if (tabs.length === 0) { return; }
                    // TODO: filter url
                    const tab = tabs[0];
                    if (tab.id === chrome.tabs.TAB_ID_NONE) { return; }
                    openInMPV(tab.id, tab.url, {
                        mode: options.iconActionOption,
                    });
                });
            });
}