/*global chrome,$*/

chrome.runtime.sendMessage({clicked : true});

chrome.extension.onMessage.addListener(function (req) {
    if (req.message === "egghead:got-links") {
        $(".spinner").remove();

        $("body").html(req.data);
    } else if (req.message === "egghead:error") {
        $(".spinner").remove();

        $("body").addClass("error")
            .html(`<p>${req.data}</p>`);
    }
});
