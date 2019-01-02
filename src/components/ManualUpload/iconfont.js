!
function (d) {
    var e, l = '<svg><symbol id="icon-yaopin" viewBox="0 0 1024 1024"><path d="M341.198939 953.37973167c-70.692039 0-141.367705-26.907836-195.184401-80.716347-107.632369-107.624183-107.632369-282.744619 0-390.368802l341.786317-341.786317c51.936883-51.946093 121.254621-80.556711 195.184401-80.55671 73.913407 0 143.230122 28.610618 195.167005 80.55671 51.954279 51.946093 80.556711 121.262808 80.55671 195.184401s-28.602432 143.246495-80.55671 195.184401L536.38334 872.66440867c-53.816696 53.807487-124.492362 80.715323-195.184401 80.715323zM194.597023 824.08192267c80.824817 80.824817 212.379015 80.824817 293.203832 0L829.570799 482.29560667c38.969547-38.969547 60.426231-91.033319 60.426231-146.601916 0-55.56041-21.455661-107.632369-60.426231-146.601916-38.969547-38.96136-91.02411-60.426231-146.585543-60.426231-55.577806 0-107.632369 21.464871-146.601916 60.426231L194.597023 530.87809167c-80.824817 80.84119-80.824817 212.362642 0 293.203831z" fill="#444444" ></path><path d="M644.648113 592.67759967l-36.440957 36.440957c-13.361309 13.361309-35.226293 13.361309-48.587602 0L389.564483 459.06246267c-13.416568-13.416568-13.416568-35.170011 0-48.587602l36.440957-36.440957 218.642673 218.643696z" fill="#00D8A0" ></path></symbol></svg>',
    t = (e = document.getElementsByTagName("script"))[e.length - 1].getAttribute("data-injectcss");
    if (t && !d.__iconfont__svg__cssinject__) {
        d.__iconfont__svg__cssinject__ = !0;
        try {
            document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
        } catch (e) {
            console && console.log(e)
        }
    } !
    function (e) {
        if (document.addEventListener) if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) setTimeout(e, 0);
        else {
            var t = function () {
                document.removeEventListener("DOMContentLoaded", t, !1),
                e()
            };
            document.addEventListener("DOMContentLoaded", t, !1)
        } else document.attachEvent && (n = e, o = d.document, i = !1, c = function () {
            i || (i = !0, n())
        },
        (l = function () {
            try {
                o.documentElement.doScroll("left")
            } catch (e) {
                return void setTimeout(l, 50)
            }
            c()
        })(), o.onreadystatechange = function () {
            "complete" == o.readyState && (o.onreadystatechange = null, c())
        });
        var n, o, i, c, l
    }(function () {
        var e, t, n, o, i, c; (e = document.createElement("div")).innerHTML = l,
        l = null,
        (t = e.getElementsByTagName("svg")[0]) && (t.setAttribute("aria-hidden", "true"), t.style.position = "absolute", t.style.width = 0, t.style.height = 0, t.style.overflow = "hidden", n = t, (o = document.body).firstChild ? (i = n, (c = o.firstChild).parentNode.insertBefore(i, c)) : o.appendChild(n))
    })
}(window);