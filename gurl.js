function gurlClick(info, tab) {
    if (info.menuItemId == "gurlCopy") {
        var url = gurlGetOrigin(info.linkUrl);
        console.log(url);
        gurlClip(url);
        return;
    }

    if (info.menuItemId == "gurlOpen") {
        var url = gurlGetOrigin(info.linkUrl);
        console.log(url);
        chrome.tabs.create({"url":url}, null);
        return;
    }
}

function gurlParser(url) {
    var a = document.createElement('a');
    a.href = url;
    return a;
}

function gurlIsGoogle(url) {
    var a = gurlParser(url);
    console.log(a.hostname);
    var ret = false;
    if (a.hostname.search("google") >= 0)
        ret = true;

    return ret;
}

function gurlGetOrigin(url) {
    var a = gurlParser(url);
    var seg = a.search.replace(/^\?/,'').split('&');
    for (var i=0;i<seg.length;i++) {
        if (!seg[i])
            continue;

        s = seg[i].split('='); 
        if (s[0] == "url")
            return decodeURIComponent(s[1]);
    }
    return null;
}

function gurlClip(url) {
    if (url == null)
        return;

    var t = document.createElement("textarea");
    var bodys = document.getElementsByTagName("body");
    if (bodys == null || 0 >= bodys.length)
        return;

    var body = bodys[0];
    body.appendChild(t);
    t.value = url;
    t.select();
    document.execCommand("copy");
    body.removeChild(t);
}

var documentUrlPatterns = ["*://*.google.com/*", "*://*.google.com.hk/*", "*://*.google.com.tw/*", "*://*.google.co.jp/*", "*://*.google.co.uk/*"];
var contexts = ["link"];
var menus = [
{ "id":"gurlCopy", "title": "copy original url", "contexts": contexts, "documentUrlPatterns": documentUrlPatterns, "onclick": gurlClick },
{ "id":"gurlOpen", "title": "open original url", "contexts": contexts, "documentUrlPatterns": documentUrlPatterns, "onclick": gurlClick }
];
// chrome.contextMenus.create(menus[0], null);
chrome.contextMenus.create(menus[1], null);
