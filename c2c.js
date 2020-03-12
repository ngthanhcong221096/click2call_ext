var T = {},
	r = [],
	//link
	href = "https://dev-demo.cloudpbx.vn:8089/test_api/2019-08-01-C/call.php?phone=",
	//limit tag get phone nummber
	l = ["A","SCRIPT", "IMG", "CRMSPAN", "TEXTAREA", "INPUT", "SELECT", "CRMTEMP", "CRMPHONE", "PRE", "CODE", "STYLE", "CANVAS", "svg", "rect", "clipPath", "g", void 0],
	// RegExp get phone number format
    N = new RegExp("(^|\\s)([(])?([+]?)[-.()]*[ ]?([0-9]{1,4})([)])?[-. ()]*([0-9]{1,4})[-. ()\\/]*([0-9]{1,4})[-. ]*([0-9]{0,4})[-. ]*([0-9]{0,4})[-. ]*([0-9]{0,4})[-. ]*([0-9]{0,4})($|\\s|[;,])", "g"),
    // RegExp IP addresss
	i = new RegExp("(^|[^0-9]\\s)((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])($|\\s|[;,])", "g"),
	// RegExp link
    a = new RegExp("http[s]?:\\/\\/\\S*(\\s|$)", "g"),
    // RegExp date
    d = [new RegExp("(^|[^0-9]\\s)([1-9][0-9])([0-9]{2})-(1[0-2]|0[1-9])-(3[0-1]|[1-2][0-9]|0[0-9])($|\\s)", "g"), new RegExp("(^|[^0-9]\\s)(3[0-1]|[0-2][0-9]|[1-9])[\\/.-](1[0-2]|0[1-9]|[1-9])[\\/.-](([1-9][0-9])?[0-9]{2})($|\\s)", "g"), new RegExp("(^|[^0-9]\\s)(1[0-2]|0[1-9]|[1-9])[\\/.-](3[0-1]|[0-2][0-9]|[1-9])[\\/.-](([1-9][0-9])?[0-9]{2})($|\\s)", "g")],
    E = "",
    y = !1,
    // MutationObserver APIDetecting changes on the DOM
    e = new MutationObserver(function(e) {
        e.forEach(function(e) {
            for (var t = 0; t < e.addedNodes.length; t++)
                console.debug("Dynamic element : " + e.addedNodes[t].tagName);
                if (0 <= l.indexOf(e.addedNodes[t].tagName)) console.debug("Dynamic element ignored: " + e.addedNodes[t].tagName);
                else {
                    console.debug("Dynamic element parsed: " + e.addedNodes[t].tagName);
                    var n = e.addedNodes[t];
                    C() || (getDocumentBody(n), setTimeout(function() {
                        getDocumentBody(n)
                    }, 1e3))
                }
        })
    });
function appendToHead(e) {
    T = e, console.log("XAD Client loaded options", T), T.exceptions && (r = T.exceptions.split(" ")), $("<style type='text/css'>crmspan{text-decoration: none;\tcursor: auto;}</style>")
        .appendTo("head"), $("<link href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'>").appendTo("head");
    var t = document.querySelector('meta[name="description"]'),
        n = t && "XAD Client" == t.getAttribute("content"),
        o = document && document.title && "XAD Management Console" == document.title;
    return n && (T.webclienturl && "" != T.webclienturl || (T.webclienturl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "") + "/webclient", console.log("Webclient page detected, autoconfiguring webclienturl to " + T.webclienturl), chrome.storage.sync.set(T))), n || o ? (console.debug("Ignoring XAD page"), !1) : ("webclient" != T.protocol || T.webclienturl || (T.protocol = "tel", T.webclienturl = ""), y = "webclient" == T.protocol, E = T.webclienturl.replace(/\/$/, "") + "/click2call?phone=", !0)
}
function C() {
    for (var e = window.location.toString()
            .toLowerCase(), t = window.location.host.toLowerCase(), n = 0; n < r.length; ++n) {
        var o = r[n].trim()
            .toLowerCase();
        if ("" != o) {
            if ("http://" != o.substring(0, 7) && "https://" != o.substring(0, 8)) {
                if (t.length >= o.length && t.substr(t.length - o.length) == o) return console.debug("Host ignored " + t + " because it matches " + r[n]), !0;
                o = "://" + o
            }
            if (console.debug("matching " + e + " to " + o), 0 <= e.indexOf(o)) return console.debug("URL ignored " + e + " because it matches " + r[n]), !0
        }
    }
    return !1
}
function listenMutationObserver() {
    e.observe(document.body, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
    })
}
function disconnect() {
    e.disconnect()
}
function R(e) {
    return e.replace(new RegExp(" ", "g"), " ")
}
function checkRegexDataInput(e, t) {
    //check data input
    var n = e.nodeValue;
    if (n) {
        a.test(n) && (console.debug(n + " skipped: matches URL regex"),
            n = n.replace(a, function(e) {
            return "<crmtemp>" + btoa(e) + "</crmtemp>"
        }));
        i.test(n) && (console.debug(n + " skipped: matches IP address regex"),
            n = n.replace(i, function(e) {
            return "<crmtemp>" + btoa(e) + "</crmtemp>"
        }));
        for (var o = 0; o < d.length; ++o) d[o].test(n) && (console.debug(n + " skipped: matches date regex"), n = n.replace(d[o], function(e) {
            return "<crmtemp>" + btoa(e) + "</crmtemp>"
        }));
        n = R(n);
        // console.debug(n);
        for (var r = !1; N.test(n);) {
            if (0 < n.indexOf("prompt(") || 0 < n.indexOf("alert(") || 0 < n.indexOf("confirm(")) {
                console.debug(n + " skipped: contains prompt alert confirm");
                break
            }
            var c, l;
            R(n).replace(N, function(e) { l = regexAndReplacePhoneNumber(c = e) });
            //Phone check length 
            console.debug("Phone detected: " + c + "=>" + l, l.length);
            l.length >= T.minlength && l.length <= T.maxlength ? (r = !0, n = n.replace(c, "<crmphone>" + btoa(c) + "</crmphone>")) : (n = n.replace(c, "<crmtemp>" + btoa(c) + "</crmtemp>"), console.debug(c + " skipped: does not match length requirements"))
        }
        if (r) {
            t.push({ element: e, newhtml: n })
        }
    }
}
function checkIsNodeType(e, t) {
    if (e == document.body || null !== e.offsetParent) {
        for (var n = 0; n < e.childNodes.length; ++n) {
            if (3 != (o = e.childNodes[n]).nodeType) {
                (0 <= l.indexOf(o.tagName) || checkIsNodeType(o, t))
            }
        }
        for (n = 0; n < e.childNodes.length; ++n) {
            var o;
            //If the node is a text node, the nodeType property will return 3.
            if (3 == (o = e.childNodes[n]).nodeType) {
                checkRegexDataInput(o, t)
            }
        }
    }
}
function regexAndReplacePhoneNumber(e) {
    return e.replace(/[^0-9+]/gi, "")
}

function inputClick2Call(e, t) {
	var n = regexAndReplacePhoneNumber(t);
    var phone;
    var array_check_phone = {
        "dial_84" : ["+84","84"],
        "hotline" : ["1800","1900"], 
        "mobile" : ["09","08","07","05","03"], 
        "landline" : ["02"],
        "customs" : ["090", "097","035","0163","0167","0166","(+84)","(029)"]
    }
    //c2cFormat_config.socket_configCRM.c2cFormat
    // const check = c2cFormat_config.socket_configCRM.c2cFormat["dial_84"];
    const check = array_check_phone["dial_84"];
    if (check.includes(n.slice(0,3)))
    {
        phone = n.replace(/[+]84/g, '0');
    }else if ( check.includes(n.slice(0,2)) )
    {
        phone = n.replace(/84/g, '0');
    }
    else{
        phone = n;
    }
    return s = '<crmspan id="phone_number">' + t + " <i class='fa fa-phone-square btn-c2c' style='color: green;cursor: pointer;' aria-hidden='true' phone_number = '"+phone+"' title='Call to "+phone+"'></i></crmspan> ", s
}

function noInputClick2Call(e, t) {
    var n = regexAndReplacePhoneNumber(t);
    return s = '<crmspan id="phone_number">' + t + "</crmspan> ", s
}

function getDocumentBody(e) {
    if (T.enabled && !C()) {
        var t = [];

        checkIsNodeType(e, t),(0 < t.length && console.debug(t.length, "phone elements detected"));
        t.push({
            element: document.createElement("crmdiv"),
            html: ""
        });
        var u = t.length,
            g = !1,
            p = "",
            m = document.createElement("div"),
            h = document.createElement("div"),
            b = document.createElement("div");
        disconnect();
        for (a = 0; a < u; ++a){
            if (g != t[a].element.parentNode && (p && g && (g.innerHTML = p), t[a].element.parentNode && (p = t[a].element.parentNode.innerHTML), g = t[a].element.parentNode), t[a].element.data) {
                var f = t[a].newhtml;
                f = (f = f.replace(new RegExp("(?:<crmtemp>)(.*?)(?:</crmtemp>)", "gm"), function(e, t) {
                        return atob(t)
                    }))
                    .replace(new RegExp("(?:<crmphone>)(.*?)(?:</crmphone>)", "gm"), function(e, t) {
                        return R(atob(t))
                            .replace(N, function(e) {
                                var array_check_phone = {
                                    "dial_84" : ["+84","84"],
                                    "hotline" : ["1800","1900"], 
                                    "mobile" : ["09","08","07","05","03"], 
                                    "landline" : ["02"],
                                    "customs" : ["090", "097","035","0163","0167","0166","(+84)","(029)"]
                                }
                                
                                // const check_dial_84 = c2cFormat_config.socket_configCRM.c2cFormat["dial_84"];
                                // const check_mobile = c2cFormat_config.socket_configCRM.c2cFormat["mobile"];
                                // const check_landline = c2cFormat_config.socket_configCRM.c2cFormat["landline"];
                                // const check_hotline = c2cFormat_config.socket_configCRM.c2cFormat["hotline"];
                                // const check_customs = c2cFormat_config.socket_configCRM.c2cFormat["customs"];

                                const check_dial_84 = array_check_phone["dial_84"];
                                const check_mobile = array_check_phone["mobile"];
                                const check_landline = array_check_phone["landline"];
                                const check_hotline = array_check_phone["hotline"];
                                const check_customs = array_check_phone["customs"];
                                const phone = e.trim();
                                var run;
                                if (check_dial_84.includes(phone.slice(0,3)) || check_dial_84.includes(phone.slice(0,2)) )
                                {
                                    run = inputClick2Call(E, e);
                                }else if (check_mobile.includes(phone.slice(0,2)) && phone.length === (10 + hasWhiteSpace(phone)))
                                {
                                    run = inputClick2Call(E, e);
                                }
                                else if (check_hotline.includes(phone.slice(0,4)) && phone.length <= (11 + hasWhiteSpace(phone)))
                                {
                                    run = inputClick2Call(E, e);
                                }
                                else if (check_landline.includes(phone.slice(0,2)) && phone.length === (11 + hasWhiteSpace(phone)))
                                {
                                    run = inputClick2Call(E, e);
                                }
                                else{
                                    for (var i = 0; i < check_customs.length; i++) {
                                        var check = check_customs[i].includes(phone.slice(0,check_customs[i].length));
                                        if (check) {
                                            run = inputClick2Call(E, e);
                                            break;
                                        }
                                        else{
                                            run = noInputClick2Call(E, e);
                                        }
                                    }
                                }
                                return run;
                            })
                    });
                    m.innerHTML = f;
                    h.innerHTML = t[a].element.data;
                for (var x = b.innerHTML = p, w = 0; w < b.childNodes.length; ++w) {
                    var v = b.childNodes[w];
                    3 != v.nodeType && (v.outerHTML && (x = x.replace(v.outerHTML, "*".repeat(v.outerHTML.length))))
                }
                r = x.indexOf(h.innerHTML);
                p = p.substring(0, r) + m.innerHTML + p.substring(r + h.innerHTML.length)
            }
        }
        listenMutationObserver()
    }
}
function run(e) {
    appendToHead(e) && T.enabled && (getDocumentBody(document.body), listenMutationObserver())
}

function hasWhiteSpace(s) {
  return s.split(' ').length-1;
}
function SetingGeneral() {
    document.defaultoptions || (document.defaultoptions = {
        enabled: !0,
        protocol: "webclient",
        webclienturl: "",
        minlength: 8,
        maxlength: 13,
        exceptions: ""
    });
    chrome && chrome.storage ? chrome.storage.sync.get(document.defaultoptions, function(e) {
        run(e)
    }) : run(document.defaultoptions)
}
if (typeof jQuery == 'undefined') {
    alert("Ignoring XAD in page");
}else{
    jQuery(document).ready(function() {
        SetingGeneral();
        $("body").on("click",".btn-c2c", function(){
                var phone = $(this).attr('phone_number');
                alert(phone);
            });
        }
    );
}
