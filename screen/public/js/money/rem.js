function setWinFontSize() {
    var width = 1366, height = 768;
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    var baseRatio = width / height;
    var realRatio = winWidth / winHeight;
    var wFontSize = 100;
    if (realRatio > baseRatio) {
        wFontSize = winHeight / 7.68;
        //wFontSize=winHeight>768?winHeight/7.68:100;//100对应css最小高度为768
    } else {
        var realHeight = winWidth / baseRatio;
        wFontSize = realHeight / 7.68;
    }
    document.getElementsByTagName('html')[0].style.fontSize = wFontSize + 'px';
}
setWinFontSize();
window.WINFSIZE = parseFloat(document.getElementsByTagName('html')[0].style.fontSize);
window.SCALE = WINFSIZE / 100;
window.onresize = function () {
    setWinFontSize();
    WINFSIZE = parseFloat(document.getElementsByTagName('html')[0].style.fontSize);
    window.SCALE = WINFSIZE / 100;
};
window.rem2px = function (v) {
    v = parseFloat(v);
    return v * WINFSIZE;
};

window.px2rem = function (v) {
    v = parseFloat(v);
    return v / WINFSIZE;
};

try {
    var imageBitmap=ImageBitmap;
}catch (e) {
    window.ImageBitmap=function(){}
}