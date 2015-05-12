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

function renderStatus(statusText, showCat) {
    if (showCat){
        $('#cate').removeClass('hidden');
    }
    document.getElementById('textstatus').textContent = statusText;
}

function renderLLStatus(statusText, showCat) {
    if (showCat){
        $('#cate2').removeClass('hidden');
    }
    $('#ll').removeClass('hidden');
    document.getElementById('llstatus').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function () {
    getCurrentTabUrl(function (pageUrl) {
        var keywords = [];
        var startTime, endTime, duringTime;
        $.ajax({
            type: 'POST',
            url: 'http://localhost:11700/textrank',
            data: {url: pageUrl},
            crossDomain: true,
            timeout: 15000,
            beforeSend: function () {
                startTime = new Date().getTime();
                renderStatus("Processing...", false);
            },
            error: function(){
                renderStatus("Failed, try again later...", false);
            },
            success: function (text) {
                //console.log(text[2]);
                //renderStatus(text[0].splice(0,10), true);
                //renderLLStatus(text[1].splice(0,10), true);
                WordCloud(document.getElementById('wordle'), {
                    list: text[2],
                    gridSize:3,
                    weightFactor: 5
                } );
                $('#cate3').removeClass('hidden');

                endTime = new Date().getTime();
                duringTime = (endTime - startTime) / 1000;
                renderStatus('', false);
                document.getElementById('duration').textContent ='用时' + duringTime + '秒';
                //renderLLStatus(text[2], false);
            }
        });
    });
});
