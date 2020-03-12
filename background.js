chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {
        file: "c2c.js"
    }, function() {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        }
    });
});

// chrome.browserAction.onClicked.addListener(function() {
//    chrome.windows.create({'url': 'popup.html', 'type': 'popup' 'height': '120', 'width':'120'}, function(window) {
//    });
// });