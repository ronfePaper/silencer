/**
 * Created by ronfe on 15/3/28.
 */

//Get the url of current tab
function getCurrentTabUrl(callback){
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function(tabs){
        var tab = tabs[0];
        var url = tab.url;
        callback(url);
    });
}

function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function(url) {
        renderStatus('The current url is: ' + url);
    });
});