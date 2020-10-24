window.onload = function () {
    var toc = "";
    var level = 1;

    var tag = document.getElementsByTagName("article")[0];
    tag.innerHTML = tag.innerHTML.replace(
        /<h([2-9])>([^<]+)<\/h([2-9])>/gi,
        function (str, openLevel, titleText, closeLevel) {
            if (openLevel != closeLevel) {
                return str;
            }

            if (openLevel > level) {
                toc += (new Array(openLevel - level + 1)).join("<ul>");
            } else if (openLevel < level) {
                toc += (new Array(level - openLevel + 1)).join("</ul>");
            }

            level = parseInt(openLevel);

            var anchor = titleText.replace(/ /g, "_");
            toc += "<li><a href=\"#" + anchor + "\">" + titleText + "</a></li>";

            return "<a name=\"" + anchor + "\"></a><h" + openLevel + ">" + titleText + "</h" + closeLevel + ">";
        }
    );

    if (level) {
        toc += (new Array(level + 1)).join("</ul>");
    }

    document.getElementById("toc").innerHTML += toc;
};
