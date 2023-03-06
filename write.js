const isdev = location.hostname === "localhost" || location.protocol === "file:"
let styles = document.getElementById("style-code").innerText;

const getStyleHtml = function () {
    return document.getElementById('style-text').innerHTML;
};

let openComment = false;

const writeStyleChar = function (which) {
    if (which === '/' && !openComment) {
        openComment = true;
        styles = getStyleHtml() + which;
    } else if (which === '/' && openComment) {
        openComment = false;
        styles = getStyleHtml().replace(
            /(\/[^\/]*\*)$/,
            '<span class="comment">$1/</span>',
        );
    } else if (which === ':' && !openComment) {
        styles = getStyleHtml().replace(
            /([a-zA-Z- ^\n]*)$/,
            '<span class="key">$1</span>:',
        );
    } else if (which === ';' && !openComment) {
        styles = getStyleHtml().replace(
            /([^:]*)$/,
            '<span class="value">$1</span>;',
        );
    } else if (which === '{' && !openComment) {
        styles = getStyleHtml().replace(
            /(.*)$/,
            '<span class="selector">$1</span>{',
        );
    } else {
        styles = getStyleHtml() + which;
    }
    document.getElementById('style-text').innerHTML = styles;
    return document
        .getElementById('style-tag')
        .insertAdjacentText('beforeend', which);
};

const writeStyles = function (message, index, interval) {
    if (index < message.length) {
        const pre = document.getElementById('style-text');
        pre.scrollTop = pre.scrollHeight;
        writeStyleChar(message[index++]);
        return setTimeout(
            () => writeStyles(message, index, interval),
            interval,
        );
    }
};

document.body.insertAdjacentHTML(
    'beforeend',
    `\<style id="style-tag"></style>
          <div id="heart"></div>
         <pre id="style-text"></pre>\
`,
);
writeStyles(styles, 0, isdev ? 16 : 30);