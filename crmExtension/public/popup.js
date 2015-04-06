/**
 * Created by ronfe on 15/3/28.
 */

//Get the url of current tab
function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        var url = tab.url;
        callback(url);
    });
}

function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function () {
    getCurrentTabUrl(function (pageUrl) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:11700/url',
            data: {url: pageUrl},
            crossDomain: true,
            success: function (text) {
                renderStatus(text);
            }
        });
    });
});