//start:自动配置rem
(function (window) {
    var STD_WIDTH = 750, //标准宽度（单位：像素）
        STD_FONT_SIZE = 100, //标准宽度下html的字体大小（单位：像素）
        root = document.documentElement,
        fontSize, //当前root的fontSize
        scale, //当前相对于标准宽度的缩放比例
        tDelayResize = null, //delayResize方法的计时器
        onResizeCbs = [], //resize事件回调组成的数组

        /**
         * px转rem
         * @param {Number} px - px
         * @returns {Number} rem
         */
        pxToRem = function (px) {
            return px / fontSize;
        },

        /**
         * 标准px转rem
         * @param {Number} stdPx - 标准px
         * @returns {Number} rem
         */
        stdPxToRem = function (stdPx) {
            return stdPx / STD_FONT_SIZE;
        },

        /**
         * rem转px
         * @param {Number} rem - rem
         * @returns {Number} px
         */
        remToPx = function (rem) {
            return rem * fontSize;
        },

        /**
         * rem转标准px
         * @param {Number} rem - rem
         * @returns {Number} 标准px
         */
        remToStdPx = function (rem) {
            return rem * STD_FONT_SIZE;
        },

        /**
         * px转标准px
         * @param {Number} px - px
         * @returns {Number} 标准px
         */
        pxToStdPx = function (px) {
            return px / scale;
        },

        /**
         * 标准px转px
         * @param {Number} 标准px - 标准px
         * @returns {Number} px
         */
        stdPxToPx = function (px) {
            return px * scale;
        },

        /**
         * 重置fontSize大小
         */
        resize = function () {
            scale = root.clientWidth / STD_WIDTH;
            var newFontSize = scale * STD_FONT_SIZE;
            if (fontSize != newFontSize) {
                fontSize = newFontSize;
                autoRem.fontSize = fontSize;
                autoRem.scale = scale;
                root.style.fontSize = fontSize + 'px';
                onResizeCbs.forEach(function (onResizeCb) {
                    onResizeCb();
                });
            }
        },

        /**
         * 延迟触发resize方法
         */
        delayResize = function () {
            clearTimeout(tDelayResize);
            tDelayResize = setTimeout(resize, 100);
        },

        /**
         * 绑定resize事件
         * @param {Function} onResizeCb - 要绑定的回调
         */
        onResize = function (onResizeCb) {
            if (onResizeCb) {
                onResizeCbs.push(onResizeCb);
            }
        },

        /**
         * 解绑resize事件
         * @param {Function} [onResizeCb] - 要解绑的回调，若不传则解绑所有回调
         */
        offResize = function (onResizeCb) {
            if (onResizeCb) {
                var idx = onResizeCbs.indexOf(onResizeCb);
                if (~idx) {
                    onResizeCbs.splice(idx, 1);
                }
            } else {
                onResizeCbs = [];
            }
        },

        /**
         * 自动配置rem
         */
        autoRem = {
            pxToRem: pxToRem,
            stdPxToRem: stdPxToRem,
            remToPx: remToPx,
            remToStdPx: remToStdPx,
            pxToStdPx: pxToStdPx,
            stdPxToPx: stdPxToPx,
            STD_FONT_SIZE: STD_FONT_SIZE,
            STD_WIDTH: STD_WIDTH,
            fontSize: null, //当前根元素上的fontSize（单位：px）
            scale: null, //当前的缩放比例
            // onResize: onResize,
            // offResize: offResize
        };
    resize();
    window.addEventListener('resize', delayResize, false);
    window.autoRem = autoRem;
})(window);
//end:自动配置rem
