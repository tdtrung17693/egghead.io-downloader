/*global chrome*/
chrome.runtime.onMessage.addListener(function(req) {
    if (req.clicked) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var url = tabs[0].url;
            var type_n_slug = url.match(/^.+\/(lessons|courses)\/([a-zA-Z0-9-]+$)/);
            var type,
                slug;


            if (type_n_slug) {
                type_n_slug.shift();
                [type, slug] = type_n_slug;
            } else {
                chrome.runtime.sendMessage({message: "egghead:error", data: "Invalid Link"});

                return;
            }

            var xhr = new XMLHttpRequest();

            xhr.open("GET", `https://ehl-176.herokuapp.com/${type}/${slug}`, true);

            xhr.onreadystatechange = function(){
                console.log(xhr);
                if (xhr.readyState == 4) {
                    chrome.runtime.sendMessage({message: "egghead:got-links", data: xhr.responseText});
                }
            };
            xhr.send();
        });
    }
});

